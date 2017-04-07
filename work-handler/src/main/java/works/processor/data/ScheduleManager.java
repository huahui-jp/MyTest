package works.processor.data;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

import works.processor.domain.DataSource;
import works.processor.domain.Resource;
import works.processor.domain.ScheduleJob;
import works.processor.utils.DaoTools;
import works.processor.web.IDataSource;
import works.processor.web.IResource;
import works.processor.web.IScheduleJob;

public class ScheduleManager {

    private static String JOB_GROUP_NAME = "COM_JOBGROUP";
    private static String TRIGGER_GROUP_NAME = "COM_TRIGGERGROUP";

    private ScheduleManager instance = null;
    private Scheduler sched = null;
    
    public ScheduleManager getInstance()  {
    	if(instance == null){
    		
    		try {
	    		SchedulerFactory factory = new StdSchedulerFactory();
	    		instance = new ScheduleManager();
	    		instance.sched = factory.getScheduler();
    		} catch (Exception ex) {
    			throw new RuntimeException(ex);
    		}
    	}

		return instance;
    }
    
    public boolean isScheduled(int jobId) {
    	
		IScheduleJob dao = (IScheduleJob) DaoTools.getDAO(IScheduleJob.class);
		
		ScheduleJob job = dao.findOne(jobId);
		String jobName = job.getSchedJobName();
		
		try {
			JobDetail jobDetail = sched.getJobDetail(jobName, JOB_GROUP_NAME);
			if(jobDetail == null) {
				return false;
			} else {
				return true;
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
    }


    
    public void addJob(int jobId, String time) {
    	
		IScheduleJob dao = (IScheduleJob) DaoTools.getDAO(IScheduleJob.class);
		IDataSource dataSourceDao = (IDataSource) DaoTools.getDAO(IDataSource.class);
		IResource resourceDao = (IResource) DaoTools.getDAO(IResource.class);

		if( isScheduled(jobId)) {
			return;
		} else {

			ScheduleJob job = dao.findOne(jobId);
			String jobName = job.getSchedJobName();
			
			
			JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, DBScheduleJobExecutor.class);
			jobDetail.getJobDataMap().put(ScheduleJobExecutor.SCHEDULE_JOB, job);
			DataSource dataSource = dataSourceDao.findOne(job.getDataSourceId());
			jobDetail.getJobDataMap().put(ScheduleJobExecutor.SCHEDULE_DATASOURCE, dataSource);
			jobDetail.getJobDataMap().put(ScheduleJobExecutor.SCHEDULE_RESOURCE, resourceDao.findOne(dataSource.getResourceId()));
			
			try {
				CronTrigger trigger = new CronTrigger(jobName, TRIGGER_GROUP_NAME);
				trigger.setCronExpression(job.getCronTime());
				sched.scheduleJob(jobDetail, trigger);
				
				if( !sched.isShutdown()) {
					sched.start();
				}
			} catch (Exception ex) {
				throw new RuntimeException(ex);
			}
		}
    }

    public void removeJob(int jobId) {
		IScheduleJob dao = (IScheduleJob) DaoTools.getDAO(IScheduleJob.class);
		ScheduleJob job = dao.findOne(jobId);

		if( !isScheduled(jobId)) {
			return;
		}

		try {
            sched.pauseTrigger(job.getSchedJobName(), TRIGGER_GROUP_NAME);// 停止触发器
            sched.unscheduleJob(job.getSchedJobName(), TRIGGER_GROUP_NAME);// 移除触发器
            sched.deleteJob(job.getSchedJobName(), JOB_GROUP_NAME);// 删除任务
        } catch (Exception e) {
            throw new RuntimeException(e);
        }    	
    }
    /**
     * @Description: 添加一个定时任务，使用默认的任务组名，触发器名，触发器组名
     * 
     * @param sched
     *            调度器
     * 
     * @param jobName
     *            任务名
     * @param cls
     *            任务
     * @param time
     *            时间设置，参考quartz说明文档
     * 
     * @Title: QuartzManager.java
     */
    public static void addJob(Scheduler sched, String jobName, @SuppressWarnings("rawtypes") Class cls, String time) {
        try {
            JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, cls);// 任务名，任务组，任务执行类
            // 触发器
            CronTrigger trigger = new CronTrigger(jobName, TRIGGER_GROUP_NAME);// 触发器名,触发器组
            trigger.setCronExpression(time);// 触发器时间设定
            sched.scheduleJob(jobDetail, trigger);
            // 启动
            if (!sched.isShutdown()) {
                sched.start();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @Description: 修改一个任务的触发时间(使用默认的任务组名，触发器名，触发器组名)
     * 
     * @param sched
     *            调度器
     * @param jobName
     * @param time
     * 
     * @Title: QuartzManager.java
     */
    @SuppressWarnings("rawtypes")
    public static void modifyJobTime(Scheduler sched, String jobName, String time) {
        try {
            CronTrigger trigger = (CronTrigger) sched.getTrigger(jobName, TRIGGER_GROUP_NAME);
            if (trigger == null) {
                return;
            }
            String oldTime = trigger.getCronExpression();
            if (!oldTime.equalsIgnoreCase(time)) {
                JobDetail jobDetail = sched.getJobDetail(jobName, JOB_GROUP_NAME);
                Class objJobClass = jobDetail.getJobClass();
                removeJob(sched, jobName);
                addJob(sched, jobName, objJobClass, time);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * @Description: 移除一个任务(使用默认的任务组名，触发器名，触发器组名)
     * 
     * @param sched
     *            调度器
     * @param jobName
     * 
     * @Title: QuartzManager.java
     */
    public static void removeJob(Scheduler sched, String jobName) {
        try {
            sched.pauseTrigger(jobName, TRIGGER_GROUP_NAME);// 停止触发器
            sched.unscheduleJob(jobName, TRIGGER_GROUP_NAME);// 移除触发器
            sched.deleteJob(jobName, JOB_GROUP_NAME);// 删除任务
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @Description:启动所有定时任务
     * 
     * @param sched
     *            调度器
     * 
     * @Title: QuartzManager.java
     */
    public static void startJobs(Scheduler sched) {
        try {
            sched.start();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @Description:关闭所有定时任务
     * 
     * 
     * @param sched
     *            调度器
     * 
     * 
     * @Title: QuartzManager.java
     */
    public static void shutdownJobs(Scheduler sched) {
        try {
            if (!sched.isShutdown()) {
                sched.shutdown();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /*
    public static void main(String args[]) throws Exception {
    	 SchedulerFactory gSchedulerFactory = new StdSchedulerFactory();
         Scheduler sche = gSchedulerFactory.getScheduler();
         String job_name = "动态任务调度";
         System.out.println("【系统启动】开始(每1秒输出一次)...");
         ScheduleManager.addJob(sche, job_name, ScheduleJob.class, "0/1 * * * * ?");
         
         Thread.sleep(100 * 1000);
    }*/
}

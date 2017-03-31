package works.processor.data;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.quartz.Calendar;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobListener;
import org.quartz.Scheduler;
import org.quartz.SchedulerContext;
import org.quartz.SchedulerException;
import org.quartz.SchedulerListener;
import org.quartz.SchedulerMetaData;
import org.quartz.Trigger;
import org.quartz.TriggerListener;
import org.quartz.UnableToInterruptJobException;
import org.quartz.spi.JobFactory;

import works.processor.domain.DataSource;
import works.processor.domain.Resource;
import works.processor.domain.ScheduleJob;

public class JobScheduler implements Scheduler {

	private Scheduler myScheduler = null;

	private ScheduleJob scheduleJob;
	
	private Scheduler scheduler;

	private DataSource dataSource;

	private Resource sourceResource;
	
	@Override
	public String getSchedulerName() throws SchedulerException {
		return myScheduler.getSchedulerName();
	}

	@Override
	public String getSchedulerInstanceId() throws SchedulerException {
		return myScheduler.getSchedulerInstanceId();
	}

	@Override
	public SchedulerContext getContext() throws SchedulerException {
		return myScheduler.getContext();
	}

	@Override
	public void start() throws SchedulerException {
		myScheduler.start();
	}

	@Override
	public void startDelayed(int seconds) throws SchedulerException {
		myScheduler.startDelayed(seconds);
	}

	@Override
	public boolean isStarted() throws SchedulerException {
		return myScheduler.isStarted();
	}

	@Override
	public void standby() throws SchedulerException {
		myScheduler.standby();
	}

	@Override
	public boolean isInStandbyMode() throws SchedulerException {
		return myScheduler.isInStandbyMode();
	}

	@Override
	public void shutdown() throws SchedulerException {
		myScheduler.shutdown();
	}

	@Override
	public void shutdown(boolean waitForJobsToComplete) throws SchedulerException {
		myScheduler.shutdown(waitForJobsToComplete);
	}

	@Override
	public boolean isShutdown() throws SchedulerException {
		return myScheduler.isShutdown();
	}

	@Override
	public SchedulerMetaData getMetaData() throws SchedulerException {
		return myScheduler.getMetaData();
	}

	@Override
	public List getCurrentlyExecutingJobs() throws SchedulerException {
		return myScheduler.getCurrentlyExecutingJobs();
	}

	@Override
	public void setJobFactory(JobFactory factory) throws SchedulerException {
		myScheduler.setJobFactory(factory);
	}

	@Override
	public Date scheduleJob(JobDetail jobDetail, Trigger trigger) throws SchedulerException {
		return myScheduler.scheduleJob(jobDetail, trigger);
	}

	@Override
	public Date scheduleJob(Trigger trigger) throws SchedulerException {
		return myScheduler.scheduleJob(trigger);
	}

	@Override
	public boolean unscheduleJob(String triggerName, String groupName) throws SchedulerException {
		return myScheduler.unscheduleJob(triggerName, groupName);
	}

	@Override
	public Date rescheduleJob(String triggerName, String groupName, Trigger newTrigger) throws SchedulerException {
		return myScheduler.rescheduleJob(triggerName, groupName, newTrigger);
	}

	@Override
	public void addJob(JobDetail jobDetail, boolean replace) throws SchedulerException {
		myScheduler.addJob(jobDetail, replace);
		
	}

	@Override
	public boolean deleteJob(String jobName, String groupName) throws SchedulerException {
		return myScheduler.deleteJob(jobName, groupName);
	}

	@Override
	public void triggerJob(String jobName, String groupName) throws SchedulerException {
		myScheduler.triggerJob(jobName, groupName);
	}

	@Override
	public void triggerJobWithVolatileTrigger(String jobName, String groupName) throws SchedulerException {
		myScheduler.triggerJobWithVolatileTrigger(jobName, groupName);
	}

	@Override
	public void triggerJob(String jobName, String groupName, JobDataMap data) throws SchedulerException {
		myScheduler.triggerJob(jobName, groupName, data);
	}

	@Override
	public void triggerJobWithVolatileTrigger(String jobName, String groupName, JobDataMap data)
			throws SchedulerException {
		myScheduler.triggerJobWithVolatileTrigger(jobName, groupName, data);
		
	}

	@Override
	public void pauseJob(String jobName, String groupName) throws SchedulerException {
		myScheduler.pauseJob(jobName, groupName);
		
	}

	@Override
	public void pauseJobGroup(String groupName) throws SchedulerException {
		myScheduler.pauseJobGroup(groupName);
	}

	@Override
	public void pauseTrigger(String triggerName, String groupName) throws SchedulerException {
		myScheduler.pauseTrigger(triggerName, groupName);
	}

	@Override
	public void pauseTriggerGroup(String groupName) throws SchedulerException {
		myScheduler.pauseTriggerGroup(groupName);
	}

	@Override
	public void resumeJob(String jobName, String groupName) throws SchedulerException {
		myScheduler.resumeJob(jobName, groupName);
	}

	@Override
	public void resumeJobGroup(String groupName) throws SchedulerException {
		myScheduler.resumeJobGroup(groupName);
	}

	@Override
	public void resumeTrigger(String triggerName, String groupName) throws SchedulerException {
		myScheduler.resumeTrigger(triggerName, groupName);
	}

	@Override
	public void resumeTriggerGroup(String groupName) throws SchedulerException {
		myScheduler.resumeTriggerGroup(groupName);
	}

	@Override
	public void pauseAll() throws SchedulerException {
		myScheduler.pauseAll();
	}

	@Override
	public void resumeAll() throws SchedulerException {
		myScheduler.resumeAll();
	}

	@Override
	public String[] getJobGroupNames() throws SchedulerException {
		return myScheduler.getJobGroupNames();
	}

	@Override
	public String[] getJobNames(String groupName) throws SchedulerException {
		return myScheduler.getJobNames(groupName);
	}

	@Override
	public Trigger[] getTriggersOfJob(String jobName, String groupName) throws SchedulerException {
		return myScheduler.getTriggersOfJob(jobName, groupName);
	}

	@Override
	public String[] getTriggerGroupNames() throws SchedulerException {
		return myScheduler.getTriggerGroupNames();
	}

	@Override
	public String[] getTriggerNames(String groupName) throws SchedulerException {
		return myScheduler.getTriggerNames(groupName);
	}

	@Override
	public Set getPausedTriggerGroups() throws SchedulerException {
		return myScheduler.getPausedTriggerGroups();
	}

	@Override
	public JobDetail getJobDetail(String jobName, String jobGroup) throws SchedulerException {
		return myScheduler.getJobDetail(jobName, jobGroup);
	}

	@Override
	public Trigger getTrigger(String triggerName, String triggerGroup) throws SchedulerException {
		return myScheduler.getTrigger(triggerName, triggerGroup);
	}

	@Override
	public int getTriggerState(String triggerName, String triggerGroup) throws SchedulerException {
		return myScheduler.getTriggerState(triggerName, triggerGroup);
	}

	@Override
	public void addCalendar(String calName, Calendar calendar, boolean replace, boolean updateTriggers)
			throws SchedulerException {
		myScheduler.addCalendar(calName, calendar, replace, updateTriggers);
	}

	@Override
	public boolean deleteCalendar(String calName) throws SchedulerException {
		return myScheduler.deleteCalendar(calName);
	}

	@Override
	public Calendar getCalendar(String calName) throws SchedulerException {
		return myScheduler.getCalendar(calName);
	}

	@Override
	public String[] getCalendarNames() throws SchedulerException {
		return myScheduler.getCalendarNames();
	}

	@Override
	public boolean interrupt(String jobName, String groupName) throws UnableToInterruptJobException {
		return myScheduler.interrupt(jobName, groupName);
	}

	@Override
	public void addGlobalJobListener(JobListener jobListener) throws SchedulerException {
		myScheduler.addGlobalJobListener(jobListener);
	}

	@Override
	public void addJobListener(JobListener jobListener) throws SchedulerException {
		myScheduler.addJobListener(jobListener);
	}

	@Override
	public boolean removeGlobalJobListener(String name) throws SchedulerException {
		return myScheduler.removeGlobalJobListener(name);
	}

	@Override
	public boolean removeJobListener(String name) throws SchedulerException {
		return myScheduler.removeJobListener(name);
	}

	@Override
	public List getGlobalJobListeners() throws SchedulerException {
		return myScheduler.getGlobalJobListeners();
	}

	@Override
	public Set getJobListenerNames() throws SchedulerException {
		return myScheduler.getJobListenerNames();
	}

	@Override
	public JobListener getGlobalJobListener(String name) throws SchedulerException {
		return myScheduler.getGlobalJobListener(name);
	}

	@Override
	public JobListener getJobListener(String name) throws SchedulerException {
		return myScheduler.getJobListener(name);
	}

	@Override
	public void addGlobalTriggerListener(TriggerListener triggerListener) throws SchedulerException {
		myScheduler.addGlobalTriggerListener(triggerListener);		
	}

	@Override
	public void addTriggerListener(TriggerListener triggerListener) throws SchedulerException {
		myScheduler.addTriggerListener(triggerListener);
	}

	@Override
	public boolean removeGlobalTriggerListener(String name) throws SchedulerException {
		return myScheduler.removeGlobalTriggerListener(name);
	}

	@Override
	public boolean removeTriggerListener(String name) throws SchedulerException {
		return myScheduler.removeTriggerListener(name);
	}

	@Override
	public List getGlobalTriggerListeners() throws SchedulerException {
		return myScheduler.getGlobalTriggerListeners();
	}

	@Override
	public Set getTriggerListenerNames() throws SchedulerException {
		return myScheduler.getTriggerListenerNames();
	}

	@Override
	public TriggerListener getGlobalTriggerListener(String name) throws SchedulerException {
		return myScheduler.getGlobalTriggerListener(name);
	}

	@Override
	public TriggerListener getTriggerListener(String name) throws SchedulerException {
		return myScheduler.getTriggerListener(name);
	}

	@Override
	public void addSchedulerListener(SchedulerListener schedulerListener) throws SchedulerException {
		myScheduler.addSchedulerListener(schedulerListener);
	}

	@Override
	public boolean removeSchedulerListener(SchedulerListener schedulerListener) throws SchedulerException {
		return myScheduler.removeSchedulerListener(schedulerListener);
	}

	@Override
	public List getSchedulerListeners() throws SchedulerException {
		return myScheduler.getSchedulerListeners();
	}

	public JobScheduler(Scheduler myScheduler) {
		super();
		this.myScheduler = myScheduler;
	}

	public ScheduleJob getScheduleJob() {
		return scheduleJob;
	}

	public void setScheduleJob(ScheduleJob scheduleJob) {
		this.scheduleJob = scheduleJob;
	}

	public Scheduler getScheduler() {
		return scheduler;
	}

	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public Resource getSourceResource() {
		return sourceResource;
	}

	public void setSourceResource(Resource sourceResource) {
		this.sourceResource = sourceResource;
	}
}

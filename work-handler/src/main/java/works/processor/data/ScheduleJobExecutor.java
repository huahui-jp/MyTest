package works.processor.data;

import java.lang.reflect.Method;
import java.sql.Timestamp;

import org.apache.activemq.artemis.utils.json.JSONException;
import org.apache.activemq.artemis.utils.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import works.processor.data.sourcesink.MessageGateway;
import works.processor.domain.ScheduleJob;
import works.processor.domain.ScheduleJobHistory;
import works.processor.repository.IScheduleJobHistory;
import works.processor.utils.CommonTools;
import works.processor.utils.DaoTools;

@Controller
public abstract class ScheduleJobExecutor implements Job {

	public static final String SCHEDULE_JOB = "scheduleJob";
	
	public static final String SCHEDULE_RESOURCE = "resource";
	
	public static final String SCHEDULE_DATASOURCE = "dataSource";
	
    @Autowired
    private MessageGateway messageGateway;

	private int getCnt = 0;
	
    abstract DataSet getDataSet(JobDataMap jobDataMap);

    abstract void prepareJobExecution(JobDataMap jobDataMap);
    
    abstract void endJobExecution(JobDataMap jobDataMap);
    
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();

		ScheduleJob scheduleJob = (ScheduleJob) jobDataMap.get(ScheduleJobExecutor.SCHEDULE_JOB);
		IScheduleJobHistory dao = (IScheduleJobHistory)DaoTools.getDAO(IScheduleJobHistory.class);
		ScheduleJobHistory jobHistory = new ScheduleJobHistory();

		try {
			jobHistory.setStartTime(new Timestamp(System.currentTimeMillis()));
			jobHistory.setGetCnt(0);
			jobHistory.setJobId(scheduleJob.getJobId());

			dao.save(jobHistory);

			prepareJobExecution(jobDataMap);
		} catch (RuntimeException re) {
			
			jobHistory.setEndTime(new Timestamp(System.currentTimeMillis()));
			jobHistory.setError(CommonTools.convertExceptionToString(re, 2048));
			jobHistory.setGetCnt(0);
			dao.save(jobHistory);
			// TODO ::
			return;
		}
		
		DataSet resultDataSet = getDataSet(jobDataMap);
		
		while( resultDataSet.next() ) {

			JSONObject jsonObject = new JSONObject();

			try {
				for( int i = 0; i < resultDataSet.getDataMetas().size(); i++ )
				{
					jsonObject.append(resultDataSet.getDataMetas().get(i).getName(), resultDataSet.getObject(i));
				}
				
				postData(jobDataMap, jsonObject.toString());
				getCnt++;
				
				if(getCnt % 100 == 0){
					jobHistory.setGetCnt(getCnt);
					dao.save(jobHistory);
				}
				
			} catch (JSONException je) {
				jobHistory.setEndTime(new Timestamp(System.currentTimeMillis()));
				jobHistory.setError(CommonTools.convertExceptionToString(je, 2048));
				jobHistory.setGetCnt(getCnt);
				dao.save(jobHistory);
				return;
			}
		}

		jobHistory.setEndTime(new Timestamp(System.currentTimeMillis()));
		jobHistory.setGetCnt(getCnt);
		dao.save(jobHistory);
		
		return;
	}


	public void postData(JobDataMap jobDataMap, String jasonData) {
		
		ActionJobThread targetThread = ActionJobManager.getInstance()
				.getRunningActiongJob(((ScheduleJob)jobDataMap.get(ScheduleJobExecutor.SCHEDULE_JOB)).getOutputChannelName());
		
		try {
			if( targetThread != null ) {
				ActionJobManager.getInstance().addData(((ScheduleJob)jobDataMap.get(ScheduleJobExecutor.SCHEDULE_JOB)).getOutputChannelName(), jasonData);
			} else {
				Method gateWay = messageGateway.getClass().getMethod(((ScheduleJob)jobDataMap.get(ScheduleJobExecutor.SCHEDULE_JOB)).getOutputChannelName(), String.class);
				gateWay.invoke(messageGateway, jasonData);
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
}

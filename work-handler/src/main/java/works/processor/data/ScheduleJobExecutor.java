package works.processor.data;

import java.lang.reflect.Method;

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

@Controller
public abstract class ScheduleJobExecutor implements Job {

	public static final String SCHEDULE_JOB = "scheduleJob";
	
	public static final String SCHEDULE_RESOURCE = "resource";
	
	public static final String SCHEDULE_DATASOURCE = "dataSource";
	
    @Autowired
    private MessageGateway messageGateway;

    abstract DataSet getDataSet(JobDataMap jobDataMap);

    abstract void prepareJobExecution(JobDataMap jobDataMap);
    
    abstract void endJobExecution(JobDataMap jobDataMap);
    
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();

		try {
			prepareJobExecution(jobDataMap);
		} catch (RuntimeException re) {
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
			} catch (JSONException je) {
				
			}
		}
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

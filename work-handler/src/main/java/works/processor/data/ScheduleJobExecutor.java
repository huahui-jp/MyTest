package works.processor.data;

import java.lang.reflect.Method;

import org.apache.activemq.artemis.utils.json.JSONException;
import org.apache.activemq.artemis.utils.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import works.processor.data.sourcesink.MessageGateway;

@Controller
public abstract class ScheduleJobExecutor implements Job {

    @Autowired
    private MessageGateway messageGateway;

    abstract DataSet getDataSet(JobScheduler jobScheduler);

    abstract void prepareJobExecution(JobScheduler jobScheduler);
    
    abstract void endJobExecution(JobScheduler jobScheduler);
    
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		JobScheduler jobScheduler = (JobScheduler) context.getScheduler();

		try {
			prepareJobExecution(jobScheduler);
		} catch (RuntimeException re) {
			// TODO ::
			return;
		}
		
		DataSet resultDataSet = getDataSet(jobScheduler);
		
		while( resultDataSet.next() ) {

			JSONObject jsonObject = new JSONObject();

			try {
				for( int i = 0; i < resultDataSet.getDataMetas().size(); i++ )
				{
					jsonObject.append(resultDataSet.getDataMetas().get(i).getName(), resultDataSet.getObject(i));
				}
				
				postData(jobScheduler, jsonObject.toString());
			} catch (JSONException je) {
				
			}
		}
	}


	public void postData(JobScheduler jobScheduler, String jasonData) {
		
		ActionJobThread targetThread = ActionJobManager.getInstance()
				.getRunningActiongJob(jobScheduler.getScheduleJob().getOutputChannelName());
		
		try {
			if( targetThread != null ) {
				ActionJobManager.getInstance().addData(jobScheduler.getScheduleJob().getOutputChannelName(), jasonData);
			} else {
				Method gateWay = messageGateway.getClass().getMethod(jobScheduler.getScheduleJob().getOutputChannelName(), String.class);
				gateWay.invoke(messageGateway, jasonData);
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
}

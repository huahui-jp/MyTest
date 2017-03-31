package works.processor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Service;

import works.processor.data.ActionJobManager;
import works.processor.data.sourcesink.WorkUnitsSink;

@Service
@EnableConfigurationProperties({MyConfig.class})
public class WorkHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(WorkHandler.class);
    
    @Autowired
    private MyConfig myConfig;
    
    @StreamListener(WorkUnitsSink.CHANNEL_NAME_01)
    public void process(String jasonData) {
    	
    	dataRecive(WorkUnitsSink.CHANNEL_NAME_01, jasonData);
        /*
    	LOGGER.info("Handling work unit - id: {}, definition: {}", workUnit.getId(), workUnit.getDefinition());
        LOGGER.info("MyConfig:" + myConfig.getAbc() + "," + myConfig.getDef());
        LOGGER.info("==============================================");*/
    }

    @StreamListener(WorkUnitsSink.CHANNEL_NAME_02)
    public void processChannel01(String jasonData) {
    	LOGGER.info("jasonData {}", jasonData);
    }

    private void dataRecive(String channelName, String jasonData) {
    	
    	if( jasonData.equals("suspend"))
    	{
    		Thread.currentThread().suspend();
    		Thread.currentThread().getId();
    	}
    	
    	ActionJobManager.getInstance().addData(channelName, jasonData);
    	
    	boolean wait = true;
    	while (wait) {
    		try {
    			Thread.sleep(1000 * 100);
    		} catch (InterruptedException ie) {
    			ie.printStackTrace();
    		}
    	}
    }
}

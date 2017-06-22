package works.processor.data;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.domain.Resource;
import works.processor.utils.CommonTools;
import works.processor.web.domain.WebOneResult;


@RestController
@Configuration
public class ActionJobControl {

	// ****************** Test Data ***********************************
	@RequestMapping("/TestUpdateData")
	public int testInsert(@RequestParam("ActionJobId") int actionJobId, @RequestParam("Data") String data)	{
		return ActionJobManager.getInstance().addData(actionJobId, data);
	}
	
	// ****************** End Test Data ***********************************
	
	@RequestMapping("/DBJobStart")
	public WebOneResult startJob(@RequestParam("ActionJobId") int actionJobId)	{
		ActionJobManager.getInstance().startJob(actionJobId, Resource.RESOURCE_TYPE_DB);
		
		return CommonTools.convertWebResult(new Boolean(true), true, null);
	}

	@RequestMapping("/DBJobEnd")
	public WebOneResult stopJob(@RequestParam("ActionJobId") int actionJobId) {
		ActionJobManager.getInstance().stopJob(actionJobId);
		
		return CommonTools.convertWebResult(new Boolean(true), true, null);
	}
	
	@RequestMapping("/ActionJobStatus")
	public WebOneResult getActionJobStatus(@RequestParam("ActionJobId") int actionJobId) {
		
		return CommonTools.convertWebResult(new Boolean(ActionJobManager.getInstance().isRunning(actionJobId)), true, null);
	}
	
}

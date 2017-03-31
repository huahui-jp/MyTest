package works.processor.data;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.domain.Resource;


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
	public int startJob(@RequestParam("ActionJobId") int actionJobId)	{
		return ActionJobManager.getInstance().startJob(actionJobId, Resource.RESOURCE_TYPE_DB);
	}

	@RequestMapping("/DBJobEnd")
	public int stopJob(@RequestParam("ActionJobId") int actionJobId) {
		return ActionJobManager.getInstance().stopJob(actionJobId);
	}
	
	@RequestMapping("/ActionJobStatus")
	public int getActionJobStatus(@RequestParam("ActionJobId") int actionJobId) {
		return ActionJobManager.getInstance().stopJob(actionJobId);
	}
	
}

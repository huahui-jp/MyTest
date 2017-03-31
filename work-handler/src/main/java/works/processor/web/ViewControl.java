package works.processor.web;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.data.ActionJobHistoryDAO;
import works.processor.domain.ActionJob;
import works.processor.domain.ActionJobHistory;
import works.processor.domain.ColumnMapping;
import works.processor.domain.Resource;
import works.processor.domain.TableMapping;
import works.processor.utils.DaoTools;
import works.processor.web.domain.ResourceView;
import works.processor.web.domain.TableMappingView;

@RestController
@Configuration
public class ViewControl {

	@Autowired
	private DAOStore storeDao;

	@RequestMapping("/resource")
	public Resource getResource(@RequestParam("ResourceId") int resourceId)
	{
		return storeDao.getResourceDAO().findOne(resourceId);
	}

	
	@RequestMapping("/resourceList")
	public Iterable<Resource> getResourceList(@RequestParam("ResourceFlg") String resourceFlg, @RequestParam("WithNoValid") String validFlg)
	{
		Iterable<Resource> result;
		ArrayList<Resource> resultView = new ArrayList<Resource>();

		result = storeDao.getResourceDAO().findByResourceFlgAndDeleteFlg(resourceFlg, validFlg);
		
		for(Resource resource:result )
		{
			ResourceView newResource = new ResourceView();
			BeanUtils.copyProperties(resource, newResource);
			if( storeDao.getTableMappingDAO().countByResourceId(newResource.getResourceId()) > 0)
			{
				newResource.setHasChild(true);
			}
			resultView.add(newResource);
		}
		
		return resultView;
	}

	
	@RequestMapping("/tableMapping")
	public TableMappingView getTableMapping(@RequestParam("TableMappingId") int tableMappingId)
	{
		TableMapping mapping = storeDao.getTableMappingDAO().findOne(tableMappingId);
		TableMappingView view = new TableMappingView();
		BeanUtils.copyProperties(mapping, view);
		//TODO : 华  : 未实际装
		view.setHasRunJob(false);
		return view;
	}

	
	@RequestMapping("/tableMappingList")
	public Iterable<TableMappingView> getTableMappingList(@RequestParam("WithNoValid") int validFlg)
	{
		Iterable<TableMapping> result;
		List<TableMappingView> resultView = new ArrayList<TableMappingView>();;

		if( validFlg == 0)
		{
			result = storeDao.getTableMappingDAO().findByDeleteFlg("0");
		}
		else
		{
			result = storeDao.getTableMappingDAO().findAll();
		}
		
		result.forEach(new Consumer<TableMapping>() {
			@Override
			public void accept(TableMapping t) {
				TableMappingView mappingView = new TableMappingView();
				//TODO : 华 ：实行中的Job是否存在
				BeanUtils.copyProperties(t, mappingView);
				mappingView.setHasRunJob(false);
				resultView.add(mappingView);
	        }
		});
		
		return resultView;
	}

	@RequestMapping("/columnMapping")
	public ColumnMapping getColumnMapping(@RequestParam("ColumnMappingId") int columnMappingId)
	{
		return storeDao.getColumnMappingDAO().findOne(columnMappingId);
	}

	
	@RequestMapping("/columnMappingList")
	public List<ColumnMapping> getColumnMappingList(@RequestParam("TableMappingId") int tableMapping)
	{
		return storeDao.getColumnMappingDAO().findByTableMappingId(tableMapping);
	}
	
	@RequestMapping("/actionJob")
	public ActionJob getActionJob(@RequestParam("ActionJobId") int actionJobId)
	{
		return storeDao.getActionJobDAO().findOne(actionJobId);
	}

	@RequestMapping("/actionJobList")
	public Iterable<ActionJob> getActionJobList(@RequestParam("WithNoValid") int validFlg)
	{
		if( validFlg == 0)
		{
			return storeDao.getActionJobDAO().findByDeleteFlg("0");
		}
		else
		{
			return storeDao.getActionJobDAO().findAll();
		}		
	}
	
	@RequestMapping("/testDao")
	public int testDao() {
		ActionJobHistoryDAO dao = (ActionJobHistoryDAO)DaoTools.getDAO(ActionJobHistoryDAO.class);
		
		ActionJobHistory history = new ActionJobHistory();
		history.setActionJobId(1);
		history.setStartTime(new Timestamp(0));
		dao.save(history);
		return 1;
	}
}

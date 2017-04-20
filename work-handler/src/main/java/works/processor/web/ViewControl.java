package works.processor.web;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.data.ActionJobManager;
import works.processor.domain.ActionJob;
import works.processor.domain.ActionJobHistory;
import works.processor.domain.ColumnMapping;
import works.processor.domain.Resource;
import works.processor.domain.TableMapping;
import works.processor.repository.RespositoryStore;
import works.processor.utils.CommonTools;
import works.processor.repository.IActionJobHistory;
import works.processor.repository.RepositoryTools;
import works.processor.web.domain.ResourceView;
import works.processor.web.domain.TableMappingView;
import works.processor.web.domain.WebResult;

@RestController
@Configuration
public class ViewControl {

	@Autowired
	private RespositoryStore storeDao;

	@RequestMapping("/resource")
	public Resource getResource(@RequestParam("ResourceId") int resourceId)
	{
		return storeDao.getResourceDAO().findOne(resourceId);
	}

	
	@RequestMapping("/resourceList")
	public WebResult getResourceList(
			@RequestParam(value="ResourceFlg", required=true) String resourceFlg, 
			@RequestParam(value="WithNoValid", required=true) String validFlg,
			@RequestParam(value="ResourceName", required=false) String name,
			@RequestParam(value="ResourceType", required=false) String type)
	{
		Iterable<Resource> result;
		ArrayList<Resource> resultView = new ArrayList<Resource>();
		
		Specification<Resource> querySpecifi = new Specification<Resource>() {
			 @Override
	         public Predicate toPredicate(Root<Resource> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
				 List<Predicate> predicates = new ArrayList<>();
				 predicates.add(criteriaBuilder.equal(root.get("resourceFlg"), resourceFlg));
				 predicates.add(criteriaBuilder.equal(root.get("deleteFlg"), validFlg));
				 if(name != null) {
					 predicates.add(criteriaBuilder.like(root.get("resourceName"), "%" + "测试" + "%"));
				 }
				 
				 if(type != null) {
					 predicates.add(criteriaBuilder.equal(root.get("resourceType"), type));
				 }
				 
				 return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			 }
		};

		result = storeDao.getResourceDAO().findAll(querySpecifi);
		
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
		
		return CommonTools.convertWebListResult(resultView);
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

	@RequestMapping("/actionJobHistory")
	public List<ActionJobHistory> getActionJobHistory(@RequestParam("ActionJobId") int actionJobId)
	{
		return storeDao.getActionJobHistoryDAO().findByActionJobId(actionJobId);
	}
	
	@RequestMapping("/actionJobList")
	public Iterable<ActionJob> getActionJobList(@RequestParam("WithNoValid") int validFlg)
	{
		List<ActionJob> result = new ArrayList<ActionJob>();
		if( validFlg == 0)
		{
			result = storeDao.getActionJobDAO().findByDeleteFlg("0");
		}
		else
		{
			result = storeDao.getActionJobDAO().findAll();
		}
		result.forEach(new Consumer<ActionJob>() {
			@Override
			public void accept(ActionJob job) {
				job.setRunStatus(ActionJobManager.getInstance().isRunning(job.getActionJobId()));
	        }
		});
		
		return result;
	}

	
	@RequestMapping("/testDao")
	public int testDao() {
		IActionJobHistory dao = (IActionJobHistory)RepositoryTools.getDAO(IActionJobHistory.class);
		
		ActionJobHistory history = new ActionJobHistory();
		history.setActionJobId(1);
		history.setStartTime(new Timestamp(0));
		dao.save(history);
		return 1;
	}
}

package works.processor.web;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.ejb.HibernateEntityManager;
import org.hibernate.jpa.HibernateEntityManagerFactory;
import org.hibernate.jpa.boot.spi.EntityManagerFactoryBuilder;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.data.ActionJobManager;
import works.processor.domain.ActionJob;
import works.processor.domain.ActionJobHistory;
import works.processor.domain.ColumnMapping;
import works.processor.domain.DataSource;
import works.processor.domain.Resource;
import works.processor.domain.ScheduleJob;
import works.processor.domain.ScheduleJobHistory;
import works.processor.domain.TableMapping;
import works.processor.repository.RespositoryStore;
import works.processor.utils.CommonTools;
import works.processor.repository.IActionJobHistory;
import works.processor.repository.RepositoryTools;
import works.processor.web.domain.JobHistroyListSearchPageCondition;
import works.processor.web.domain.JobInfo;
import works.processor.web.domain.QueryInfo;
import works.processor.web.domain.QueryListSearchPageCondition;
import works.processor.web.domain.ResourceListSearchPageCondition;
import works.processor.web.domain.ScheduleJobView;
import works.processor.web.domain.TableMappingView;
import works.processor.web.domain.WebOneResult;
import works.processor.web.domain.WebResult;

@RestController
@Configuration
public class ViewControl {

	@Autowired
	@PersistenceContext
	private EntityManager em;

	@Autowired
	private RespositoryStore storeDao;

	@RequestMapping("/resource")
	public WebOneResult getResource(@RequestParam("ResourceId") int resourceId)
	{
		Resource resource = storeDao.getResourceDAO().findOne(resourceId);
		
		WebOneResult result = new WebOneResult();
		result.setErrCode(null);
		result.setMessage(null);
		result.setSuccess(true);
		result.setResult(resource);
		return result;
	}

	private WebResult getResourceList(ResourceListSearchPageCondition searchCondition, boolean isTarget) {
		Iterable<Resource> result;
		ArrayList<Resource> resultView = new ArrayList<Resource>();
		
		Specification<Resource> querySpecifi = new Specification<Resource>() {
			 @Override
	         public Predicate toPredicate(Root<Resource> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
				 List<Predicate> predicates = new ArrayList<Predicate>();

				 if( isTarget ) {
					 predicates.add(criteriaBuilder.equal(root.get("resourceFlg"), "1"));
				 } else {
					 predicates.add(criteriaBuilder.equal(root.get("resourceFlg"), "0"));
				 }
				 predicates.add(criteriaBuilder.equal(root.get("deleteFlg"), "0"));
				 
				 if( searchCondition.getQueryData().getResourceType() != null ) {
					 predicates.add(criteriaBuilder.equal(root.get("resourceType"), searchCondition.getQueryData().getResourceType()));
				 }

				 if(searchCondition.getQueryData().getResourceName() != null) {
					 predicates.add(criteriaBuilder.like(root.get("resourceName"), "%" + searchCondition.getQueryData().getResourceName() +"%"));
				 }
				 
				 return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			 }
		};

		result = storeDao.getResourceDAO().findAll(querySpecifi);
		
		for(Resource resource:result )
		{
			resultView.add(resource);
		}
		
		return CommonTools.convertWebListResult(resultView);
	}
	
	@RequestMapping("/resourceList")
	public WebResult getResourceList(@RequestBody ResourceListSearchPageCondition searchCondition)
	{
		return getResourceList(searchCondition, false);
	}
	
	@RequestMapping("/targetResourceList")
	public WebResult getResourceListTarget(@RequestBody ResourceListSearchPageCondition searchCondition)
	{
		return getResourceList(searchCondition, true);
	}

	@RequestMapping("/dataSource")
	public WebOneResult getQuery(@RequestParam("DataSourceId") int dataSourceId)
	{
		DataSource dataSource = storeDao.getDataSourceDAO().findOne(dataSourceId);
		
		WebOneResult result = new WebOneResult();

		if( dataSource == null )
		{
			result.setErrCode(null);
			result.setMessage("No Record..");
			result.setSuccess(false);
			return result;
		}
		
		Resource resource = storeDao.getResourceDAO().findOne(dataSource.getResourceId());
		
		
		result.setErrCode(null);
		result.setMessage(null);
		result.setSuccess(true);
		
		QueryInfo queryInfo = new QueryInfo();
		
		BeanUtils.copyProperties(dataSource, queryInfo);
		queryInfo.setResourceName(resource.getResourceName());
		
		result.setResult(queryInfo);
		return result;
	}	
	
	@RequestMapping("/queryList")
	public WebResult getQueryList(@RequestBody QueryListSearchPageCondition searchCondition)
	{
		String sql = "SELECT A.resource_name, B.resource_id, B.data_source_id, B.delete_flg, B.source_sql, B.data_source_name from " +
                "RESOURCE A, DATA_SOURCE B " +
                "WHERE A.resource_id = B.resource_id ";
		
		sql = sql + " AND A.resource_name like ? ";
		sql = sql + " AND B.data_source_name like ? ";

		
		Query query = em.createNativeQuery(sql, QueryInfo.class);
		
		if( searchCondition.getQueryData().getResourceName() != null && !"".equals(searchCondition.getQueryData().getResourceName())) {
			query.setParameter(1, "%" + searchCondition.getQueryData().getResourceName() + "%");
		} else {
			query.setParameter(1, "%");
		}

		if( searchCondition.getQueryData().getQueryName() != null && !"".equals(searchCondition.getQueryData().getQueryName())) {
			query.setParameter(2, "%" + searchCondition.getQueryData().getQueryName() + "%");
		} else {
			query.setParameter(2, "%");
		}
		
		List<QueryInfo> rows = query.getResultList();
		
		return CommonTools.convertWebListResult(rows);
	}
	
	@RequestMapping("/jobList")
	public WebResult jobQueryList(@RequestBody QueryListSearchPageCondition searchCondition) {
		
		String sql = "SELECT A.resource_name, B.resource_id, B.data_source_id, B.data_source_name, C.job_id, C.job_name, 0 as output_cnt from " +
                "RESOURCE A, DATA_SOURCE B, SCHEDULE_JOB_INFO C " +
                "WHERE A.resource_id = B.resource_id " +
                "AND B.data_source_id = C.data_source_id"
                ;
		
		sql = sql + " AND A.resource_name like ? ";
		sql = sql + " AND B.data_source_name like ? ";

		
		Query query = em.createNativeQuery(sql, JobInfo.class);
		
		if( searchCondition.getQueryData().getResourceName() != null && !"".equals(searchCondition.getQueryData().getResourceName())) {
			query.setParameter(1, "%" + searchCondition.getQueryData().getResourceName() + "%");
		} else {
			query.setParameter(1, "%");
		}

		if( searchCondition.getQueryData().getQueryName() != null && !"".equals(searchCondition.getQueryData().getQueryName())) {
			query.setParameter(2, "%" + searchCondition.getQueryData().getQueryName() + "%");
		} else {
			query.setParameter(2, "%");
		}
		
		List<QueryInfo> rows = query.getResultList();
		
		return CommonTools.convertWebListResult(rows);
	}

	@RequestMapping("/jobHistoryList")
	public WebResult getJobHistoryList(@RequestBody JobHistroyListSearchPageCondition searchCondition) {
		
		List<ScheduleJobHistory> result = storeDao.getScheduleJobHistoryDAO().findByJobIdOrderByStartTimeDesc(searchCondition.getQueryData().getJobId());
		
		return CommonTools.convertWebListResult(result);		
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

	@RequestMapping(value="/scheduleJob")
	public WebOneResult getScheduleJob(@RequestParam("jobId") int jobId)
	{
		ScheduleJobView sjv = new ScheduleJobView();
		
		ScheduleJob jobInfo = storeDao.getScheduleJobDAO().findOne(jobId);
		DataSource dataSource = storeDao.getDataSourceDAO().findOne(jobInfo.getDataSourceId());
		Resource resource = storeDao.getResourceDAO().findOne(dataSource.getResourceId());
		
		BeanUtils.copyProperties(jobInfo, sjv);
		sjv.setResourceName(resource.getResourceName());
		sjv.setQueryName(dataSource.getDataSourceName());
		
		WebOneResult result = new WebOneResult();
		result.setErrCode(null);
		result.setMessage(null);
		result.setSuccess(true);
		result.setResult(sjv);
		return result;
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

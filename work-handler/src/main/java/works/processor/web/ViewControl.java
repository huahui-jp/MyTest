package works.processor.web;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.data.ActionJobManager;
import works.processor.dbutil.ConnectionUtil;
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
import works.processor.web.domain.ActionJobDbErrorHistoryView;
import works.processor.web.domain.ActionJobDbErrorHistoryListPageContition;
import works.processor.web.domain.ActionJobHistoryListPageContition;
import works.processor.web.domain.ActionJobHistoryView;
import works.processor.web.domain.ColumnInfo;
import works.processor.web.domain.JobHistroyListSearchPageCondition;
import works.processor.web.domain.JobInfo;
import works.processor.web.domain.QueryInfo;
import works.processor.web.domain.QueryListSearchPageCondition;
import works.processor.web.domain.ResourceListSearchPageCondition;
import works.processor.web.domain.ScheduleJobView;
import works.processor.web.domain.TableMappingListSearchPageCondition;
import works.processor.web.domain.TableMappingListView;
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
		
		return CommonTools.convertWebResult(resource, true, null);
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
		
		if( dataSource == null )
		{
			return CommonTools.convertWebResult(null, false, "No Record...");
		}
		
		Resource resource = storeDao.getResourceDAO().findOne(dataSource.getResourceId());
		
		
		QueryInfo queryInfo = new QueryInfo();
		
		BeanUtils.copyProperties(dataSource, queryInfo);
		queryInfo.setResourceName(resource.getResourceName());
		
		return CommonTools.convertWebResult(queryInfo, true, null);
	}	
	
	@RequestMapping("/queryList")
	public WebResult getQueryList(@RequestBody QueryListSearchPageCondition searchCondition)
	{
		String sql = "SELECT A.resource_name as resourceName, B.resource_id as resourceId, B.data_source_id as dataSourceId, B.delete_flg as deleteFlg, B.source_sql as sourceSql, B.data_source_name as dataSourceName  from " +
                "RESOURCE A, DATA_SOURCE B " +
                "WHERE A.resource_id = B.resource_id ";
		
		sql = sql + " AND A.resource_name like ? ";
		sql = sql + " AND B.data_source_name like ? ";

		
		Query query = em.createNativeQuery(sql);
		
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
		
		query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean( QueryInfo.class));
		
		List<QueryInfo> rows = query.getResultList();
		
		return CommonTools.convertWebListResult(rows);
	}
	
	@RequestMapping("/jobList")
	public WebResult jobQueryList(@RequestBody QueryListSearchPageCondition searchCondition) {
		
		String sql = "SELECT A.resource_name as resourceName, B.resource_id as resourceId, B.data_source_id as dataSourceId, B.data_source_name as dataSourceName, C.job_id as jobId, C.job_name as jobName from " +
                "RESOURCE A, DATA_SOURCE B, SCHEDULE_JOB_INFO C " +
                "WHERE A.resource_id = B.resource_id " +
                "AND B.data_source_id = C.data_source_id"
                ;
		
		sql = sql + " AND A.resource_name like ? ";
		sql = sql + " AND B.data_source_name like ? ";

		Query query = em.createNativeQuery(sql);
		
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

		query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean( JobInfo.class));
		
		List<JobInfo> rows = query.getResultList();
		
		return CommonTools.convertWebListResult(rows);
	}

	
	@RequestMapping("/tableMappingList")
	public WebResult getTableMappingList(@RequestBody TableMappingListSearchPageCondition searchCondition)
	{
		String sql = "SELECT A.resource_name as resourceName, A.resource_id as resourceId, B.table_mapping_id as tableMappingId, B.table_name as tableName, B.table_name_view as tableNameView, B.delete_flg as deleteFlg from " +
                "RESOURCE A, TABLE_MAPPING B " +
                "WHERE A.resource_id = B.resource_id " +
                "AND A.resource_name like ? " + 
                "AND (B.table_name like ? " +
                "OR B.table_name_view like ?)";
                ;
		
		Query query = em.createNativeQuery(sql);
		
		if( searchCondition.getQueryData().getResourceName() != null && !"".equals(searchCondition.getQueryData().getResourceName())) {
			query.setParameter(1, "%" + searchCondition.getQueryData().getResourceName() + "%");
		} else {
			query.setParameter(1, "%");
		}

		if( searchCondition.getQueryData().getTableName() != null && !"".equals(searchCondition.getQueryData().getTableName())) {
			query.setParameter(2, "%" + searchCondition.getQueryData().getTableName() + "%");
			query.setParameter(3, "%" + searchCondition.getQueryData().getTableName() + "%");
		} else {
			query.setParameter(2, "%");
			query.setParameter(3, "%");
		}
		
		query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean( TableMappingListView.class));
		
		List<TableMappingListView> rows = query.getResultList();
		
		return CommonTools.convertWebListResult(rows);
	}

	@RequestMapping("/actionJobHistoryList")
	public WebResult getJobHistoryView(@RequestBody ActionJobHistoryListPageContition searchCondition) {
		String sql = "SELECT A.resource_name as resourceName, B.table_name_view as tableNameView, C.action_job_name as actionJobName, C.action_job_id as actionJobId, D.update_cnt as updateCnt, D.error_cnt as errorCnt from " +
                "RESOURCE A, TABLE_MAPPING B, ACTION_JOB C, ACTION_JOB_HISTORY D " +
                "WHERE A.resource_id = B.resource_id " +
                "AND B.table_mapping_id = C.table_mapping_id " +
                "AND C.action_job_id = D.action_job_id " +
                "AND A.resource_name like ? " +
                "AND (B.table_name like ? OR B.table_name_view like ? ) " +
                "AND C.action_job_name like ? " +  
                "GROUP BY A.resource_name, B.table_mapping_id, B.table_name_view, C.action_job_id, C.action_job_name ";
                
		Query query = em.createNativeQuery(sql);
		
		if( searchCondition.getQueryData().getResourceName() != null && !"".equals(searchCondition.getQueryData().getResourceName())) {
			query.setParameter(1, "%" + searchCondition.getQueryData().getResourceName() + "%");
		} else {
			query.setParameter(1, "%");
		}

		if( searchCondition.getQueryData().getTableName() != null && !"".equals(searchCondition.getQueryData().getTableName())) {
			query.setParameter(2, "%" + searchCondition.getQueryData().getTableName() + "%");
			query.setParameter(3, "%" + searchCondition.getQueryData().getTableName() + "%");
		} else {
			query.setParameter(2, "%");
			query.setParameter(3, "%");
		}
		
		if( searchCondition.getQueryData().getJobName() != null && !"".equals(searchCondition.getQueryData().getJobName())) {
			query.setParameter(4, "%" + searchCondition.getQueryData().getJobName() + "%");
		} else {
			query.setParameter(4, "%");
		}
		
		query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean( ActionJobHistoryView.class));
		
		List<ActionJobHistoryView> rows = query.getResultList();
		
		return CommonTools.convertWebListResult(rows);		
	}

	@RequestMapping("/actionJobDbErrorHistoryList")
	public WebResult getActionJobDbErrorHistoryList(@RequestBody ActionJobDbErrorHistoryListPageContition searchCondition) {
		String sql = "SELECT A.resource_name as resourceName, B.table_name_view as tableNameView, C.action_job_name as actionJobName, C.action_job_id as actionJobId, E.action_job_history_id as actionJobHistoryId, E.action_job_db_error_history_id as actionJobDbErrorHistoryId, E.key_column1 as keyColumn1, E.key_column2 as keyColumn2, E.key_column3 as keyColumn3, E.key_column4 as keyColumn4, E.key_column5 as keyColumn5, E.key_column6 as keyColumn6, E.data, E.error_time as errorTime " + 
				"FROM RESOURCE A, TABLE_MAPPING B, ACTION_JOB C, ACTION_JOB_HISTORY D, ACTION_JOB_DB_ERROR_HISTORY E " + 
                "WHERE A.resource_id = B.resource_id " + 
                "AND B.table_mapping_id = C.table_mapping_id " + 
                "AND C.action_job_id = D.action_job_id " + 
                "AND D.action_job_history_id = E.action_job_history_id " + 
                "AND A.resource_name like ? " +
                "AND (B.table_name like ? OR B.table_name_view like ? ) " +
                "AND C.action_job_name like ? " +
                "AND E.error_time >= ? " +
                "AND E.error_time <= ? ";
                
                
		Query query = em.createNativeQuery(sql);
		
		if( searchCondition.getQueryData().getResourceName() != null && !"".equals(searchCondition.getQueryData().getResourceName())) {
			query.setParameter(1, "%" + searchCondition.getQueryData().getResourceName() + "%");
		} else {
			query.setParameter(1, "%");
		}

		if( searchCondition.getQueryData().getTableName() != null && !"".equals(searchCondition.getQueryData().getTableName())) {
			query.setParameter(2, "%" + searchCondition.getQueryData().getTableName() + "%");
			query.setParameter(3, "%" + searchCondition.getQueryData().getTableName() + "%");
		} else {
			query.setParameter(2, "%");
			query.setParameter(3, "%");
		}
		
		if( searchCondition.getQueryData().getJobName() != null && !"".equals(searchCondition.getQueryData().getJobName())) {
			query.setParameter(4, "%" + searchCondition.getQueryData().getResourceName() + "%");
		} else {
			query.setParameter(4, "%");
		}
	
		if( searchCondition.getQueryData().getFromDate() != null) {
			query.setParameter(5, searchCondition.getQueryData().getResourceName());
		} else {
			query.setParameter(5, "str_to_date('1999-01-01 00:00:00', '%Y-%m-%d %T')");
		}
		
		if( searchCondition.getQueryData().getToDate() != null) {
			query.setParameter(6, searchCondition.getQueryData().getToDate());
		} else {
			query.setParameter(6, "str_to_date('2030-12-31 00:00:00', '%Y-%m-%d %T')");
		}
		
		query.unwrap(SQLQuery.class).setResultTransformer(Transformers.aliasToBean( ActionJobDbErrorHistoryView.class));
		
		List<ActionJobDbErrorHistoryView> rows = query.getResultList();
		
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

	@RequestMapping(value="/tableListView")
	public WebResult tableList(@RequestParam("ResourceId") int resourceId) throws Throwable {
		
		int number = 99999999;
		
		Resource resource = storeDao.getResourceDAO().findOne(resourceId);
		List<String> tableList = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getTableNameList(resource.getDbLink(), 
				resource.getDbUser(), resource.getDbPasswd());
		
		List<TableMappingView> resultList = new ArrayList<TableMappingView>();

		for( int i = 0; i < tableList.size(); i++ ) {
			
			TableMappingView oneResult = new TableMappingView();

			List<TableMapping> mappingList = storeDao.getTableMappingDAO().findByTableName(tableList.get(i));
			
			if( mappingList == null || mappingList.size() == 0 || mappingList.size() == 1) {
				if(mappingList == null || mappingList.size() == 0) {
					oneResult.setTableMappingId(null);
					oneResult.setDeleteFlg("0");
					oneResult.setResourceId(resourceId);
					oneResult.setTableName(tableList.get(i));
					oneResult.setTableNameView(null);
					oneResult.setChildren(null);
				} else {
					BeanUtils.copyProperties(mappingList.get(0), oneResult);
					oneResult.setChildren(null);
				}
			} else {

				BeanUtils.copyProperties(mappingList.get(0), oneResult);
				oneResult.setTableNameView(null);
				oneResult.setTableMappingId(number--);
				oneResult.setChildren(new ArrayList<TableMappingView>());
				
				for( int j = 0; j < mappingList.size(); j++ ) {
					
					TableMappingView childResult = new TableMappingView();
					BeanUtils.copyProperties(mappingList.get(j), childResult);
					childResult.setTableNameView(childResult.getTableNameView());
					childResult.setChildren(null);
					oneResult.getChildren().add(childResult);
				}
			}
			resultList.add(oneResult);
		}

		return CommonTools.convertWebListResult(resultList);
	}
		
	@RequestMapping("/columnListOnCreate")
	public WebResult getColumnListOnCreate(@RequestParam("ResourceId") int resourceId, @RequestParam("TableName") String tableName) throws Throwable {
		
		List<ColumnMapping> resultColumnList = new ArrayList<ColumnMapping>();
		
		Resource resource = storeDao.getResourceDAO().findOne(resourceId);

		List<ColumnInfo> columnList = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getColumnNameList(resource.getDbLink(), 
				resource.getDbUser(), resource.getDbPasswd(), tableName);
		
		for( int i = 0; i < columnList.size(); i++ ) {
			
			ColumnMapping colMapping = new ColumnMapping();
			colMapping.setTableMappingId(0);
			colMapping.setColumnMappingId(0);
			colMapping.setColumnName(columnList.get(i).getColumnName());
			colMapping.setJasonName(columnList.get(i).getColumnName());
			colMapping.setColumnNameView(columnList.get(i).getColumnName());
			colMapping.setColumnType(columnList.get(i).getDataType());
			colMapping.setDataFrom("1"); //json
			colMapping.setDeleteFlg("0");
			colMapping.setSeqName("");
			colMapping.setTxtValue("");
			resultColumnList.add(colMapping);
		}
		
		return CommonTools.convertWebListResult(resultColumnList);
	}

	@RequestMapping(value="/columnList")
	public WebResult getColumnList(@RequestParam("TableMappingId") int tableMappingId) throws Throwable
	{
		List<ColumnMapping> resultColumnList = storeDao.getColumnMappingDAO().findByTableMappingId(tableMappingId);

		return CommonTools.convertWebListResult(resultColumnList);
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
	public WebOneResult getActionJob(@RequestParam("ActionJobId") int actionJobId)
	{
		
		ActionJob jobInfo = storeDao.getActionJobDAO().findOne(actionJobId);

		return CommonTools.convertWebResult(jobInfo, true, null);
	}

	@RequestMapping("/actionJobHistory")
	public WebResult getActionJobHistory(@RequestParam("ActionJobId") int actionJobId)
	{
		List<ActionJobHistory> result = storeDao.getActionJobHistoryDAO().findByActionJobId(actionJobId);
		
		return CommonTools.convertWebListResult(result);
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
		
		return CommonTools.convertWebResult(sjv, true, null);
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

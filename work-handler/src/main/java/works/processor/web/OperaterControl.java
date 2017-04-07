package works.processor.web;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.domain.ActionJob;
import works.processor.domain.ColumnMapping;
import works.processor.domain.DataSource;
import works.processor.domain.Resource;
import works.processor.domain.ScheduleJob;
import works.processor.domain.TableMapping;
import works.processor.repository.RespositoryStore;
import works.processor.web.dbutil.ConnectionUtil;
import works.processor.web.domain.ColumnInfo;

@RestController
@Configuration
public class OperaterControl {

	@Autowired
	private RespositoryStore storeDao;

//======================test===============================//	
	@RequestMapping(value="/testResource")
	public int testResource()
	{
		Resource resource = new Resource();
		resource.setDbLink("jdbc:mysql://xxx.xxx.xxx.xxx:3306/test");
		resource.setDbPasswd("xxxxxxxx");
		resource.setDbUser("test");
		resource.setResourceName("测试DB");
		resource.setResourceType("0");
		resource.setDeleteFlg("0");
		resource.setResourceId(null);
		
		storeDao.getResourceDAO().save(resource);
		
		return resource.getResourceId();
	}

	
	@RequestMapping(value="/testResourceUpdate")
	public int testResource(@RequestParam("id") int id)
	{
		Resource update = storeDao.getResourceDAO().findOne(id);
		update.setDeleteFlg("1");
		storeDao.getResourceDAO().save(update);
		return 0;
	}
	
//====================end test=============================//
	
	@RequestMapping(value="/newResource", consumes="application/json")
	public int newResource(@RequestBody Resource resource)
	{
		resource.setResourceId(null);
		storeDao.getResourceDAO().save(resource);

		return resource.getResourceId();
	}

	
	@RequestMapping(value="/saveResource", consumes="application/json")
	public int saveResource(@RequestBody Resource resource)
	{
		storeDao.getResourceDAO().save(resource);
		return resource.getResourceId();
	}

	@RequestMapping(value="/deleteResource", consumes="application/json")
	@Transactional()
	public List<Integer> deleteResource(@RequestBody List<Integer> resourceIdList)
	{
		for(int i = 0; i < resourceIdList.size(); i++ )
		{
			Resource resource = storeDao.getResourceDAO().findOne(resourceIdList.get(i));
			List<TableMapping> tableMappings = storeDao.getTableMappingDAO().findByResourceId(resource.getResourceId());

			for(int j = 0; j < tableMappings.size(); j++) {
				storeDao.getActionJobDAO().deleteByTableMappingId(tableMappings.get(j).getTableMappingId());
				storeDao.getColumnMappingDAO().deleteByTableMappingId(tableMappings.get(j).getTableMappingId());
				storeDao.getTableMappingDAO().delete(tableMappings.get(j));
			}

			storeDao.getResourceDAO().delete(resourceIdList.get(i));
		}
		
		return resourceIdList;
	}
	
	@RequestMapping(value="/testConnect", consumes="application/json")
	public String testConnect(@RequestBody Resource resource) throws Throwable
	{
		return ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).testConnection(resource.getDbLink(),
				resource.getDbUser(), resource.getDbPasswd());
	}

	@RequestMapping(value="/testConnectById")
	public String testConnect(@RequestParam("ResourceId") int id) throws Throwable
	{
		Resource resource = storeDao.getResourceDAO().findOne(id);
		return testConnect(resource);
	}

	@RequestMapping(value="/tableList")
	public List<String> tableList(@RequestParam("ResourceId") int id) throws Throwable
	{
		Resource resource = storeDao.getResourceDAO().findOne(id);
		return ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getTableNameList(resource.getDbLink(), 
				resource.getDbUser(), resource.getDbPasswd());
	}
	
	@RequestMapping(value="/columnList")
	public List<ColumnInfo> columnList(@RequestParam("TableMappingId") int id) throws Throwable
	{
		TableMapping table = storeDao.getTableMappingDAO().findOne(id);
		Resource resource = storeDao.getResourceDAO().findOne(table.getResourceId());
		return ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getColumnNameList(resource.getDbLink(), 
				resource.getDbUser(), resource.getDbPasswd(), table.getTableName());
	}

	@RequestMapping(value="/columnListByName")
	public List<ColumnInfo> columnListByName(@RequestParam("ResourceId") int resourceId, @RequestParam("TableName") String name) throws Throwable
	{
		Resource resource = storeDao.getResourceDAO().findOne(resourceId);
		return ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getColumnNameList(resource.getDbLink(), 
				resource.getDbUser(), resource.getDbPasswd(), name);
	}

	@RequestMapping(value="/autoGenTableMapping")
	@Transactional()
	public int autoGenTableMapping(@RequestParam("ResourceId") int resourceId, @RequestParam("WithColumn") int withColumn) throws Throwable {
		
		Resource resource = storeDao.getResourceDAO().findOne(resourceId);
		List<String> tableList = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getTableNameList(resource.getDbLink(), 
				resource.getDbUser(), resource.getDbPasswd());
		
		for( int i = 0; i < tableList.size(); i++ ) {
			TableMapping tableMapping = new TableMapping();
			
			tableMapping.setDeleteFlg("0");
			tableMapping.setResourceId(resourceId);
			tableMapping.setTableName(tableList.get(i));
			tableMapping.setTableNameView(tableList.get(i));
			
			storeDao.getTableMappingDAO().save(tableMapping);
			
			if( withColumn == 1 ) {
				List<ColumnInfo> columnList= ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getColumnInfo(
						resource.getDbLink(),
						resource.getDbUser(),
						resource.getDbPasswd(),
						"select * from " + tableMapping.getTableName());
				
				
				for ( int j = 0; j < columnList.size(); j++ ) {
					
					ColumnMapping columnMapping = new ColumnMapping();
					columnMapping.setColumnName(columnList.get(j).getColumnName());
					columnMapping.setColumnNameView(columnList.get(j).getColumnName());
					columnMapping.setColumnType(columnList.get(j).getDataType());
					columnMapping.setDeleteFlg("0");
					columnMapping.setJasonName(columnList.get(j).getColumnName());
					columnMapping.setTableMappingId(tableMapping.getTableMappingId());
					storeDao.getColumnMappingDAO().save(columnMapping);
				}
					
			}
		}
		
		return 0;
	}
	
	@RequestMapping(value="/newTableMapping", consumes="application/json")
	public int newTableMapping(@RequestBody TableMapping tableMapping)
	{
		tableMapping.setTableMappingId(null);
		storeDao.getTableMappingDAO().save(tableMapping);
		return tableMapping.getTableMappingId();
	}

	
	@RequestMapping(value="/saveTableMapping", consumes="application/json")
	public int saveTableMapping(@RequestBody TableMapping tableMapping)
	{
		storeDao.getTableMappingDAO().save(tableMapping);
		return tableMapping.getTableMappingId();
	}

	
	@RequestMapping(value="/newColumnMapping", consumes="application/json")
	public int newColumnMapping(@RequestBody ColumnMapping columnMapping)
	{
		columnMapping.setColumnMappingId(null);
		storeDao.getColumnMappingDAO().save(columnMapping);
		return columnMapping.getColumnMappingId();
	}
	
	@RequestMapping(value="/saveColumnMapping", consumes="application/json")
	public int saveColumnMapping(@RequestBody ColumnMapping columnMapping)
	{
		storeDao.getColumnMappingDAO().save(columnMapping);
		return columnMapping.getColumnMappingId();
	}

	@RequestMapping(value="/newActionJob", consumes="application/json")
	public int newActionJob(@RequestBody ActionJob actionJob)
	{
		actionJob.setActionJobId(null);
		storeDao.getActionJobDAO().save(actionJob);
		return actionJob.getActionJobId();
	}
	
	@RequestMapping(value="/saveActionJob", consumes="application/json")
	public int saveActionJob(@RequestBody ActionJob actionJob)
	{
		storeDao.getActionJobDAO().save(actionJob);
		return actionJob.getActionJobId();
	}

	@RequestMapping(value="/newDataSource", consumes="application/json")
	public int newDataSource(@RequestBody DataSource dataSource)
	{
		dataSource.setDataSourceId(null);
		storeDao.getDataSourceDAO().save(dataSource);
		return dataSource.getDataSourceId();
	}
	
	@RequestMapping(value="/saveDataSource", consumes="application/json")
	public int saveDataSource(@RequestBody DataSource dataSource)
	{
		storeDao.getDataSourceDAO().save(dataSource);
		return dataSource.getDataSourceId();
	}
	
	@RequestMapping(value="/newScheduleJob", consumes="application/json")
	public int newScheduleJob(@RequestBody ScheduleJob scheduleJob)
	{
		scheduleJob.setJobId(null);
		storeDao.getScheduleJobDAO().save(scheduleJob);
		return scheduleJob.getJobId();
	}
	
	@RequestMapping(value="/saveScheduleJob", consumes="application/json")
	public int saveScheduleJob(@RequestBody ScheduleJob scheduleJob)
	{
		storeDao.getScheduleJobDAO().save(scheduleJob);
		return scheduleJob.getJobId();
	}
}

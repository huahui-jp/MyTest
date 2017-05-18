package works.processor.web;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.activemq.artemis.utils.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import works.processor.dbutil.ConnectionUtil;
import works.processor.dbutil.QueryResult;
import works.processor.domain.ActionJob;
import works.processor.domain.ColumnMapping;
import works.processor.domain.DataSource;
import works.processor.domain.Resource;
import works.processor.domain.ScheduleJob;
import works.processor.domain.TableMapping;
import works.processor.repository.RespositoryStore;
import works.processor.utils.CommonTools;
import works.processor.web.domain.ColumnInfo;
import works.processor.web.domain.ConnectResult;
import works.processor.web.domain.WebOneResult;

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
	public WebOneResult newResource(@RequestBody Resource resource)
	{
		resource.setDeleteFlg("0");
		resource.setResourceId(null);
		storeDao.getResourceDAO().save(resource);

		WebOneResult result = new WebOneResult();
		result.setErrCode(null);
		result.setMessage(null);
		result.setSuccess(true);
		result.setResult(resource);
		return result;
	}

	
	@RequestMapping(value="/saveResource", consumes="application/json")
	public WebOneResult saveResource(@RequestBody Resource resource)
	{
		resource.setDeleteFlg("0");
		storeDao.getResourceDAO().save(resource);
		
		WebOneResult result = new WebOneResult();
		result.setErrCode(null);
		result.setMessage(null);
		result.setSuccess(true);
		result.setResult(resource);
		return result;
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
	
	@RequestMapping(value="/newDataSource", consumes="application/json")
	public WebOneResult newDataSource(@RequestBody DataSource datasource)
	{
		datasource.setDeleteFlg("0");
		datasource.setDeleteFlg("0");
		datasource.setDataSourceId(null);
		storeDao.getDataSourceDAO().save(datasource);

		WebOneResult result = new WebOneResult();
		result.setErrCode(null);
		result.setMessage(null);
		result.setSuccess(true);
		result.setResult(datasource);
		return result;
	}	
	
	@RequestMapping(value="/executeQuery", consumes="application/json")
	public String executeQuery(@RequestBody DataSource datasource) throws Throwable
	{
		
		Resource resource = storeDao.getResourceDAO().getOne(datasource.getResourceId());
		
		try {
			JSONObject jsonObject = new JSONObject();

			QueryResult result = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).executeQuery(resource.getDbLink(),
					resource.getDbUser(), resource.getDbPasswd(), datasource.getSourceSql());
			
			
			jsonObject.put("success", true);
			jsonObject.put("message", "");
			jsonObject.put("errorCode", "");
			jsonObject.put("cols", result.getCols());
			
			List<JSONObject> rows = new ArrayList<JSONObject>();

			if(result.getRows() != null)
			{
				
				for( int i = 0; i < result.getRows().size(); i++)
				{
					JSONObject obj = new JSONObject();
					
					for( int j = 0; j < result.getCols().size(); j++ )
					{
						obj.put(result.getCols().get(j), ((List<String>)result.getRows().get(i)).get(j));
					}

					rows.add(obj);
				}
			}
			
			jsonObject.put("rows", rows);
			
			StringWriter sw = new StringWriter();
			jsonObject.write(sw);
			
			String rt = sw.toString();
			return rt;
		} catch (Throwable t) {

			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("success", false);
			jsonObject.put("message", CommonTools.convertExceptionToString(t));
			jsonObject.put("errorCode", "");
			
			return jsonObject.toString();
		}
	}
	
	@RequestMapping(value="/testConnect", consumes="application/json")
	public ConnectResult testConnect(@RequestBody Resource resource) throws Throwable
	{
		String result = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).testConnection(resource.getDbLink(),
				resource.getDbUser(), resource.getDbPasswd());
		
		ConnectResult webResult = new ConnectResult();
		webResult.setResourceId(resource.getResourceId());
				
		if( result.startsWith("Success")) {
			webResult.setSuccess(true);
			webResult.setMessage("");
		} else {
			webResult.setSuccess(false);
			webResult.setMessage(result);
		}
		
		return webResult;
		
	}

	@RequestMapping(value="/testConnectById")
	public ConnectResult testConnect(@RequestParam("ResourceId") int id) throws Throwable
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

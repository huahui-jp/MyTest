package works.processor.data;

import java.sql.BatchUpdateException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.activemq.artemis.utils.json.JSONException;
import org.apache.activemq.artemis.utils.json.JSONObject;

import works.processor.dbutil.ConnectionUtil;
import works.processor.domain.ActionJob;
import works.processor.utils.CommonTools;

public class DbActionJobThread extends ActionJobThread {

	private Connection conn = null;
	
	private PreparedStatement stmt = null;
	
	private String sql = null;
	
	private int waitCommit = 0;
	
	private int commitCnt = 0;
	
	private void createSql(DbJobStatus jobStatus) {

		String columnName = "";
		String columnValue = "";

		sql = "insert into " + jobStatus.getTableMapping().getTableName();
		
		
		for( int i = 0; i < jobStatus.getColumnMappintList().size(); i++ )
		{
			columnName += jobStatus.getColumnMappintList().get(i).getColumnName();
			columnValue += "?";

			if( i != (jobStatus.getColumnMappintList().size() -1) ) {
				columnName += ", ";
				columnValue += ", ";
			}
		}
		
		sql = sql + " (" + columnName + ") values (" + columnValue + ")";
		
	}

	private void prepareJob(DbJobStatus jobStatus) throws Throwable
	{
		conn = ConnectionUtil.getInstance().
				getDbHelper(jobStatus.getResource().getDbLink()).
				getConnection(jobStatus.getResource().getDbLink(),
				jobStatus.getResource().getDbUser(),
				jobStatus.getResource().getDbPasswd());

		if( jobStatus.getActionJob().getActionJobType() == ActionJob.JOB_ALWAYS )
		{
			conn.setAutoCommit(true);
		} else {
			conn.setAutoCommit(false);
		}
		
		createSql(jobStatus);
			
		stmt = conn.prepareStatement(sql);
	}
	
	@Override
	public void increaseUpdateCnt() {
		
		DbJobStatus jobStatus = (DbJobStatus) this.jobStatus;
		
		if( jobStatus.getActionJob().getActionJobType() == ActionJob.JOB_ALWAYS ){
			jobStatus.setUpdateCnt(jobStatus.getUpdateCnt() + 1);
		} else {
			if( commitCnt > 0 )
			{
				jobStatus.setUpdateCnt(jobStatus.getUpdateCnt() + commitCnt);
				commitCnt = 0;
			}
		}
	}
	
	@Override
	int doAction(String param) {

		DbJobStatus jobStatus = (DbJobStatus) this.jobStatus;

		try {
			JSONObject jsonObject = new JSONObject(param);
			
			for( int i = 0; i < jobStatus.getColumnMappintList().size(); i++ )
			{
				switch (jobStatus.getColumnMappintList().get(i).getColumnType().toLowerCase()) {
				case "char":
				case "varchar":
					stmt.setString(i + 1, jsonObject.getString(jobStatus.getColumnMappintList().get(i).getJasonName()));
					break;
				case "int":
					stmt.setInt(i + 1, jsonObject.getInt(jobStatus.getColumnMappintList().get(i).getJasonName()));
					break;
				default:
					throw new Exception("UnSupport...");
				}
			}
			
			if( jobStatus.getActionJob().getActionJobType() == ActionJob.JOB_ALWAYS ){
				if( stmt.execute() )
				{
					return -1;
				}
				else
				{
					return 0;
				}
				
			} else {
				
				waitCommit++;
				stmt.addBatch();
				if( waitCommit >= jobStatus.getActionJob().getBatchUpdateCnt() || jsonObject.has("$$fin$$"))
				{
					stmt.executeBatch();
					stmt.clearBatch();
					conn.commit();
					commitCnt = waitCommit;
					waitCommit = 0;
				}
			}
			
			return 0;
			

		} catch (Exception je) {
			
			String errorMsg = CommonTools.convertExceptionToString(je);
			if(je instanceof JSONException ) {
				// TODO : : 
			} else if(je instanceof SQLException ){
				// TODO : : 
			} else if( je instanceof BatchUpdateException ) {
				// TODO : : 
				BatchUpdateException buEx = (BatchUpdateException) je;
				int result[] = buEx.getUpdateCounts();

			}
			
			return -1;
		}	
		
	}

	@Override
	int doStart() {

		try {
			DbJobStatus jobStatus = (DbJobStatus) this.jobStatus;
			
			if( null == jobStatus.getResource() )
			{
				return -1;
			}
			
			if( null == jobStatus.getTableMapping() )
			{
				return -1;
			}
			
			if( null == jobStatus.getColumnMappintList() )
			{
				return -1;
			}
	
			prepareJob(jobStatus);

			return 0;
		} catch (Throwable ex) {

			try {
				if( stmt != null && !stmt.isClosed())
				{
					conn.close();
					conn = null;
				}
			} catch (Throwable te) {
			}
			
			try {
				if( conn != null && !conn.isClosed())
				{
					conn.close();
					conn = null;
				}
			} catch (Throwable te) {
			}

			jobStatus.setErrorMessage(CommonTools.convertExceptionToString(ex));
			return -1;
		}
	}
	

	@Override
	int doStop() {

		try {
			jobStatus.setErrorMessage("");

			if( jobStatus.isRunning() )
			{
				jobStatus.setErrorMessage("有数据在处理,不能停止.");
				return -1;
			}

			if( stmt != null && !stmt.isClosed()) {
				stmt.close();
			}
			
			if( conn != null && !conn.isClosed()) {
				conn.close();
			}
			
			return 0;
		} catch (Throwable ex) {
			
			stmt = null;
			conn = null;

			jobStatus.setErrorMessage(CommonTools.convertExceptionToString(ex));

			return -1;
		}
	}

	@Override
	void doError(String param, Throwable ex) {
		// TODO Auto-generated method stub
	}

}

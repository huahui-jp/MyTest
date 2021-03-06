package works.processor.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.quartz.JobDataMap;

import works.processor.dbutil.ConnectionUtil;
import works.processor.domain.DataSource;
import works.processor.domain.Resource;

public class DBScheduleJobExecutor extends ScheduleJobExecutor {

	private Connection conn = null;
	private PreparedStatement ps = null;
	private ResultSet rs = null;
	
	@Override
	DataSet getDataSet(JobDataMap jobDataMap) {
		try {
			rs = ps.executeQuery();
			return new DBDataSet(rs);
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	void prepareJobExecution(JobDataMap jobDataMap) {

		Resource resource = (Resource) jobDataMap.get(ScheduleJobExecutor.SCHEDULE_RESOURCE);
		DataSource dataSource = (DataSource) jobDataMap.get(ScheduleJobExecutor.SCHEDULE_DATASOURCE);

		try {
			conn = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getConnection(resource.getDbLink(), resource.getDbUser(), resource.getDbPasswd());
			ps = conn.prepareStatement(dataSource.getSourceSql());
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	void endJobExecution(JobDataMap jobScheduler) {
		try {
			if( rs != null && !rs.isClosed()) {
				rs.close();
			}
		} catch (Throwable th) {
		}
		rs = null;

		try {
			if( ps != null && !ps.isClosed()) {
				ps.close();
			}
		} catch (Throwable th) {
		}
		ps = null;
		
		try {
			if( conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (Throwable th) {
		}
		conn = null;
	}
}

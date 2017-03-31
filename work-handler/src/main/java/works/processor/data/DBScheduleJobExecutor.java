package works.processor.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import works.processor.domain.DataSource;
import works.processor.domain.Resource;
import works.processor.web.dbutil.ConnectionUtil;

public class DBScheduleJobExecutor extends ScheduleJobExecutor {

	private Connection conn = null;
	private PreparedStatement ps = null;
	private ResultSet rs = null;
	
	@Override
	DataSet getDataSet(JobScheduler jobScheduler) {
		try {
			rs = ps.executeQuery();
			return new DBDataSet(rs);
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	void prepareJobExecution(JobScheduler jobScheduler) {

		Resource resource = jobScheduler.getSourceResource();
		DataSource dataSource = jobScheduler.getDataSource();

		try {
			conn = ConnectionUtil.getInstance().getDbHelper(resource.getDbLink()).getConnection(resource.getDbLink(), resource.getDbUser(), resource.getDbPasswd());
			ps = conn.prepareStatement(dataSource.getSourceSql());
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	void endJobExecution(JobScheduler jobScheduler) {
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

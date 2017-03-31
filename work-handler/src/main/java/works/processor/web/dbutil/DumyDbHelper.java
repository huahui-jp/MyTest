package works.processor.web.dbutil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import works.processor.web.domain.ColumnInfo;

public class DumyDbHelper extends BaseDbHelper implements DbHelper {

	@Override
	public Connection getConnection(String url, String userName, String passWord) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String testConnection(String url, String userName, String passWord) throws SQLException {
		// TODO Auto-generated method stub
		return "Not Support....";
	}

	@Override
	public List<String> getTableNameList(String url, String userName, String passWord) throws SQLException {
		// TODO Auto-generated method stub
		return new ArrayList<String>();
	}

	@Override
	public List<ColumnInfo> getColumnNameList(String url, String userName, String passWord, String tableName) throws SQLException {
		// TODO Auto-generated method stub
		return new ArrayList<ColumnInfo>();
	}

}

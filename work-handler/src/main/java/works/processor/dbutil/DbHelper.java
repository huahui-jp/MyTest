package works.processor.dbutil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import works.processor.web.domain.ColumnInfo;

public interface DbHelper {

	public Connection getConnection(String url, String userName, String passWord) throws SQLException;
	
	public String testConnection(String url, String userName, String passWord) throws SQLException;
	
	public List<String> getTableNameList(String url, String userName, String passWord) throws SQLException;
	
	public List<ColumnInfo> getColumnNameList(String url, String userName, String passWord, String tableName) throws SQLException;
	
	public List<ColumnInfo> getColumnInfo(String url, String userName, String passWord, String sql) throws SQLException;
}

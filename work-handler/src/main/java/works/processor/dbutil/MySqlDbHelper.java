package works.processor.dbutil;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import works.processor.web.domain.ColumnInfo;


public class MySqlDbHelper extends BaseDbHelper implements DbHelper{

	public Connection getConnection(String url, String userName, String passWord) throws SQLException {
		
		
		Connection conn = DriverManager.getConnection(url, userName, passWord);
		
		return conn;
	}

	public String testConnection(String url, String userName, String passWord) throws SQLException
	{
		try {
			
			Connection conn = getConnection(url, userName, passWord);
			conn.close();
			return "Success...";

		} catch (Exception ex) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw); 
			ex.printStackTrace(pw); 
			
			return sw.toString();
		}
	}	


	private String getSchemaName(String url) {

		String tmpUrl;
		
		int idx = url.indexOf("?");
		if(idx > 0)
		{
			tmpUrl = url.substring(0, idx);
		}
		else
		{
			tmpUrl = url;
		}
		
		idx = tmpUrl.lastIndexOf("/");
		if(idx < 0)
		{
			return "";
		}
		else
		{
			return tmpUrl.substring(idx + 1, tmpUrl.length());
		}
		
	}
	
	public List<String> getTableNameList(String url, String userName, String passWord) throws SQLException
	{
		List<String> result = new ArrayList<String>();
		
		String schema = getSchemaName(url);
		
		if( schema.length() == 0 )
		{
			return result;
		}
		
		Connection conn = getConnection(url, userName, passWord);
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			ps = conn.prepareStatement("SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = ?");
			ps.setString(1, schema);
			rs = ps.executeQuery();
			while (rs.next()) {
				result.add(rs.getString("table_name"));
			}
		} finally {
			try {
				if (rs != null){
					rs.close();
				}
			} catch (Exception ex) {
			}
			
			try {
				if (ps != null){
					ps.close();
				}
			} catch (Exception ex) {
			}
				
			conn.close();
		}
		
		return result;
		
	}
	

}

package works.processor.web.dbutil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import works.processor.web.domain.ColumnInfo;

public abstract class BaseDbHelper implements DbHelper {

	public List<ColumnInfo> getColumnInfo(String url, String userName, String passWord, String sql) throws SQLException {
		
		Connection conn = getConnection(url, userName, passWord);
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<ColumnInfo> result = new ArrayList<ColumnInfo>();
		try {
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			ResultSetMetaData metaData = rs.getMetaData();
			
			for( int i = 1; i <= metaData.getColumnCount(); i++) {
				ColumnInfo columnInfo = new ColumnInfo();
				columnInfo.setColumnName(metaData.getColumnLabel(i));
				columnInfo.setDataType(metaData.getColumnTypeName(i));
				result.add(columnInfo);
			}
			
			return result;
		} catch (SQLException ex) {
			
			if( ps != null ) {
			
				try {
					if(!ps.isClosed()) ps.close();
				} catch (Exception e){};
			}
			if( rs != null ) {
				try {
					if(!rs.isClosed()) rs.close();
				} catch (Exception e){};
				
			}
				
			throw ex;
		}
	}

}

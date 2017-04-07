package works.processor.dbutil;

public class ConnectionUtil {

	private MySqlDbHelper mysqlHelper;
	
	private DumyDbHelper dumyHelper;
	
	private ConnectionUtil() {
	}

	public static ConnectionUtil getInstance() {
		return new ConnectionUtil();
	}

	public DbHelper getDbHelper(String url) {

		String uurl = url.toUpperCase();
		
		if( uurl.indexOf("MYSQL") > 0 )	{
			if(mysqlHelper == null)	{
				mysqlHelper = new MySqlDbHelper();
			}
			return mysqlHelper;
		} else {
			if(dumyHelper == null){
				dumyHelper = new DumyDbHelper();
			}
			return dumyHelper;
		}
		
	}
}

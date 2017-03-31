package works.processor.data;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

public class DBDataSet implements DataSet {

	private ResultSet rs = null;

	public DBDataSet(ResultSet rs) {
		super();
		this.rs = rs;
	}

	@Override
	public boolean next() {
		try {
			return rs.next();
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	public List<DataMeta> getDataMetas() {
		List<DataMeta> metas = new ArrayList<DataMeta>();
		try {
			ResultSetMetaData rsmeta = rs.getMetaData();
			for( int i = 0; i < rsmeta.getColumnCount(); i++ ) {
				DataMeta meta = new DataMeta();
				meta.setName(rsmeta.getColumnLabel(i));
				meta.setType(rsmeta.getColumnTypeName(i));
				metas.add(meta);
			}
			
			return metas;
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	public Object getObject(String name) {
		try {
			return rs.getObject(name);
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	public Object getObject(int idx) {
		try {
			return rs.getObject(idx);
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}
	}

	@Override
	public int getErrorCnt() {
		return 0;
	}
	
}

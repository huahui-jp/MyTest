package works.processor.data;

import java.util.List;

public interface DataSet {

	boolean next();
	
	List<DataMeta> getDataMetas();

	Object getObject(String name);
	
	Object getObject(int idx);
	
	int getErrorCnt();
}

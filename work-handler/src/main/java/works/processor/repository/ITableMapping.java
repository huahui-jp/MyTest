package works.processor.repository;

import java.util.List;

import works.processor.domain.TableMapping;

public interface ITableMapping extends ICommonValid<TableMapping, Integer> {
	
	int countByResourceId(int resourceId);
	
	int deleteByResourceId(int resourceId);
	
	List<TableMapping> findByResourceId(int resourceId);
}

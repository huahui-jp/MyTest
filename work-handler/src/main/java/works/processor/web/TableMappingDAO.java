package works.processor.web;

import java.util.List;

import works.processor.domain.TableMapping;

public interface TableMappingDAO extends CommonValidDAO<TableMapping, Integer> {
	
	int countByResourceId(int resourceId);
	
	int deleteByResourceId(int resourceId);
	
	List<TableMapping> findByResourceId(int resourceId);
}

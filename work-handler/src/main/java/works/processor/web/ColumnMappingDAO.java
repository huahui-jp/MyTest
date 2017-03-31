package works.processor.web;

import java.util.List;

import works.processor.domain.ColumnMapping;

public interface ColumnMappingDAO extends CommonValidDAO<ColumnMapping, Integer> {
	
	List<ColumnMapping> findByTableMappingId(int mappingId);
	
	int deleteByTableMappingId(int tableMappingId);
}

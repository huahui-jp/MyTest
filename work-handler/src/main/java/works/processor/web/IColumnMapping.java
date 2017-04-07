package works.processor.web;

import java.util.List;

import works.processor.domain.ColumnMapping;

public interface IColumnMapping extends ICommonValid<ColumnMapping, Integer> {
	
	List<ColumnMapping> findByTableMappingId(int mappingId);
	
	int deleteByTableMappingId(int tableMappingId);
}

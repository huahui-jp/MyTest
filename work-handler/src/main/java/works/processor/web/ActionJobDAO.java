package works.processor.web;

import works.processor.domain.ActionJob;

public interface ActionJobDAO extends CommonValidDAO<ActionJob, Integer> {
	
	int deleteByTableMappingId(int tableMappingId);	
}

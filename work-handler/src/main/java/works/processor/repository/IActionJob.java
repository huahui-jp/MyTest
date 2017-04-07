package works.processor.repository;

import works.processor.domain.ActionJob;

public interface IActionJob extends ICommonValid<ActionJob, Integer> {
	
	int deleteByTableMappingId(int tableMappingId);	
}

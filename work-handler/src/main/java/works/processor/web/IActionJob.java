package works.processor.web;

import works.processor.domain.ActionJob;

public interface IActionJob extends ICommonValid<ActionJob, Integer> {
	
	int deleteByTableMappingId(int tableMappingId);	
}

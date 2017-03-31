package works.processor.web;

import java.util.List;

import works.processor.domain.ActionJobHistory;

public interface ActionJobHistoryDAO extends CommonValidDAO<ActionJobHistory, Integer> {
	
	List<ActionJobHistory> findByActionJobId(Integer id);
}

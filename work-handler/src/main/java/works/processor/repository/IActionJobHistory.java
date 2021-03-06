package works.processor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import works.processor.domain.ActionJobHistory;

public interface IActionJobHistory extends JpaRepository<ActionJobHistory, Integer> {
	
	List<ActionJobHistory> findByActionJobId(Integer id);
}

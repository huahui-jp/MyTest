package works.processor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import works.processor.domain.ActionJobDbErrorHistory;

public interface IActionJobDbErrorHistory extends JpaRepository<ActionJobDbErrorHistory, Integer> {
}

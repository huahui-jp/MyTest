package works.processor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import works.processor.domain.ScheduleJobHistory;

public interface IScheduleJobHistory extends JpaRepository<ScheduleJobHistory, Integer> {
	
	List<ScheduleJobHistory> findByJobIdOrderByStartTimeDesc(Integer jobId);
}

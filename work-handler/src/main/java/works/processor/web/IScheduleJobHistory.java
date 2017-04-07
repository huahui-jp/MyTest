package works.processor.web;

import org.springframework.data.jpa.repository.JpaRepository;

import works.processor.domain.ScheduleJobHistory;

public interface IScheduleJobHistory extends JpaRepository<ScheduleJobHistory, Integer> {
}

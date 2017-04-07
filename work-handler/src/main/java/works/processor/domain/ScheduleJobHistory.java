package works.processor.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="schedule_job_info")
public class ScheduleJobHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer jobHistoryId;

	@Column(nullable=false, length=7)
	private Integer jobId;

	@Column(nullable=false)
	private Timestamp startTime;

	@Column(nullable=true)
	private String error;
	
	@Column(nullable=true)
	private Timestamp endTime;
	
	@Column(nullable=false)
	private int getCnt;

	public Integer getJobHistoryId() {
		return jobHistoryId;
	}

	public void setJobHistoryId(Integer jobHistoryId) {
		this.jobHistoryId = jobHistoryId;
	}

	public Integer getJobId() {
		return jobId;
	}

	public void setJobId(Integer jobId) {
		this.jobId = jobId;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	public int getGetCnt() {
		return getCnt;
	}

	public void setGetCnt(int getCnt) {
		this.getCnt = getCnt;
	}
}

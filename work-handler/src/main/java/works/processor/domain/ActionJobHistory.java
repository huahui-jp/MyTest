package works.processor.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="action_job_history")
public class ActionJobHistory {

	// JobID
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer actionJobHistoryId;

	@Column(nullable=false)
	private Integer actionJobId;

	@Column(nullable=false)
	private Timestamp startTime;

	@Column(nullable=true)
	private String startError;
	
	@Column(nullable=true)
	private Timestamp endTime;
	
	@Column(nullable=true)
	private int updateCnt;
	
	@Column(nullable=false, length=1)
	private String deleteFlg;
	
	@Column(nullable=true)
	private int errorCnt;
	
	public Integer getActionJobHistoryId() {
		return actionJobHistoryId;
	}

	public void setActionJobHistoryId(Integer actionJobHistoryId) {
		this.actionJobHistoryId = actionJobHistoryId;
	}

	public Integer getActionJobId() {
		return actionJobId;
	}

	public void setActionJobId(Integer actionJobId) {
		this.actionJobId = actionJobId;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public String getStartError() {
		return startError;
	}

	public void setStartError(String startError) {
		this.startError = startError;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	public int getUpdateCnt() {
		return updateCnt;
	}

	public void setUpdateCnt(int updateCnt) {
		this.updateCnt = updateCnt;
	}

	public int getErrorCnt() {
		return errorCnt;
	}

	public void setErrorCnt(int errorCnt) {
		this.errorCnt = errorCnt;
	}

	public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}
	
	
}

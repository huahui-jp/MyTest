package works.processor.domain;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="schedule_job_info")
public class ScheduleJob {

	// Job Id
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer jobId;

	@Column(nullable=false, length=200)
	private String jobName;
	
	// cron 指定时间
	@Column(nullable=true, length=200)
	private String cronTime;
	
	// 定时一次执行时间
	@Column(nullable=true)
	private Date executeDate;
	
	// 数据元ID
	@Column(nullable=false)
	private Integer dataSourceId;

	@Column(nullable=false, length=200)
	private String outputChannelName;
	
	// 删除FLG
	@Column(nullable=false, length=1)
	private String deleteFlg;
	
	public Integer getJobId() {
		return jobId;
	}

	public void setJobId(Integer jobId) {
		this.jobId = jobId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getCronTime() {
		return cronTime;
	}

	public void setCronTime(String cronTime) {
		this.cronTime = cronTime;
	}

	public Date getExecuteDate() {
		return executeDate;
	}

	public void setExecuteDate(Date executeDate) {
		this.executeDate = executeDate;
	}


	public Integer getDataSourceId() {
		return dataSourceId;
	}

	public void setDataSourceId(Integer dataSourceId) {
		this.dataSourceId = dataSourceId;
	}

	public String getOutputChannelName() {
		return outputChannelName;
	}

	public void setOutputChannelName(String outputChannelName) {
		this.outputChannelName = outputChannelName;
	}

	public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}
}

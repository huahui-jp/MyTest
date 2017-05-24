package works.processor.web.domain;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class JobInfo {

	private Integer resourceId;

	private String resourceName;
	
	private Integer dataSourceId;

	private String dataSourceName;
	
	@Id
	private Integer jobId;
	
	private String jobName;

	private int outputCnt;

	public Integer getResourceId() {
		return resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public Integer getDataSourceId() {
		return dataSourceId;
	}

	public void setDataSourceId(Integer dataSourceId) {
		this.dataSourceId = dataSourceId;
	}

	public String getDataSourceName() {
		return dataSourceName;
	}

	public void setDataSourceName(String dataSourceName) {
		this.dataSourceName = dataSourceName;
	}

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

	public int getOutputCnt() {
		return outputCnt;
	}

	public void setOutputCnt(int outputCnt) {
		this.outputCnt = outputCnt;
	}
}

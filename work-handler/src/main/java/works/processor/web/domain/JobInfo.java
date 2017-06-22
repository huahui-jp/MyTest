package works.processor.web.domain;

public class JobInfo {

	private int resourceId;

	private String resourceName;
	
	private int dataSourceId;

	private String dataSourceName;
	
	private int jobId;
	
	private String jobName;

	private int outputCnt;

	public int getResourceId() {
		return resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public int getDataSourceId() {
		return dataSourceId;
	}

	public void setDataSourceId(int dataSourceId) {
		this.dataSourceId = dataSourceId;
	}

	public String getDataSourceName() {
		return dataSourceName;
	}

	public void setDataSourceName(String dataSourceName) {
		this.dataSourceName = dataSourceName;
	}

	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
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

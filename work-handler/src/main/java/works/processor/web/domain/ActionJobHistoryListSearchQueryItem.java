package works.processor.web.domain;

public class ActionJobHistoryListSearchQueryItem {

	private String resourceName;
	
	private String tableName;
	
	private String jobName;

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableMappingName) {
		this.tableName = tableMappingName;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}
}

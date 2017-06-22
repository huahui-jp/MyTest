package works.processor.web.domain;


public class ActionJobHistoryView {


	private String resourceName;
	
	private int tableMappingId;

	private String tableNameView;

	private String actionJobName;

	private int actionJobId;

	private int updateCnt;
	
	private int errorCnt;

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public int getTableMappingId() {
		return tableMappingId;
	}

	public void setTableMappingId(int tableMappingId) {
		this.tableMappingId = tableMappingId;
	}

	public String getTableNameView() {
		return tableNameView;
	}

	public void setTableNameView(String tableNameView) {
		this.tableNameView = tableNameView;
	}

	public String getActionJobName() {
		return actionJobName;
	}

	public void setActionJobName(String actionJobName) {
		this.actionJobName = actionJobName;
	}

	public int getActionJobId() {
		return actionJobId;
	}

	public void setActionJobId(int actionJobId) {
		this.actionJobId = actionJobId;
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
}

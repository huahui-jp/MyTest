package works.processor.web.domain;

public class TableMappingListView {

	private Integer tableMappingId;
	
	private Integer resourceId;
	
	private String tableNameView;
	
	private String tableName;
	
	private String deleteFlg;
	
	private String resourceName;

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public Integer getTableMappingId() {
		return tableMappingId;
	}

	public void setTableMappingId(Integer tableMappingId) {
		this.tableMappingId = tableMappingId;
	}

	public Integer getResourceId() {
		return resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public String getTableNameView() {
		return tableNameView;
	}

	public void setTableNameView(String tableNameView) {
		this.tableNameView = tableNameView;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}

}

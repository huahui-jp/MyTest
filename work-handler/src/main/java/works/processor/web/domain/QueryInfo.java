package works.processor.web.domain;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class QueryInfo {

	private String resourceName;
	
	@Id
	private Integer dataSourceId;

	private Integer resourceId;

	private String sourceSql;

	private String dataSourceName;
	
	// 删除FLG
	private String deleteFlg;

	public Integer getDataSourceId() {
		return dataSourceId;
	}

	public void setDataSourceId(Integer dataSourceId) {
		this.dataSourceId = dataSourceId;
	}

	public Integer getResourceId() {
		return resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public String getSourceSql() {
		return sourceSql;
	}

	public void setSourceSql(String sourceSql) {
		this.sourceSql = sourceSql;
	}

	public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}

	public String getDataSourceName() {
		return dataSourceName;
	}

	public void setDataSourceName(String dataSourceName) {
		this.dataSourceName = dataSourceName;
	}
	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
}

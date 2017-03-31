package works.processor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="table_mapping")
public class TableMapping {

	// 表MappingID
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer tableMappingId;
	
	// 资源ID
	@Column(nullable=false, length=5)
	private Integer resourceId;
	
	// 表显示名
	@Column(nullable=false, length=200)
	private String tableNameView;
	
	// 表名
	@Column(nullable=false, length=200)
	private String tableName;
	
	// 删除Flg
	@Column(nullable=false, length=1)
	private String deleteFlg;

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

	public TableMapping() {
	}
	
    @JsonCreator
    public TableMapping(@JsonProperty("TableMappingId") Integer tableMappingId,
                    @JsonProperty("ResourceId") Integer resourceId,
                    @JsonProperty("TableNameView") String tableNameView,
                    @JsonProperty("TableName") String tableName,
                    @JsonProperty("ValidFlg") String deleteFlg) {
        this.tableMappingId = tableMappingId;
        this.resourceId = resourceId;
        this.tableNameView = tableNameView;
        this.tableName = tableName;
        this.deleteFlg = deleteFlg;
    }
}

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
@Table(name="column_mapping")
public class ColumnMapping {
	
	// 列MappingId
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer columnMappingId;
	
	// 表MappingId
	@Column(nullable=false, length=5)
	private Integer tableMappingId;
	
	// 列表示名
	@Column(nullable=false, length=200)
	private String columnNameView;
	
	// 数据来源
	@Column(nullable=false, length=2)
	private String dataFrom;
	
	// 列名
	@Column(nullable=false, length=200)
	private String columnName;

	@Column(nullable=false, length=200)
	private String columnType;
	
	// jason项目名
	@Column(nullable=true, length=200)
	private String jasonName;

	// Sequence名
	@Column(nullable=true, length=20)
	private String seqName;
	
	// 固定文字项目值
	@Column(nullable=true, length=200)
	private String txtValue;

	// 日期类型格式
	@Column(nullable=true, length=20)
	private String dateFormat;
	
	// 删除Flg
	@Column(nullable=false, length=1)
	private String deleteFlg;
	

	public Integer getColumnMappingId() {
		return columnMappingId;
	}

	public void setColumnMappingId(Integer columnMappingId) {
		this.columnMappingId = columnMappingId;
	}

	public int getTableMappingId() {
		return tableMappingId;
	}

	public void setTableMappingId(int tableMappingId) {
		this.tableMappingId = tableMappingId;
	}

	public String getColumnNameView() {
		return columnNameView;
	}

	public void setColumnNameView(String columnNameView) {
		this.columnNameView = columnNameView;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getColumnType() {
		return columnType;
	}

	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}

	public String getDataFrom() {
		return dataFrom;
	}

	public void setDataFrom(String dataFrom) {
		this.dataFrom = dataFrom;
	}

	public String getJasonName() {
		return jasonName;
	}

	public void setJasonName(String jasonName) {
		this.jasonName = jasonName;
	}

	public String getSeqName() {
		return seqName;
	}

	public void setSeqName(String seqName) {
		this.seqName = seqName;
	}

	public String getTxtValue() {
		return txtValue;
	}

	public void setTxtValue(String txtValue) {
		this.txtValue = txtValue;
	}

	public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
	
	public ColumnMapping(){
	}

    @JsonCreator
    public ColumnMapping(@JsonProperty("ColumnMappingId") Integer columnMappingId,
                    @JsonProperty("TableMappingId") Integer tableMappingId,
                    @JsonProperty("ColumnNameView") String columnNameView,
                    @JsonProperty("ColumnName") String columnName,
                    @JsonProperty("JasonName") String jasonName,
                    @JsonProperty("SeqName") String seqName,
                    @JsonProperty("TxtValue") String txtValue,
                    @JsonProperty("ValidFlg") String deleteFlg,
                    @JsonProperty("DateFormat") String dateFormat) {
        this.columnMappingId = columnMappingId;
        this.tableMappingId = tableMappingId;
        this.columnNameView = columnNameView;
        this.columnName = columnName;
        this.jasonName = jasonName;
        this.seqName = seqName;
        this.txtValue = txtValue;
        this.deleteFlg = deleteFlg;
        this.dateFormat = dateFormat;
    }
}

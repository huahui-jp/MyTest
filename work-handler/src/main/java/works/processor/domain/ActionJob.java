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
@Table(name="action_job")
public class ActionJob {

	public static final char JOB_ALWAYS = '0';
	
	public static final char JOB_DEFINE = '1';
	
	// JobID
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer actionJobId;
	
	// 表MappingID
	@Column(nullable=false, length=5)
	private int tableMappingId;
	
	// JOB种类（常时， 定时）
	@Column(nullable=false, length=1)
	private char actionJobType;
	
	// batch更新阀值
	@Column(nullable=true, length=5)
	private int batchUpdateCnt;
	
	// 消息队列名
	@Column(nullable=false, length=20)
	private String messageChannelName;
	
	// 保存履历Flg
	@Column(nullable=false, length=1)
	private char enableSaveHistory;
	
	// 主Key列名
	@Column(nullable=true, length=200)
	private String keyColumn;
	
	// 删除Flg
	@Column(nullable=false, length=1)
	private String deleteFlg;

    public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}

	public Integer getActionJobId() {
		return actionJobId;
	}

	public void setActionJobId(Integer actionJobId) {
		this.actionJobId = actionJobId;
	}

	public int getTableMappingId() {
		return tableMappingId;
	}

	public void setTableMappingId(int tableMappingId) {
		this.tableMappingId = tableMappingId;
	}

	public char getActionJobType() {
		return actionJobType;
	}

	public void setActionJobType(char actionJobType) {
		this.actionJobType = actionJobType;
	}

	public int getBatchUpdateCnt() {
		return batchUpdateCnt;
	}

	public void setBatchUpdateCnt(int batchUpdateCnt) {
		this.batchUpdateCnt = batchUpdateCnt;
	}

	public String getMessageChannelName() {
		return messageChannelName;
	}

	public void setMessageChannelName(String messageChannelName) {
		this.messageChannelName = messageChannelName;
	}

	public char getEnableSaveHistory() {
		return enableSaveHistory;
	}

	public void setEnableSaveHistory(char enableSaveHistory) {
		this.enableSaveHistory = enableSaveHistory;
	}

	public String getKeyColumn() {
		return keyColumn;
	}

	public void setKeyColumn(String keyColumn) {
		this.keyColumn = keyColumn;
	}

	public ActionJob() {
	}

	@JsonCreator
    public ActionJob(@JsonProperty("ActionJobId") Integer actionJobId,
                    @JsonProperty("TableMappingId") int tableMappingId,
                    @JsonProperty("ActionJobType") char actionJobType,
                    @JsonProperty("BatchUpdateCnt") int batchUpdateCnt,
                    @JsonProperty("MessageChannelName") String messageChannelName,
                    @JsonProperty("EnableSaveHistory") char enableSaveHistory,
                    @JsonProperty("KeyColumn") String keyColumn,
                    @JsonProperty("ValidFlg") String deleteFlg) {
        this.actionJobId = actionJobId;
        this.tableMappingId = tableMappingId;
        this.actionJobType = actionJobType;
        this.batchUpdateCnt = batchUpdateCnt;
        this.messageChannelName = messageChannelName;
        this.enableSaveHistory = enableSaveHistory;
        this.keyColumn = keyColumn;
        this.deleteFlg = deleteFlg;
    }
	
}

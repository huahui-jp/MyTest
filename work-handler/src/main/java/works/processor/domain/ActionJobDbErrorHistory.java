package works.processor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="action_job_db_error_history")
public class ActionJobDbErrorHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer actionJobDbErrorHistoryId;

	@Column(nullable=false)
	private Integer actionJobHistoryId;

	@Column(nullable=false)
	private String keyColumn1;
	
	@Column(nullable=true)
	private String keyColumn2;

	@Column(nullable=false)
	private String keyColumn3;

	@Column(nullable=false)
	private String keyColumn4;

	@Column(nullable=false)
	private String keyColumn5;

	@Column(nullable=false)
	private String keyColumn6;

	public Integer getActionJobDbErrorHistoryId() {
		return actionJobDbErrorHistoryId;
	}

	public void setActionJobDbErrorHistoryId(Integer actionJobDbErrorHistoryId) {
		this.actionJobDbErrorHistoryId = actionJobDbErrorHistoryId;
	}

	public Integer getActionJobHistoryId() {
		return actionJobHistoryId;
	}

	public void setActionJobHistoryId(Integer actionJobHistoryId) {
		this.actionJobHistoryId = actionJobHistoryId;
	}

	public String getKeyColumn1() {
		return keyColumn1;
	}

	public void setKeyColumn1(String keyColumn1) {
		this.keyColumn1 = keyColumn1;
	}

	public String getKeyColumn2() {
		return keyColumn2;
	}

	public void setKeyColumn2(String keyColumn2) {
		this.keyColumn2 = keyColumn2;
	}

	public String getKeyColumn3() {
		return keyColumn3;
	}

	public void setKeyColumn3(String keyColumn3) {
		this.keyColumn3 = keyColumn3;
	}

	public String getKeyColumn4() {
		return keyColumn4;
	}

	public void setKeyColumn4(String keyColumn4) {
		this.keyColumn4 = keyColumn4;
	}

	public String getKeyColumn5() {
		return keyColumn5;
	}

	public void setKeyColumn5(String keyColumn5) {
		this.keyColumn5 = keyColumn5;
	}

	public String getKeyColumn6() {
		return keyColumn6;
	}

	public void setKeyColumn6(String keyColumn6) {
		this.keyColumn6 = keyColumn6;
	}
}

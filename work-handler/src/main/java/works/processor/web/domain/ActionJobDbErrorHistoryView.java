package works.processor.web.domain;

import java.sql.Timestamp;

public class ActionJobDbErrorHistoryView {

	private String resourceName;
	
	private String tableNameView;

	private String actionJobName;

	private int actionJobId;
	
	private int actionJobHistoryId;
	
	private int actionJobDbErrorHistoryId;
	
	private String keyColumn1;
	
	private String keyColumn2;
	
	private String keyColumn3;
	private String keyColumn4;
	private String keyColumn5;
	private String keyColumn6;

	private String data;
	
	private Timestamp errorTime;

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
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

	public int getActionJobHistoryId() {
		return actionJobHistoryId;
	}

	public void setActionJobHistoryId(int actionJobHistoryId) {
		this.actionJobHistoryId = actionJobHistoryId;
	}

	public int getActionJobDbErrorHistoryId() {
		return actionJobDbErrorHistoryId;
	}

	public void setActionJobDbErrorHistoryId(int actionJobDbErrorHistoryId) {
		this.actionJobDbErrorHistoryId = actionJobDbErrorHistoryId;
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

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Timestamp getErrorTime() {
		return errorTime;
	}

	public void setErrorTime(Timestamp errorTime) {
		this.errorTime = errorTime;
	}
	
	
	
}

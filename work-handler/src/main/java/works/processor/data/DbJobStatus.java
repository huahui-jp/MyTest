package works.processor.data;

import java.sql.Connection;
import java.util.List;

import works.processor.domain.ActionJob;
import works.processor.domain.ColumnMapping;
import works.processor.domain.Resource;
import works.processor.domain.TableMapping;

public class DbJobStatus extends JobStatus{

	private Connection conn;
	
	private Resource resource;
	
	private TableMapping tableMapping;
	
	private List<ColumnMapping> columnMappintList;
	
	private ActionJob actionJob;
	
	public ActionJob getActionJob() {
		return actionJob;
	}

	public void setActionJob(ActionJob actionJob) {
		this.actionJob = actionJob;
	}

	public Connection getConn() {
		return conn;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

	public Resource getResource() {
		return resource;
	}

	public void setResource(Resource resource) {
		this.resource = resource;
	}

	public TableMapping getTableMapping() {
		return tableMapping;
	}

	public void setTableMapping(TableMapping tableMapping) {
		this.tableMapping = tableMapping;
	}

	public List<ColumnMapping> getColumnMappintList() {
		return columnMappintList;
	}

	public void setColumnMappintList(List<ColumnMapping> columnMappintList) {
		this.columnMappintList = columnMappintList;
	}
}

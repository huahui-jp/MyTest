package works.processor.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DAOStore {

	@Autowired
	private ResourceDAO resourceDAO;
	
	@Autowired
	private TableMappingDAO tableMappingDAO;
	
	@Autowired
	private ColumnMappingDAO columnMappingDAO;
	
	@Autowired
	private ActionJobDAO actionJobDAO;

	@Autowired
	private ActionJobHistoryDAO actionJobHistoryDAO;
	
	@Autowired
	private DataSourceDAO dataSourceDAO;
	
	@Autowired
	private ScheduleJobDAO scheduleJobDAO;

	public ActionJobHistoryDAO getActionJobHistoryDAO() {
		return actionJobHistoryDAO;
	}

	public void setActionJobHistoryDAO(ActionJobHistoryDAO actionJobHistoryDAO) {
		this.actionJobHistoryDAO = actionJobHistoryDAO;
	}

	public ResourceDAO getResourceDAO() {
		return resourceDAO;
	}

	public void setResourceDAO(ResourceDAO resourceDAO) {
		this.resourceDAO = resourceDAO;
	}

	public TableMappingDAO getTableMappingDAO() {
		return tableMappingDAO;
	}

	public void setTableMappingDAO(TableMappingDAO tableMappingDAO) {
		this.tableMappingDAO = tableMappingDAO;
	}

	public ColumnMappingDAO getColumnMappingDAO() {
		return columnMappingDAO;
	}

	public void setColumnMappingDAO(ColumnMappingDAO columnMappingDAO) {
		this.columnMappingDAO = columnMappingDAO;
	}

	public ActionJobDAO getActionJobDAO() {
		return actionJobDAO;
	}

	public void setActionJobDAO(ActionJobDAO actionJobDAO) {
		this.actionJobDAO = actionJobDAO;
	}

	public DataSourceDAO getDataSourceDAO() {
		return dataSourceDAO;
	}

	public void setDataSourceDAO(DataSourceDAO dataSourceDAO) {
		this.dataSourceDAO = dataSourceDAO;
	}

	public ScheduleJobDAO getScheduleJobDAO() {
		return scheduleJobDAO;
	}

	public void setScheduleJobDAO(ScheduleJobDAO scheduleJobDAO) {
		this.scheduleJobDAO = scheduleJobDAO;
	}
	
}

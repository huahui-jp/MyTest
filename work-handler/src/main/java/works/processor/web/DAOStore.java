package works.processor.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DAOStore {

	@Autowired
	private IResource resourceDAO;
	
	@Autowired
	private ITableMapping tableMappingDAO;
	
	@Autowired
	private IColumnMapping columnMappingDAO;
	
	@Autowired
	private IActionJob actionJobDAO;

	@Autowired
	private IActionJobHistory actionJobHistoryDAO;
	
	@Autowired
	private IDataSource dataSourceDAO;
	
	@Autowired
	private IScheduleJob scheduleJobDAO;

	public IActionJobHistory getActionJobHistoryDAO() {
		return actionJobHistoryDAO;
	}

	public void setActionJobHistoryDAO(IActionJobHistory actionJobHistoryDAO) {
		this.actionJobHistoryDAO = actionJobHistoryDAO;
	}

	public IResource getResourceDAO() {
		return resourceDAO;
	}

	public void setResourceDAO(IResource resourceDAO) {
		this.resourceDAO = resourceDAO;
	}

	public ITableMapping getTableMappingDAO() {
		return tableMappingDAO;
	}

	public void setTableMappingDAO(ITableMapping tableMappingDAO) {
		this.tableMappingDAO = tableMappingDAO;
	}

	public IColumnMapping getColumnMappingDAO() {
		return columnMappingDAO;
	}

	public void setColumnMappingDAO(IColumnMapping columnMappingDAO) {
		this.columnMappingDAO = columnMappingDAO;
	}

	public IActionJob getActionJobDAO() {
		return actionJobDAO;
	}

	public void setActionJobDAO(IActionJob actionJobDAO) {
		this.actionJobDAO = actionJobDAO;
	}

	public IDataSource getDataSourceDAO() {
		return dataSourceDAO;
	}

	public void setDataSourceDAO(IDataSource dataSourceDAO) {
		this.dataSourceDAO = dataSourceDAO;
	}

	public IScheduleJob getScheduleJobDAO() {
		return scheduleJobDAO;
	}

	public void setScheduleJobDAO(IScheduleJob scheduleJobDAO) {
		this.scheduleJobDAO = scheduleJobDAO;
	}
	
}

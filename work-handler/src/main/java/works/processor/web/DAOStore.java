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
}

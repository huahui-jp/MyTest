package works.processor.web.domain;

import java.util.List;

import works.processor.domain.ColumnMapping;
import works.processor.domain.TableMapping;

public class TableColumnMapping extends TableMapping {

	private List<ColumnMapping> rows = null;

	public List<ColumnMapping> getRows() {
		return rows;
	}

	public void setRows(List<ColumnMapping> rows) {
		this.rows = rows;
	}
}

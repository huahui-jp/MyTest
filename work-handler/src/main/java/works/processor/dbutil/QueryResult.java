package works.processor.dbutil;

import java.util.List;

public class QueryResult {

	private List<String> cols = null;
	
	private List<?> rows = null;

	public List<String> getCols() {
		return cols;
	}

	public void setCols(List<String> cols) {
		this.cols = cols;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}
}

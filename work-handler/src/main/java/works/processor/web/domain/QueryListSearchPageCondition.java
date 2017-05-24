package works.processor.web.domain;

import java.util.List;

public class QueryListSearchPageCondition {

	private QueryListSearchQueryItem queryData;
	
	private List<QuerySortItem> sorter;
	
	private int currentPage;
	
	private int pageSize;

	public QueryListSearchQueryItem getQueryData() {
		return queryData;
	}

	public void setQueryData(QueryListSearchQueryItem queryData) {
		this.queryData = queryData;
	}

	public List<QuerySortItem> getSorter() {
		return sorter;
	}

	public void setSorter(List<QuerySortItem> sorter) {
		this.sorter = sorter;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

}

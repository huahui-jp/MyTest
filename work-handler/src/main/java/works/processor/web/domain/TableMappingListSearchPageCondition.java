package works.processor.web.domain;


public class TableMappingListSearchPageCondition {

	private TableMappingListSearchQueryItem queryData;
	
	private int currentPage;
	
	private int pageSize;

	public TableMappingListSearchQueryItem getQueryData() {
		return queryData;
	}

	public void setQueryData(TableMappingListSearchQueryItem queryData) {
		this.queryData = queryData;
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

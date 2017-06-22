package works.processor.web.domain;

public class ActionJobHistoryListPageContition {

	private ActionJobHistoryListSearchQueryItem queryData;
	
	private int currentPage;
	
	private int pageSize;

	public ActionJobHistoryListSearchQueryItem getQueryData() {
		return queryData;
	}

	public void setQueryData(ActionJobHistoryListSearchQueryItem queryData) {
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

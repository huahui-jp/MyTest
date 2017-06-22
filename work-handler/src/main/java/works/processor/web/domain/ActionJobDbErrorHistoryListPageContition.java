package works.processor.web.domain;

public class ActionJobDbErrorHistoryListPageContition {

	private ActionJobDbErrorHistoryListPageQueryItem queryData;
	
	private int currentPage;
	
	private int pageSize;

	public ActionJobDbErrorHistoryListPageQueryItem getQueryData() {
		return queryData;
	}

	public void setQueryData(ActionJobDbErrorHistoryListPageQueryItem queryData) {
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

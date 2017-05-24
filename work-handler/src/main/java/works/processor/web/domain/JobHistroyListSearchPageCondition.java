package works.processor.web.domain;


public class JobHistroyListSearchPageCondition {

	private JobHistoryListSearchQueryItem queryData;
	
	private int currentPage;
	
	private int pageSize;

	public JobHistoryListSearchQueryItem getQueryData() {
		return queryData;
	}

	public void setQueryData(JobHistoryListSearchQueryItem queryData) {
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

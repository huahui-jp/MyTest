package works.processor.web.domain;

import java.util.List;

import works.processor.domain.TableMapping;

public class TableMappingView extends TableMapping {

	private boolean hasRunJob;

	public boolean isHasRunJob() {
		return hasRunJob;
	}

	public void setHasRunJob(boolean hasRunJob) {
		this.hasRunJob = hasRunJob;
	}
	
	private List<TableMappingView> children = null;

	public List<TableMappingView> getChildren() {
		return children;
	}

	public void setChildren(List<TableMappingView> children) {
		this.children = children;
	}
	
	
}

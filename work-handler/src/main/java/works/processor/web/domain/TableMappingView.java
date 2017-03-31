package works.processor.web.domain;

import works.processor.domain.TableMapping;

public class TableMappingView extends TableMapping {

	private boolean hasRunJob;

	public boolean isHasRunJob() {
		return hasRunJob;
	}

	public void setHasRunJob(boolean hasRunJob) {
		this.hasRunJob = hasRunJob;
	}
}

package works.processor.web.domain;

import works.processor.domain.Resource;

public class ResourceView extends Resource{
	
	private boolean hasChild;

	public boolean isHasChild() {
		return hasChild;
	}

	public void setHasChild(boolean hasChild) {
		this.hasChild = hasChild;
	}
}

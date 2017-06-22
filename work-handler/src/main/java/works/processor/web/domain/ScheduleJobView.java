package works.processor.web.domain;

import java.text.DateFormat;
import java.text.FieldPosition;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

import works.processor.domain.ScheduleJob;
import works.processor.utils.CommonTools;

public class ScheduleJobView extends ScheduleJob {

	private String resourceName;
	
	private String queryName;

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getQueryName() {
		return queryName;
	}

	public void setQueryName(String queryName) {
		this.queryName = queryName;
	}
	
	public String getViewExcuteDate() {
		
		return CommonTools.convertDataFormat(this.getExecuteDate());
	}
}

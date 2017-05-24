package works.processor.web.domain;

import java.text.DateFormat;
import java.text.FieldPosition;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

import works.processor.domain.ScheduleJob;

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
		if( this.getExecuteDate() == null )
		{
			return "";
		} else {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			return dateFormat.format(this.getExecuteDate());
		}
		
	}
}

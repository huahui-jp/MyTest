package works.processor.utils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import works.processor.web.domain.WebListData;
import works.processor.web.domain.WebOneResult;
import works.processor.web.domain.WebResult;

public class CommonTools {

	public static String convertExceptionToString(Throwable ex, int len) {
		
		String result = convertExceptionToString(ex);
		
		if(result.length() > len){
			return result.substring(0, len -1);
		} else {
			return result;
		}
	}

	public static String convertExceptionToString(Throwable ex) {
		
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw); 
		ex.printStackTrace(pw); 
		
		return sw.toString();
	}
	
	public static WebResult convertWebListResult(List<?> data) {
		return convertWebListResult(data, true, null);
	}

	public static WebResult convertWebListResult(List<?> data, boolean success, String message) {
		WebResult resultData = new WebResult();
		resultData.setSuccess(success);
		resultData.setErrCode(null);
		
		WebListData listData = new WebListData();
		resultData.setResult(listData);
		if(success){
			listData.setRows(data);
			listData.setTotalNum(data.size());
			resultData.setMessage(null);
		} else {
			listData.setRows(new ArrayList<Object>());
			listData.setTotalNum(0);
			resultData.setMessage(message);
		}
		
		return resultData;
	}
	
	public static WebOneResult convertWebResult (Object resultObj, boolean success, String message) {
		
		WebOneResult result = new WebOneResult();
		result.setErrCode(null);
		result.setMessage(message);
		result.setSuccess(success);
		result.setResult(resultObj);
		return result;		
	}

	public static String convertDataFormat(Timestamp date) {
		
		if (date == null) {
			return "";
		} else {
			return convertDataFormat(new Date(date.getTime()));
		}
	}
	
	public static String convertDataFormat(Date date) {
		if( date == null )
		{
			return "";
		} else {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			return dateFormat.format(date);
		}
	}
}

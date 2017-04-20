package works.processor.utils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import works.processor.web.domain.WebListData;
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
	
	public static WebResult convertWebListResult(List data) {
		return convertWebListResult(data, true, null);
	}

	public static WebResult convertWebListResult(List data, boolean success, String message) {
		WebResult resultData = new WebResult();
		resultData.setSuccess(success);
		
		WebListData listData = new WebListData();
		resultData.setResult(listData);
		if(success){
			listData.setRows(data);
			listData.setTotalNum(data.size());
		} else {
			listData.setRows(new ArrayList());
			listData.setTotalNum(0);
			resultData.setMessage(message);
		}
		
		return resultData;
	}
}

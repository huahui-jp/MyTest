package works.processor.utils;

import java.io.PrintWriter;
import java.io.StringWriter;

public class CommonTools {

	public static String convertExceptionToString(Throwable ex) {
		
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw); 
		ex.printStackTrace(pw); 
		
		return sw.toString();
	}
}

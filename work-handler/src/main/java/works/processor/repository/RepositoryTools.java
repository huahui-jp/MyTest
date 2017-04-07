package works.processor.repository;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RepositoryTools implements ApplicationContextAware {

	private static ApplicationContext applicationContext;
	
	public  void setApplicationContext(ApplicationContext context) {
		   applicationContext = context;
	}
	
	public static Object getDAO(Class classname) {
		try{
			Object _restTemplate = applicationContext.getBean(classname);
			return _restTemplate;
		}catch(Exception e){
			return "";
		}
	}
}

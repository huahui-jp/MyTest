package works.processor;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("self")
public class MyConfig {

	private String abc;
	
	public String getAbc() {
		return abc;
	}

	public void setAbc(String abc) {
		this.abc = abc;
	}

	public String getDef() {
		return def;
	}

	public void setDef(String def) {
		this.def = def;
	}

	private String def;
}

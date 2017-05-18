package works.processor.web.domain;

public class WebResult {
	
	private boolean success; 
	
	private String message;
	
	private String errCode;
	
	public String getErrCode() {
		return errCode;
	}

	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}

	private WebListData result;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public WebListData getResult() {
		return result;
	}

	public void setResult(WebListData result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

package works.processor.data;

import java.util.LinkedList;
import java.util.Queue;

public class JobStatus {

	private boolean isRunning = false;
	
	private boolean isWaitting = false;
	
	private boolean hasError;
	
	private String errorMessage;
	
	private int updateCnt;
	
	private int errorCnt;
	
	protected  Queue<String> queue = new LinkedList<String>();

	public Queue<String> getQueue() {
		return queue;
	}

	public void setQueue(Queue<String> queue) {
		this.queue = queue;
	}

	public boolean isHasError() {
		return hasError;
	}

	public void setHasError(boolean hasError) {
		this.hasError = hasError;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
		if(this.errorMessage.length() > 2000){
			this.errorMessage = this.errorMessage.substring(0, 1999);
		}
	}

	public boolean isRunning() {
		return isRunning;
	}

	public void setRunning(boolean isRunning) {
		this.isRunning = isRunning;
	}
	
	public int getWaitDataCnt() {
		return queue.size();
	}

	public boolean isWaitting() {
		return isWaitting;
	}

	public void setWaitting(boolean isWaitting) {
		this.isWaitting = isWaitting;
	}

	public int getUpdateCnt() {
		return updateCnt;
	}

	public void setUpdateCnt(int updateCnt) {
		this.updateCnt = updateCnt;
	}

	public int getErrorCnt() {
		return errorCnt;
	}

	public void setErrorCnt(int errorCnt) {
		this.errorCnt = errorCnt;
	}
	
	
}

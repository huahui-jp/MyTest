package works.processor.data;

public abstract class ActionJobThread extends Thread {

	public static final int SAFE = 0;
	
	public static final int WARNNING = 1;
	
	
	private boolean needStop = false;

	protected JobStatus jobStatus;
	
	abstract int doAction(String param) throws Throwable;
	
	abstract void doError(String param, Throwable ex);

	abstract int doStart();
	
	abstract int doStop();

	public JobStatus getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(JobStatus jobStatus) {
		this.jobStatus = jobStatus;
	}

	public int pushData(String message)	{
		jobStatus.getQueue().offer(message);
		
		if( !jobStatus.isRunning() )
		{
			this.resume();
		}
		
		if(jobStatus.getQueue().size() > 1000)
		{
			return WARNNING;
		}
		else
		{
			return SAFE;
		}
		
	}

	public void increaseUpdateCnt() {
		
		jobStatus.setUpdateCnt(jobStatus.getUpdateCnt() + 1);
	}

	public int startJob() {
		
		if(jobStatus.isWaitting() || jobStatus.isRunning())
		{
			return 0;
		}

		int result = doStart();
		
		if (0 == result) {
			jobStatus.setWaitting(true);
			this.start();
		}

		return result;
	}

	public void stopJob() {
		
		if( !jobStatus.isWaitting() && !jobStatus.isRunning() )
		{
			return;
		}
		
		if( jobStatus.isRunning() )
		{
			return;
		}
		
		int result = doStop();
		if( 0 == result )
		{
			jobStatus.setWaitting(false);
			jobStatus.setRunning(false);
		}
		
		needStop = true;
		this.resume();
	}

    public void run()
    {
    	String message;
    	int result;

        try{
              while(!needStop)
              {
          		jobStatus.setRunning(true);

          		while((message = jobStatus.getQueue().poll())!=null)
                {
          			try
          			{
	                    System.out.println("Do Action:" + message);
	                	result = doAction(message);
	                	if( result == 0 ) {
	                		increaseUpdateCnt();
	                	}
	                		
          			} catch (Throwable ex) {
          				doError(message, ex);
          			}
                }

                 //队列为空，这里进行挂起线程操作
                 System.out.println("挂起");
                 jobStatus.setRunning(false);
                 this.suspend();
                
              }  
              
              System.out.println("Finish...");
        } catch(Exception e) {         
            System.out.println("JudgeThread Error");     
        }  
    }
}

package works.processor.data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import works.processor.domain.ActionJob;
import works.processor.domain.ActionJobHistory;
import works.processor.domain.ColumnMapping;
import works.processor.domain.Resource;
import works.processor.domain.TableMapping;
import works.processor.utils.DaoTools;
import works.processor.web.ActionJobDAO;
import works.processor.web.ActionJobHistoryDAO;
import works.processor.web.ColumnMappingDAO;
import works.processor.web.ResourceDAO;
import works.processor.web.TableMappingDAO;

public class ActionJobManager {

	private static ActionJobManager manager = null;
	
	private List<ActionJobThread> jobList = new ArrayList<ActionJobThread>();

	public static ActionJobManager getInstance() {
		if (manager == null)
		{
			manager = new ActionJobManager();
		}
		
		return manager;
	}

	public int startJob(int actionJobId, String type) {

		ActionJobDAO dao = (ActionJobDAO) DaoTools.getDAO(ActionJobDAO.class);
		ActionJob actionJob = dao.findOne(actionJobId);
		if( actionJob == null ) {
			return -1;
		}

		for( int i = 0; i < jobList.size(); i++)
		{
			if( jobList.get(i) instanceof DbActionJobThread )
			{
				if (((DbJobStatus) jobList.get(i).getJobStatus()).getActionJob().getActionJobId() == actionJobId)
				{
					return 0;
				}
			}
		}

		ActionJobHistoryDAO jobHistoryDao = (ActionJobHistoryDAO) DaoTools.getDAO(ActionJobHistoryDAO.class);
		ActionJobHistory history = new ActionJobHistory();
		history.setActionJobHistoryId(null);
		history.setActionJobId(actionJobId);
		history.setStartTime(new Timestamp(System.currentTimeMillis()));
		history.setErrorCnt(0);
		history.setUpdateCnt(0);
		history.setDeleteFlg("0");
		jobHistoryDao.save(history);
		
		TableMappingDAO mappingDao = (TableMappingDAO) DaoTools.getDAO(TableMappingDAO.class);
		TableMapping tableMapping = mappingDao.findOne(actionJob.getTableMappingId());
		if( tableMapping == null ) {
			
			history.setStartError("表Map关系不存在。。");
			history.setEndTime(new Timestamp(System.currentTimeMillis()));
			jobHistoryDao.save(history);
			return -1;
		}
		
		ResourceDAO resourceDao = (ResourceDAO) DaoTools.getDAO(ResourceDAO.class);
		Resource resource = resourceDao.findOne(tableMapping.getResourceId());
		if( resource == null ) {
			history.setStartError("资源不存在。。");
			history.setEndTime(new Timestamp(System.currentTimeMillis()));
			jobHistoryDao.save(history);
			return -1;
		}
			

		ColumnMappingDAO columnMappingDao = (ColumnMappingDAO) DaoTools.getDAO(ColumnMappingDAO.class);
		List<ColumnMapping> columnMappings = columnMappingDao.findByTableMappingId(actionJob.getTableMappingId());
		if( columnMappings == null || columnMappings.size() == 0) {
			
			history.setStartError("列Map关系不存在。。");
			history.setEndTime(new Timestamp(System.currentTimeMillis()));
			jobHistoryDao.save(history);
			return -1;
		}

		DbJobStatus jobStatus = new DbJobStatus();
		jobStatus.setActionJob(actionJob);
		jobStatus.setTableMapping(tableMapping);
		jobStatus.setColumnMappintList(columnMappings);
		jobStatus.setResource(resource);

		DbActionJobThread jobThread = new DbActionJobThread();
		jobThread.setJobStatus(jobStatus);

		if( jobThread.startJob() != 0 )
		{
			history.setStartError(jobStatus.getErrorMessage());
			history.setEndTime(new Timestamp(System.currentTimeMillis()));
			jobHistoryDao.save(history);
			return -1;			
		} else {
			jobList.add(jobThread);
		}

		return 0;
	}

	private void updateJobFinishInfo(int actionJobId, int updateCnt, int errorCnt, String errorMessage) {

		ActionJobHistoryDAO jobHistoryDao = (ActionJobHistoryDAO) DaoTools.getDAO(ActionJobHistoryDAO.class);
		List<ActionJobHistory> jobHistoryList = jobHistoryDao.findByActionJobId(actionJobId);
		
		for(int i = 0; i < jobHistoryList.size(); i++ ) {

			if(jobHistoryList.get(i).getStartTime() != null){
				
				jobHistoryList.get(i).setStartError(errorMessage);
				jobHistoryList.get(i).setEndTime(new Timestamp(System.currentTimeMillis()));
				jobHistoryDao.save(jobHistoryList.get(i));
			}
		}
	}

	public int stopJob(int actionJobId) {
		
		for( int i = 0; i < jobList.size(); i++)
		{
			if( jobList.get(i) instanceof DbActionJobThread )
			{
				if (((DbJobStatus) jobList.get(i).getJobStatus()).getActionJob().getActionJobId() == actionJobId)
				{
					jobList.get(i).stopJob();
					updateJobFinishInfo(actionJobId, 
							jobList.get(i).getJobStatus().getUpdateCnt(), 
							jobList.get(i).getJobStatus().getErrorCnt(),
							jobList.get(i).getJobStatus().getErrorMessage());
					
					jobList.remove(i);
					break;
				}
			}
		}

		return 0;
	}

	public int addData(String channelName, String data) {

		for( int i = 0; i < jobList.size(); i++)
		{
			if( jobList.get(i) instanceof DbActionJobThread )
			{
				if (((DbJobStatus) jobList.get(i).getJobStatus()).getActionJob().getMessageChannelName().equals(channelName))
				{
					jobList.get(i).pushData(data);
					return 0;
				}
			}
		}
		
		return -1;
	}

	public int addData(int actionJobId, String data) {
		
		for( int i = 0; i < jobList.size(); i++)
		{
			if( jobList.get(i) instanceof DbActionJobThread )
			{
				if (((DbJobStatus) jobList.get(i).getJobStatus()).getActionJob().getActionJobId() == actionJobId)
				{
					jobList.get(i).pushData(data);
					return 0;
				}
			}
		}

		return -1;
	}
	
	public ActionJobThread getRunningActiongJob(String channelName) {
		
		for (int i = 0; i < jobList.size(); i++ ) {
			if(((DbJobStatus)jobList.get(i).getJobStatus()).getActionJob().getMessageChannelName().equals(channelName)) {
				return jobList.get(i);
			}
		}
		
		return null;
	}
}

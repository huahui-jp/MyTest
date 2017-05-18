package works.processor.web;

import static org.junit.Assert.*;

import java.util.List;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import works.processor.WorkHandlerFlow;
import works.processor.domain.Resource;
import works.processor.domain.TableMapping;
import works.processor.repository.IResource;
import works.processor.repository.ITableMapping;
import works.processor.repository.RespositoryStore;
import works.processor.web.domain.WebResult;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = WorkHandlerFlow.class)
public class ViewControlTest {

	@Autowired
	private RespositoryStore storeDao;
	
	@Autowired
	private ViewControl control;
	
	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testGetResource() {
		/*
		IResource resourceRepo = storeDao.getResourceDAO();
		
		Resource resource = new Resource();
		resource.setDbLink("jdbc:h2:file:~/.h2/testdb");
		resource.setDbUser("sa");
		resource.setDbPasswd("sa");
		resource.setDeleteFlg("0");
		resource.setResourceFlg("1");
		resource.setResourceName("人员管理库");
		resource.setResourceType("0");
		resourceRepo.save(resource);
		
		resource = control.getResource(resource.getResourceId());
		
		assertNotNull(resource);
		
		resourceRepo.delete(resource);
		
		resource = control.getResource(resource.getResourceId());
		
		assertNull(resource);*/
	}

	@Test
	public void testGetResourceList() {
		IResource resourceRepo = storeDao.getResourceDAO();
		
		Resource resource = new Resource();
		resource.setResourceId(null);
		resource.setDbLink("jdbc:h2:file:~/.h2/testdb");
		resource.setDbUser("sa");
		resource.setDbPasswd("sa");
		resource.setDeleteFlg("0");
		resource.setResourceFlg("1");
		resource.setResourceName("人员管理库1");
		resource.setResourceType("0");
		resourceRepo.save(resource);
		
		resource.setResourceId(null);
		resource.setDbLink("jdbc:h2:file:~/.h2/testdb");
		resource.setDbUser("sa");
		resource.setDbPasswd("sa");
		resource.setDeleteFlg("0");
		resource.setResourceFlg("0");
		resource.setResourceName("人员管理库2");
		resource.setResourceType("0");
		resourceRepo.save(resource);

		resource.setResourceId(null);
		resource.setDbLink("jdbc:h2:file:~/.h2/testdb");
		resource.setDbUser("sa");
		resource.setDbPasswd("sa");
		resource.setDeleteFlg("1");
		resource.setResourceFlg("0");
		resource.setResourceName("人员管理库3");
		resource.setResourceType("0");
		resourceRepo.save(resource);

		resource.setResourceId(null);
		resource.setDbLink("jdbc:h2:file:~/.h2/testdb");
		resource.setDbUser("sa");
		resource.setDbPasswd("sa");
		resource.setDeleteFlg("1");
		resource.setResourceFlg("1");
		resource.setResourceName("人员管理库4");
		resource.setResourceType("0");
		resourceRepo.save(resource);
		
		resource.setResourceId(null);
		resource.setDbLink("jdbc:h2:file:~/.h2/testdb");
		resource.setDbUser("sa");
		resource.setDbPasswd("sa");
		resource.setDeleteFlg("0");
		resource.setResourceFlg("1");
		resource.setResourceName("人员管理库5");
		resource.setResourceType("0");
		resourceRepo.save(resource);
	
		/*
		WebResult result = control.getResourceList("0", "0", null, null);
		assertEquals(result.getResult().getTotalNum(), 1);
		assertEquals(result.isSuccess(), true);
		assertNull(result.getMessage());
		
		result = control.getResourceList("0", "0", "2", null);
		assertEquals(result.getResult().getTotalNum(), 1);
		
		result = control.getResourceList("0", "0", "1", null);
		assertEquals(result.getResult().getTotalNum(), 0);
		
		result = control.getResourceList("0", "0", "2", "0");
		assertEquals(result.getResult().getTotalNum(), 1);
		assertEquals(((ResourceView)result.getResult().getRows().get(0)).isHasChild(), false);
		
		ITableMapping tableRepo = storeDao.getTableMappingDAO();
		TableMapping tableMapping = new TableMapping();
		tableMapping.setResourceId(((ResourceView)result.getResult().getRows().get(0)).getResourceId());
		tableMapping.setDeleteFlg("0");
		tableMapping.setTableMappingId(null);
		tableMapping.setTableName("test");
		tableMapping.setTableNameView("testName");
		tableRepo.save(tableMapping);
		
		result = control.getResourceList("0", "0", "2", "0");
		assertEquals(result.getResult().getTotalNum(), 1);
		assertEquals(((ResourceView)result.getResult().getRows().get(0)).isHasChild(), true);
		
		
		result = control.getResourceList("0", "0", "2", "1");
		assertEquals(result.getResult().getTotalNum(), 0);
		*/
		resourceRepo.deleteAll();
		//tableRepo.deleteAll();
	}

	@Test
	public void testGetTableMapping() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetTableMappingList() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetColumnMapping() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetColumnMappingList() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetActionJob() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetActionJobHistory() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetActionJobList() {
		fail("Not yet implemented");
	}

}

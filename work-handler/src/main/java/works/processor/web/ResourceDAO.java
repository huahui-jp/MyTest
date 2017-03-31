package works.processor.web;

import java.util.List;

import works.processor.domain.Resource;

public interface ResourceDAO extends CommonValidDAO<Resource, Integer> {
	List<Resource> findByResourceFlgAndDeleteFlg(String resourceFlg, String deleteFlg);
}

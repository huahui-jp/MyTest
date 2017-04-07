package works.processor.web;

import java.util.List;

import works.processor.domain.Resource;

public interface IResource extends ICommonValid<Resource, Integer> {
	List<Resource> findByResourceFlgAndDeleteFlg(String resourceFlg, String deleteFlg);
}

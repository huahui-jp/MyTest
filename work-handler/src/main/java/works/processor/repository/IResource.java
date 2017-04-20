package works.processor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import works.processor.domain.Resource;

public interface IResource extends ICommonValid<Resource, Integer>, JpaSpecificationExecutor<Resource> {
	List<Resource> findByResourceFlgAndDeleteFlg(String resourceFlg, String deleteFlg);
}

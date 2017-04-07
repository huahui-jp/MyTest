package works.processor.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

//防止实例化（没有指定类型，实例化会失败）
@NoRepositoryBean
public interface ICommonValid<T, ID extends Serializable> extends JpaRepository<T, ID> {

	List<T> findByDeleteFlg(String deleteFlg);
}

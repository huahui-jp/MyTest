package works.processor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="resource")
public class Resource {

	public static final String RESOURCE_TYPE_DB = "01";
	
	public static final String RESOURCE_TYPE_GEMFIRE = "02";

	// 资源ID
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer resourceId;

	// 资源名
	@Column(nullable=false, length=200)
	private String resourceName;
	
	// 资源种类
	@Column(nullable=false, length=2)
	private String resourceType;

	// 资源区分(0:来源数据源, 1:对象数据源
	@Column(nullable=false, length=1)
	private String resourceFlg;

	// 数据库连接URL
	@Column(nullable=true, length=200)
	private String dbLink;
	
	// 数据库类型用户名
	@Column(nullable=true, length=20)
	private String dbUser;
	
	// 数据库类型用户密码
	@Column(nullable=true, length=20)
	private String dbPasswd;

	// 删除FLG
	@Column(nullable=false, length=1)
	private String deleteFlg;

	public String getResourceFlg() {
		return resourceFlg;
	}

	public void setResourceFlg(String resourceFlg) {
		this.resourceFlg = resourceFlg;
	}

	public Integer getResourceId() {
		return resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public String getDbLink() {
		return dbLink;
	}

	public void setDbLink(String dbLink) {
		this.dbLink = dbLink;
	}

	public String getDbUser() {
		return dbUser;
	}

	public void setDbUser(String dbUser) {
		this.dbUser = dbUser;
	}

	public String getDbPasswd() {
		return dbPasswd;
	}

	public void setDbPasswd(String dBPasswd) {
		dbPasswd = dBPasswd;
	}

	public String getDeleteFlg() {
		return deleteFlg;
	}

	public void setDeleteFlg(String deleteFlg) {
		this.deleteFlg = deleteFlg;
	}

	public Resource()
	{
	}

    @JsonCreator
    public Resource(@JsonProperty("ResourceId") Integer resourId,
                    @JsonProperty("ResourceName") String resourceName,
                    @JsonProperty("ResourceType") String resourceType,
                    @JsonProperty("DBLink") String dbLink,
                    @JsonProperty("DBUser") String dbUser,
                    @JsonProperty("DBPasswd") String dbPasswd,
                    @JsonProperty("DeleteFlg") String deleteFlg) {
        this.resourceId = resourId;
        this.resourceName = resourceName;
        this.resourceType = resourceType;
        this.dbLink = dbLink;
        this.dbUser = dbUser;
        this.dbPasswd = dbPasswd;
    }
}

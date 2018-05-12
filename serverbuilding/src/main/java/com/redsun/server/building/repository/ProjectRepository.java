
package com.redsun.server.building.repository;

import com.redsun.server.building.model.Project ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>, JpaSpecificationExecutor<Project> {

	
	@Modifying
	@Query("UPDATE Project project SET project.idlock = :idlock, project.lockdate = CURRENT_TIMESTAMP() WHERE project.id = :id AND ((project.idlock = null AND project.lockdate = null) OR (project.lockdate != null AND EXTRACT(EPOCH FROM(CURRENT_TIMESTAMP() - project.lockdate)) > :timeout))")
	Integer updateLock(@Param("id") Integer id, @Param("idlock") Integer idlock, @Param("timeout") Integer timeout);

	@Modifying
	@Query("UPDATE Project project SET project.idlock = null, project.lockdate = null WHERE project.id = :id")
	Integer updateUnlock(@Param("id") Integer id);
	
	@Modifying
	@Query("SELECT COUNT(project) > 0  FROM Project project WHERE project.id = :id AND project.idlock = :idlock")
	Boolean updateCheckLock(@Param("id") Integer id, @Param("idlock") Integer idlock);
	
	@Query("SELECT new map (project.idcreate as idcreate, project.idowner as idowner) FROM Project project WHERE project.id = :id")
	List<Map<String, Object>> getAuthorizePropertiesById(@Param("id") Integer id);
	
	@Query(value="SELECT new map(project.id as value, project.name as display) FROM Project project WHERE project.status != :deleteStatus")
	List<Map<String, Object>> listForSelect(@Param("deleteStatus") Integer deleteStatus);

}

package com.redsun.server.building.repository;

import com.redsun.server.building.model.Functionrole ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface FunctionroleRepository extends JpaRepository<Functionrole, Integer>, JpaSpecificationExecutor<Functionrole> {

	
	@Modifying
	@Query("UPDATE Functionrole functionrole SET functionrole.idlock = :idlock, functionrole.lockdate = CURRENT_TIMESTAMP() WHERE functionrole.id = :id AND ((functionrole.idlock = null AND functionrole.lockdate = null) OR (functionrole.lockdate != null AND EXTRACT(EPOCH FROM(CURRENT_TIMESTAMP() - functionrole.lockdate)) > :timeout))")
	Integer updateLock(@Param("id") Integer id, @Param("idlock") Integer idlock, @Param("timeout") Integer timeout);

	@Modifying
	@Query("UPDATE Functionrole functionrole SET functionrole.idlock = null, functionrole.lockdate = null WHERE functionrole.id = :id")
	Integer updateUnlock(@Param("id") Integer id);
	
	@Modifying
	@Query("SELECT COUNT(functionrole) > 0  FROM Functionrole functionrole WHERE functionrole.id = :id AND functionrole.idlock = :idlock")
	Boolean updateCheckLock(@Param("id") Integer id, @Param("idlock") Integer idlock);
	
	@Query("SELECT new map (functionrole.idcreate as idcreate, functionrole.idowner as idowner) FROM Functionrole functionrole WHERE functionrole.id = :id")
	List<Map<String, Object>> getAuthorizePropertiesById(@Param("id") Integer id);
	
	@Query(value="SELECT new map(functionrole.id as value, functionrole.name as display) FROM Functionrole functionrole WHERE functionrole.status != :deleteStatus")
	List<Map<String, Object>> listForSelect(@Param("deleteStatus") Integer deleteStatus);

}
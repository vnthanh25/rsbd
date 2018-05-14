
package com.redsun.server.building.repository;

import com.redsun.server.building.model.Type ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface TypeRepository extends JpaRepository<Type, Integer>, JpaSpecificationExecutor<Type> {

	
	@Modifying
	@Query("UPDATE Type type SET type.idlock = :idlock, type.lockdate = CURRENT_TIMESTAMP() WHERE type.id = :id AND ((type.idlock = null AND type.lockdate = null) OR (type.lockdate != null AND EXTRACT(EPOCH FROM(CURRENT_TIMESTAMP() - type.lockdate)) > :timeout))")
	Integer updateLock(@Param("id") Integer id, @Param("idlock") Integer idlock, @Param("timeout") Integer timeout);

	@Modifying
	@Query("UPDATE Type type SET type.idlock = null, type.lockdate = null WHERE type.id = :id")
	Integer updateUnlock(@Param("id") Integer id);
	
	@Modifying
	@Query("SELECT COUNT(type) > 0  FROM Type type WHERE type.id = :id AND type.idlock = :idlock")
	Boolean updateCheckLock(@Param("id") Integer id, @Param("idlock") Integer idlock);
	
	@Query("SELECT new map (type.idcreate as idcreate, type.idowner as idowner) FROM Type type WHERE type.id = :id")
	List<Map<String, Object>> getAuthorizePropertiesById(@Param("id") Integer id);
	
	@Query(value="SELECT new map(type.id as value, type.name as display) FROM Type type WHERE type.status != :deleteStatus")
	List<Map<String, Object>> listForSelect(@Param("deleteStatus") Integer deleteStatus);
	
	@Query(value="SELECT new map(type.id as value, type.name as display) FROM Type type WHERE type.scope = :scope AND type.status != :deleteStatus")
	List<Map<String, Object>> listForSelectByScope(@Param("scope") String scope, @Param("deleteStatus") Integer deleteStatus);

}
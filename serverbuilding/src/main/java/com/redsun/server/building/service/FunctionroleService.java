
package com.redsun.server.building.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redsun.server.building.model.Functionrole;
import com.redsun.server.building.model.common.SearchCriteria;

public interface FunctionroleService {

	/**
	 * Saves (create or update) the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return
	 */
	Functionrole save(Functionrole functionrole);

	/**
	 * Create the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return
	 */
	Functionrole create(Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException;

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param id
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	Integer updateLock(Integer id) throws JsonParseException, JsonMappingException, IOException;

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param id
	 * @param idlock
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	Integer updateUnlock(Integer id) throws JsonParseException, JsonMappingException, IOException;

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	Functionrole update(Integer id, Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException;

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	Functionrole updateWithLock(Integer id, Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException;

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	Functionrole updateForDelete(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException;

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	Functionrole updateForDeleteWithLock(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException;

	
	/**
	 * Deletes the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param functionrole
	 * @return true if found and deleted, false if not found
	 */
	void delete(Functionrole functionrole);

	/**
	 * Deletes the entity by its Primary Key <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param id
	 * @return true if found and deleted, false if not found
	 */
	void deleteById(Integer id);

	/**
	 * Loads the entity for the given Primary Key <br>
	 * @param id
	 * @return the entity loaded (or null if not found)
	 */
	Functionrole getById(Integer id);

	/**
	 * Loads ALL the entities (use with caution)
	 * @return
	 */
	List<Functionrole> listAll();

	/**
	 * Count all the occurrences
	 * @return
	 */
	long countAll();

	/**
	 * Check exist
	 * @return
	 */
	boolean isExist(Integer id);
	/**
	 * Search by multiple criteria.
	 * @return
	 */
	List<Functionrole> listWithCriteras(List<SearchCriteria> searchCriterias);

	/**
	 * Search by multiple criteria by page.
	 * @return
	 */
	Page<Functionrole> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable);

	/**
	 * Loads ALL the entities for select.
	 * @return
	 */
	List<Map<String, Object>> listForSelect();

	
}

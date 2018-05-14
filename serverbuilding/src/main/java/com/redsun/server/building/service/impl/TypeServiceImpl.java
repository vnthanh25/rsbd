

package com.redsun.server.building.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redsun.server.building.common.Constant;
import com.redsun.server.building.controller.common.ServerException;
import com.redsun.server.building.model.Type;
import com.redsun.server.building.model.History;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.TypeRepository;
import com.redsun.server.building.repository.HistoryRepository;
import com.redsun.server.building.repository.specification.TypeSpecification;
import com.redsun.server.building.repository.specification.TypeSpecificationsBuilder;
import com.redsun.server.building.service.TypeService;
import com.redsun.server.building.util.SecurityUtil;

@Service("type")
@Transactional
public class TypeServiceImpl implements TypeService {
	
	@Autowired
	private HistoryRepository historyRepository;

	@Autowired
	private TypeRepository typeRepository;
	
	@Autowired
	private TypeSpecificationsBuilder typeSpecificationsBuilder;

	@Override
	public Type save(Type type) {
		return typeRepository.save(type);
	}

	@Override
	public Type create(Type type) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Current date;
		Date currentDate = new Date();
		type.setStatus(Constant.SERVERDB_STATUS_NEW);
		type.setIdcreate(iduser);
		type.setCreatedate(currentDate);
		type.setIdowner(iduser);
		type.setIdupdate(iduser);
		type.setUpdatedate(currentDate);
		type.setVersion(1);
		return typeRepository.save(type);
	}

	@Override
	public Integer updateLock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Update lock.
		Integer result = typeRepository.updateLock(id, iduser, Constant.SERVERDB_lOCKTIMEOUT);
		if(result == 0) {
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		}
		return result;		
	}
	
	@Override
	public Integer updateUnlock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Update lock.
		Integer result = typeRepository.updateUnlock(id);
		if(result == 0) {
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		}
		return result;
	}
	
	private Map<String, Object> updatePre(Map<String, Object> params) throws JsonParseException, JsonMappingException, IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		// Get value from params.
		Integer iduser = (Integer) params.get("iduser");
		Integer id = (Integer) params.get("id");
		Integer version = (Integer) params.get("version");
		Type type = (Type) params.get("type");
		// Get from DB.
		Type typeDb = typeRepository.findOne(id);
		if(typeDb == null) { // not exist.
			throw new ServerException(Constant.SERVERCODE_NOTEXISTID);
		} else if(typeDb.getIdlock() != iduser) { // locked.
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		} else if (typeDb.getVersion() != version) { // version difference.
			throw new ServerException(Constant.SERVERCODE_VERSIONDIFFERENCE);
		} else {
			// Keep history data.
			String historyStr = typeDb.toString();
			// Increase version.
			typeDb.setVersion(typeDb.getVersion() + 1);
			// return.
			result.put("typeDb", typeDb);
			result.put("historyStr", historyStr);
			return result;
		}
	}

	private Map<String, Object> updatePost(Map<String, Object> params) {
		Map<String, Object> result = new HashMap<String, Object>();
		// Get value from params.
		Integer id = (Integer) params.get("id");
		String historyStr = (String) params.get("historyStr");
		// Save history.
		History history = new History(id, "type", historyStr);
		historyRepository.save(history);
		// return.
		return result;
	}
	
	@Override
	public Type update(Integer id, Type type) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", type.getVersion());
		params.put("type", type);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Type typeDb = (Type) resultPre.get("typeDb");
		// Ignore properties.
		String[] ignoreProperties = new String[] { "status", "idcreate", "idowner", "idupdate", "iddelete", "idlock", "createdate", "updatedate", "deletedate", "lockdate", "version" };
		// Copy data.
		BeanUtils.copyProperties(type, typeDb, ignoreProperties);
		Date currentDate = new Date();
		typeDb.setStatus(Constant.SERVERDB_STATUS_UPDATE);
		typeDb.setIdupdate(iduser);
		typeDb.setUpdatedate(currentDate);
		typeDb.setIdowner(iduser);
		// Save.
		typeDb = typeRepository.save(typeDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return typeDb;
	}

	@Override
	public Type updateWithLock(Integer id, Type type) throws JsonParseException, JsonMappingException, IOException {
		Type result = null;
		// Lock to update.
		updateLock(id);
		// Update.
		result = update(id, type);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}
	
	@Override
	public Type updateForDelete(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", version);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Type typeDb = (Type) resultPre.get("typeDb");
		Date currentDate = new Date();
		typeDb.setStatus(Constant.SERVERDB_STATUS_DELETE);
		typeDb.setIddelete(iduser);
		typeDb.setDeletedate(currentDate);
		// Save.
		typeDb = typeRepository.save(typeDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return typeDb;
	}

	@Override
	public Type updateForDeleteWithLock(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		Type result = null;
		// Lock to update.
		updateLock(id);
		// Update data.
		result = updateForDelete(id, version);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}


	@Override
	public void delete(Type type) {
		typeRepository.delete(type);
	}

	@Override
	public void deleteById(Integer id) {
		typeRepository.delete(id);
	}

	@Override
	public Type getById(Integer id) {
		return typeRepository.findOne(id);
	}

	@Override
	public List<Type> listAll() {
		return typeRepository.findAll();
	}

	@Override
	public long countAll() {
		return typeRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return typeRepository.exists(id);
	}

	/**
	 * Loads ALL the entities for select.
	 * @return
	 */
	public List<Map<String, Object>> listForSelect() {
		return typeRepository.listForSelect(Constant.SERVERDB_STATUS_DELETE);
	}

	/**
	 * Loads ALL the entities for select.
	 * @return
	 */
	public List<Map<String, Object>> listForSelectByScope(String scope) {
		return typeRepository.listForSelectByScope(scope, Constant.SERVERDB_STATUS_DELETE);
	}
	
	public List<Type> listWithCriterias(List<SearchCriteria> searchCriterias) {
        Specification<Type> typeSpecification = typeSpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Type> notDeleteSpec = new TypeSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		typeSpecification = Specifications.where(typeSpecification).and(notDeleteSpec);
		// Execute.
        List<Type> result = typeRepository.findAll(typeSpecification);
        return result;
	}
	
	public List<Type> listWithCriteriasByScope(String scope, List<SearchCriteria> searchCriterias) {
        Specification<Type> typeSpecification = typeSpecificationsBuilder.build(searchCriterias);
		// Where scope.
		Specification<Type> scopeSpec = new TypeSpecification(new SearchCriteria("scope", "=", scope));
		// Where status != delete.
		Specification<Type> notDeleteSpec = new TypeSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		typeSpecification = Specifications.where(typeSpecification).and(scopeSpec).and(notDeleteSpec);
		// Execute.
        List<Type> result = typeRepository.findAll(typeSpecification);
        return result;
	}
	
	public Page<Type> listWithCriteriasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Type> typeSpecification = typeSpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Type> notDeleteSpec = new TypeSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		typeSpecification = Specifications.where(typeSpecification).and(notDeleteSpec);
		// Execute.
		Page<Type> result = typeRepository.findAll(typeSpecification, pageable);
        return result;
	}
	
	public Page<Type> listWithCriteriasByScopeAndPage(String scope, List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Type> typeSpecification = typeSpecificationsBuilder.build(searchCriterias);
		// Where scope.
		Specification<Type> scopeSpec = new TypeSpecification(new SearchCriteria("scope", "=", scope));
		// Where status != delete.
		Specification<Type> notDeleteSpec = new TypeSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		typeSpecification = Specifications.where(typeSpecification).and(scopeSpec).and(notDeleteSpec);
		// Execute.
		Page<Type> result = typeRepository.findAll(typeSpecification, pageable);
        return result;
	}

}

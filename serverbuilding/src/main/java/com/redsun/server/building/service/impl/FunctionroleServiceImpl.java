

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
import com.redsun.server.building.model.Functionrole;
import com.redsun.server.building.model.History;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.FunctionroleRepository;
import com.redsun.server.building.repository.HistoryRepository;
import com.redsun.server.building.repository.specification.FunctionroleSpecification;
import com.redsun.server.building.repository.specification.FunctionroleSpecificationsBuilder;
import com.redsun.server.building.service.FunctionroleService;
import com.redsun.server.building.util.SecurityUtil;

@Service("functionrole")
@Transactional
public class FunctionroleServiceImpl implements FunctionroleService {
	
	@Autowired
	private HistoryRepository historyRepository;

	@Autowired
	private FunctionroleRepository functionroleRepository;
	
	@Autowired
	private FunctionroleSpecificationsBuilder functionroleSpecificationsBuilder;

	@Override
	public Functionrole save(Functionrole functionrole) {
		return functionroleRepository.save(functionrole);
	}

	@Override
	public Functionrole create(Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Current date;
		Date currentDate = new Date();
		functionrole.setStatus(Constant.SERVERDB_STATUS_NEW);
		functionrole.setIdcreate(iduser);
		functionrole.setCreatedate(currentDate);
		functionrole.setIdowner(iduser);
		functionrole.setIdupdate(iduser);
		functionrole.setUpdatedate(currentDate);
		functionrole.setVersion(1);
		return functionroleRepository.save(functionrole);
	}

	@Override
	public Integer updateLock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Update lock.
		Integer result = functionroleRepository.updateLock(id, iduser, Constant.SERVERDB_lOCKTIMEOUT);
		if(result == 0) {
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		}
		return result;		
	}
	
	@Override
	public Integer updateUnlock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Update lock.
		Integer result = functionroleRepository.updateUnlock(id);
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
		Functionrole functionrole = (Functionrole) params.get("functionrole");
		// Get from DB.
		Functionrole functionroleDb = functionroleRepository.findOne(id);
		if(functionroleDb == null) { // not exist.
			throw new ServerException(Constant.SERVERCODE_NOTEXISTID);
		} else if(functionroleDb.getIdlock() != iduser) { // locked.
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		} else if (functionroleDb.getVersion() != version) { // version difference.
			throw new ServerException(Constant.SERVERCODE_VERSIONDIFFERENCE);
		} else {
			// Keep history data.
			String historyStr = functionroleDb.toString();
			// Increase version.
			functionroleDb.setVersion(functionroleDb.getVersion() + 1);
			// return.
			result.put("functionroleDb", functionroleDb);
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
		History history = new History(id, "functionrole", historyStr);
		historyRepository.save(history);
		// return.
		return result;
	}
	
	@Override
	public Functionrole update(Integer id, Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", functionrole.getVersion());
		params.put("functionrole", functionrole);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Functionrole functionroleDb = (Functionrole) resultPre.get("functionroleDb");
		// Ignore properties.
		String[] ignoreProperties = new String[] { "status", "idcreate", "idowner", "idupdate", "iddelete", "idlock", "createdate", "updatedate", "deletedate", "lockdate", "version" };
		// Copy data.
		BeanUtils.copyProperties(functionrole, functionroleDb, ignoreProperties);
		Date currentDate = new Date();
		functionroleDb.setStatus(Constant.SERVERDB_STATUS_UPDATE);
		functionroleDb.setIdupdate(iduser);
		functionroleDb.setUpdatedate(currentDate);
		functionroleDb.setIdowner(iduser);
		// Save.
		functionroleDb = functionroleRepository.save(functionroleDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return functionroleDb;
	}

	@Override
	public Functionrole updateWithLock(Integer id, Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = null;
		// Lock to update.
		updateLock(id);
		// Update.
		result = update(id, functionrole);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}
	
	@Override
	public Functionrole updateForDelete(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", version);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Functionrole functionroleDb = (Functionrole) resultPre.get("functionroleDb");
		Date currentDate = new Date();
		functionroleDb.setStatus(Constant.SERVERDB_STATUS_DELETE);
		functionroleDb.setIddelete(iduser);
		functionroleDb.setDeletedate(currentDate);
		// Save.
		functionroleDb = functionroleRepository.save(functionroleDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return functionroleDb;
	}

	@Override
	public Functionrole updateForDeleteWithLock(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = null;
		// Lock to update.
		updateLock(id);
		// Update data.
		result = updateForDelete(id, version);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}


	@Override
	public void delete(Functionrole functionrole) {
		functionroleRepository.delete(functionrole);
	}

	@Override
	public void deleteById(Integer id) {
		functionroleRepository.delete(id);
	}

	@Override
	public Functionrole getById(Integer id) {
		return functionroleRepository.findOne(id);
	}

	@Override
	public List<Functionrole> listAll() {
		return functionroleRepository.findAll();
	}

	@Override
	public long countAll() {
		return functionroleRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return functionroleRepository.exists(id);
	}
	
	public List<Functionrole> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Functionrole> functionroleSpecification = functionroleSpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Functionrole> notDeleteSpec = new FunctionroleSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		functionroleSpecification = Specifications.where(functionroleSpecification).and(notDeleteSpec);
		// Execute.
        List<Functionrole> result = functionroleRepository.findAll(functionroleSpecification);
        return result;
	}
	
	public Page<Functionrole> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Functionrole> functionroleSpecification = functionroleSpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Functionrole> notDeleteSpec = new FunctionroleSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		functionroleSpecification = Specifications.where(functionroleSpecification).and(notDeleteSpec);
		// Execute.
		Page<Functionrole> result = functionroleRepository.findAll(functionroleSpecification, pageable);
        return result;
	}

	public List<Map<String, Object>> listForSelect() {
		return functionroleRepository.listForSelect(Constant.SERVERDB_STATUS_DELETE);
	}

}

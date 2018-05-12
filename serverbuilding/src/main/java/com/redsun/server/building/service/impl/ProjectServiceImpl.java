

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
import com.redsun.server.building.model.History;
import com.redsun.server.building.model.Project;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.HistoryRepository;
import com.redsun.server.building.repository.ProjectRepository;
import com.redsun.server.building.repository.specification.ProjectSpecification;
import com.redsun.server.building.repository.specification.ProjectSpecificationsBuilder;
import com.redsun.server.building.service.ProjectService;
import com.redsun.server.building.util.SecurityUtil;

@Service("project")
@Transactional
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private HistoryRepository historyRepository;

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectSpecificationsBuilder projectSpecificationsBuilder;

	@Override
	public Project save(Project project) {
		return projectRepository.save(project);
	}

	@Override
	public Project create(Project project) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Current date;
		Date currentDate = new Date();
		project.setStatus(Constant.SERVERDB_STATUS_NEW);
		project.setIdcreate(iduser);
		project.setCreatedate(currentDate);
		project.setIdowner(iduser);
		project.setIdupdate(iduser);
		project.setUpdatedate(currentDate);
		project.setVersion(1);
		return projectRepository.save(project);
	}

	@Override
	public Integer updateLock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Update lock.
		Integer result = projectRepository.updateLock(id, iduser, Constant.SERVERDB_lOCKTIMEOUT);
		if(result == 0) {
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		}
		return result;		
	}
	
	@Override
	public Integer updateUnlock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Update lock.
		Integer result = projectRepository.updateUnlock(id);
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
		Project project = (Project) params.get("project");
		// Get from DB.
		Project projectDb = projectRepository.findOne(id);
		if(projectDb == null) { // not exist.
			throw new ServerException(Constant.SERVERCODE_NOTEXISTID);
		} else if(projectDb.getIdlock() != iduser) { // locked.
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		} else if (projectDb.getVersion() != version) { // version difference.
			throw new ServerException(Constant.SERVERCODE_VERSIONDIFFERENCE);
		} else {
			// Keep history data.
			String historyStr = projectDb.toString();
			// Increase version.
			projectDb.setVersion(projectDb.getVersion() + 1);
			// return.
			result.put("projectDb", projectDb);
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
		History history = new History(id, "project", historyStr);
		historyRepository.save(history);
		// return.
		return result;
	}
	
	@Override
	public Project update(Integer id, Project project) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", project.getVersion());
		params.put("project", project);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Project projectDb = (Project) resultPre.get("projectDb");
		// Ignore properties.
		String[] ignoreProperties = new String[] { "status", "idcreate", "idowner", "idupdate", "iddelete", "idlock", "createdate", "updatedate", "deletedate", "lockdate", "version" };
		// Copy data.
		BeanUtils.copyProperties(project, projectDb, ignoreProperties);
		Date currentDate = new Date();
		projectDb.setStatus(Constant.SERVERDB_STATUS_UPDATE);
		projectDb.setIdupdate(iduser);
		projectDb.setUpdatedate(currentDate);
		projectDb.setIdowner(iduser);
		// Save.
		projectDb = projectRepository.save(projectDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return projectDb;
	}

	@Override
	public Project updateWithLock(Integer id, Project project) throws JsonParseException, JsonMappingException, IOException {
		Project result = null;
		// Lock to update.
		updateLock(id);
		// Update.
		result = update(id, project);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}
	
	@Override
	public Project updateForDelete(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", version);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Project projectDb = (Project) resultPre.get("projectDb");
		Date currentDate = new Date();
		projectDb.setStatus(Constant.SERVERDB_STATUS_DELETE);
		projectDb.setIddelete(iduser);
		projectDb.setDeletedate(currentDate);
		// Save.
		projectDb = projectRepository.save(projectDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return projectDb;
	}

	@Override
	public Project updateForDeleteWithLock(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		Project result = null;
		// Lock to update.
		updateLock(id);
		// Update data.
		result = updateForDelete(id, version);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}


	@Override
	public void delete(Project project) {
		projectRepository.delete(project);
	}

	@Override
	public void deleteById(Integer id) {
		projectRepository.delete(id);
	}

	@Override
	public Project getById(Integer id) {
		return projectRepository.findOne(id);
	}

	@Override
	public List<Project> listAll() {
		return projectRepository.findAll();
	}

	@Override
	public long countAll() {
		return projectRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return projectRepository.exists(id);
	}
	
	public List<Project> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Project> projectSpecification = projectSpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Project> notDeleteSpec = new ProjectSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		projectSpecification = Specifications.where(projectSpecification).and(notDeleteSpec);
		// Execute.
        List<Project> result = projectRepository.findAll(projectSpecification);
        return result;
	}
	
	public Page<Project> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Project> projectSpecification = projectSpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Project> notDeleteSpec = new ProjectSpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		projectSpecification = Specifications.where(projectSpecification).and(notDeleteSpec);
		// Execute.
		Page<Project> result = projectRepository.findAll(projectSpecification, pageable);
        return result;
	}

	public List<Map<String, Object>> listForSelect() {
		return projectRepository.listForSelect(Constant.SERVERDB_STATUS_DELETE);
	}

}



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
import com.redsun.server.building.model.Activity;
import com.redsun.server.building.model.History;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.ActivityRepository;
import com.redsun.server.building.repository.HistoryRepository;
import com.redsun.server.building.repository.specification.ActivitySpecification;
import com.redsun.server.building.repository.specification.ActivitySpecificationsBuilder;
import com.redsun.server.building.service.ActivityService;
import com.redsun.server.building.util.SecurityUtil;

@Service("activity")
@Transactional
public class ActivityServiceImpl implements ActivityService {
	
	@Autowired
	private HistoryRepository historyRepository;

	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private ActivitySpecificationsBuilder activitySpecificationsBuilder;

	@Override
	public Activity save(Activity activity) {
		return activityRepository.save(activity);
	}

	@Override
	public Activity create(Activity activity) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Current date;
		Date currentDate = new Date();
		activity.setStatus(Constant.SERVERDB_STATUS_NEW);
		activity.setIdcreate(iduser);
		activity.setCreatedate(currentDate);
		activity.setIdowner(iduser);
		activity.setIdupdate(iduser);
		activity.setUpdatedate(currentDate);
		activity.setVersion(1);
		return activityRepository.save(activity);
	}

	@Override
	public Integer updateLock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Update lock.
		Integer result = activityRepository.updateLock(id, iduser, Constant.SERVERDB_lOCKTIMEOUT);
		if(result == 0) {
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		}
		return result;		
	}
	
	@Override
	public Integer updateUnlock(Integer id) throws JsonParseException, JsonMappingException, IOException {
		// Update lock.
		Integer result = activityRepository.updateUnlock(id);
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
		Activity activity = (Activity) params.get("activity");
		// Get from DB.
		Activity activityDb = activityRepository.findOne(id);
		if(activityDb == null) { // not exist.
			throw new ServerException(Constant.SERVERCODE_NOTEXISTID);
		} else if(activityDb.getIdlock() != iduser) { // locked.
			throw new ServerException(Constant.SERVERCODE_LOCKED);
		} else if (activityDb.getVersion() != version) { // version difference.
			throw new ServerException(Constant.SERVERCODE_VERSIONDIFFERENCE);
		} else {
			// Keep history data.
			String historyStr = activityDb.toString();
			// Increase version.
			activityDb.setVersion(activityDb.getVersion() + 1);
			// return.
			result.put("activityDb", activityDb);
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
		History history = new History(id, "activity", historyStr);
		historyRepository.save(history);
		// return.
		return result;
	}
	
	@Override
	public Activity update(Integer id, Activity activity) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", activity.getVersion());
		params.put("activity", activity);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Activity activityDb = (Activity) resultPre.get("activityDb");
		// Ignore properties.
		String[] ignoreProperties = new String[] { "status", "idcreate", "idowner", "idupdate", "iddelete", "idlock", "createdate", "updatedate", "deletedate", "lockdate", "version" };
		// Copy data.
		BeanUtils.copyProperties(activity, activityDb, ignoreProperties);
		Date currentDate = new Date();
		activityDb.setStatus(Constant.SERVERDB_STATUS_UPDATE);
		activityDb.setIdupdate(iduser);
		activityDb.setUpdatedate(currentDate);
		activityDb.setIdowner(iduser);
		// Save.
		activityDb = activityRepository.save(activityDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return activityDb;
	}

	@Override
	public Activity updateWithLock(Integer id, Activity activity) throws JsonParseException, JsonMappingException, IOException {
		Activity result = null;
		// Lock to update.
		updateLock(id);
		// Update.
		result = update(id, activity);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}
	
	@Override
	public Activity updateForDelete(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		// Get iduser.
		Integer iduser = SecurityUtil.getIdUser();
		// Pre update.
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("iduser", iduser);
		params.put("id", id);
		params.put("version", version);
		Map<String, Object> resultPre = updatePre(params);
		// Update data.
		Activity activityDb = (Activity) resultPre.get("activityDb");
		Date currentDate = new Date();
		activityDb.setStatus(Constant.SERVERDB_STATUS_DELETE);
		activityDb.setIddelete(iduser);
		activityDb.setDeletedate(currentDate);
		// Save.
		activityDb = activityRepository.save(activityDb);
		// Post update.
		params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("historyStr", resultPre.get("historyStr"));
		updatePost(params);
		// return.
		return activityDb;
	}

	@Override
	public Activity updateForDeleteWithLock(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		Activity result = null;
		// Lock to update.
		updateLock(id);
		// Update data.
		result = updateForDelete(id, version);
		// Unlock of update.
		updateUnlock(id);
		return result;
	}


	@Override
	public void delete(Activity activity) {
		activityRepository.delete(activity);
	}

	@Override
	public void deleteById(Integer id) {
		activityRepository.delete(id);
	}

	@Override
	public Activity getById(Integer id) {
		return activityRepository.findOne(id);
	}

	@Override
	public List<Activity> listAll() {
		return activityRepository.findAll();
	}

	@Override
	public long countAll() {
		return activityRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return activityRepository.exists(id);
	}

	@Override
	public List<Map<String, Object>> listForSelect() {
		return activityRepository.listForSelect(Constant.SERVERDB_STATUS_DELETE);
	}
	
	public List<Activity> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Activity> activitySpecification = activitySpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Activity> notDeleteSpec = new ActivitySpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		activitySpecification = Specifications.where(activitySpecification).and(notDeleteSpec);
		// Execute.
        List<Activity> result = activityRepository.findAll(activitySpecification);
        return result;
	}
	
	public Page<Activity> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Activity> activitySpecification = activitySpecificationsBuilder.build(searchCriterias);
		// Where status != delete.
		Specification<Activity> notDeleteSpec = new ActivitySpecification(new SearchCriteria("status", "!=", Constant.SERVERDB_STATUS_DELETE));
		activitySpecification = Specifications.where(activitySpecification).and(notDeleteSpec);
		// Execute.
		Page<Activity> result = activityRepository.findAll(activitySpecification, pageable);
        return result;
	}

}

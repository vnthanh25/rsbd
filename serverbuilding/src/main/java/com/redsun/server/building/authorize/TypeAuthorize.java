
package com.redsun.server.building.authorize;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redsun.server.building.controller.TypeRestController;
import com.redsun.server.building.model.Type;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.TypeRepository;
import com.redsun.server.building.util.SecurityUtil;

@Component("typeAuthorize")
public class TypeAuthorize {

	public static final Logger logger = LoggerFactory.getLogger(TypeRestController.class);

	@Autowired
	PermissionAuthorize permissionAuthorize;
	
	@Autowired
	TypeRepository typeRepository;

	public boolean canCreate(Type type) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;
		Integer iduser = SecurityUtil.getIdUser();
		result = permissionAuthorize.isCreate("type", iduser);

		return result;
	}

	public boolean canRead(Integer id) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}
	
	public boolean canUpdate(Type type) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}

	public boolean canUpdateId(Integer id) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}

	public boolean canUpdateForDelete(Integer id, Integer version) throws JsonParseException, JsonMappingException, IOException {
		return canUpdateId(id);
	}

	public boolean canDelete(Integer id) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}

	public boolean canList(List<SearchCriteria> searchCriterias) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}

}

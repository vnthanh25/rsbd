
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
import com.redsun.server.building.controller.FunctionroleRestController;
import com.redsun.server.building.model.Functionrole;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.FunctionroleRepository;
import com.redsun.server.building.util.SecurityUtil;

@Component("functionroleAuthorize")
public class FunctionroleAuthorize {

	public static final Logger logger = LoggerFactory.getLogger(FunctionroleRestController.class);

	@Autowired
	PermissionAuthorize permissionAuthorize;
	
	@Autowired
	FunctionroleRepository functionroleRepository;

	public boolean canCreate(Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}

	public boolean canRead(Integer id) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}
	
	public boolean canUpdate(Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
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

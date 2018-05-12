
package com.redsun.server.building.authorize;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redsun.server.building.controller.ProjectRestController;
import com.redsun.server.building.model.Project;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.repository.ProjectRepository;

@Component("projectAuthorize")
public class ProjectAuthorize {

	public static final Logger logger = LoggerFactory.getLogger(ProjectRestController.class);

	@Autowired
	PermissionAuthorize permissionAuthorize;
	
	@Autowired
	ProjectRepository projectRepository;

	public boolean canCreate(Project project) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}

	public boolean canRead(Integer id) throws JsonParseException, JsonMappingException, IOException {
		boolean result = true;

		return result;
	}
	
	public boolean canUpdate(Project project) throws JsonParseException, JsonMappingException, IOException {
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


package com.redsun.server.building.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redsun.server.building.model.Project;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.service.ProjectService;

@RestController
@RequestMapping("/project")
public class ProjectRestController {

	//public static final Logger logger = LoggerFactory.getLogger(ProjectRestController.class);

	@Autowired
	ProjectService projectService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Project-------------------------------------------

	@PreAuthorize("@projectAuthorize.canCreate(#project)")
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Project project) throws JsonParseException, JsonMappingException, IOException {
		Project result = projectService.create(project);
		// return.
		return new ResponseEntity<Integer>(result.getId(), HttpStatus.OK);
	}

	// -------------------Update lock a Project------------------------------------------------

	@PreAuthorize("@projectAuthorize.canUpdate(#project)")
	@RequestMapping(value = "/updateLock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateLock(@PathVariable("id") Integer id) throws JsonParseException, JsonMappingException, IOException {
		Integer result = projectService.updateLock(id);
		// return.
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	// -------------------Update Unlock a Project------------------------------------------------

	@PreAuthorize("@projectAuthorize.canUpdate(#project)")
	@RequestMapping(value = "/updateUnlock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUnlock(@PathVariable("id") Integer id) throws JsonParseException, JsonMappingException, IOException {
		Integer result = projectService.updateUnlock(id);
		// return.
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	// -------------------Update a Project------------------------------------------------

	@PreAuthorize("@projectAuthorize.canUpdate(#project)")
	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Project project) throws JsonParseException, JsonMappingException, IOException {
		Project result = projectService.update(id, project);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update a Project With Lock------------------------------------------------

	@PreAuthorize("@projectAuthorize.canUpdate(#project)")
	@RequestMapping(value = "/updateWithLock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateWithLock(@PathVariable("id") Integer id, @RequestBody Project project) throws JsonParseException, JsonMappingException, IOException {
		Project result = projectService.updateWithLock(id, project);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update For Delete------------------------------------------------

	@PreAuthorize("@projectAuthorize.canUpdateForDelete(#id, #version)")
	@RequestMapping(value = "/updateForDelete/{id}/{version}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateForDelete(@PathVariable("id") Integer id, @PathVariable("version") Integer version) throws JsonParseException, JsonMappingException, IOException {
		Project result = projectService.updateForDelete(id, version);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update For Delete With Lock------------------------------------------------

	@PreAuthorize("@projectAuthorize.canUpdateForDelete(#id, #version)")
	@RequestMapping(value = "/updateForDeleteWithLock/{id}/{version}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateForDeleteWithLock(@PathVariable("id") Integer id, @PathVariable("version") Integer version) throws JsonParseException, JsonMappingException, IOException {
		Project result = projectService.updateForDeleteWithLock(id, version);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Delete a Project-----------------------------------------

	@PreAuthorize("@projectAuthorize.canDelete(#id)")
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		projectService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	// -------------------Retrieve Single Project------------------------------------------

	@PreAuthorize("@projectAuthorize.canRead(#id)")
	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		Project project = projectService.getById(id);
		// return.
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Projects With Many Criteria------------------------------------------
	
	@PreAuthorize("@projectAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		List<Project> projects = projectService.listWithCriteras(searchCriterias);
		// return.
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Projects With Multiple Criteria By Page------------------------------------------
	
	@PreAuthorize("@projectAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		Page<Project> projects = projectService.listWithCriterasByPage(searchCriterias, pageable);
		// return.
		return new ResponseEntity<Page<Project>>(projects, HttpStatus.OK);
	}
	
	// -------------------------Retrieve All Project For Select--------------------------------------------------- 
	
	@RequestMapping(value = "/listForSelect", method = RequestMethod.GET)
	public ResponseEntity<List<Map<String, Object>>> listForSelect() {
		List<Map<String, Object>> result = projectService.listForSelect();
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}

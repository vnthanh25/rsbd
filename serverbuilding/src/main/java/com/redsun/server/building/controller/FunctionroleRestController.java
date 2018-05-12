
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
import com.redsun.server.building.model.Functionrole;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.service.FunctionroleService;

@RestController
@RequestMapping("/functionrole")
public class FunctionroleRestController {

	//public static final Logger logger = LoggerFactory.getLogger(FunctionroleRestController.class);

	@Autowired
	FunctionroleService functionroleService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Functionrole-------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canCreate(#functionrole)")
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = functionroleService.create(functionrole);
		// return.
		return new ResponseEntity<Integer>(result.getId(), HttpStatus.OK);
	}

	// -------------------Update lock a Functionrole------------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canUpdate(#functionrole)")
	@RequestMapping(value = "/updateLock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateLock(@PathVariable("id") Integer id) throws JsonParseException, JsonMappingException, IOException {
		Integer result = functionroleService.updateLock(id);
		// return.
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	// -------------------Update Unlock a Functionrole------------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canUpdate(#functionrole)")
	@RequestMapping(value = "/updateUnlock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUnlock(@PathVariable("id") Integer id) throws JsonParseException, JsonMappingException, IOException {
		Integer result = functionroleService.updateUnlock(id);
		// return.
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	// -------------------Update a Functionrole------------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canUpdate(#functionrole)")
	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = functionroleService.update(id, functionrole);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update a Functionrole With Lock------------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canUpdate(#functionrole)")
	@RequestMapping(value = "/updateWithLock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateWithLock(@PathVariable("id") Integer id, @RequestBody Functionrole functionrole) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = functionroleService.updateWithLock(id, functionrole);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update For Delete------------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canUpdateForDelete(#id, #version)")
	@RequestMapping(value = "/updateForDelete/{id}/{version}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateForDelete(@PathVariable("id") Integer id, @PathVariable("version") Integer version) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = functionroleService.updateForDelete(id, version);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update For Delete With Lock------------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canUpdateForDelete(#id, #version)")
	@RequestMapping(value = "/updateForDeleteWithLock/{id}/{version}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateForDeleteWithLock(@PathVariable("id") Integer id, @PathVariable("version") Integer version) throws JsonParseException, JsonMappingException, IOException {
		Functionrole result = functionroleService.updateForDeleteWithLock(id, version);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Delete a Functionrole-----------------------------------------

	@PreAuthorize("@functionroleAuthorize.canDelete(#id)")
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		functionroleService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	// -------------------Retrieve Single Functionrole------------------------------------------

	@PreAuthorize("@functionroleAuthorize.canRead(#id)")
	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		Functionrole functionrole = functionroleService.getById(id);
		// return.
		return new ResponseEntity<Functionrole>(functionrole, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Functionroles With Many Criteria------------------------------------------
	
	@PreAuthorize("@functionroleAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		List<Functionrole> functionroles = functionroleService.listWithCriteras(searchCriterias);
		// return.
		return new ResponseEntity<List<Functionrole>>(functionroles, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Functionroles With Multiple Criteria By Page------------------------------------------
	
	@PreAuthorize("@functionroleAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		Page<Functionrole> functionroles = functionroleService.listWithCriterasByPage(searchCriterias, pageable);
		// return.
		return new ResponseEntity<Page<Functionrole>>(functionroles, HttpStatus.OK);
	}
	
	// -------------------------Retrieve All Functionrole For Select--------------------------------------------------- 
	
	@RequestMapping(value = "/listForSelect", method = RequestMethod.GET)
	public ResponseEntity<List<Map<String, Object>>> listForSelect() {
		List<Map<String, Object>> result = functionroleService.listForSelect();
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}

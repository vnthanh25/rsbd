
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
import com.redsun.server.building.model.Type;
import com.redsun.server.building.model.common.SearchCriteria;
import com.redsun.server.building.service.TypeService;

@RestController
@RequestMapping("/type")
public class TypeRestController {

	//public static final Logger logger = LoggerFactory.getLogger(TypeRestController.class);

	@Autowired
	TypeService typeService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Type-------------------------------------------

	@PreAuthorize("@typeAuthorize.canCreate(#type)")
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Type type) throws JsonParseException, JsonMappingException, IOException {
		Type result = typeService.create(type);
		// return.
		return new ResponseEntity<Integer>(result.getId(), HttpStatus.OK);
	}

	// -------------------Update lock a Type------------------------------------------------

	@PreAuthorize("@typeAuthorize.canUpdate(#type)")
	@RequestMapping(value = "/updateLock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateLock(@PathVariable("id") Integer id) throws JsonParseException, JsonMappingException, IOException {
		Integer result = typeService.updateLock(id);
		// return.
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	// -------------------Update Unlock a Type------------------------------------------------

	@PreAuthorize("@typeAuthorize.canUpdate(#type)")
	@RequestMapping(value = "/updateUnlock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUnlock(@PathVariable("id") Integer id) throws JsonParseException, JsonMappingException, IOException {
		Integer result = typeService.updateUnlock(id);
		// return.
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	// -------------------Update a Type------------------------------------------------

	@PreAuthorize("@typeAuthorize.canUpdate(#type)")
	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Type type) throws JsonParseException, JsonMappingException, IOException {
		Type result = typeService.update(id, type);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update a Type With Lock------------------------------------------------

	@PreAuthorize("@typeAuthorize.canUpdate(#type)")
	@RequestMapping(value = "/updateWithLock/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateWithLock(@PathVariable("id") Integer id, @RequestBody Type type) throws JsonParseException, JsonMappingException, IOException {
		Type result = typeService.updateWithLock(id, type);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update For Delete------------------------------------------------

	@PreAuthorize("@typeAuthorize.canUpdateForDelete(#id, #version)")
	@RequestMapping(value = "/updateForDelete/{id}/{version}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateForDelete(@PathVariable("id") Integer id, @PathVariable("version") Integer version) throws JsonParseException, JsonMappingException, IOException {
		Type result = typeService.updateForDelete(id, version);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Update For Delete With Lock------------------------------------------------

	@PreAuthorize("@typeAuthorize.canUpdateForDelete(#id, #version)")
	@RequestMapping(value = "/updateForDeleteWithLock/{id}/{version}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateForDeleteWithLock(@PathVariable("id") Integer id, @PathVariable("version") Integer version) throws JsonParseException, JsonMappingException, IOException {
		Type result = typeService.updateForDeleteWithLock(id, version);
		// return.
		return new ResponseEntity<Integer>(result.getVersion(), HttpStatus.OK);
	}

	// -------------------Delete a Type-----------------------------------------

	@PreAuthorize("@typeAuthorize.canDelete(#id)")
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		typeService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	// -------------------Retrieve Single Type------------------------------------------

	@PreAuthorize("@typeAuthorize.canRead(#id)")
	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		Type type = typeService.getById(id);
		// return.
		return new ResponseEntity<Type>(type, HttpStatus.OK);
	}
	
	// -------------------------Retrieve All Type For Select--------------------------------------------------- 
	
	@RequestMapping(value = "/listForSelect", method = RequestMethod.GET)
	public ResponseEntity<List<Map<String, Object>>> listForSelect() {
		List<Map<String, Object>> result = typeService.listForSelect();
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
	// -------------------------Retrieve All Type For Select By Scope--------------------------------------------------- 
	
	@RequestMapping(value = "/listForSelectByScope/{scope}", method = RequestMethod.GET)
	public ResponseEntity<List<Map<String, Object>>> listForSelectByScope(@PathVariable("scope") String scope) {
		List<Map<String, Object>> result = typeService.listForSelectByScope(scope);
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With Many Criteria------------------------------------------
	
	@PreAuthorize("@typeAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		List<Type> types = typeService.listWithCriterias(searchCriterias);
		// return.
		return new ResponseEntity<List<Type>>(types, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With Many Criteria By Scope------------------------------------------
	
	@PreAuthorize("@typeAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriteriasByScope/{scope}", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByScope(@PathVariable("scope") String scope, @RequestBody List<SearchCriteria> searchCriterias) {
		List<Type> types = typeService.listWithCriteriasByScope(scope, searchCriterias);
		// return.
		return new ResponseEntity<List<Type>>(types, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With Multiple Criteria By Page------------------------------------------
	
	@PreAuthorize("@typeAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		Page<Type> types = typeService.listWithCriteriasByPage(searchCriterias, pageable);
		// return.
		return new ResponseEntity<Page<Type>>(types, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With Multiple Criteria By Scope And Page------------------------------------------
	
	@PreAuthorize("@typeAuthorize.canList(#searchCriterias)")
	@RequestMapping(value = "/listWithCriteriasByScopeAndPage/{scope}", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByScopeAndPage(@PathVariable("scope") String scope, @RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		Page<Type> types = typeService.listWithCriteriasByScopeAndPage(scope, searchCriterias, pageable);
		// return.
		return new ResponseEntity<Page<Type>>(types, HttpStatus.OK);
	}

}

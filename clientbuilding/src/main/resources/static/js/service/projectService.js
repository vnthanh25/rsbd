

/**
 * Service for Project
 **/

define(['require', 'angular'], function (require, angular) {
app.aService(clientbuilding.prefix + 'projectService', function($http, $rootScope) {
	
	// Create.
	this.create = function(project) {
		var serverUrl = clientbuilding.serverUrl + '/project/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: project
				}
		return $http(request);
	}
	
	// Update Lock.
	this.updateLock = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/project/updateLock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update Unlock.
	this.updateUnlock = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/project/updateUnlock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(id, project) {
		var serverUrl = clientbuilding.serverUrl + '/project/update/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: project
				}
		return $http(request);
	}
	
	// Update With Lock.
	this.updateWithLock = function(id, project) {
		var serverUrl = clientbuilding.serverUrl + '/project/updateWithLock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: project
				}
		return $http(request);
	}
	
	// Update For Delete.
	this.updateForDelete = function(id, version) {
		var serverUrl = clientbuilding.serverUrl + '/project/updateForDelete/' + id + '/' + version;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update For Delete With Lock.
	this.updateForDeleteWithLock = function(id, version) {
		var serverUrl = clientbuilding.serverUrl + '/project/updateForDeleteWithLock/' + id + '/' + version;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/project/delete/' + id;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(projectId) {
		var serverUrl = clientbuilding.serverUrl + '/project/getById/' + projectId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = clientbuilding.serverUrl + '/project/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
		if(typeof(sorts) !== 'undefined' && sorts.length > 0) {
			angular.forEach(sorts, function(sort) {
				serverUrl += '&' + sort;
			});
		}
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: criterias
				}
		return $http(request);
	}
	
	// List for select.
	this.listForSelect = function(){
		var serverUrl = clientbuilding.serverUrl + '/project/listForSelect';
		var request = {
				method: 'GET',
				url: serverUrl
		}
		return $http(request);
	}

});

});

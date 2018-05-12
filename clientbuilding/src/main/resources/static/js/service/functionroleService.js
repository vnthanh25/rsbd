

/**
 * Service for Functionrole
 **/

define(['require', 'angular'], function (require, angular) {
app.aService(clientbuilding.prefix + 'functionroleService', function($http, $rootScope) {
	
	// Create.
	this.create = function(functionrole) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: functionrole
				}
		return $http(request);
	}
	
	// Update Lock.
	this.updateLock = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/updateLock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update Unlock.
	this.updateUnlock = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/updateUnlock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(id, functionrole) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/update/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: functionrole
				}
		return $http(request);
	}
	
	// Update With Lock.
	this.updateWithLock = function(id, functionrole) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/updateWithLock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: functionrole
				}
		return $http(request);
	}
	
	// Update For Delete.
	this.updateForDelete = function(id, version) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/updateForDelete/' + id + '/' + version;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update For Delete With Lock.
	this.updateForDeleteWithLock = function(id, version) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/updateForDeleteWithLock/' + id + '/' + version;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/delete/' + id;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(functionroleId) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/getById/' + functionroleId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = clientbuilding.serverUrl + '/functionrole/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
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
		var serverUrl = clientbuilding.serverUrl + '/functionrole/listForSelect';
		var request = {
				method: 'GET',
				url: serverUrl
		}
		return $http(request);
	}

});

});

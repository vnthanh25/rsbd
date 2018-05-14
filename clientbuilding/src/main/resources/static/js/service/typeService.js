

/**
 * Service for Type
 **/

define(['require', 'angular'], function (require, angular) {
app.aService(clientbuilding.prefix + 'typeService', function($http, $rootScope) {
	
	// Create.
	this.create = function(type) {
		var serverUrl = clientbuilding.serverUrl + '/type/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: type
				}
		return $http(request);
	}
	
	// Update Lock.
	this.updateLock = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/type/updateLock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update Unlock.
	this.updateUnlock = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/type/updateUnlock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(id, type) {
		var serverUrl = clientbuilding.serverUrl + '/type/update/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: type
				}
		return $http(request);
	}
	
	// Update With Lock.
	this.updateWithLock = function(id, type) {
		var serverUrl = clientbuilding.serverUrl + '/type/updateWithLock/' + id;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: type
				}
		return $http(request);
	}
	
	// Update For Delete.
	this.updateForDelete = function(id, version) {
		var serverUrl = clientbuilding.serverUrl + '/type/updateForDelete/' + id + '/' + version;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Update For Delete With Lock.
	this.updateForDeleteWithLock = function(id, version) {
		var serverUrl = clientbuilding.serverUrl + '/type/updateForDeleteWithLock/' + id + '/' + version;
		var request = {
				 method: 'PUT',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(id) {
		var serverUrl = clientbuilding.serverUrl + '/type/delete/' + id;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(typeId) {
		var serverUrl = clientbuilding.serverUrl + '/type/getById/' + typeId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all user for select.
	this.listForSelectByScope = function(scope){
		var serverUrl = clientbuilding.serverUrl + '/type/listForSelectByScope/' + scope;
		var request = {
				method: 'GET',
				url: serverUrl
		}
		return $http(request);
	}
	
	// List by scope and page and filter.
	this.listWithCriteriasByScopeAndPage = function(scope, criterias, pageNo, pageSize, sorts) {
		var serverUrl = clientbuilding.serverUrl + '/type/listWithCriteriasByScopeAndPage/' + scope + '?page=' + pageNo + '&size=' + pageSize;
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

});

});

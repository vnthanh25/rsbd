
/**
 * Controller for Userrole
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/userroleService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'userroleController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', clientbuilding.prefix + 'userroleService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, userroleService) {
		if(typeof(clientbuilding.translate.userrole) === 'undefined' || clientbuilding.translate.userrole.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.userrole) === 'undefined') {
				clientbuilding.translate.userrole = '';
			}
			clientbuilding.translate.userrole += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/userrole');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_userrole_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_userrole_title');
	    	$translate.refresh();
	    });
		
	    // Search.
	    $scope.search = {};
	    
		// Paging.
		$scope.page = {
			pageSize: 3,
			totalElements: 0,
			currentPage: 0
		}
		
		$scope.userrole = {};
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage(1);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.userrole.id = id;
			if($scope.userrole.id > -1) {
				$scope.getById($scope.userrole.id);
			}
			$scope.frmDirty = false;
		}
		
		// Show a create screen.
		$scope.showCreate = function() {
			$scope.initForm(-1);
			$scope.showDialog();
		}
		
		// Show a form screen.
		$scope.showForm = function(id) {
			$scope.initForm(id);
			$scope.showDialog();
		}

	    // Show edit view.
	    $scope.showDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/userrole_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.userrole = { id: -1 };
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// iduser.
		    $scope.frmUserrole.iduser.$setPristine();
			$scope.frmUserrole.iduser.$setUntouched();
			// idrole.
		    $scope.frmUserrole.idrole.$setPristine();
			$scope.frmUserrole.idrole.$setUntouched();

		    // form.
			$scope.frmUserrole.$setPristine();
			$scope.frmUserrole.$setUntouched();
			// frmDirty.
			$scope.frmDirty = false;
		}
		
		// Create on form.
		$scope.createOnForm = function() {
			$scope.createNew();
			$scope.resetValidate();
		}
		
		// Save.
		$scope.save = function() {
			if($scope.frmUserrole.$invalid) {
				$scope.frmUserrole.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage($translate.instant('clientbuilding_home_saving'), 'alert-success', false);
			var result;
			if($scope.userrole.id > -1) {
				result = userroleService.updateWithLock($scope.userrole.id, $scope.userrole);
			} else {
				result = userroleService.create($scope.userrole);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.userrole.id > -1) {
						$scope.userrole.version = response.data;
					} else {
						$scope.userrole.id = response.data;
						$scope.userrole.version = 1;
					}
					$scope.showMessage($translate.instant('clientbuilding_home_saved'), 'alert-success', true);
					$scope.listWithCriteriasByPage(1);
				} else {
					if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmUserrole.scope.$invalid = true;
						$scope.showMessage($translate.instant('clientbuilding_servercode_' + response.data.code), 'alert-danger', false);
					} else if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessage($translate.instant('clientbuilding_servercode_' + response.data.code), 'alert-danger', false);
					} else {
						$scope.showMessage($translate.instant('clientbuilding_home_fail'), 'alert-danger', true);
					}
				}
			},
			// error.
			function(response) {
				$scope.showMessage($translate.instant('clientbuilding_home_error'), 'alert-danger', true);
			});
		}
		
		// Delete.
		$scope.delete = function(id, version) {
			if($window.confirm('Are you sure to delete?')) {
				userroleService.updateForDeleteWithLock(id, version)
				// success.
				.then(function(response) {
					if(response.status === httpStatus.code.OK) {
						$scope.showMessage('Deleted!', 'alert-success', true);
						$scope.listWithCriteriasByPage(1);
					} else {
						$scope.showMessage($translate.instant('clientbuilding_home_fail'), 'alert-danger', true);
					}
				},
				// error.
				function(response) {
					$scope.showMessage($translate.instant('clientbuilding_home_error'), 'alert-danger', true);
				});
			}
		}
		
		// Delete with create.
		$scope.deleteOnForm = function() {
			if($window.confirm('Are you sure to delete?')) {
				userroleService.updateForDeleteWithLock($scope.userrole.id, $scope.userrole.version)
				// success.
				.then(function(response) {
					if(response.status === httpStatus.code.OK) {
						$scope.showMessage('Deleted!', 'alert-success', true);
						$scope.createNew();
						$scope.resetValidate();
						$scope.listWithCriteriasByPage(1);
					} else {
						$scope.showMessage($translate.instant('clientbuilding_home_fail'), 'alert-danger', true);
					}
				},
				// error.
				function(response) {
					$scope.showMessage($translate.instant('clientbuilding_home_error'), 'alert-danger', true);
				});
			}
		}
		
		// Get by Id.
		$scope.getById = function(id) {
			userroleService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.userrole = data;
				} else {
					$scope.showMessage($translate.instant('clientbuilding_home_fail'), 'alert-danger', true);
				}
			},
			// error.
			function(response) {
				$scope.showMessage($translate.instant('clientbuilding_home_error'), 'alert-danger', true);
			});
		}
		
		// List for page and filter.
		$scope.listWithCriteriasByPage = function(pageNo) {
			$scope.page.currentPage = pageNo;
			userroleService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.userroles = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.userroles = result;
						if(result.length > 0) {
							$scope.page.totalElements = response.data.totalElements;
						}
					}
				} else {
					$scope.showMessage($translate.instant('clientbuilding_home_fail'), 'alert-danger', true);
				}
			},
			// error.
			function(response) {
				$scope.showMessage($translate.instant('clientbuilding_home_error'), 'alert-danger', true);
			});
		}
		
		// Clear filter.
		$scope.clearFilter = function() {
			$scope.search = {};
		}

		/*Extend functions*/
		
		// Sort by.
		$scope.sortBy = function(keyName){
			$scope.sortKey = keyName;
			$scope.reverse = !$scope.reverse;
		}
		
		// Get sort object.
		$scope.getSort = function() {
			var result = [];
			// name.
		    if(typeof($scope.sortKey) !== 'undefined' && $scope.sortKey !== ''){
		    	result.push('sort=' + $scope.sortKey + ',' + $scope.reverse);
		    }
			// return.
			return result;
		}
		
		// Get search object.
		$scope.getSearch = function() {
		    var result = [];
		    if(typeof($scope.search.content) !== 'undefined' && $scope.search.content !== ''){
				// iduser.
		    	//result.push({ key: 'iduser', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idrole.
		    	//result.push({ key: 'idrole', operation: 'like', value: $scope.search.content, logic: 'or' });
		    }
		    // return.
		    return result;
		}
			
		// Show message.
		$scope.showMessage = function(message, cssName, autoHide) {
			$scope.userroleAlertMessage = message;
			$('#userroleAlertMessage').removeClass('alert-danger');
			$('#userroleAlertMessage').removeClass('alert-success');
			$('#userroleAlertMessage').addClass(cssName);
			$('#userroleAlertMessage').slideDown(500, function() {
				if(autoHide) {
					$window.setTimeout(function() {
						$('#userroleAlertMessage').slideUp(500, function() {
							$('#userroleAlertMessage').removeClass(cssName);
		            	});
					}, 1000);
				}
			});
		}
	
	}]);

});

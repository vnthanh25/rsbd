
/**
 * Controller for Role
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/roleService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'roleController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', clientbuilding.prefix + 'roleService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, roleService) {
		if(typeof(clientbuilding.translate.role) === 'undefined' || clientbuilding.translate.role.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.role) === 'undefined') {
				clientbuilding.translate.role = '';
			}
			clientbuilding.translate.role += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/role');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_role_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_role_title');
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
		
		$scope.role = {};
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage(1);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.role.id = id;
			if($scope.role.id > -1) {
				$scope.getById($scope.role.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/role_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.role = { id: -1 };
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// code.
		    $scope.frmRole.code.$setPristine();
			$scope.frmRole.code.$setUntouched();
			// name.
		    $scope.frmRole.name.$setPristine();
			$scope.frmRole.name.$setUntouched();

		    // form.
			$scope.frmRole.$setPristine();
			$scope.frmRole.$setUntouched();
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
			if($scope.frmRole.$invalid) {
				$scope.frmRole.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage($translate.instant('clientbuilding_home_saving'), 'alert-success', false);
			var result;
			if($scope.role.id > -1) {
				result = roleService.updateWithLock($scope.role.id, $scope.role);
			} else {
				result = roleService.create($scope.role);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.role.id > -1) {
						$scope.role.version = response.data;
					} else {
						$scope.role.id = response.data;
						$scope.role.version = 1;
					}
					$scope.showMessage($translate.instant('clientbuilding_home_saved'), 'alert-success', true);
					$scope.listWithCriteriasByPage(1);
				} else {
					if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmRole.scope.$invalid = true;
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
				roleService.updateForDeleteWithLock(id, version)
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
				roleService.updateForDeleteWithLock($scope.role.id, $scope.role.version)
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
			roleService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.role = data;
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
			roleService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.roles = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.roles = result;
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
				// code.
		    	//result.push({ key: 'code', operation: 'like', value: $scope.search.content, logic: 'or' });
				// name.
		    	//result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
		    }
		    // return.
		    return result;
		}
			
		// Show message.
		$scope.showMessage = function(message, cssName, autoHide) {
			$scope.roleAlertMessage = message;
			$('#roleAlertMessage').removeClass('alert-danger');
			$('#roleAlertMessage').removeClass('alert-success');
			$('#roleAlertMessage').addClass(cssName);
			$('#roleAlertMessage').slideDown(500, function() {
				if(autoHide) {
					$window.setTimeout(function() {
						$('#roleAlertMessage').slideUp(500, function() {
							$('#roleAlertMessage').removeClass(cssName);
		            	});
					}, 1000);
				}
			});
		}
	
	}]);

});

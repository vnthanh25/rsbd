
/**
 * Controller for User
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/userService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'userController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', clientbuilding.prefix + 'userService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, userService) {
		if(typeof(clientbuilding.translate.user) === 'undefined' || clientbuilding.translate.user.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.user) === 'undefined') {
				clientbuilding.translate.user = '';
			}
			clientbuilding.translate.user += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/user');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_user_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_user_title');
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
		
		$scope.user = {};
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage(1);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.user.id = id;
			if($scope.user.id > -1) {
				$scope.getById($scope.user.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/user_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.user = { id: -1 };
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idcalendar.
		    $scope.frmUser.idcalendar.$setPristine();
			$scope.frmUser.idcalendar.$setUntouched();
			// username.
		    $scope.frmUser.username.$setPristine();
			$scope.frmUser.username.$setUntouched();
			// password.
		    $scope.frmUser.password.$setPristine();
			$scope.frmUser.password.$setUntouched();
			// displayname.
		    $scope.frmUser.displayname.$setPristine();
			$scope.frmUser.displayname.$setUntouched();
			// enabled.
		    $scope.frmUser.enabled.$setPristine();
			$scope.frmUser.enabled.$setUntouched();
			// email.
		    $scope.frmUser.email.$setPristine();
			$scope.frmUser.email.$setUntouched();
			// firstname.
		    $scope.frmUser.firstname.$setPristine();
			$scope.frmUser.firstname.$setUntouched();
			// thumbnail.
		    $scope.frmUser.thumbnail.$setPristine();
			$scope.frmUser.thumbnail.$setUntouched();
			// lastname.
		    $scope.frmUser.lastname.$setPristine();
			$scope.frmUser.lastname.$setUntouched();
			// address.
		    $scope.frmUser.address.$setPristine();
			$scope.frmUser.address.$setUntouched();
			// mobile.
		    $scope.frmUser.mobile.$setPristine();
			$scope.frmUser.mobile.$setUntouched();
			// telephone.
		    $scope.frmUser.telephone.$setPristine();
			$scope.frmUser.telephone.$setUntouched();
			// scope.
		    $scope.frmUser.scope.$setPristine();
			$scope.frmUser.scope.$setUntouched();

		    // form.
			$scope.frmUser.$setPristine();
			$scope.frmUser.$setUntouched();
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
			if($scope.frmUser.$invalid) {
				$scope.frmUser.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage($translate.instant('clientbuilding_home_saving'), 'alert-success', false);
			var result;
			if($scope.user.id > -1) {
				result = userService.updateWithLock($scope.user.id, $scope.user);
			} else {
				result = userService.create($scope.user);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.user.id > -1) {
						$scope.user.version = response.data;
					} else {
						$scope.user.id = response.data;
						$scope.user.version = 1;
					}
					$scope.showMessage($translate.instant('clientbuilding_home_saved'), 'alert-success', true);
					$scope.listWithCriteriasByPage(1);
				} else {
					if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmUser.scope.$invalid = true;
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
				userService.updateForDeleteWithLock(id, version)
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
				userService.updateForDeleteWithLock($scope.user.id, $scope.user.version)
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
			userService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.user = data;
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
			userService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.users = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.users = result;
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
				// idcalendar.
		    	//result.push({ key: 'idcalendar', operation: 'like', value: $scope.search.content, logic: 'or' });
				// username.
		    	//result.push({ key: 'username', operation: 'like', value: $scope.search.content, logic: 'or' });
				// password.
		    	//result.push({ key: 'password', operation: 'like', value: $scope.search.content, logic: 'or' });
				// displayname.
		    	//result.push({ key: 'displayname', operation: 'like', value: $scope.search.content, logic: 'or' });
				// enabled.
		    	//result.push({ key: 'enabled', operation: 'like', value: $scope.search.content, logic: 'or' });
				// email.
		    	//result.push({ key: 'email', operation: 'like', value: $scope.search.content, logic: 'or' });
				// firstname.
		    	//result.push({ key: 'firstname', operation: 'like', value: $scope.search.content, logic: 'or' });
				// thumbnail.
		    	//result.push({ key: 'thumbnail', operation: 'like', value: $scope.search.content, logic: 'or' });
				// lastname.
		    	//result.push({ key: 'lastname', operation: 'like', value: $scope.search.content, logic: 'or' });
				// address.
		    	//result.push({ key: 'address', operation: 'like', value: $scope.search.content, logic: 'or' });
				// mobile.
		    	//result.push({ key: 'mobile', operation: 'like', value: $scope.search.content, logic: 'or' });
				// telephone.
		    	//result.push({ key: 'telephone', operation: 'like', value: $scope.search.content, logic: 'or' });
				// scope.
		    	//result.push({ key: 'scope', operation: 'like', value: $scope.search.content, logic: 'or' });
		    }
		    // return.
		    return result;
		}
			
		// Show message.
		$scope.showMessage = function(message, cssName, autoHide) {
			$scope.userAlertMessage = message;
			$('#userAlertMessage').removeClass('alert-danger');
			$('#userAlertMessage').removeClass('alert-success');
			$('#userAlertMessage').addClass(cssName);
			$('#userAlertMessage').slideDown(500, function() {
				if(autoHide) {
					$window.setTimeout(function() {
						$('#userAlertMessage').slideUp(500, function() {
							$('#userAlertMessage').removeClass(cssName);
		            	});
					}, 1000);
				}
			});
		}
	
	}]);

});

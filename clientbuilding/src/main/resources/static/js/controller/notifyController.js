
/**
 * Controller for Notify
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/notifyService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'notifyController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'notifyService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, notifyService) {
		if(typeof(clientbuilding.translate.notify) === 'undefined' || clientbuilding.translate.notify.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.notify) === 'undefined') {
				clientbuilding.translate.notify = '';
			}
			clientbuilding.translate.notify += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/notify');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_notify_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_notify_title');
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
		
		$scope.notify = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.notify = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage(1);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.notify.id = id;
			if($scope.notify.id > -1) {
				$scope.getById($scope.notify.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.notify.id = id;
			if($scope.notify.id > -1) {
				$scope.getById($scope.notify.id);
			}
			$scope.frmDirty = false;
		}
		
		// Show a create screen.
		$scope.showCreate = function() {
			$scope.initForm(-1);
			$scope.showFormDialog();
		}
		
		// Show a form screen.
		$scope.showForm = function(id) {
			$scope.initForm(id);
			$scope.showFormDialog();
		}
		
		// Show a view screen.
		$scope.showView = function(id) {
			$scope.initView(id);
			$scope.showViewDialog();
		}

	    // Show a form dialog.
	    $scope.showFormDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/notify_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/notify_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.notify.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idsender.
		    $scope.frmNotify.idsender.$setPristine();
			$scope.frmNotify.idsender.$setUntouched();
			// idreceiver.
		    $scope.frmNotify.idreceiver.$setPristine();
			$scope.frmNotify.idreceiver.$setUntouched();
			// idref.
		    $scope.frmNotify.idref.$setPristine();
			$scope.frmNotify.idref.$setUntouched();
			// reftype.
		    $scope.frmNotify.reftype.$setPristine();
			$scope.frmNotify.reftype.$setUntouched();
			// content.
		    $scope.frmNotify.content.$setPristine();
			$scope.frmNotify.content.$setUntouched();
			// method.
		    $scope.frmNotify.method.$setPristine();
			$scope.frmNotify.method.$setUntouched();
			// priority.
		    $scope.frmNotify.priority.$setPristine();
			$scope.frmNotify.priority.$setUntouched();
			// isactive.
		    $scope.frmNotify.isactive.$setPristine();
			$scope.frmNotify.isactive.$setUntouched();

		    // form.
			$scope.frmNotify.$setPristine();
			$scope.frmNotify.$setUntouched();
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
			if($scope.frmNotify.$invalid) {
				$scope.frmNotify.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.notify.id > -1) {
				result = notifyService.updateWithLock($scope.notify.id, $scope.notify);
			} else {
				result = notifyService.create($scope.notify);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.notify.id > -1) {
						$scope.notify.version = response.data;
					} else {
						$scope.notify.id = response.data;
						$scope.notify.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage(1);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmNotify.scope.$invalid = true;
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else {
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
					}
				}
			},
			// error.
			function(response) {
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
			});
		}
		
		// Delete.
		$scope.delete = function(id, version) {
			if($window.confirm('Are you sure to delete?')) {
				notifyService.updateForDeleteWithLock(id, version)
				// success.
				.then(function(response) {
					if(response.status === httpStatus.code.OK) {
						$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
						$scope.listWithCriteriasByPage(1);
					} else {
						$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					}
				},
				// error.
				function(response) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				});
			}
		}
		
		// Delete with create.
		$scope.deleteOnForm = function() {
			if($window.confirm('Are you sure to delete?')) {
				notifyService.updateForDeleteWithLock($scope.notify.id, $scope.notify.version)
				// success.
				.then(function(response) {
					if(response.status === httpStatus.code.OK) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
						$scope.createNew();
						$scope.resetValidate();
						$scope.listWithCriteriasByPage(1);
					} else {
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
					}
				},
				// error.
				function(response) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				});
			}
		}
		
		// Get by Id.
		$scope.getById = function(id) {
			notifyService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.notify = data;
				} else {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				}
			},
			// error.
			function(response) {
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
			});
		}
		
		// List for page and filter.
		$scope.listWithCriteriasByPage = function(pageNo) {
			$scope.page.currentPage = pageNo;
			notifyService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.notifys = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.notifys = result;
						if(result.length > 0) {
							$scope.page.totalElements = response.data.totalElements;
						}
					}
				} else {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				}
			},
			// error.
			function(response) {
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
			});
		}

		/*Extend functions*/
		
		// Clear search.
		$scope.clearSearch = function() {
			$scope.search = {};
		}
		
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
				var order = 'desc';
				if ($scope.reverse) {
					order = 'asc';
				}
				result.push('sort=' + $scope.sortKey + ',' + order);
		    }
			// return.
			return result;
		}
		
		// Get search object.
		$scope.getSearch = function() {
		    var result = [];
		    if(typeof($scope.search.content) !== 'undefined' && $scope.search.content !== ''){
				// idsender.
		    	//result.push({ key: 'idsender', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idreceiver.
		    	//result.push({ key: 'idreceiver', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idref.
		    	//result.push({ key: 'idref', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// content.
		    	//result.push({ key: 'content', operation: 'like', value: $scope.search.content, logic: 'or' });
				// method.
		    	//result.push({ key: 'method', operation: 'like', value: $scope.search.content, logic: 'or' });
				// priority.
		    	//result.push({ key: 'priority', operation: 'like', value: $scope.search.content, logic: 'or' });
				// isactive.
		    	//result.push({ key: 'isactive', operation: 'like', value: $scope.search.content, logic: 'or' });
		    }
		    // return.
		    return result;
		}
			
		//Show Message Toast List
		$scope.showMessageOnToastList = function(message){
			$mdToast.show({ 
				template: '<md-toast class="md-toast">' + message + '</md-toast>',
				hideDelay: 3000,
				position: 'right'})
		}
		
		//Show Message Toast
		$scope.showMessageOnToast = function(message){
			$mdToast.show({ 
				template: '<md-toast class="md-toast">' + message + '</md-toast>',
				hideDelay: 3000,
				position: 'top right'})
		}
		
		//Delete Toast List
		$scope.cofirmDeleteToastList = function(id, version){
			$mdToast.show({  	
				templateUrl: clientbuilding.contextPath + '/view/toast.html',
				hideDelay:5000,
				controller: 'clientbuildingnotifyController',
				position: 'right'
			}).then(function(response){
				if (response) {
					$scope.delete(id,version);
				}
			});
		}
		
		//Delete Toast From
		$scope.cofirmDeleteToastForm = function(){
			$mdToast.show({
				templateUrl: clientbuilding.contextPath + '/view/toast.html',
				hideDelay: 5000,
				controller: 'clientbuildingnotifyController',
				position: 'top right'
			}).then(function(response){
				if (response) {
					$scope.deleteOnForm();
				}
			});
		}
		
		$scope.OkToast = function() {
			$mdToast.hide(true);
		};
		
		$scope.closeToast = function() {
			$mdToast.hide(false);
		};
	
	}]);

});

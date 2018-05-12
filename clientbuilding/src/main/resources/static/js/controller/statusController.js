
/**
 * Controller for Status
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/statusService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'statusController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'statusService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, statusService) {
		if(typeof(clientbuilding.translate.status) === 'undefined' || clientbuilding.translate.status.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.status) === 'undefined') {
				clientbuilding.translate.status = '';
			}
			clientbuilding.translate.status += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/status');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_status_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_status_name')});
				// setdonestatus.
		    	$scope.sortData.push({value: 'setdonestatus', display: $translate.instant('clientbuilding_status_setdonestatus')});
				// setidlestatus.
		    	$scope.sortData.push({value: 'setidlestatus', display: $translate.instant('clientbuilding_status_setidlestatus')});
				// sethandledstatus.
		    	$scope.sortData.push({value: 'sethandledstatus', display: $translate.instant('clientbuilding_status_sethandledstatus')});
				// setcancelledstatus.
		    	$scope.sortData.push({value: 'setcancelledstatus', display: $translate.instant('clientbuilding_status_setcancelledstatus')});
				// color.
		    	$scope.sortData.push({value: 'color', display: $translate.instant('clientbuilding_status_color')});
				// sortorder.
		    	$scope.sortData.push({value: 'sortorder', display: $translate.instant('clientbuilding_status_sortorder')});
				// idle.
		    	$scope.sortData.push({value: 'idle', display: $translate.instant('clientbuilding_status_idle')});
				// iscopystatus.
		    	$scope.sortData.push({value: 'iscopystatus', display: $translate.instant('clientbuilding_status_iscopystatus')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_status_title');
	    	$translate.refresh();
	    });
		
	    // Search.
	    $scope.search = {};
	    // Sort.
	    $scope.reverse = true;
	    $scope.reverseTitle = '';
	    $scope.sortData = [];
	    
		// Paging.
		$scope.page = {
			pageSize: 3,
			totalElements: 0,
			currentPage: 0
		}
		
		$scope.status = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.status = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.status.id = id;
			if($scope.status.id > -1) {
				$scope.getById($scope.status.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.status.id = id;
			if($scope.status.id > -1) {
				$scope.getById($scope.status.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/status_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/status_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.status.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// name.
		    $scope.frmStatus.name.$setPristine();
			$scope.frmStatus.name.$setUntouched();
			// setdonestatus.
		    $scope.frmStatus.setdonestatus.$setPristine();
			$scope.frmStatus.setdonestatus.$setUntouched();
			// setidlestatus.
		    $scope.frmStatus.setidlestatus.$setPristine();
			$scope.frmStatus.setidlestatus.$setUntouched();
			// sethandledstatus.
		    $scope.frmStatus.sethandledstatus.$setPristine();
			$scope.frmStatus.sethandledstatus.$setUntouched();
			// setcancelledstatus.
		    $scope.frmStatus.setcancelledstatus.$setPristine();
			$scope.frmStatus.setcancelledstatus.$setUntouched();
			// color.
		    $scope.frmStatus.color.$setPristine();
			$scope.frmStatus.color.$setUntouched();
			// sortorder.
		    $scope.frmStatus.sortorder.$setPristine();
			$scope.frmStatus.sortorder.$setUntouched();
			// idle.
		    $scope.frmStatus.idle.$setPristine();
			$scope.frmStatus.idle.$setUntouched();
			// iscopystatus.
		    $scope.frmStatus.iscopystatus.$setPristine();
			$scope.frmStatus.iscopystatus.$setUntouched();

		    // form.
			$scope.frmStatus.$setPristine();
			$scope.frmStatus.$setUntouched();
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
			if($scope.frmStatus.$invalid) {
				$scope.frmStatus.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.status.id > -1) {
				result = statusService.updateWithLock($scope.status.id, $scope.status);
			} else {
				result = statusService.create($scope.status);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.status.id > -1) {
						$scope.status.version = response.data;
					} else {
						$scope.status.id = response.data;
						$scope.status.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmStatus.scope.$invalid = true;
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
			statusService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.statuss.length == 1 && $scope.page.currentPage > 0){
						$scope.page.currentPage--;
					}
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
				}
			},
			// error.
			function(response) {
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
			});
		}
		
		// Delete with create.
		$scope.deleteOnForm = function() {
			statusService.updateForDeleteWithLock($scope.status.id, $scope.status.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.statuss.length == 1 && $scope.page.currentPage > 0){
						$scope.page.currentPage--;
					}
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				}
			},
			// error.
			function(response) {
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
			});
		}
		
		// Get by Id.
		$scope.getById = function(id) {
			statusService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.status = data;
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
			statusService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.statuss = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.statuss = result;
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
			// Reload data.
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// sortReverse.
		$scope.sortReverse = function() {
			$scope.reverse = !$scope.reverse;
			let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
			// Reload data.
			$scope.listWithCriteriasByPage($scope.page.currentPage);
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
				// name.
		    	//result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// setdonestatus.
		    	//result.push({ key: 'setdonestatus', operation: 'like', value: $scope.search.content, logic: 'or' });
				// setidlestatus.
		    	//result.push({ key: 'setidlestatus', operation: 'like', value: $scope.search.content, logic: 'or' });
				// sethandledstatus.
		    	//result.push({ key: 'sethandledstatus', operation: 'like', value: $scope.search.content, logic: 'or' });
				// setcancelledstatus.
		    	//result.push({ key: 'setcancelledstatus', operation: 'like', value: $scope.search.content, logic: 'or' });
				// color.
		    	//result.push({ key: 'color', operation: 'like', value: $scope.search.content, logic: 'or' });
				// sortorder.
		    	//result.push({ key: 'sortorder', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idle.
		    	//result.push({ key: 'idle', operation: 'like', value: $scope.search.content, logic: 'or' });
				// iscopystatus.
		    	//result.push({ key: 'iscopystatus', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingstatusController',
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
				controller: 'clientbuildingstatusController',
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

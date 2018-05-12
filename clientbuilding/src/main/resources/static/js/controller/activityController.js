
/**
 * Controller for Activity
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/activityService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'activityController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'activityService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, activityService) {
		if(typeof(clientbuilding.translate.activity) === 'undefined' || clientbuilding.translate.activity.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.activity) === 'undefined') {
				clientbuilding.translate.activity = '';
			}
			clientbuilding.translate.activity += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/activity');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_activity_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idactivity.
		    	$scope.sortData.push({value: 'idactivity', display: $translate.instant('clientbuilding_activity_idactivity')});
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_activity_idproject')});
				// idactivitytype.
		    	$scope.sortData.push({value: 'idactivitytype', display: $translate.instant('clientbuilding_activity_idactivitytype')});
				// idcontact.
		    	$scope.sortData.push({value: 'idcontact', display: $translate.instant('clientbuilding_activity_idcontact')});
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_activity_name')});
				// description.
		    	$scope.sortData.push({value: 'description', display: $translate.instant('clientbuilding_activity_description')});
				// creationdate.
		    	$scope.sortData.push({value: 'creationdate', display: $translate.instant('clientbuilding_activity_creationdate')});
				// result.
		    	$scope.sortData.push({value: 'result', display: $translate.instant('clientbuilding_activity_result')});
				// comment.
		    	$scope.sortData.push({value: 'comment', display: $translate.instant('clientbuilding_activity_comment')});
				// sortorder.
		    	$scope.sortData.push({value: 'sortorder', display: $translate.instant('clientbuilding_activity_sortorder')});
				// idcancel.
		    	$scope.sortData.push({value: 'idcancel', display: $translate.instant('clientbuilding_activity_idcancel')});
				// iddone.
		    	$scope.sortData.push({value: 'iddone', display: $translate.instant('clientbuilding_activity_iddone')});
				// idclose.
		    	$scope.sortData.push({value: 'idclose', display: $translate.instant('clientbuilding_activity_idclose')});
				// donedate.
		    	$scope.sortData.push({value: 'donedate', display: $translate.instant('clientbuilding_activity_donedate')});
				// canceldate.
		    	$scope.sortData.push({value: 'canceldate', display: $translate.instant('clientbuilding_activity_canceldate')});
				// closedate.
		    	$scope.sortData.push({value: 'closedate', display: $translate.instant('clientbuilding_activity_closedate')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_activity_title');
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
		
		$scope.activity = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.activity = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.activity.id = id;
			if($scope.activity.id > -1) {
				$scope.getById($scope.activity.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.activity.id = id;
			if($scope.activity.id > -1) {
				$scope.getById($scope.activity.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/activity_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/activity_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.activity.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idactivity.
		    $scope.frmActivity.idactivity.$setPristine();
			$scope.frmActivity.idactivity.$setUntouched();
			// idproject.
		    $scope.frmActivity.idproject.$setPristine();
			$scope.frmActivity.idproject.$setUntouched();
			// idactivitytype.
		    $scope.frmActivity.idactivitytype.$setPristine();
			$scope.frmActivity.idactivitytype.$setUntouched();
			// idcontact.
		    $scope.frmActivity.idcontact.$setPristine();
			$scope.frmActivity.idcontact.$setUntouched();
			// name.
		    $scope.frmActivity.name.$setPristine();
			$scope.frmActivity.name.$setUntouched();
			// description.
		    $scope.frmActivity.description.$setPristine();
			$scope.frmActivity.description.$setUntouched();
			// creationdate.
		    $scope.frmActivity.creationdate.$setPristine();
			$scope.frmActivity.creationdate.$setUntouched();
			// result.
		    $scope.frmActivity.result.$setPristine();
			$scope.frmActivity.result.$setUntouched();
			// comment.
		    $scope.frmActivity.comment.$setPristine();
			$scope.frmActivity.comment.$setUntouched();
			// sortorder.
		    $scope.frmActivity.sortorder.$setPristine();
			$scope.frmActivity.sortorder.$setUntouched();
			// idcancel.
		    $scope.frmActivity.idcancel.$setPristine();
			$scope.frmActivity.idcancel.$setUntouched();
			// iddone.
		    $scope.frmActivity.iddone.$setPristine();
			$scope.frmActivity.iddone.$setUntouched();
			// idclose.
		    $scope.frmActivity.idclose.$setPristine();
			$scope.frmActivity.idclose.$setUntouched();
			// donedate.
		    $scope.frmActivity.donedate.$setPristine();
			$scope.frmActivity.donedate.$setUntouched();
			// canceldate.
		    $scope.frmActivity.canceldate.$setPristine();
			$scope.frmActivity.canceldate.$setUntouched();
			// closedate.
		    $scope.frmActivity.closedate.$setPristine();
			$scope.frmActivity.closedate.$setUntouched();

		    // form.
			$scope.frmActivity.$setPristine();
			$scope.frmActivity.$setUntouched();
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
			if($scope.frmActivity.$invalid) {
				$scope.frmActivity.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.activity.id > -1) {
				result = activityService.updateWithLock($scope.activity.id, $scope.activity);
			} else {
				result = activityService.create($scope.activity);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.activity.id > -1) {
						$scope.activity.version = response.data;
					} else {
						$scope.activity.id = response.data;
						$scope.activity.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmActivity.scope.$invalid = true;
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
			activityService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.activitys.length == 1 && $scope.page.currentPage > 0){
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
			activityService.updateForDeleteWithLock($scope.activity.id, $scope.activity.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.activitys.length == 1 && $scope.page.currentPage > 0){
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
			activityService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.activity = data;
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
			activityService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.activitys = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.activitys = result;
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
				// idactivity.
		    	//result.push({ key: 'idactivity', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idproject.
		    	//result.push({ key: 'idproject', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idactivitytype.
		    	//result.push({ key: 'idactivitytype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idcontact.
		    	//result.push({ key: 'idcontact', operation: 'like', value: $scope.search.content, logic: 'or' });
				// name.
		    	//result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	//result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
				// creationdate.
		    	//result.push({ key: 'creationdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// result.
		    	//result.push({ key: 'result', operation: 'like', value: $scope.search.content, logic: 'or' });
				// comment.
		    	//result.push({ key: 'comment', operation: 'like', value: $scope.search.content, logic: 'or' });
				// sortorder.
		    	//result.push({ key: 'sortorder', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idcancel.
		    	//result.push({ key: 'idcancel', operation: 'like', value: $scope.search.content, logic: 'or' });
				// iddone.
		    	//result.push({ key: 'iddone', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idclose.
		    	//result.push({ key: 'idclose', operation: 'like', value: $scope.search.content, logic: 'or' });
				// donedate.
		    	//result.push({ key: 'donedate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// canceldate.
		    	//result.push({ key: 'canceldate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// closedate.
		    	//result.push({ key: 'closedate', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingactivityController',
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
				controller: 'clientbuildingactivityController',
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

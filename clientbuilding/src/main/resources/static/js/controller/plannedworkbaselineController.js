
/**
 * Controller for Plannedworkbaseline
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/plannedworkbaselineService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'plannedworkbaselineController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'plannedworkbaselineService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, plannedworkbaselineService) {
		if(typeof(clientbuilding.translate.plannedworkbaseline) === 'undefined' || clientbuilding.translate.plannedworkbaseline.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.plannedworkbaseline) === 'undefined') {
				clientbuilding.translate.plannedworkbaseline = '';
			}
			clientbuilding.translate.plannedworkbaseline += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/plannedworkbaseline');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_plannedworkbaseline_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idbaseline.
		    	$scope.sortData.push({value: 'idbaseline', display: $translate.instant('clientbuilding_plannedworkbaseline_idbaseline')});
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_plannedworkbaseline_idproject')});
				// idassignment.
		    	$scope.sortData.push({value: 'idassignment', display: $translate.instant('clientbuilding_plannedworkbaseline_idassignment')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_plannedworkbaseline_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_plannedworkbaseline_reftype')});
				// work.
		    	$scope.sortData.push({value: 'work', display: $translate.instant('clientbuilding_plannedworkbaseline_work')});
				// workdate.
		    	$scope.sortData.push({value: 'workdate', display: $translate.instant('clientbuilding_plannedworkbaseline_workdate')});
				// day.
		    	$scope.sortData.push({value: 'day', display: $translate.instant('clientbuilding_plannedworkbaseline_day')});
				// week.
		    	$scope.sortData.push({value: 'week', display: $translate.instant('clientbuilding_plannedworkbaseline_week')});
				// month.
		    	$scope.sortData.push({value: 'month', display: $translate.instant('clientbuilding_plannedworkbaseline_month')});
				// year.
		    	$scope.sortData.push({value: 'year', display: $translate.instant('clientbuilding_plannedworkbaseline_year')});
				// dailycost.
		    	$scope.sortData.push({value: 'dailycost', display: $translate.instant('clientbuilding_plannedworkbaseline_dailycost')});
				// cost.
		    	$scope.sortData.push({value: 'cost', display: $translate.instant('clientbuilding_plannedworkbaseline_cost')});
				// isrealwork.
		    	$scope.sortData.push({value: 'isrealwork', display: $translate.instant('clientbuilding_plannedworkbaseline_isrealwork')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_plannedworkbaseline_title');
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
		
		$scope.plannedworkbaseline = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.plannedworkbaseline = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.plannedworkbaseline.id = id;
			if($scope.plannedworkbaseline.id > -1) {
				$scope.getById($scope.plannedworkbaseline.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.plannedworkbaseline.id = id;
			if($scope.plannedworkbaseline.id > -1) {
				$scope.getById($scope.plannedworkbaseline.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/plannedworkbaseline_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/plannedworkbaseline_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.plannedworkbaseline.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idbaseline.
		    $scope.frmPlannedworkbaseline.idbaseline.$setPristine();
			$scope.frmPlannedworkbaseline.idbaseline.$setUntouched();
			// idproject.
		    $scope.frmPlannedworkbaseline.idproject.$setPristine();
			$scope.frmPlannedworkbaseline.idproject.$setUntouched();
			// idassignment.
		    $scope.frmPlannedworkbaseline.idassignment.$setPristine();
			$scope.frmPlannedworkbaseline.idassignment.$setUntouched();
			// idref.
		    $scope.frmPlannedworkbaseline.idref.$setPristine();
			$scope.frmPlannedworkbaseline.idref.$setUntouched();
			// reftype.
		    $scope.frmPlannedworkbaseline.reftype.$setPristine();
			$scope.frmPlannedworkbaseline.reftype.$setUntouched();
			// work.
		    $scope.frmPlannedworkbaseline.work.$setPristine();
			$scope.frmPlannedworkbaseline.work.$setUntouched();
			// workdate.
		    $scope.frmPlannedworkbaseline.workdate.$setPristine();
			$scope.frmPlannedworkbaseline.workdate.$setUntouched();
			// day.
		    $scope.frmPlannedworkbaseline.day.$setPristine();
			$scope.frmPlannedworkbaseline.day.$setUntouched();
			// week.
		    $scope.frmPlannedworkbaseline.week.$setPristine();
			$scope.frmPlannedworkbaseline.week.$setUntouched();
			// month.
		    $scope.frmPlannedworkbaseline.month.$setPristine();
			$scope.frmPlannedworkbaseline.month.$setUntouched();
			// year.
		    $scope.frmPlannedworkbaseline.year.$setPristine();
			$scope.frmPlannedworkbaseline.year.$setUntouched();
			// dailycost.
		    $scope.frmPlannedworkbaseline.dailycost.$setPristine();
			$scope.frmPlannedworkbaseline.dailycost.$setUntouched();
			// cost.
		    $scope.frmPlannedworkbaseline.cost.$setPristine();
			$scope.frmPlannedworkbaseline.cost.$setUntouched();
			// isrealwork.
		    $scope.frmPlannedworkbaseline.isrealwork.$setPristine();
			$scope.frmPlannedworkbaseline.isrealwork.$setUntouched();

		    // form.
			$scope.frmPlannedworkbaseline.$setPristine();
			$scope.frmPlannedworkbaseline.$setUntouched();
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
			if($scope.frmPlannedworkbaseline.$invalid) {
				$scope.frmPlannedworkbaseline.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.plannedworkbaseline.id > -1) {
				result = plannedworkbaselineService.updateWithLock($scope.plannedworkbaseline.id, $scope.plannedworkbaseline);
			} else {
				result = plannedworkbaselineService.create($scope.plannedworkbaseline);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.plannedworkbaseline.id > -1) {
						$scope.plannedworkbaseline.version = response.data;
					} else {
						$scope.plannedworkbaseline.id = response.data;
						$scope.plannedworkbaseline.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmPlannedworkbaseline.scope.$invalid = true;
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
			plannedworkbaselineService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.plannedworkbaselines.length == 1 && $scope.page.currentPage > 0){
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
			plannedworkbaselineService.updateForDeleteWithLock($scope.plannedworkbaseline.id, $scope.plannedworkbaseline.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.plannedworkbaselines.length == 1 && $scope.page.currentPage > 0){
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
			plannedworkbaselineService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.plannedworkbaseline = data;
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
			plannedworkbaselineService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.plannedworkbaselines = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.plannedworkbaselines = result;
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
				// idbaseline.
		    	//result.push({ key: 'idbaseline', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idproject.
		    	//result.push({ key: 'idproject', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idassignment.
		    	//result.push({ key: 'idassignment', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idref.
		    	//result.push({ key: 'idref', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// work.
		    	//result.push({ key: 'work', operation: 'like', value: $scope.search.content, logic: 'or' });
				// workdate.
		    	//result.push({ key: 'workdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// day.
		    	//result.push({ key: 'day', operation: 'like', value: $scope.search.content, logic: 'or' });
				// week.
		    	//result.push({ key: 'week', operation: 'like', value: $scope.search.content, logic: 'or' });
				// month.
		    	//result.push({ key: 'month', operation: 'like', value: $scope.search.content, logic: 'or' });
				// year.
		    	//result.push({ key: 'year', operation: 'like', value: $scope.search.content, logic: 'or' });
				// dailycost.
		    	//result.push({ key: 'dailycost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// cost.
		    	//result.push({ key: 'cost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// isrealwork.
		    	//result.push({ key: 'isrealwork', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingplannedworkbaselineController',
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
				controller: 'clientbuildingplannedworkbaselineController',
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

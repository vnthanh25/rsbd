
/**
 * Controller for Plannedwork
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/plannedworkService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'plannedworkController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'plannedworkService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, plannedworkService) {
		if(typeof(clientbuilding.translate.plannedwork) === 'undefined' || clientbuilding.translate.plannedwork.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.plannedwork) === 'undefined') {
				clientbuilding.translate.plannedwork = '';
			}
			clientbuilding.translate.plannedwork += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/plannedwork');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_plannedwork_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_plannedwork_idproject')});
				// idassignment.
		    	$scope.sortData.push({value: 'idassignment', display: $translate.instant('clientbuilding_plannedwork_idassignment')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_plannedwork_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_plannedwork_reftype')});
				// work.
		    	$scope.sortData.push({value: 'work', display: $translate.instant('clientbuilding_plannedwork_work')});
				// workdate.
		    	$scope.sortData.push({value: 'workdate', display: $translate.instant('clientbuilding_plannedwork_workdate')});
				// day.
		    	$scope.sortData.push({value: 'day', display: $translate.instant('clientbuilding_plannedwork_day')});
				// week.
		    	$scope.sortData.push({value: 'week', display: $translate.instant('clientbuilding_plannedwork_week')});
				// month.
		    	$scope.sortData.push({value: 'month', display: $translate.instant('clientbuilding_plannedwork_month')});
				// year.
		    	$scope.sortData.push({value: 'year', display: $translate.instant('clientbuilding_plannedwork_year')});
				// dailycost.
		    	$scope.sortData.push({value: 'dailycost', display: $translate.instant('clientbuilding_plannedwork_dailycost')});
				// cost.
		    	$scope.sortData.push({value: 'cost', display: $translate.instant('clientbuilding_plannedwork_cost')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_plannedwork_title');
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
		
		$scope.plannedwork = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.plannedwork = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.plannedwork.id = id;
			if($scope.plannedwork.id > -1) {
				$scope.getById($scope.plannedwork.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.plannedwork.id = id;
			if($scope.plannedwork.id > -1) {
				$scope.getById($scope.plannedwork.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/plannedwork_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/plannedwork_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.plannedwork.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idproject.
		    $scope.frmPlannedwork.idproject.$setPristine();
			$scope.frmPlannedwork.idproject.$setUntouched();
			// idassignment.
		    $scope.frmPlannedwork.idassignment.$setPristine();
			$scope.frmPlannedwork.idassignment.$setUntouched();
			// idref.
		    $scope.frmPlannedwork.idref.$setPristine();
			$scope.frmPlannedwork.idref.$setUntouched();
			// reftype.
		    $scope.frmPlannedwork.reftype.$setPristine();
			$scope.frmPlannedwork.reftype.$setUntouched();
			// work.
		    $scope.frmPlannedwork.work.$setPristine();
			$scope.frmPlannedwork.work.$setUntouched();
			// workdate.
		    $scope.frmPlannedwork.workdate.$setPristine();
			$scope.frmPlannedwork.workdate.$setUntouched();
			// day.
		    $scope.frmPlannedwork.day.$setPristine();
			$scope.frmPlannedwork.day.$setUntouched();
			// week.
		    $scope.frmPlannedwork.week.$setPristine();
			$scope.frmPlannedwork.week.$setUntouched();
			// month.
		    $scope.frmPlannedwork.month.$setPristine();
			$scope.frmPlannedwork.month.$setUntouched();
			// year.
		    $scope.frmPlannedwork.year.$setPristine();
			$scope.frmPlannedwork.year.$setUntouched();
			// dailycost.
		    $scope.frmPlannedwork.dailycost.$setPristine();
			$scope.frmPlannedwork.dailycost.$setUntouched();
			// cost.
		    $scope.frmPlannedwork.cost.$setPristine();
			$scope.frmPlannedwork.cost.$setUntouched();

		    // form.
			$scope.frmPlannedwork.$setPristine();
			$scope.frmPlannedwork.$setUntouched();
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
			if($scope.frmPlannedwork.$invalid) {
				$scope.frmPlannedwork.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.plannedwork.id > -1) {
				result = plannedworkService.updateWithLock($scope.plannedwork.id, $scope.plannedwork);
			} else {
				result = plannedworkService.create($scope.plannedwork);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.plannedwork.id > -1) {
						$scope.plannedwork.version = response.data;
					} else {
						$scope.plannedwork.id = response.data;
						$scope.plannedwork.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmPlannedwork.scope.$invalid = true;
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
			plannedworkService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.plannedworks.length == 1 && $scope.page.currentPage > 0){
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
			plannedworkService.updateForDeleteWithLock($scope.plannedwork.id, $scope.plannedwork.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.plannedworks.length == 1 && $scope.page.currentPage > 0){
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
			plannedworkService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.plannedwork = data;
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
			plannedworkService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.plannedworks = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.plannedworks = result;
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
				controller: 'clientbuildingplannedworkController',
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
				controller: 'clientbuildingplannedworkController',
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

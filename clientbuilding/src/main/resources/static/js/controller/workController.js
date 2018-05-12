
/**
 * Controller for Work
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/workService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'workController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'workService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, workService) {
		if(typeof(clientbuilding.translate.work) === 'undefined' || clientbuilding.translate.work.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.work) === 'undefined') {
				clientbuilding.translate.work = '';
			}
			clientbuilding.translate.work += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/work');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_work_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_work_idproject')});
				// idworkelement.
		    	$scope.sortData.push({value: 'idworkelement', display: $translate.instant('clientbuilding_work_idworkelement')});
				// idassignment.
		    	$scope.sortData.push({value: 'idassignment', display: $translate.instant('clientbuilding_work_idassignment')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_work_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_work_reftype')});
				// work.
		    	$scope.sortData.push({value: 'work', display: $translate.instant('clientbuilding_work_work')});
				// workdate.
		    	$scope.sortData.push({value: 'workdate', display: $translate.instant('clientbuilding_work_workdate')});
				// day.
		    	$scope.sortData.push({value: 'day', display: $translate.instant('clientbuilding_work_day')});
				// week.
		    	$scope.sortData.push({value: 'week', display: $translate.instant('clientbuilding_work_week')});
				// month.
		    	$scope.sortData.push({value: 'month', display: $translate.instant('clientbuilding_work_month')});
				// year.
		    	$scope.sortData.push({value: 'year', display: $translate.instant('clientbuilding_work_year')});
				// dailycost.
		    	$scope.sortData.push({value: 'dailycost', display: $translate.instant('clientbuilding_work_dailycost')});
				// cost.
		    	$scope.sortData.push({value: 'cost', display: $translate.instant('clientbuilding_work_cost')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_work_title');
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
		
		$scope.work = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.work = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.work.id = id;
			if($scope.work.id > -1) {
				$scope.getById($scope.work.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.work.id = id;
			if($scope.work.id > -1) {
				$scope.getById($scope.work.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/work_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/work_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.work.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idproject.
		    $scope.frmWork.idproject.$setPristine();
			$scope.frmWork.idproject.$setUntouched();
			// idworkelement.
		    $scope.frmWork.idworkelement.$setPristine();
			$scope.frmWork.idworkelement.$setUntouched();
			// idassignment.
		    $scope.frmWork.idassignment.$setPristine();
			$scope.frmWork.idassignment.$setUntouched();
			// idref.
		    $scope.frmWork.idref.$setPristine();
			$scope.frmWork.idref.$setUntouched();
			// reftype.
		    $scope.frmWork.reftype.$setPristine();
			$scope.frmWork.reftype.$setUntouched();
			// work.
		    $scope.frmWork.work.$setPristine();
			$scope.frmWork.work.$setUntouched();
			// workdate.
		    $scope.frmWork.workdate.$setPristine();
			$scope.frmWork.workdate.$setUntouched();
			// day.
		    $scope.frmWork.day.$setPristine();
			$scope.frmWork.day.$setUntouched();
			// week.
		    $scope.frmWork.week.$setPristine();
			$scope.frmWork.week.$setUntouched();
			// month.
		    $scope.frmWork.month.$setPristine();
			$scope.frmWork.month.$setUntouched();
			// year.
		    $scope.frmWork.year.$setPristine();
			$scope.frmWork.year.$setUntouched();
			// dailycost.
		    $scope.frmWork.dailycost.$setPristine();
			$scope.frmWork.dailycost.$setUntouched();
			// cost.
		    $scope.frmWork.cost.$setPristine();
			$scope.frmWork.cost.$setUntouched();

		    // form.
			$scope.frmWork.$setPristine();
			$scope.frmWork.$setUntouched();
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
			if($scope.frmWork.$invalid) {
				$scope.frmWork.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.work.id > -1) {
				result = workService.updateWithLock($scope.work.id, $scope.work);
			} else {
				result = workService.create($scope.work);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.work.id > -1) {
						$scope.work.version = response.data;
					} else {
						$scope.work.id = response.data;
						$scope.work.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmWork.scope.$invalid = true;
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
			workService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.works.length == 1 && $scope.page.currentPage > 0){
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
			workService.updateForDeleteWithLock($scope.work.id, $scope.work.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.works.length == 1 && $scope.page.currentPage > 0){
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
			workService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.work = data;
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
			workService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.works = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.works = result;
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
				// idworkelement.
		    	//result.push({ key: 'idworkelement', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingworkController',
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
				controller: 'clientbuildingworkController',
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

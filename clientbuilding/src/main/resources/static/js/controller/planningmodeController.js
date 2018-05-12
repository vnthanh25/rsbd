
/**
 * Controller for Planningmode
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/planningmodeService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'planningmodeController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'planningmodeService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, planningmodeService) {
		if(typeof(clientbuilding.translate.planningmode) === 'undefined' || clientbuilding.translate.planningmode.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.planningmode) === 'undefined') {
				clientbuilding.translate.planningmode = '';
			}
			clientbuilding.translate.planningmode += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/planningmode');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_planningmode_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_planningmode_name')});
				// code.
		    	$scope.sortData.push({value: 'code', display: $translate.instant('clientbuilding_planningmode_code')});
				// sortorder.
		    	$scope.sortData.push({value: 'sortorder', display: $translate.instant('clientbuilding_planningmode_sortorder')});
				// mandatorystartdate.
		    	$scope.sortData.push({value: 'mandatorystartdate', display: $translate.instant('clientbuilding_planningmode_mandatorystartdate')});
				// mandatoryenddate.
		    	$scope.sortData.push({value: 'mandatoryenddate', display: $translate.instant('clientbuilding_planningmode_mandatoryenddate')});
				// applyto.
		    	$scope.sortData.push({value: 'applyto', display: $translate.instant('clientbuilding_planningmode_applyto')});
				// mandatoryduration.
		    	$scope.sortData.push({value: 'mandatoryduration', display: $translate.instant('clientbuilding_planningmode_mandatoryduration')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_planningmode_title');
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
		
		$scope.planningmode = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.planningmode = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.planningmode.id = id;
			if($scope.planningmode.id > -1) {
				$scope.getById($scope.planningmode.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.planningmode.id = id;
			if($scope.planningmode.id > -1) {
				$scope.getById($scope.planningmode.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/planningmode_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/planningmode_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.planningmode.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// name.
		    $scope.frmPlanningmode.name.$setPristine();
			$scope.frmPlanningmode.name.$setUntouched();
			// code.
		    $scope.frmPlanningmode.code.$setPristine();
			$scope.frmPlanningmode.code.$setUntouched();
			// sortorder.
		    $scope.frmPlanningmode.sortorder.$setPristine();
			$scope.frmPlanningmode.sortorder.$setUntouched();
			// mandatorystartdate.
		    $scope.frmPlanningmode.mandatorystartdate.$setPristine();
			$scope.frmPlanningmode.mandatorystartdate.$setUntouched();
			// mandatoryenddate.
		    $scope.frmPlanningmode.mandatoryenddate.$setPristine();
			$scope.frmPlanningmode.mandatoryenddate.$setUntouched();
			// applyto.
		    $scope.frmPlanningmode.applyto.$setPristine();
			$scope.frmPlanningmode.applyto.$setUntouched();
			// mandatoryduration.
		    $scope.frmPlanningmode.mandatoryduration.$setPristine();
			$scope.frmPlanningmode.mandatoryduration.$setUntouched();

		    // form.
			$scope.frmPlanningmode.$setPristine();
			$scope.frmPlanningmode.$setUntouched();
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
			if($scope.frmPlanningmode.$invalid) {
				$scope.frmPlanningmode.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.planningmode.id > -1) {
				result = planningmodeService.updateWithLock($scope.planningmode.id, $scope.planningmode);
			} else {
				result = planningmodeService.create($scope.planningmode);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.planningmode.id > -1) {
						$scope.planningmode.version = response.data;
					} else {
						$scope.planningmode.id = response.data;
						$scope.planningmode.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmPlanningmode.scope.$invalid = true;
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
			planningmodeService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.planningmodes.length == 1 && $scope.page.currentPage > 0){
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
			planningmodeService.updateForDeleteWithLock($scope.planningmode.id, $scope.planningmode.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.planningmodes.length == 1 && $scope.page.currentPage > 0){
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
			planningmodeService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.planningmode = data;
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
			planningmodeService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.planningmodes = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.planningmodes = result;
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
				// code.
		    	//result.push({ key: 'code', operation: 'like', value: $scope.search.content, logic: 'or' });
				// sortorder.
		    	//result.push({ key: 'sortorder', operation: 'like', value: $scope.search.content, logic: 'or' });
				// mandatorystartdate.
		    	//result.push({ key: 'mandatorystartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// mandatoryenddate.
		    	//result.push({ key: 'mandatoryenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// applyto.
		    	//result.push({ key: 'applyto', operation: 'like', value: $scope.search.content, logic: 'or' });
				// mandatoryduration.
		    	//result.push({ key: 'mandatoryduration', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingplanningmodeController',
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
				controller: 'clientbuildingplanningmodeController',
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

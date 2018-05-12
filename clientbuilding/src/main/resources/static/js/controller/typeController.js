
/**
 * Controller for Type
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/typeService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'typeController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'typeService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, typeService) {
		if(typeof(clientbuilding.translate.type) === 'undefined' || clientbuilding.translate.type.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.type) === 'undefined') {
				clientbuilding.translate.type = '';
			}
			clientbuilding.translate.type += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/type');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_type_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idworkflow.
		    	$scope.sortData.push({value: 'idworkflow', display: $translate.instant('clientbuilding_type_idworkflow')});
				// idcategory.
		    	$scope.sortData.push({value: 'idcategory', display: $translate.instant('clientbuilding_type_idcategory')});
				// idplanningmode.
		    	$scope.sortData.push({value: 'idplanningmode', display: $translate.instant('clientbuilding_type_idplanningmode')});
				// scope.
		    	$scope.sortData.push({value: 'scope', display: $translate.instant('clientbuilding_type_scope')});
				// code.
		    	$scope.sortData.push({value: 'code', display: $translate.instant('clientbuilding_type_code')});
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_type_name')});
				// description.
		    	$scope.sortData.push({value: 'description', display: $translate.instant('clientbuilding_type_description')});
				// priority.
		    	$scope.sortData.push({value: 'priority', display: $translate.instant('clientbuilding_type_priority')});
				// sortorder.
		    	$scope.sortData.push({value: 'sortorder', display: $translate.instant('clientbuilding_type_sortorder')});
				// color.
		    	$scope.sortData.push({value: 'color', display: $translate.instant('clientbuilding_type_color')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_type_title');
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
		
		$scope.type = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.type = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.type.id = id;
			if($scope.type.id > -1) {
				$scope.getById($scope.type.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.type.id = id;
			if($scope.type.id > -1) {
				$scope.getById($scope.type.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/type_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/type_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.type.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idworkflow.
		    $scope.frmType.idworkflow.$setPristine();
			$scope.frmType.idworkflow.$setUntouched();
			// idcategory.
		    $scope.frmType.idcategory.$setPristine();
			$scope.frmType.idcategory.$setUntouched();
			// idplanningmode.
		    $scope.frmType.idplanningmode.$setPristine();
			$scope.frmType.idplanningmode.$setUntouched();
			// scope.
		    $scope.frmType.scope.$setPristine();
			$scope.frmType.scope.$setUntouched();
			// code.
		    $scope.frmType.code.$setPristine();
			$scope.frmType.code.$setUntouched();
			// name.
		    $scope.frmType.name.$setPristine();
			$scope.frmType.name.$setUntouched();
			// description.
		    $scope.frmType.description.$setPristine();
			$scope.frmType.description.$setUntouched();
			// priority.
		    $scope.frmType.priority.$setPristine();
			$scope.frmType.priority.$setUntouched();
			// sortorder.
		    $scope.frmType.sortorder.$setPristine();
			$scope.frmType.sortorder.$setUntouched();
			// color.
		    $scope.frmType.color.$setPristine();
			$scope.frmType.color.$setUntouched();

		    // form.
			$scope.frmType.$setPristine();
			$scope.frmType.$setUntouched();
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
			if($scope.frmType.$invalid) {
				$scope.frmType.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.type.id > -1) {
				result = typeService.updateWithLock($scope.type.id, $scope.type);
			} else {
				result = typeService.create($scope.type);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.type.id > -1) {
						$scope.type.version = response.data;
					} else {
						$scope.type.id = response.data;
						$scope.type.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmType.scope.$invalid = true;
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
			typeService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.types.length == 1 && $scope.page.currentPage > 0){
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
			typeService.updateForDeleteWithLock($scope.type.id, $scope.type.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.types.length == 1 && $scope.page.currentPage > 0){
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
			typeService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.type = data;
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
			typeService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.types = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.types = result;
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
				// idworkflow.
		    	//result.push({ key: 'idworkflow', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idcategory.
		    	//result.push({ key: 'idcategory', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idplanningmode.
		    	//result.push({ key: 'idplanningmode', operation: 'like', value: $scope.search.content, logic: 'or' });
				// scope.
		    	//result.push({ key: 'scope', operation: 'like', value: $scope.search.content, logic: 'or' });
				// code.
		    	//result.push({ key: 'code', operation: 'like', value: $scope.search.content, logic: 'or' });
				// name.
		    	//result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	//result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
				// priority.
		    	//result.push({ key: 'priority', operation: 'like', value: $scope.search.content, logic: 'or' });
				// sortorder.
		    	//result.push({ key: 'sortorder', operation: 'like', value: $scope.search.content, logic: 'or' });
				// color.
		    	//result.push({ key: 'color', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingtypeController',
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
				controller: 'clientbuildingtypeController',
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

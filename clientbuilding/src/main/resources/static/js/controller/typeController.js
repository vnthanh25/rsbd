
/**
 * Controller for Type
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/typeService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'typeController', ['$scope', '$state', '$stateParams', '$rootScope', '$q', '$mdDialog', '$log', '$filter', '$translate', '$translatePartialLoader', '$mdToast', '$mdColors', clientbuilding.prefix + 'typeService',
		function($scope, $state, $stateParams, $rootScope, $q, $mdDialog, $log, $filter, $translate, $translatePartialLoader, $mdToast, $mdColors, typeService) {
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
			if(!$rootScope.menuActiveTitle){
		    	$rootScope.menuActiveTitle = $translate.instant('clientbuilding_type_' + $scope.type.scope + '_title');
		    }
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// updatedate.
				$scope.sortData.push({value: 'updatedate', display: $translate.instant('clientbuilding_home_recent')});
				// code.
		    	$scope.sortData.push({value: 'code', display: $translate.instant('clientbuilding_type_code')});
				// name.
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$translate.refresh();
	    });
	    $scope.$on('$viewContentLoaded', function(event) {
	    });
		
	    // Search.
	    $scope.search = {};
	    // Sort.
	    $scope.reverse = false;
	    $scope.reverseTitle = '';
	    $scope.sortData = [];
	    
		// Paging.
		$scope.page = {
			pageSize: 3,
			totalElements: 0,
			currentPage: 0
		}

		$scope.isServerCalling = false;
		$scope.isListClose = false;
		$scope.currentDate = new Date();
		
		// scope of type.
		var idParam = $stateParams.id;
		var scopeParam = $stateParams.scope;
		if(typeof(this.locals) !== 'undefined'){
			$scope.isListClose = this.locals.params.isListClose;
			idParam = this.locals.params.id;
			scopeParam = this.locals.params.scope;
		}
		
		$scope.type = {id: -1, scope: scopeParam};

	    // Create new.
		$scope.createNew = function() {
			$scope.type = { id: -1, scope: scopeParam };
		}
		
		// Create on form.
		$scope.createOnForm = function() {
			$scope.createNew();
			$scope.resetValidate();
		}
		
		// Init for list.
		$scope.initList = function() {
			if(idParam && idParam > -1){
				$scope.showForm(idParam);
			} else {
				$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
			}
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
		
		// refresh list.
		$scope.refreshList = function() {
			$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
		}
		
		// refresh form
		$scope.refreshForm = function() {
			$scope.createNew();
			$scope.resetValidate();
			if($scope.project.id > -1) {
				$scope.getById($scope.project.id);
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
			
		// Close list dialog.
		$scope.closeListDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.type.id});
		}
			
		// Select and close list dialog.
		$scope.selectAndCloseDialog = function(id){
			$mdToast.hide();
			$mdDialog.hide({id: id});
		}
			
		// Close form dialog.
		$scope.closeFormDialog = function(){
			// reload list.
			$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
			$mdToast.hide();
			$mdDialog.hide({id: $scope.type.id});
		}
			
		// Close view dialog.
		$scope.closeViewDialog = function(){
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
		
		// Save.
		$scope.save = function() {
			if($scope.frmType.$invalid) {
				$scope.frmType.$dirty = true;
				$scope.frmDirty = true;
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				return;
			}
			$scope.isServerCalling = true;
			// show message.
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'), {delay:0});
			var result;
			if($scope.type.id > -1) {
				result = typeService.updateWithLock($scope.type.id, $scope.type);
			} else {
				result = typeService.create($scope.type);
			}
			result.then(
				// success.
				function(response) {
					$scope.isServerCalling = false;
					$mdToast.hide();
					if(response.status === httpStatus.code.OK) {
						if($scope.type.id > -1) {
							$scope.type.version = response.data;
						} else {
							$scope.type.id = response.data;
							$scope.type.version = 1;
						}
						// show message.
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
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
					$scope.isServerCalling = false;
					$mdToast.hide();
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				}
			);
		}
		
		// Delete.
		$scope.delete = function(id, version) {
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialogConfirm.html';
			let title = $translate.instant('clientmain_home_delete_message_confirm');
			clientmain.showDialogConfirm($mdDialog, htmlUrlTemplate, title).then(function(response) {
				// ok delete.
				if(response){
					$scope.isServerCalling = true;
					typeService.updateForDeleteWithLock(id, version)
					// success.
					.then(function(response) {
						$scope.isServerCalling = false;
						if(response.status === httpStatus.code.OK) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
							if($scope.types.length == 1 && $scope.page.currentPage > 0){
								$scope.page.currentPage--;
							}
							$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
						} else {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
						}
					},
					// error.
					function(response) {
						$scope.isServerCalling = false;
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
					});
				}
			});
		}
		
		// Delete with create.
		$scope.deleteOnForm = function() {
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialogConfirm.html';
			let title = $translate.instant('clientmain_home_delete_message_confirm');
			clientmain.showDialogConfirm($mdDialog, htmlUrlTemplate, title).then(function(response) {
				// ok delete.
				if(response){
					$scope.isServerCalling = true;
					typeService.updateForDeleteWithLock($scope.type.id, $scope.type.version)
					// success.
					.then(function(response) {
						$scope.isServerCalling = false;
						if(response.status === httpStatus.code.OK) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
							$scope.createNew();
							$scope.resetValidate();
							if($scope.types.length == 1 && $scope.page.currentPage > 0){
								$scope.page.currentPage--;
							}
							$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
						} else {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
						}
					},
					// error.
					function(response) {
						$scope.isServerCalling = false;
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
					});
				}
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
		$scope.listWithCriteriasByScopeAndPage = function(scope, pageNo) {
			$scope.type.scope = scope;
			$scope.page.currentPage = pageNo;
			typeService.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
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
			$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
		}
		
		// sortReverse.
		$scope.sortReverse = function() {
			$scope.reverse = !$scope.reverse;
			let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
			// Reload data.
			$scope.listWithCriteriasByScopeAndPage($scope.type.scope, $scope.page.currentPage);
		}
		
		// Get sort object.
		$scope.getSort = function() {
			var result = [];
			var order = 'desc';
			if ($scope.reverse) {
				order = 'asc';
			}
			// name.
		    if(typeof($scope.sortKey) !== 'undefined' && $scope.sortKey !== ''){
				result.push('sort=' + $scope.sortKey + ',' + order);
		    } else {
		    	result.push('sort=createdate' + ',' + order);
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
		
		//Show message.
		$scope.showMessageOnToast = function(message, params){
			var toast = $mdToast.toastMessage().textContent(message);
			if(typeof(params) !== 'undefined'){
				if(typeof(params.templateUrl) !== 'undefined'){
					toast.templateUrl(params.templateUrl);
				}
				if(typeof(params.action) !== 'undefined'){
					toast.action(params.action);
				}
				if(typeof(params.position) !== 'undefined'){
					toast.position(params.position);
				}
				if(typeof(params.delay) !== 'undefined'){
					toast.hideDelay(params.delay);
				}
			}
			return $mdToast.show(toast);
		}
	
	}]);

});

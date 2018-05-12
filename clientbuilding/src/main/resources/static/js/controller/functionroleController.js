
/**
 * Controller for Functionrole
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/functionroleService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'functionroleController', ['$scope', '$state', '$rootScope', '$mdDialog', '$log', '$filter', '$translate', '$translatePartialLoader', '$mdToast', 'tmhDynamicLocale', clientbuilding.prefix + 'functionroleService',
		function($scope, $state, $rootScope, $mdDialog, $log, $filter, $translate, $translatePartialLoader, $mdToast, tmhDynamicLocale, functionroleService) {
		if(typeof(clientbuilding.translate.functionrole) === 'undefined' || clientbuilding.translate.functionrole.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.functionrole) === 'undefined') {
				clientbuilding.translate.functionrole = '';
			}
			clientbuilding.translate.functionrole += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/functionrole');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_functionrole_title');
		    if(!$rootScope.menuActiveTitle){
		    	$rootScope.menuActiveTitle = $translate.instant('clientbuilding_functionrole_title');
		    }
		    // Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
		    	$scope.sortData.push({value: 'updatedate', display: $translate.instant('clientbuilding_home_recent')});
			    $scope.sortData.push({value: 'sortorder', display: $translate.instant('clientbuilding_functionrole_sortorder')});
			    $scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_functionrole_name')});
			    $scope.sortData.push({value: 'defaultcost', display: $translate.instant('clientbuilding_functionrole_defaultcost')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	tmhDynamicLocale.set($translate.use());
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
			pageSize: 30,
			totalElements: 0,
			currentPage: 0
		}
		
		$scope.functionrole = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.functionrole = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			// Destroy ckeditors.
			if(CKEDITOR.instances["description"]) {
				CKEDITOR.instances["description"].destroy();
			}
			// Init model.
			$scope.createNew();
			$scope.functionrole.id = id;
			if($scope.functionrole.id > -1) {
				$scope.getById($scope.functionrole.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.functionrole.id = id;
			if($scope.functionrole.id > -1) {
				$scope.getById($scope.functionrole.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/functionrole_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/functionrole_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.functionrole.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// name.
		    $scope.frmFunctionrole.name.$setPristine();
			$scope.frmFunctionrole.name.$setUntouched();
			// description.
		    $scope.frmFunctionrole.description.$setPristine();
			$scope.frmFunctionrole.description.$setUntouched();
			// sortorder.
		    $scope.frmFunctionrole.sortorder.$setPristine();
			$scope.frmFunctionrole.sortorder.$setUntouched();
			// defaultcost.
		    $scope.frmFunctionrole.defaultcost.$setPristine();
			$scope.frmFunctionrole.defaultcost.$setUntouched();

		    // form.
			$scope.frmFunctionrole.$setPristine();
			$scope.frmFunctionrole.$setUntouched();
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
			if($scope.frmFunctionrole.$invalid) {
				$scope.frmFunctionrole.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'), 0);
			var result;
			if($scope.functionrole.id > -1) {
				result = functionroleService.updateWithLock($scope.functionrole.id, $scope.functionrole);
			} else {
				result = functionroleService.create($scope.functionrole);
			}
			result.then(
			// success.
			function(response) {
				$mdToast.hide();
				if(response.status === httpStatus.code.OK) {
					if($scope.functionrole.id > -1) {
						$scope.functionrole.version = response.data;
					} else {
						$scope.functionrole.id = response.data;
						$scope.functionrole.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmFunctionrole.scope.$invalid = true;
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else {
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
					}
				}
			},
			// error.
			function(response) {
				$mdToast.hide();
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
			});
		}
		
		// Delete.
		$scope.delete = function(id, version) {
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialogConfirm.html';
			let title = $translate.instant('clientmain_home_delete_message_confirm');
			clientmain.showDialogConfirm($mdDialog, htmlUrlTemplate, title, '').then(function(response) {
				// ok delete.
				if(response){
					functionroleService.updateForDeleteWithLock(id, version)
					// success.
					.then(function(response) {
						if(response.status === httpStatus.code.OK) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
							if($scope.functionroles.length == 1 && $scope.page.currentPage > 0){
								$scope.page.currentPage--;
							}
							$scope.listWithCriteriasByPage($scope.page.currentPage);
						} else {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
						}
					},
					// error.
					function(response) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
					});
				}
			});
		}
		
		// Delete with create.
		$scope.deleteOnForm = function() {
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialogConfirm.html';
			let title = $translate.instant('clientmain_home_delete_message_confirm');
			clientmain.showDialogConfirm($mdDialog, htmlUrlTemplate, title, '').then(function(response) {
				// ok delete.
				if(response){
					functionroleService.updateForDeleteWithLock($scope.functionrole.id, $scope.functionrole.version)
					// success.
					.then(function(response) {
						if(response.status === httpStatus.code.OK) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
							$scope.createNew();
							$scope.resetValidate();
							if($scope.functionroles.length == 1 && $scope.page.currentPage > 0){
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
			});
		}
		
		// Get by Id.
		$scope.getById = function(id) {
			functionroleService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.functionrole = data;
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
			functionroleService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.functionroles = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.functionroles = result;
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
    	
    	////////////////////////////////////////
	    // ckeditor.
		////////////////////////////////////////
    	CKEDITOR.config.extraPlugins = "base64image";
    	$scope.ckoptions = {
    		language: $translate.use(),
    		htmlEncodeOutput: false,
    	    allowedContent: true,
    	    entities: false,
    	    enterMode: CKEDITOR.ENTER_BR,
    		shiftEnterMode: CKEDITOR.ENTER_P,
    		autoParagraph: false
    	};
		
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
				// name.
		    	result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// defaultcost.
		    	//result.push({ key: 'defaultcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
				// sortorder.
		    	//result.push({ key: 'sortorder', operation: 'like', value: $scope.search.content, logic: 'or' });
		    }
		    // return.
		    return result;
		}
		
		//Show Message Toast
		$scope.showMessageOnToast = function(message, delay){
			if(!delay){
				delay = 3000;
			}
			return $mdToast.show($mdToast.simple().position('top right').hideDelay(delay).textContent(message));
		}
	
	}]);

});

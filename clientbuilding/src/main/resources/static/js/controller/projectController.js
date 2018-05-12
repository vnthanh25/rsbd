
/**
 * Controller for Project
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/projectService.js',
		clientmain.contextPath + '/js/service/calendarService.js',
		clientbuilding.contextPath + '/js/service/typeService.js',
		clientbuilding.contextPath + '/js/service/clientService.js',
		clientbuilding.contextPath + '/js/service/userService.js'
	], function (require, angular) {
	app.aController(clientbuilding.prefix + 'projectController', ['$scope', '$state', '$rootScope', '$q', '$mdDialog', '$log', '$filter', '$translate', '$translatePartialLoader', '$mdToast', '$timeout', clientbuilding.prefix + 'projectService',
			clientmain.prefix + 'calendarService',
			clientbuilding.prefix + 'typeService',
			clientbuilding.prefix + 'clientService',
			clientbuilding.prefix + 'userService',
		function($scope, $state, $rootScope, $q, $mdDialog, $log, $filter, $translate, $translatePartialLoader, $mdToast, $timeout, projectService,
			calendarService, typeService, clientService, userService
		) {
		if(typeof(clientbuilding.translate.project) === 'undefined' || clientbuilding.translate.project.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.project) === 'undefined') {
				clientbuilding.translate.project = '';
			}
			clientbuilding.translate.project += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/project');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_project_title');
			if(!$rootScope.menuActiveTitle){
		    	$rootScope.menuActiveTitle = $translate.instant('clientbuilding_project_title');
		    }
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
		    	// updatedate.
				$scope.sortData.push({value: 'updatedate', display: $translate.instant('clientbuilding_home_recent')});
				// code.
		    	$scope.sortData.push({value: 'code', display: $translate.instant('clientbuilding_project_code')});
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_project_name')});
				// progress.
		    	$scope.sortData.push({value: 'progress', display: $translate.instant('clientbuilding_project_progress')});
				// donedate.
		    	$scope.sortData.push({value: 'donedate', display: $translate.instant('clientbuilding_project_donedate')});
				// canceldate.
		    	$scope.sortData.push({value: 'canceldate', display: $translate.instant('clientbuilding_project_canceldate')});
				// closedate.
		    	$scope.sortData.push({value: 'closedate', display: $translate.instant('clientbuilding_project_closedate')});
				// sortorder.
		    	$scope.sortData.push({value: 'sortorder', display: $translate.instant('clientbuilding_project_sortorder')});
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
		
		$scope.project = {id: -1};
		// listForSelect.
		$scope.listForSelectPromise;

	    // Create new.
		$scope.createNew = function() {
			$scope.project = { id: -1 };
		}
		
		// Create autocomplete.
		$scope.createAutocomplete = function(name, requirematch){
			var result = {};
			result.isCallServer = false;
			result.isDisabled = false;
			// Filter.
			result.createFilterFor = function (query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(item) {
					return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
				};
			}
			// Search in array.
			result.querySearch = function (query) {
				var results = query ? this.items.filter(this.createFilterFor(query)) : this.items;
				return results;
			}
			// Text change.
			result.searchTextChange = function (text) {
				$log.info(name + ': text change to ' + text);
			}
			// Item change.
			result.selectedItemChange = function (item) {
				if ($scope.frmProject[name] === undefined) {
					return;
				}
				$scope.project[name] = undefined;
				if(requirematch){
					$scope.frmProject[name].$invalid = true;
				}
				if (item) {
					$scope.project[name] = item.value;
					$scope.frmProject[name].$invalid = false;
				}
			}
		    // Watch $scope.entity.entityfield
		    $scope.$watch('project.' + name, function(newVal, oldVal, scope) {
		    	var sefl = result;
		    	result.selectedItem = undefined;
		    	if(typeof(newVal) === 'undefined' || typeof(result.items) === 'undefined') {
		    		return;
		    	}
		    	result.selectedItem = clientmain.GetByProperty(result.items, 'value', newVal);
		    });
			return result;
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
			$scope.createNew();
			$scope.project.id = id;
			if(typeof($scope.listForSelectPromise) === 'undefined'){
				// create autocomplete.
				$scope.ctlidproject = $scope.createAutocomplete('idproject');
				$scope.ctlidcalendar = $scope.createAutocomplete('idcalendar', true);
				$scope.ctlidprojecttype = $scope.createAutocomplete('idprojecttype', true);
				$scope.ctlidclient = $scope.createAutocomplete('idclient');
				$scope.ctlidcontact = $scope.createAutocomplete('idcontact');
				$scope.ctlidmanager = $scope.createAutocomplete('idmanager', true);
				// load data for autocomplete.
				$scope.listForSelectPromise = $scope.listForSelects();
			}
			$scope.listForSelectPromise.then(
				// success.
				function(responses){
					if($scope.project.id > -1) {
						$scope.getById($scope.project.id);
					}
				}
			);
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.project.id = id;
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/project_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/project_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.project.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idproject.
		    $scope.frmProject.idproject.$setPristine();
			$scope.frmProject.idproject.$setUntouched();
			// idcalendar.
		    $scope.frmProject.idcalendar.$setPristine();
			$scope.frmProject.idcalendar.$setUntouched();
			// idprojecttype.
		    $scope.frmProject.idprojecttype.$setPristine();
			$scope.frmProject.idprojecttype.$setUntouched();
			// idclient.
		    $scope.frmProject.idclient.$setPristine();
			$scope.frmProject.idclient.$setUntouched();
			// idcontact.
		    $scope.frmProject.idcontact.$setPristine();
			$scope.frmProject.idcontact.$setUntouched();
			// idmanager.
		    $scope.frmProject.idmanager.$setPristine();
			$scope.frmProject.idmanager.$setUntouched();
			// progress.
		    $scope.frmProject.progress.$setPristine();
			$scope.frmProject.progress.$setUntouched();
			// code.
		    $scope.frmProject.code.$setPristine();
			$scope.frmProject.code.$setUntouched();
			// contractcode.
		    $scope.frmProject.contractcode.$setPristine();
			$scope.frmProject.contractcode.$setUntouched();
			// clientcode.
		    $scope.frmProject.clientcode.$setPristine();
			$scope.frmProject.clientcode.$setUntouched();
			// name.
		    $scope.frmProject.name.$setPristine();
			$scope.frmProject.name.$setUntouched();
			// description.
		    $scope.frmProject.description.$setPristine();
			$scope.frmProject.description.$setUntouched();
			// color.
		    $scope.frmProject.color.$setPristine();
			$scope.frmProject.color.$setUntouched();
			// sortorder.
		    $scope.frmProject.sortorder.$setPristine();
			$scope.frmProject.sortorder.$setUntouched();
			// idcancel.
		    $scope.frmProject.idcancel.$setPristine();
			$scope.frmProject.idcancel.$setUntouched();
			// iddone.
		    $scope.frmProject.iddone.$setPristine();
			$scope.frmProject.iddone.$setUntouched();
			// idclose.
		    $scope.frmProject.idclose.$setPristine();
			$scope.frmProject.idclose.$setUntouched();
			// donedate.
		    $scope.frmProject.donedate.$setPristine();
			$scope.frmProject.donedate.$setUntouched();
			// canceldate.
		    $scope.frmProject.canceldate.$setPristine();
			$scope.frmProject.canceldate.$setUntouched();
			// closedate.
		    $scope.frmProject.closedate.$setPristine();
			$scope.frmProject.closedate.$setUntouched();

		    // form.
			$scope.frmProject.$setPristine();
			$scope.frmProject.$setUntouched();
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
			// check form valid.
			if($scope.frmProject.$invalid) {
				// auto complete require touch.
				$scope.frmProject.idprojecttype.$touched = true;
				$scope.frmProject.idmanager.$touched = true;
				$scope.frmProject.idcalendar.$touched = true;
				// form dirty.
				$scope.frmProject.$dirty = true;
				$scope.frmDirty = true;
				$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				return;
			}
			
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialog_alert.html';
			clientmain.showDialogAlert($mdDialog, htmlUrlTemplate, $translate.instant('clientbuilding_home_saving'));
			//$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'), 0);
			// Ignore time in date.
			if($scope.project.donedate){
				$scope.project.donedate = clientmain.getDateIgnoreTime($scope.project.donedate);
			}
			if($scope.project.canceldate){
				$scope.project.canceldate = clientmain.getDateIgnoreTime($scope.project.canceldate);
			}
			if($scope.project.closedate){
				$scope.project.closedate = clientmain.getDateIgnoreTime($scope.project.closedate);
			}
			// save to server.
			var result;
			if($scope.project.id > -1) {
				result = projectService.updateWithLock($scope.project.id, $scope.project);
			} else {
				result = projectService.create($scope.project);
			}
			result.then(
				// success.
				function(response) {
					// while init dialog.
					$timeout(function(){
						//$mdDialog.hide();
					}, 1000);
					if(response.status === httpStatus.code.OK) {
						if($scope.project.id > -1) {
							$scope.project.version = response.data;
						} else {
							$scope.project.id = response.data;
							$scope.project.version = 1;
						}
						//$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
						$scope.listWithCriteriasByPage($scope.page.currentPage);
					} else {
						if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
						} else {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
						}
					}
				},
				// error.
				function(response) {
					//$mdToast.hide();
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_error'));
				}
			);
		}
		
		// Delete.
		$scope.delete = function(id, version) {
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialog_confirm.html';
			let title = $translate.instant('clientbuilding_home_delete_message_confirm');
			clientmain.showDialogConfirm($mdDialog, htmlUrlTemplate, title).then(function(response) {
				// ok delete.
				if(response){
					projectService.updateForDeleteWithLock(id, version)
					// success.
					.then(function(response) {
						if(response.status === httpStatus.code.OK) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
							if($scope.projects.length == 1 && $scope.page.currentPage > 0){
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
			let htmlUrlTemplate = clientbuilding.contextPath + '/view/dialog_confirm.html';
			let title = $translate.instant('clientbuilding_home_delete_message_confirm');
			clientmain.showDialogConfirm($mdDialog, htmlUrlTemplate, title).then(function(response) {
				// ok delete.
				if(response){
					projectService.updateForDeleteWithLock($scope.project.id, $scope.project.version)
					// success.
					.then(function(response) {
						if(response.status === httpStatus.code.OK) {
							$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
							$scope.createNew();
							$scope.resetValidate();
							if($scope.projects.length == 1 && $scope.page.currentPage > 0){
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
			projectService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.project = data;
					// covert date.
					if($scope.project.donedate){
						$scope.project.donedate = new Date($scope.project.donedate);
					}
					if($scope.project.canceldate){
						$scope.project.canceldate = new Date($scope.project.canceldate);
					}
					if($scope.project.closedate){
						$scope.project.closedate = new Date($scope.project.closedate);
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
		
		// List for page and filter.
		$scope.listWithCriteriasByPage = function(pageNo) {
			$scope.page.currentPage = pageNo;
			projectService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.projects = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.projects = result;
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
		
		// listForSelects
		$scope.listForSelects = function(){
			let listForSelectDefered = $q.defer();
			// idproject.
			let idproject = projectService.listForSelect();
			// idcalendar.
			let idcalendar = calendarService.listForSelect();
			// idprojecttype.
			let idprojecttype = typeService.listForSelect();
			// idclient.
			var idclient = clientService.listForSelect();
			// idcontact.
			var idcontact = userService.listForSelect();
			// idmanager.
			var idmanager = userService.listForSelect();
			$q.all([idproject, idcalendar, idprojecttype, idclient, idcontact, idmanager]).then(
				// success.
				function(responses){
					// idproject.
					$scope.ctlidproject.items = responses[0].data;
					// idcalendar.
					$scope.ctlidcalendar.items = responses[1].data;
					// idprojecttype.
					$scope.ctlidprojecttype.items = responses[2].data;
					// idclient.
					$scope.ctlidclient.items = responses[3].data;
					// idcontact.
					$scope.ctlidcontact.items = responses[4].data;
					// idmanager.
					$scope.ctlidmanager.items = responses[5].data;
					// Resolve promise.
					listForSelectDefered.resolve(responses);
				},
				// error.
				function(responses){
					$scope.showMessageOnToast($translate.instant('clientwh_home_error'));
					// Reject promise.
					listForSelectDefered.reject(responses);
				}
			);
			return listForSelectDefered.promise;
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
				// code.
		    	result.push({ key: 'code', operation: 'like', value: $scope.search.content, logic: 'or' });
				// name.
		    	result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
		    }
		    // return.
		    return result;
		}
		
		//Show Message Toast
		$scope.showMessageOnToast = function(message, delay){
			if(typeof(delay) === 'undefined'){
				delay = 3000;
			}
			return $mdToast.show($mdToast.toastMessage().text(message).position('top right').hideDelay(delay));
		}
	
	}]);

});

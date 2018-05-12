
/**
 * Controller for Workelement
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/workelementService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'workelementController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'workelementService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, workelementService) {
		if(typeof(clientbuilding.translate.workelement) === 'undefined' || clientbuilding.translate.workelement.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.workelement) === 'undefined') {
				clientbuilding.translate.workelement = '';
			}
			clientbuilding.translate.workelement += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/workelement');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_workelement_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_workelement_idproject')});
				// idactivity.
		    	$scope.sortData.push({value: 'idactivity', display: $translate.instant('clientbuilding_workelement_idactivity')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_workelement_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_workelement_reftype')});
				// plannedwork.
		    	$scope.sortData.push({value: 'plannedwork', display: $translate.instant('clientbuilding_workelement_plannedwork')});
				// realwork.
		    	$scope.sortData.push({value: 'realwork', display: $translate.instant('clientbuilding_workelement_realwork')});
				// leftwork.
		    	$scope.sortData.push({value: 'leftwork', display: $translate.instant('clientbuilding_workelement_leftwork')});
				// ongoing.
		    	$scope.sortData.push({value: 'ongoing', display: $translate.instant('clientbuilding_workelement_ongoing')});
				// ongoingstartdatetime.
		    	$scope.sortData.push({value: 'ongoingstartdatetime', display: $translate.instant('clientbuilding_workelement_ongoingstartdatetime')});
				// realcost.
		    	$scope.sortData.push({value: 'realcost', display: $translate.instant('clientbuilding_workelement_realcost')});
				// leftcost.
		    	$scope.sortData.push({value: 'leftcost', display: $translate.instant('clientbuilding_workelement_leftcost')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_workelement_title');
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
		
		$scope.workelement = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.workelement = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.workelement.id = id;
			if($scope.workelement.id > -1) {
				$scope.getById($scope.workelement.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.workelement.id = id;
			if($scope.workelement.id > -1) {
				$scope.getById($scope.workelement.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/workelement_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/workelement_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.workelement.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idproject.
		    $scope.frmWorkelement.idproject.$setPristine();
			$scope.frmWorkelement.idproject.$setUntouched();
			// idactivity.
		    $scope.frmWorkelement.idactivity.$setPristine();
			$scope.frmWorkelement.idactivity.$setUntouched();
			// idref.
		    $scope.frmWorkelement.idref.$setPristine();
			$scope.frmWorkelement.idref.$setUntouched();
			// reftype.
		    $scope.frmWorkelement.reftype.$setPristine();
			$scope.frmWorkelement.reftype.$setUntouched();
			// plannedwork.
		    $scope.frmWorkelement.plannedwork.$setPristine();
			$scope.frmWorkelement.plannedwork.$setUntouched();
			// realwork.
		    $scope.frmWorkelement.realwork.$setPristine();
			$scope.frmWorkelement.realwork.$setUntouched();
			// leftwork.
		    $scope.frmWorkelement.leftwork.$setPristine();
			$scope.frmWorkelement.leftwork.$setUntouched();
			// ongoing.
		    $scope.frmWorkelement.ongoing.$setPristine();
			$scope.frmWorkelement.ongoing.$setUntouched();
			// ongoingstartdatetime.
		    $scope.frmWorkelement.ongoingstartdatetime.$setPristine();
			$scope.frmWorkelement.ongoingstartdatetime.$setUntouched();
			// realcost.
		    $scope.frmWorkelement.realcost.$setPristine();
			$scope.frmWorkelement.realcost.$setUntouched();
			// leftcost.
		    $scope.frmWorkelement.leftcost.$setPristine();
			$scope.frmWorkelement.leftcost.$setUntouched();

		    // form.
			$scope.frmWorkelement.$setPristine();
			$scope.frmWorkelement.$setUntouched();
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
			if($scope.frmWorkelement.$invalid) {
				$scope.frmWorkelement.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.workelement.id > -1) {
				result = workelementService.updateWithLock($scope.workelement.id, $scope.workelement);
			} else {
				result = workelementService.create($scope.workelement);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.workelement.id > -1) {
						$scope.workelement.version = response.data;
					} else {
						$scope.workelement.id = response.data;
						$scope.workelement.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmWorkelement.scope.$invalid = true;
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
			workelementService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.workelements.length == 1 && $scope.page.currentPage > 0){
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
			workelementService.updateForDeleteWithLock($scope.workelement.id, $scope.workelement.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.workelements.length == 1 && $scope.page.currentPage > 0){
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
			workelementService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.workelement = data;
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
			workelementService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.workelements = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.workelements = result;
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
				// idactivity.
		    	//result.push({ key: 'idactivity', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idref.
		    	//result.push({ key: 'idref', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedwork.
		    	//result.push({ key: 'plannedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realwork.
		    	//result.push({ key: 'realwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// leftwork.
		    	//result.push({ key: 'leftwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// ongoing.
		    	//result.push({ key: 'ongoing', operation: 'like', value: $scope.search.content, logic: 'or' });
				// ongoingstartdatetime.
		    	//result.push({ key: 'ongoingstartdatetime', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realcost.
		    	//result.push({ key: 'realcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// leftcost.
		    	//result.push({ key: 'leftcost', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingworkelementController',
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
				controller: 'clientbuildingworkelementController',
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

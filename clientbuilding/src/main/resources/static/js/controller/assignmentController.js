
/**
 * Controller for Assignment
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/assignmentService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'assignmentController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'assignmentService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, assignmentService) {
		if(typeof(clientbuilding.translate.assignment) === 'undefined' || clientbuilding.translate.assignment.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.assignment) === 'undefined') {
				clientbuilding.translate.assignment = '';
			}
			clientbuilding.translate.assignment += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/assignment');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_assignment_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_assignment_idref')});
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_assignment_idproject')});
				// idaffectation.
		    	$scope.sortData.push({value: 'idaffectation', display: $translate.instant('clientbuilding_assignment_idaffectation')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_assignment_reftype')});
				// idfunctionrole.
		    	$scope.sortData.push({value: 'idfunctionrole', display: $translate.instant('clientbuilding_assignment_idfunctionrole')});
				// rate.
		    	$scope.sortData.push({value: 'rate', display: $translate.instant('clientbuilding_assignment_rate')});
				// assignedwork.
		    	$scope.sortData.push({value: 'assignedwork', display: $translate.instant('clientbuilding_assignment_assignedwork')});
				// realwork.
		    	$scope.sortData.push({value: 'realwork', display: $translate.instant('clientbuilding_assignment_realwork')});
				// leftwork.
		    	$scope.sortData.push({value: 'leftwork', display: $translate.instant('clientbuilding_assignment_leftwork')});
				// plannedwork.
		    	$scope.sortData.push({value: 'plannedwork', display: $translate.instant('clientbuilding_assignment_plannedwork')});
				// realstartdate.
		    	$scope.sortData.push({value: 'realstartdate', display: $translate.instant('clientbuilding_assignment_realstartdate')});
				// realenddate.
		    	$scope.sortData.push({value: 'realenddate', display: $translate.instant('clientbuilding_assignment_realenddate')});
				// comment.
		    	$scope.sortData.push({value: 'comment', display: $translate.instant('clientbuilding_assignment_comment')});
				// plannedstartdate.
		    	$scope.sortData.push({value: 'plannedstartdate', display: $translate.instant('clientbuilding_assignment_plannedstartdate')});
				// plannedenddate.
		    	$scope.sortData.push({value: 'plannedenddate', display: $translate.instant('clientbuilding_assignment_plannedenddate')});
				// dailycost.
		    	$scope.sortData.push({value: 'dailycost', display: $translate.instant('clientbuilding_assignment_dailycost')});
				// newddailycost.
		    	$scope.sortData.push({value: 'newddailycost', display: $translate.instant('clientbuilding_assignment_newddailycost')});
				// assignedcost.
		    	$scope.sortData.push({value: 'assignedcost', display: $translate.instant('clientbuilding_assignment_assignedcost')});
				// realcost.
		    	$scope.sortData.push({value: 'realcost', display: $translate.instant('clientbuilding_assignment_realcost')});
				// leftcost.
		    	$scope.sortData.push({value: 'leftcost', display: $translate.instant('clientbuilding_assignment_leftcost')});
				// plannedcost.
		    	$scope.sortData.push({value: 'plannedcost', display: $translate.instant('clientbuilding_assignment_plannedcost')});
				// billedwork.
		    	$scope.sortData.push({value: 'billedwork', display: $translate.instant('clientbuilding_assignment_billedwork')});
				// notplannedwork.
		    	$scope.sortData.push({value: 'notplannedwork', display: $translate.instant('clientbuilding_assignment_notplannedwork')});
				// optional.
		    	$scope.sortData.push({value: 'optional', display: $translate.instant('clientbuilding_assignment_optional')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_assignment_title');
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
		
		$scope.assignment = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.assignment = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.assignment.id = id;
			if($scope.assignment.id > -1) {
				$scope.getById($scope.assignment.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.assignment.id = id;
			if($scope.assignment.id > -1) {
				$scope.getById($scope.assignment.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/assignment_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/assignment_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.assignment.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idref.
		    $scope.frmAssignment.idref.$setPristine();
			$scope.frmAssignment.idref.$setUntouched();
			// idproject.
		    $scope.frmAssignment.idproject.$setPristine();
			$scope.frmAssignment.idproject.$setUntouched();
			// idaffectation.
		    $scope.frmAssignment.idaffectation.$setPristine();
			$scope.frmAssignment.idaffectation.$setUntouched();
			// reftype.
		    $scope.frmAssignment.reftype.$setPristine();
			$scope.frmAssignment.reftype.$setUntouched();
			// idfunctionrole.
		    $scope.frmAssignment.idfunctionrole.$setPristine();
			$scope.frmAssignment.idfunctionrole.$setUntouched();
			// rate.
		    $scope.frmAssignment.rate.$setPristine();
			$scope.frmAssignment.rate.$setUntouched();
			// assignedwork.
		    $scope.frmAssignment.assignedwork.$setPristine();
			$scope.frmAssignment.assignedwork.$setUntouched();
			// realwork.
		    $scope.frmAssignment.realwork.$setPristine();
			$scope.frmAssignment.realwork.$setUntouched();
			// leftwork.
		    $scope.frmAssignment.leftwork.$setPristine();
			$scope.frmAssignment.leftwork.$setUntouched();
			// plannedwork.
		    $scope.frmAssignment.plannedwork.$setPristine();
			$scope.frmAssignment.plannedwork.$setUntouched();
			// realstartdate.
		    $scope.frmAssignment.realstartdate.$setPristine();
			$scope.frmAssignment.realstartdate.$setUntouched();
			// realenddate.
		    $scope.frmAssignment.realenddate.$setPristine();
			$scope.frmAssignment.realenddate.$setUntouched();
			// comment.
		    $scope.frmAssignment.comment.$setPristine();
			$scope.frmAssignment.comment.$setUntouched();
			// plannedstartdate.
		    $scope.frmAssignment.plannedstartdate.$setPristine();
			$scope.frmAssignment.plannedstartdate.$setUntouched();
			// plannedenddate.
		    $scope.frmAssignment.plannedenddate.$setPristine();
			$scope.frmAssignment.plannedenddate.$setUntouched();
			// dailycost.
		    $scope.frmAssignment.dailycost.$setPristine();
			$scope.frmAssignment.dailycost.$setUntouched();
			// newddailycost.
		    $scope.frmAssignment.newddailycost.$setPristine();
			$scope.frmAssignment.newddailycost.$setUntouched();
			// assignedcost.
		    $scope.frmAssignment.assignedcost.$setPristine();
			$scope.frmAssignment.assignedcost.$setUntouched();
			// realcost.
		    $scope.frmAssignment.realcost.$setPristine();
			$scope.frmAssignment.realcost.$setUntouched();
			// leftcost.
		    $scope.frmAssignment.leftcost.$setPristine();
			$scope.frmAssignment.leftcost.$setUntouched();
			// plannedcost.
		    $scope.frmAssignment.plannedcost.$setPristine();
			$scope.frmAssignment.plannedcost.$setUntouched();
			// billedwork.
		    $scope.frmAssignment.billedwork.$setPristine();
			$scope.frmAssignment.billedwork.$setUntouched();
			// notplannedwork.
		    $scope.frmAssignment.notplannedwork.$setPristine();
			$scope.frmAssignment.notplannedwork.$setUntouched();
			// optional.
		    $scope.frmAssignment.optional.$setPristine();
			$scope.frmAssignment.optional.$setUntouched();

		    // form.
			$scope.frmAssignment.$setPristine();
			$scope.frmAssignment.$setUntouched();
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
			if($scope.frmAssignment.$invalid) {
				$scope.frmAssignment.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.assignment.id > -1) {
				result = assignmentService.updateWithLock($scope.assignment.id, $scope.assignment);
			} else {
				result = assignmentService.create($scope.assignment);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.assignment.id > -1) {
						$scope.assignment.version = response.data;
					} else {
						$scope.assignment.id = response.data;
						$scope.assignment.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmAssignment.scope.$invalid = true;
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
			assignmentService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.assignments.length == 1 && $scope.page.currentPage > 0){
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
			assignmentService.updateForDeleteWithLock($scope.assignment.id, $scope.assignment.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.assignments.length == 1 && $scope.page.currentPage > 0){
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
			assignmentService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.assignment = data;
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
			assignmentService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.assignments = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.assignments = result;
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
				// idref.
		    	//result.push({ key: 'idref', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idproject.
		    	//result.push({ key: 'idproject', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idaffectation.
		    	//result.push({ key: 'idaffectation', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idfunctionrole.
		    	//result.push({ key: 'idfunctionrole', operation: 'like', value: $scope.search.content, logic: 'or' });
				// rate.
		    	//result.push({ key: 'rate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// assignedwork.
		    	//result.push({ key: 'assignedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realwork.
		    	//result.push({ key: 'realwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// leftwork.
		    	//result.push({ key: 'leftwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedwork.
		    	//result.push({ key: 'plannedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realstartdate.
		    	//result.push({ key: 'realstartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realenddate.
		    	//result.push({ key: 'realenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// comment.
		    	//result.push({ key: 'comment', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedstartdate.
		    	//result.push({ key: 'plannedstartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedenddate.
		    	//result.push({ key: 'plannedenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// dailycost.
		    	//result.push({ key: 'dailycost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// newddailycost.
		    	//result.push({ key: 'newddailycost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// assignedcost.
		    	//result.push({ key: 'assignedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realcost.
		    	//result.push({ key: 'realcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// leftcost.
		    	//result.push({ key: 'leftcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedcost.
		    	//result.push({ key: 'plannedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// billedwork.
		    	//result.push({ key: 'billedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// notplannedwork.
		    	//result.push({ key: 'notplannedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// optional.
		    	//result.push({ key: 'optional', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingassignmentController',
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
				controller: 'clientbuildingassignmentController',
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

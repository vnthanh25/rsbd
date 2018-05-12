
/**
 * Controller for Affectation
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/affectationService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'affectationController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'affectationService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, affectationService) {
		if(typeof(clientbuilding.translate.affectation) === 'undefined' || clientbuilding.translate.affectation.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.affectation) === 'undefined') {
				clientbuilding.translate.affectation = '';
			}
			clientbuilding.translate.affectation += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/affectation');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_affectation_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_affectation_idproject')});
				// idfunctionrole.
		    	$scope.sortData.push({value: 'idfunctionrole', display: $translate.instant('clientbuilding_affectation_idfunctionrole')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_affectation_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_affectation_reftype')});
				// code.
		    	$scope.sortData.push({value: 'code', display: $translate.instant('clientbuilding_affectation_code')});
				// scope.
		    	$scope.sortData.push({value: 'scope', display: $translate.instant('clientbuilding_affectation_scope')});
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_affectation_name')});
				// price.
		    	$scope.sortData.push({value: 'price', display: $translate.instant('clientbuilding_affectation_price')});
				// quantity.
		    	$scope.sortData.push({value: 'quantity', display: $translate.instant('clientbuilding_affectation_quantity')});
				// fee.
		    	$scope.sortData.push({value: 'fee', display: $translate.instant('clientbuilding_affectation_fee')});
				// amount.
		    	$scope.sortData.push({value: 'amount', display: $translate.instant('clientbuilding_affectation_amount')});
				// description.
		    	$scope.sortData.push({value: 'description', display: $translate.instant('clientbuilding_affectation_description')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_affectation_title');
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
		
		$scope.affectation = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.affectation = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.affectation.id = id;
			if($scope.affectation.id > -1) {
				$scope.getById($scope.affectation.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.affectation.id = id;
			if($scope.affectation.id > -1) {
				$scope.getById($scope.affectation.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/affectation_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/affectation_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.affectation.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idproject.
		    $scope.frmAffectation.idproject.$setPristine();
			$scope.frmAffectation.idproject.$setUntouched();
			// idfunctionrole.
		    $scope.frmAffectation.idfunctionrole.$setPristine();
			$scope.frmAffectation.idfunctionrole.$setUntouched();
			// idref.
		    $scope.frmAffectation.idref.$setPristine();
			$scope.frmAffectation.idref.$setUntouched();
			// reftype.
		    $scope.frmAffectation.reftype.$setPristine();
			$scope.frmAffectation.reftype.$setUntouched();
			// code.
		    $scope.frmAffectation.code.$setPristine();
			$scope.frmAffectation.code.$setUntouched();
			// scope.
		    $scope.frmAffectation.scope.$setPristine();
			$scope.frmAffectation.scope.$setUntouched();
			// name.
		    $scope.frmAffectation.name.$setPristine();
			$scope.frmAffectation.name.$setUntouched();
			// price.
		    $scope.frmAffectation.price.$setPristine();
			$scope.frmAffectation.price.$setUntouched();
			// quantity.
		    $scope.frmAffectation.quantity.$setPristine();
			$scope.frmAffectation.quantity.$setUntouched();
			// fee.
		    $scope.frmAffectation.fee.$setPristine();
			$scope.frmAffectation.fee.$setUntouched();
			// amount.
		    $scope.frmAffectation.amount.$setPristine();
			$scope.frmAffectation.amount.$setUntouched();
			// description.
		    $scope.frmAffectation.description.$setPristine();
			$scope.frmAffectation.description.$setUntouched();

		    // form.
			$scope.frmAffectation.$setPristine();
			$scope.frmAffectation.$setUntouched();
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
			if($scope.frmAffectation.$invalid) {
				$scope.frmAffectation.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.affectation.id > -1) {
				result = affectationService.updateWithLock($scope.affectation.id, $scope.affectation);
			} else {
				result = affectationService.create($scope.affectation);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.affectation.id > -1) {
						$scope.affectation.version = response.data;
					} else {
						$scope.affectation.id = response.data;
						$scope.affectation.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmAffectation.scope.$invalid = true;
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
			affectationService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.affectations.length == 1 && $scope.page.currentPage > 0){
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
			affectationService.updateForDeleteWithLock($scope.affectation.id, $scope.affectation.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.affectations.length == 1 && $scope.page.currentPage > 0){
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
			affectationService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.affectation = data;
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
			affectationService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.affectations = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.affectations = result;
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
				// idfunctionrole.
		    	//result.push({ key: 'idfunctionrole', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idref.
		    	//result.push({ key: 'idref', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// code.
		    	//result.push({ key: 'code', operation: 'like', value: $scope.search.content, logic: 'or' });
				// scope.
		    	//result.push({ key: 'scope', operation: 'like', value: $scope.search.content, logic: 'or' });
				// name.
		    	//result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// price.
		    	//result.push({ key: 'price', operation: 'like', value: $scope.search.content, logic: 'or' });
				// quantity.
		    	//result.push({ key: 'quantity', operation: 'like', value: $scope.search.content, logic: 'or' });
				// fee.
		    	//result.push({ key: 'fee', operation: 'like', value: $scope.search.content, logic: 'or' });
				// amount.
		    	//result.push({ key: 'amount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	//result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingaffectationController',
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
				controller: 'clientbuildingaffectationController',
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

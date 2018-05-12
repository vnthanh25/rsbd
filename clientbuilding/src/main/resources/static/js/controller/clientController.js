
/**
 * Controller for Client
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/clientService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'clientController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'clientService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, clientService) {
		if(typeof(clientbuilding.translate.client) === 'undefined' || clientbuilding.translate.client.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.client) === 'undefined') {
				clientbuilding.translate.client = '';
			}
			clientbuilding.translate.client += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/client');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_client_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idclienttype.
		    	$scope.sortData.push({value: 'idclienttype', display: $translate.instant('clientbuilding_client_idclienttype')});
				// clientcode.
		    	$scope.sortData.push({value: 'clientcode', display: $translate.instant('clientbuilding_client_clientcode')});
				// name.
		    	$scope.sortData.push({value: 'name', display: $translate.instant('clientbuilding_client_name')});
				// numtax.
		    	$scope.sortData.push({value: 'numtax', display: $translate.instant('clientbuilding_client_numtax')});
				// description.
		    	$scope.sortData.push({value: 'description', display: $translate.instant('clientbuilding_client_description')});
				// tax.
		    	$scope.sortData.push({value: 'tax', display: $translate.instant('clientbuilding_client_tax')});
				// designation.
		    	$scope.sortData.push({value: 'designation', display: $translate.instant('clientbuilding_client_designation')});
				// street.
		    	$scope.sortData.push({value: 'street', display: $translate.instant('clientbuilding_client_street')});
				// complement.
		    	$scope.sortData.push({value: 'complement', display: $translate.instant('clientbuilding_client_complement')});
				// zip.
		    	$scope.sortData.push({value: 'zip', display: $translate.instant('clientbuilding_client_zip')});
				// city.
		    	$scope.sortData.push({value: 'city', display: $translate.instant('clientbuilding_client_city')});
				// state.
		    	$scope.sortData.push({value: 'state', display: $translate.instant('clientbuilding_client_state')});
				// country.
		    	$scope.sortData.push({value: 'country', display: $translate.instant('clientbuilding_client_country')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_client_title');
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
		
		$scope.client = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.client = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.client.id = id;
			if($scope.client.id > -1) {
				$scope.getById($scope.client.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.client.id = id;
			if($scope.client.id > -1) {
				$scope.getById($scope.client.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/client_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/client_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.client.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idclienttype.
		    $scope.frmClient.idclienttype.$setPristine();
			$scope.frmClient.idclienttype.$setUntouched();
			// clientcode.
		    $scope.frmClient.clientcode.$setPristine();
			$scope.frmClient.clientcode.$setUntouched();
			// name.
		    $scope.frmClient.name.$setPristine();
			$scope.frmClient.name.$setUntouched();
			// numtax.
		    $scope.frmClient.numtax.$setPristine();
			$scope.frmClient.numtax.$setUntouched();
			// description.
		    $scope.frmClient.description.$setPristine();
			$scope.frmClient.description.$setUntouched();
			// tax.
		    $scope.frmClient.tax.$setPristine();
			$scope.frmClient.tax.$setUntouched();
			// designation.
		    $scope.frmClient.designation.$setPristine();
			$scope.frmClient.designation.$setUntouched();
			// street.
		    $scope.frmClient.street.$setPristine();
			$scope.frmClient.street.$setUntouched();
			// complement.
		    $scope.frmClient.complement.$setPristine();
			$scope.frmClient.complement.$setUntouched();
			// zip.
		    $scope.frmClient.zip.$setPristine();
			$scope.frmClient.zip.$setUntouched();
			// city.
		    $scope.frmClient.city.$setPristine();
			$scope.frmClient.city.$setUntouched();
			// state.
		    $scope.frmClient.state.$setPristine();
			$scope.frmClient.state.$setUntouched();
			// country.
		    $scope.frmClient.country.$setPristine();
			$scope.frmClient.country.$setUntouched();

		    // form.
			$scope.frmClient.$setPristine();
			$scope.frmClient.$setUntouched();
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
			if($scope.frmClient.$invalid) {
				$scope.frmClient.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.client.id > -1) {
				result = clientService.updateWithLock($scope.client.id, $scope.client);
			} else {
				result = clientService.create($scope.client);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.client.id > -1) {
						$scope.client.version = response.data;
					} else {
						$scope.client.id = response.data;
						$scope.client.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmClient.scope.$invalid = true;
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
			clientService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.clients.length == 1 && $scope.page.currentPage > 0){
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
			clientService.updateForDeleteWithLock($scope.client.id, $scope.client.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.clients.length == 1 && $scope.page.currentPage > 0){
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
			clientService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.client = data;
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
			clientService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.clients = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.clients = result;
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
				// idclienttype.
		    	//result.push({ key: 'idclienttype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// clientcode.
		    	//result.push({ key: 'clientcode', operation: 'like', value: $scope.search.content, logic: 'or' });
				// name.
		    	//result.push({ key: 'name', operation: 'like', value: $scope.search.content, logic: 'or' });
				// numtax.
		    	//result.push({ key: 'numtax', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	//result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
				// tax.
		    	//result.push({ key: 'tax', operation: 'like', value: $scope.search.content, logic: 'or' });
				// designation.
		    	//result.push({ key: 'designation', operation: 'like', value: $scope.search.content, logic: 'or' });
				// street.
		    	//result.push({ key: 'street', operation: 'like', value: $scope.search.content, logic: 'or' });
				// complement.
		    	//result.push({ key: 'complement', operation: 'like', value: $scope.search.content, logic: 'or' });
				// zip.
		    	//result.push({ key: 'zip', operation: 'like', value: $scope.search.content, logic: 'or' });
				// city.
		    	//result.push({ key: 'city', operation: 'like', value: $scope.search.content, logic: 'or' });
				// state.
		    	//result.push({ key: 'state', operation: 'like', value: $scope.search.content, logic: 'or' });
				// country.
		    	//result.push({ key: 'country', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingclientController',
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
				controller: 'clientbuildingclientController',
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

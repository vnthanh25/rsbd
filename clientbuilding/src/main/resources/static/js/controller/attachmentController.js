
/**
 * Controller for Attachment
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/attachmentService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'attachmentController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'attachmentService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, attachmentService) {
		if(typeof(clientbuilding.translate.attachment) === 'undefined' || clientbuilding.translate.attachment.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.attachment) === 'undefined') {
				clientbuilding.translate.attachment = '';
			}
			clientbuilding.translate.attachment += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/attachment');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_attachment_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_attachment_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_attachment_reftype')});
				// filename.
		    	$scope.sortData.push({value: 'filename', display: $translate.instant('clientbuilding_attachment_filename')});
				// filesize.
		    	$scope.sortData.push({value: 'filesize', display: $translate.instant('clientbuilding_attachment_filesize')});
				// mimetype.
		    	$scope.sortData.push({value: 'mimetype', display: $translate.instant('clientbuilding_attachment_mimetype')});
				// description.
		    	$scope.sortData.push({value: 'description', display: $translate.instant('clientbuilding_attachment_description')});
				// filepath.
		    	$scope.sortData.push({value: 'filepath', display: $translate.instant('clientbuilding_attachment_filepath')});
				// filetype.
		    	$scope.sortData.push({value: 'filetype', display: $translate.instant('clientbuilding_attachment_filetype')});
				// note.
		    	$scope.sortData.push({value: 'note', display: $translate.instant('clientbuilding_attachment_note')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_attachment_title');
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
		
		$scope.attachment = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.attachment = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.attachment.id = id;
			if($scope.attachment.id > -1) {
				$scope.getById($scope.attachment.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.attachment.id = id;
			if($scope.attachment.id > -1) {
				$scope.getById($scope.attachment.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/attachment_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/attachment_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.attachment.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idref.
		    $scope.frmAttachment.idref.$setPristine();
			$scope.frmAttachment.idref.$setUntouched();
			// reftype.
		    $scope.frmAttachment.reftype.$setPristine();
			$scope.frmAttachment.reftype.$setUntouched();
			// filename.
		    $scope.frmAttachment.filename.$setPristine();
			$scope.frmAttachment.filename.$setUntouched();
			// filesize.
		    $scope.frmAttachment.filesize.$setPristine();
			$scope.frmAttachment.filesize.$setUntouched();
			// mimetype.
		    $scope.frmAttachment.mimetype.$setPristine();
			$scope.frmAttachment.mimetype.$setUntouched();
			// description.
		    $scope.frmAttachment.description.$setPristine();
			$scope.frmAttachment.description.$setUntouched();
			// filepath.
		    $scope.frmAttachment.filepath.$setPristine();
			$scope.frmAttachment.filepath.$setUntouched();
			// filetype.
		    $scope.frmAttachment.filetype.$setPristine();
			$scope.frmAttachment.filetype.$setUntouched();
			// note.
		    $scope.frmAttachment.note.$setPristine();
			$scope.frmAttachment.note.$setUntouched();

		    // form.
			$scope.frmAttachment.$setPristine();
			$scope.frmAttachment.$setUntouched();
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
			if($scope.frmAttachment.$invalid) {
				$scope.frmAttachment.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.attachment.id > -1) {
				result = attachmentService.updateWithLock($scope.attachment.id, $scope.attachment);
			} else {
				result = attachmentService.create($scope.attachment);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.attachment.id > -1) {
						$scope.attachment.version = response.data;
					} else {
						$scope.attachment.id = response.data;
						$scope.attachment.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmAttachment.scope.$invalid = true;
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
			attachmentService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.attachments.length == 1 && $scope.page.currentPage > 0){
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
			attachmentService.updateForDeleteWithLock($scope.attachment.id, $scope.attachment.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.attachments.length == 1 && $scope.page.currentPage > 0){
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
			attachmentService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.attachment = data;
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
			attachmentService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.attachments = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.attachments = result;
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
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// filename.
		    	//result.push({ key: 'filename', operation: 'like', value: $scope.search.content, logic: 'or' });
				// filesize.
		    	//result.push({ key: 'filesize', operation: 'like', value: $scope.search.content, logic: 'or' });
				// mimetype.
		    	//result.push({ key: 'mimetype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// description.
		    	//result.push({ key: 'description', operation: 'like', value: $scope.search.content, logic: 'or' });
				// filepath.
		    	//result.push({ key: 'filepath', operation: 'like', value: $scope.search.content, logic: 'or' });
				// filetype.
		    	//result.push({ key: 'filetype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// note.
		    	//result.push({ key: 'note', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingattachmentController',
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
				controller: 'clientbuildingattachmentController',
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

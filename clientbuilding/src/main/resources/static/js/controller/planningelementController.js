
/**
 * Controller for Planningelement
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/planningelementService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'planningelementController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'planningelementService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, planningelementService) {
		if(typeof(clientbuilding.translate.planningelement) === 'undefined' || clientbuilding.translate.planningelement.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.planningelement) === 'undefined') {
				clientbuilding.translate.planningelement = '';
			}
			clientbuilding.translate.planningelement += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/planningelement');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_planningelement_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_planningelement_idproject')});
				// idplanningmode.
		    	$scope.sortData.push({value: 'idplanningmode', display: $translate.instant('clientbuilding_planningelement_idplanningmode')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_planningelement_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_planningelement_reftype')});
				// initialstartdate.
		    	$scope.sortData.push({value: 'initialstartdate', display: $translate.instant('clientbuilding_planningelement_initialstartdate')});
				// validatedstartdate.
		    	$scope.sortData.push({value: 'validatedstartdate', display: $translate.instant('clientbuilding_planningelement_validatedstartdate')});
				// plannedstartdate.
		    	$scope.sortData.push({value: 'plannedstartdate', display: $translate.instant('clientbuilding_planningelement_plannedstartdate')});
				// realstartdate.
		    	$scope.sortData.push({value: 'realstartdate', display: $translate.instant('clientbuilding_planningelement_realstartdate')});
				// initialenddate.
		    	$scope.sortData.push({value: 'initialenddate', display: $translate.instant('clientbuilding_planningelement_initialenddate')});
				// validatedenddate.
		    	$scope.sortData.push({value: 'validatedenddate', display: $translate.instant('clientbuilding_planningelement_validatedenddate')});
				// plannedenddate.
		    	$scope.sortData.push({value: 'plannedenddate', display: $translate.instant('clientbuilding_planningelement_plannedenddate')});
				// realenddate.
		    	$scope.sortData.push({value: 'realenddate', display: $translate.instant('clientbuilding_planningelement_realenddate')});
				// initialduration.
		    	$scope.sortData.push({value: 'initialduration', display: $translate.instant('clientbuilding_planningelement_initialduration')});
				// validatedduration.
		    	$scope.sortData.push({value: 'validatedduration', display: $translate.instant('clientbuilding_planningelement_validatedduration')});
				// plannedduration.
		    	$scope.sortData.push({value: 'plannedduration', display: $translate.instant('clientbuilding_planningelement_plannedduration')});
				// realduration.
		    	$scope.sortData.push({value: 'realduration', display: $translate.instant('clientbuilding_planningelement_realduration')});
				// initialwork.
		    	$scope.sortData.push({value: 'initialwork', display: $translate.instant('clientbuilding_planningelement_initialwork')});
				// validatedwork.
		    	$scope.sortData.push({value: 'validatedwork', display: $translate.instant('clientbuilding_planningelement_validatedwork')});
				// plannedwork.
		    	$scope.sortData.push({value: 'plannedwork', display: $translate.instant('clientbuilding_planningelement_plannedwork')});
				// realwork.
		    	$scope.sortData.push({value: 'realwork', display: $translate.instant('clientbuilding_planningelement_realwork')});
				// wbs.
		    	$scope.sortData.push({value: 'wbs', display: $translate.instant('clientbuilding_planningelement_wbs')});
				// wbssortable.
		    	$scope.sortData.push({value: 'wbssortable', display: $translate.instant('clientbuilding_planningelement_wbssortable')});
				// priority.
		    	$scope.sortData.push({value: 'priority', display: $translate.instant('clientbuilding_planningelement_priority')});
				// leftwork.
		    	$scope.sortData.push({value: 'leftwork', display: $translate.instant('clientbuilding_planningelement_leftwork')});
				// assignedwork.
		    	$scope.sortData.push({value: 'assignedwork', display: $translate.instant('clientbuilding_planningelement_assignedwork')});
				// dependencylevel.
		    	$scope.sortData.push({value: 'dependencylevel', display: $translate.instant('clientbuilding_planningelement_dependencylevel')});
				// initialcost.
		    	$scope.sortData.push({value: 'initialcost', display: $translate.instant('clientbuilding_planningelement_initialcost')});
				// validatedcost.
		    	$scope.sortData.push({value: 'validatedcost', display: $translate.instant('clientbuilding_planningelement_validatedcost')});
				// assignedcost.
		    	$scope.sortData.push({value: 'assignedcost', display: $translate.instant('clientbuilding_planningelement_assignedcost')});
				// realcost.
		    	$scope.sortData.push({value: 'realcost', display: $translate.instant('clientbuilding_planningelement_realcost')});
				// leftcost.
		    	$scope.sortData.push({value: 'leftcost', display: $translate.instant('clientbuilding_planningelement_leftcost')});
				// plannedcost.
		    	$scope.sortData.push({value: 'plannedcost', display: $translate.instant('clientbuilding_planningelement_plannedcost')});
				// progress.
		    	$scope.sortData.push({value: 'progress', display: $translate.instant('clientbuilding_planningelement_progress')});
				// expectedprogress.
		    	$scope.sortData.push({value: 'expectedprogress', display: $translate.instant('clientbuilding_planningelement_expectedprogress')});
				// workelementestimatedwork.
		    	$scope.sortData.push({value: 'workelementestimatedwork', display: $translate.instant('clientbuilding_planningelement_workelementestimatedwork')});
				// workelementrealwork.
		    	$scope.sortData.push({value: 'workelementrealwork', display: $translate.instant('clientbuilding_planningelement_workelementrealwork')});
				// workelementleftwork.
		    	$scope.sortData.push({value: 'workelementleftwork', display: $translate.instant('clientbuilding_planningelement_workelementleftwork')});
				// workelementcount.
		    	$scope.sortData.push({value: 'workelementcount', display: $translate.instant('clientbuilding_planningelement_workelementcount')});
				// expenseassignedamount.
		    	$scope.sortData.push({value: 'expenseassignedamount', display: $translate.instant('clientbuilding_planningelement_expenseassignedamount')});
				// expenseplannedamount.
		    	$scope.sortData.push({value: 'expenseplannedamount', display: $translate.instant('clientbuilding_planningelement_expenseplannedamount')});
				// expenserealamount.
		    	$scope.sortData.push({value: 'expenserealamount', display: $translate.instant('clientbuilding_planningelement_expenserealamount')});
				// expenseleftamount.
		    	$scope.sortData.push({value: 'expenseleftamount', display: $translate.instant('clientbuilding_planningelement_expenseleftamount')});
				// expensevalidatedamount.
		    	$scope.sortData.push({value: 'expensevalidatedamount', display: $translate.instant('clientbuilding_planningelement_expensevalidatedamount')});
				// totalassignedcost.
		    	$scope.sortData.push({value: 'totalassignedcost', display: $translate.instant('clientbuilding_planningelement_totalassignedcost')});
				// totalplannedcost.
		    	$scope.sortData.push({value: 'totalplannedcost', display: $translate.instant('clientbuilding_planningelement_totalplannedcost')});
				// totalrealcost.
		    	$scope.sortData.push({value: 'totalrealcost', display: $translate.instant('clientbuilding_planningelement_totalrealcost')});
				// totalleftcost.
		    	$scope.sortData.push({value: 'totalleftcost', display: $translate.instant('clientbuilding_planningelement_totalleftcost')});
				// totalvalidatedcost.
		    	$scope.sortData.push({value: 'totalvalidatedcost', display: $translate.instant('clientbuilding_planningelement_totalvalidatedcost')});
				// notplannedwork.
		    	$scope.sortData.push({value: 'notplannedwork', display: $translate.instant('clientbuilding_planningelement_notplannedwork')});
				// marginwork.
		    	$scope.sortData.push({value: 'marginwork', display: $translate.instant('clientbuilding_planningelement_marginwork')});
				// margincost.
		    	$scope.sortData.push({value: 'margincost', display: $translate.instant('clientbuilding_planningelement_margincost')});
				// marginworkpct.
		    	$scope.sortData.push({value: 'marginworkpct', display: $translate.instant('clientbuilding_planningelement_marginworkpct')});
				// margincostpct.
		    	$scope.sortData.push({value: 'margincostpct', display: $translate.instant('clientbuilding_planningelement_margincostpct')});
				// reserveamount.
		    	$scope.sortData.push({value: 'reserveamount', display: $translate.instant('clientbuilding_planningelement_reserveamount')});
				// validatedexpensecalculated.
		    	$scope.sortData.push({value: 'validatedexpensecalculated', display: $translate.instant('clientbuilding_planningelement_validatedexpensecalculated')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_planningelement_title');
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
		
		$scope.planningelement = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.planningelement = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.planningelement.id = id;
			if($scope.planningelement.id > -1) {
				$scope.getById($scope.planningelement.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.planningelement.id = id;
			if($scope.planningelement.id > -1) {
				$scope.getById($scope.planningelement.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/planningelement_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/planningelement_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.planningelement.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idproject.
		    $scope.frmPlanningelement.idproject.$setPristine();
			$scope.frmPlanningelement.idproject.$setUntouched();
			// idplanningmode.
		    $scope.frmPlanningelement.idplanningmode.$setPristine();
			$scope.frmPlanningelement.idplanningmode.$setUntouched();
			// idref.
		    $scope.frmPlanningelement.idref.$setPristine();
			$scope.frmPlanningelement.idref.$setUntouched();
			// reftype.
		    $scope.frmPlanningelement.reftype.$setPristine();
			$scope.frmPlanningelement.reftype.$setUntouched();
			// initialstartdate.
		    $scope.frmPlanningelement.initialstartdate.$setPristine();
			$scope.frmPlanningelement.initialstartdate.$setUntouched();
			// validatedstartdate.
		    $scope.frmPlanningelement.validatedstartdate.$setPristine();
			$scope.frmPlanningelement.validatedstartdate.$setUntouched();
			// plannedstartdate.
		    $scope.frmPlanningelement.plannedstartdate.$setPristine();
			$scope.frmPlanningelement.plannedstartdate.$setUntouched();
			// realstartdate.
		    $scope.frmPlanningelement.realstartdate.$setPristine();
			$scope.frmPlanningelement.realstartdate.$setUntouched();
			// initialenddate.
		    $scope.frmPlanningelement.initialenddate.$setPristine();
			$scope.frmPlanningelement.initialenddate.$setUntouched();
			// validatedenddate.
		    $scope.frmPlanningelement.validatedenddate.$setPristine();
			$scope.frmPlanningelement.validatedenddate.$setUntouched();
			// plannedenddate.
		    $scope.frmPlanningelement.plannedenddate.$setPristine();
			$scope.frmPlanningelement.plannedenddate.$setUntouched();
			// realenddate.
		    $scope.frmPlanningelement.realenddate.$setPristine();
			$scope.frmPlanningelement.realenddate.$setUntouched();
			// initialduration.
		    $scope.frmPlanningelement.initialduration.$setPristine();
			$scope.frmPlanningelement.initialduration.$setUntouched();
			// validatedduration.
		    $scope.frmPlanningelement.validatedduration.$setPristine();
			$scope.frmPlanningelement.validatedduration.$setUntouched();
			// plannedduration.
		    $scope.frmPlanningelement.plannedduration.$setPristine();
			$scope.frmPlanningelement.plannedduration.$setUntouched();
			// realduration.
		    $scope.frmPlanningelement.realduration.$setPristine();
			$scope.frmPlanningelement.realduration.$setUntouched();
			// initialwork.
		    $scope.frmPlanningelement.initialwork.$setPristine();
			$scope.frmPlanningelement.initialwork.$setUntouched();
			// validatedwork.
		    $scope.frmPlanningelement.validatedwork.$setPristine();
			$scope.frmPlanningelement.validatedwork.$setUntouched();
			// plannedwork.
		    $scope.frmPlanningelement.plannedwork.$setPristine();
			$scope.frmPlanningelement.plannedwork.$setUntouched();
			// realwork.
		    $scope.frmPlanningelement.realwork.$setPristine();
			$scope.frmPlanningelement.realwork.$setUntouched();
			// wbs.
		    $scope.frmPlanningelement.wbs.$setPristine();
			$scope.frmPlanningelement.wbs.$setUntouched();
			// wbssortable.
		    $scope.frmPlanningelement.wbssortable.$setPristine();
			$scope.frmPlanningelement.wbssortable.$setUntouched();
			// priority.
		    $scope.frmPlanningelement.priority.$setPristine();
			$scope.frmPlanningelement.priority.$setUntouched();
			// leftwork.
		    $scope.frmPlanningelement.leftwork.$setPristine();
			$scope.frmPlanningelement.leftwork.$setUntouched();
			// assignedwork.
		    $scope.frmPlanningelement.assignedwork.$setPristine();
			$scope.frmPlanningelement.assignedwork.$setUntouched();
			// dependencylevel.
		    $scope.frmPlanningelement.dependencylevel.$setPristine();
			$scope.frmPlanningelement.dependencylevel.$setUntouched();
			// initialcost.
		    $scope.frmPlanningelement.initialcost.$setPristine();
			$scope.frmPlanningelement.initialcost.$setUntouched();
			// validatedcost.
		    $scope.frmPlanningelement.validatedcost.$setPristine();
			$scope.frmPlanningelement.validatedcost.$setUntouched();
			// assignedcost.
		    $scope.frmPlanningelement.assignedcost.$setPristine();
			$scope.frmPlanningelement.assignedcost.$setUntouched();
			// realcost.
		    $scope.frmPlanningelement.realcost.$setPristine();
			$scope.frmPlanningelement.realcost.$setUntouched();
			// leftcost.
		    $scope.frmPlanningelement.leftcost.$setPristine();
			$scope.frmPlanningelement.leftcost.$setUntouched();
			// plannedcost.
		    $scope.frmPlanningelement.plannedcost.$setPristine();
			$scope.frmPlanningelement.plannedcost.$setUntouched();
			// progress.
		    $scope.frmPlanningelement.progress.$setPristine();
			$scope.frmPlanningelement.progress.$setUntouched();
			// expectedprogress.
		    $scope.frmPlanningelement.expectedprogress.$setPristine();
			$scope.frmPlanningelement.expectedprogress.$setUntouched();
			// workelementestimatedwork.
		    $scope.frmPlanningelement.workelementestimatedwork.$setPristine();
			$scope.frmPlanningelement.workelementestimatedwork.$setUntouched();
			// workelementrealwork.
		    $scope.frmPlanningelement.workelementrealwork.$setPristine();
			$scope.frmPlanningelement.workelementrealwork.$setUntouched();
			// workelementleftwork.
		    $scope.frmPlanningelement.workelementleftwork.$setPristine();
			$scope.frmPlanningelement.workelementleftwork.$setUntouched();
			// workelementcount.
		    $scope.frmPlanningelement.workelementcount.$setPristine();
			$scope.frmPlanningelement.workelementcount.$setUntouched();
			// expenseassignedamount.
		    $scope.frmPlanningelement.expenseassignedamount.$setPristine();
			$scope.frmPlanningelement.expenseassignedamount.$setUntouched();
			// expenseplannedamount.
		    $scope.frmPlanningelement.expenseplannedamount.$setPristine();
			$scope.frmPlanningelement.expenseplannedamount.$setUntouched();
			// expenserealamount.
		    $scope.frmPlanningelement.expenserealamount.$setPristine();
			$scope.frmPlanningelement.expenserealamount.$setUntouched();
			// expenseleftamount.
		    $scope.frmPlanningelement.expenseleftamount.$setPristine();
			$scope.frmPlanningelement.expenseleftamount.$setUntouched();
			// expensevalidatedamount.
		    $scope.frmPlanningelement.expensevalidatedamount.$setPristine();
			$scope.frmPlanningelement.expensevalidatedamount.$setUntouched();
			// totalassignedcost.
		    $scope.frmPlanningelement.totalassignedcost.$setPristine();
			$scope.frmPlanningelement.totalassignedcost.$setUntouched();
			// totalplannedcost.
		    $scope.frmPlanningelement.totalplannedcost.$setPristine();
			$scope.frmPlanningelement.totalplannedcost.$setUntouched();
			// totalrealcost.
		    $scope.frmPlanningelement.totalrealcost.$setPristine();
			$scope.frmPlanningelement.totalrealcost.$setUntouched();
			// totalleftcost.
		    $scope.frmPlanningelement.totalleftcost.$setPristine();
			$scope.frmPlanningelement.totalleftcost.$setUntouched();
			// totalvalidatedcost.
		    $scope.frmPlanningelement.totalvalidatedcost.$setPristine();
			$scope.frmPlanningelement.totalvalidatedcost.$setUntouched();
			// notplannedwork.
		    $scope.frmPlanningelement.notplannedwork.$setPristine();
			$scope.frmPlanningelement.notplannedwork.$setUntouched();
			// marginwork.
		    $scope.frmPlanningelement.marginwork.$setPristine();
			$scope.frmPlanningelement.marginwork.$setUntouched();
			// margincost.
		    $scope.frmPlanningelement.margincost.$setPristine();
			$scope.frmPlanningelement.margincost.$setUntouched();
			// marginworkpct.
		    $scope.frmPlanningelement.marginworkpct.$setPristine();
			$scope.frmPlanningelement.marginworkpct.$setUntouched();
			// margincostpct.
		    $scope.frmPlanningelement.margincostpct.$setPristine();
			$scope.frmPlanningelement.margincostpct.$setUntouched();
			// reserveamount.
		    $scope.frmPlanningelement.reserveamount.$setPristine();
			$scope.frmPlanningelement.reserveamount.$setUntouched();
			// validatedexpensecalculated.
		    $scope.frmPlanningelement.validatedexpensecalculated.$setPristine();
			$scope.frmPlanningelement.validatedexpensecalculated.$setUntouched();

		    // form.
			$scope.frmPlanningelement.$setPristine();
			$scope.frmPlanningelement.$setUntouched();
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
			if($scope.frmPlanningelement.$invalid) {
				$scope.frmPlanningelement.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.planningelement.id > -1) {
				result = planningelementService.updateWithLock($scope.planningelement.id, $scope.planningelement);
			} else {
				result = planningelementService.create($scope.planningelement);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.planningelement.id > -1) {
						$scope.planningelement.version = response.data;
					} else {
						$scope.planningelement.id = response.data;
						$scope.planningelement.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmPlanningelement.scope.$invalid = true;
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
			planningelementService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.planningelements.length == 1 && $scope.page.currentPage > 0){
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
			planningelementService.updateForDeleteWithLock($scope.planningelement.id, $scope.planningelement.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.planningelements.length == 1 && $scope.page.currentPage > 0){
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
			planningelementService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.planningelement = data;
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
			planningelementService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.planningelements = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.planningelements = result;
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
				// idplanningmode.
		    	//result.push({ key: 'idplanningmode', operation: 'like', value: $scope.search.content, logic: 'or' });
				// idref.
		    	//result.push({ key: 'idref', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reftype.
		    	//result.push({ key: 'reftype', operation: 'like', value: $scope.search.content, logic: 'or' });
				// initialstartdate.
		    	//result.push({ key: 'initialstartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// validatedstartdate.
		    	//result.push({ key: 'validatedstartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedstartdate.
		    	//result.push({ key: 'plannedstartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realstartdate.
		    	//result.push({ key: 'realstartdate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// initialenddate.
		    	//result.push({ key: 'initialenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// validatedenddate.
		    	//result.push({ key: 'validatedenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedenddate.
		    	//result.push({ key: 'plannedenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realenddate.
		    	//result.push({ key: 'realenddate', operation: 'like', value: $scope.search.content, logic: 'or' });
				// initialduration.
		    	//result.push({ key: 'initialduration', operation: 'like', value: $scope.search.content, logic: 'or' });
				// validatedduration.
		    	//result.push({ key: 'validatedduration', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedduration.
		    	//result.push({ key: 'plannedduration', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realduration.
		    	//result.push({ key: 'realduration', operation: 'like', value: $scope.search.content, logic: 'or' });
				// initialwork.
		    	//result.push({ key: 'initialwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// validatedwork.
		    	//result.push({ key: 'validatedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedwork.
		    	//result.push({ key: 'plannedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realwork.
		    	//result.push({ key: 'realwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// wbs.
		    	//result.push({ key: 'wbs', operation: 'like', value: $scope.search.content, logic: 'or' });
				// wbssortable.
		    	//result.push({ key: 'wbssortable', operation: 'like', value: $scope.search.content, logic: 'or' });
				// priority.
		    	//result.push({ key: 'priority', operation: 'like', value: $scope.search.content, logic: 'or' });
				// leftwork.
		    	//result.push({ key: 'leftwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// assignedwork.
		    	//result.push({ key: 'assignedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// dependencylevel.
		    	//result.push({ key: 'dependencylevel', operation: 'like', value: $scope.search.content, logic: 'or' });
				// initialcost.
		    	//result.push({ key: 'initialcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// validatedcost.
		    	//result.push({ key: 'validatedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// assignedcost.
		    	//result.push({ key: 'assignedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// realcost.
		    	//result.push({ key: 'realcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// leftcost.
		    	//result.push({ key: 'leftcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// plannedcost.
		    	//result.push({ key: 'plannedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// progress.
		    	//result.push({ key: 'progress', operation: 'like', value: $scope.search.content, logic: 'or' });
				// expectedprogress.
		    	//result.push({ key: 'expectedprogress', operation: 'like', value: $scope.search.content, logic: 'or' });
				// workelementestimatedwork.
		    	//result.push({ key: 'workelementestimatedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// workelementrealwork.
		    	//result.push({ key: 'workelementrealwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// workelementleftwork.
		    	//result.push({ key: 'workelementleftwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// workelementcount.
		    	//result.push({ key: 'workelementcount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// expenseassignedamount.
		    	//result.push({ key: 'expenseassignedamount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// expenseplannedamount.
		    	//result.push({ key: 'expenseplannedamount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// expenserealamount.
		    	//result.push({ key: 'expenserealamount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// expenseleftamount.
		    	//result.push({ key: 'expenseleftamount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// expensevalidatedamount.
		    	//result.push({ key: 'expensevalidatedamount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// totalassignedcost.
		    	//result.push({ key: 'totalassignedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// totalplannedcost.
		    	//result.push({ key: 'totalplannedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// totalrealcost.
		    	//result.push({ key: 'totalrealcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// totalleftcost.
		    	//result.push({ key: 'totalleftcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// totalvalidatedcost.
		    	//result.push({ key: 'totalvalidatedcost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// notplannedwork.
		    	//result.push({ key: 'notplannedwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// marginwork.
		    	//result.push({ key: 'marginwork', operation: 'like', value: $scope.search.content, logic: 'or' });
				// margincost.
		    	//result.push({ key: 'margincost', operation: 'like', value: $scope.search.content, logic: 'or' });
				// marginworkpct.
		    	//result.push({ key: 'marginworkpct', operation: 'like', value: $scope.search.content, logic: 'or' });
				// margincostpct.
		    	//result.push({ key: 'margincostpct', operation: 'like', value: $scope.search.content, logic: 'or' });
				// reserveamount.
		    	//result.push({ key: 'reserveamount', operation: 'like', value: $scope.search.content, logic: 'or' });
				// validatedexpensecalculated.
		    	//result.push({ key: 'validatedexpensecalculated', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingplanningelementController',
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
				controller: 'clientbuildingplanningelementController',
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

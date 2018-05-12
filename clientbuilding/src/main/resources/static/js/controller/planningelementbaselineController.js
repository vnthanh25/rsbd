
/**
 * Controller for Planningelementbaseline
 **/

define(['require', 'angular', clientbuilding.contextPath + '/js/service/planningelementbaselineService.js'], function (require, angular) {
	app.aController(clientbuilding.prefix + 'planningelementbaselineController', ['$scope', '$state', '$rootScope', '$mdDialog', '$http', '$log', '$window', '$location', '$filter', '$translate', '$translatePartialLoader', '$mdToast', clientbuilding.prefix + 'planningelementbaselineService',
		function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, $mdToast, planningelementbaselineService) {
		if(typeof(clientbuilding.translate.planningelementbaseline) === 'undefined' || clientbuilding.translate.planningelementbaseline.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.planningelementbaseline) === 'undefined') {
				clientbuilding.translate.planningelementbaseline = '';
			}
			clientbuilding.translate.planningelementbaseline += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/planningelementbaseline');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_planningelementbaseline_title');
			// Init sortData.
		    let title = $scope.reverse?'asc':'desc';
		    $scope.reverseTitle = $translate.instant('clientbuilding_home_sort_' + title);
		    if($scope.sortData.length < 1){
				// idbaseline.
		    	$scope.sortData.push({value: 'idbaseline', display: $translate.instant('clientbuilding_planningelementbaseline_idbaseline')});
				// idproject.
		    	$scope.sortData.push({value: 'idproject', display: $translate.instant('clientbuilding_planningelementbaseline_idproject')});
				// idplanningmode.
		    	$scope.sortData.push({value: 'idplanningmode', display: $translate.instant('clientbuilding_planningelementbaseline_idplanningmode')});
				// idref.
		    	$scope.sortData.push({value: 'idref', display: $translate.instant('clientbuilding_planningelementbaseline_idref')});
				// reftype.
		    	$scope.sortData.push({value: 'reftype', display: $translate.instant('clientbuilding_planningelementbaseline_reftype')});
				// initialstartdate.
		    	$scope.sortData.push({value: 'initialstartdate', display: $translate.instant('clientbuilding_planningelementbaseline_initialstartdate')});
				// validatedstartdate.
		    	$scope.sortData.push({value: 'validatedstartdate', display: $translate.instant('clientbuilding_planningelementbaseline_validatedstartdate')});
				// plannedstartdate.
		    	$scope.sortData.push({value: 'plannedstartdate', display: $translate.instant('clientbuilding_planningelementbaseline_plannedstartdate')});
				// realstartdate.
		    	$scope.sortData.push({value: 'realstartdate', display: $translate.instant('clientbuilding_planningelementbaseline_realstartdate')});
				// initialenddate.
		    	$scope.sortData.push({value: 'initialenddate', display: $translate.instant('clientbuilding_planningelementbaseline_initialenddate')});
				// validatedenddate.
		    	$scope.sortData.push({value: 'validatedenddate', display: $translate.instant('clientbuilding_planningelementbaseline_validatedenddate')});
				// plannedenddate.
		    	$scope.sortData.push({value: 'plannedenddate', display: $translate.instant('clientbuilding_planningelementbaseline_plannedenddate')});
				// realenddate.
		    	$scope.sortData.push({value: 'realenddate', display: $translate.instant('clientbuilding_planningelementbaseline_realenddate')});
				// initialduration.
		    	$scope.sortData.push({value: 'initialduration', display: $translate.instant('clientbuilding_planningelementbaseline_initialduration')});
				// validatedduration.
		    	$scope.sortData.push({value: 'validatedduration', display: $translate.instant('clientbuilding_planningelementbaseline_validatedduration')});
				// plannedduration.
		    	$scope.sortData.push({value: 'plannedduration', display: $translate.instant('clientbuilding_planningelementbaseline_plannedduration')});
				// realduration.
		    	$scope.sortData.push({value: 'realduration', display: $translate.instant('clientbuilding_planningelementbaseline_realduration')});
				// initialwork.
		    	$scope.sortData.push({value: 'initialwork', display: $translate.instant('clientbuilding_planningelementbaseline_initialwork')});
				// validatedwork.
		    	$scope.sortData.push({value: 'validatedwork', display: $translate.instant('clientbuilding_planningelementbaseline_validatedwork')});
				// plannedwork.
		    	$scope.sortData.push({value: 'plannedwork', display: $translate.instant('clientbuilding_planningelementbaseline_plannedwork')});
				// realwork.
		    	$scope.sortData.push({value: 'realwork', display: $translate.instant('clientbuilding_planningelementbaseline_realwork')});
				// wbs.
		    	$scope.sortData.push({value: 'wbs', display: $translate.instant('clientbuilding_planningelementbaseline_wbs')});
				// wbssortable.
		    	$scope.sortData.push({value: 'wbssortable', display: $translate.instant('clientbuilding_planningelementbaseline_wbssortable')});
				// priority.
		    	$scope.sortData.push({value: 'priority', display: $translate.instant('clientbuilding_planningelementbaseline_priority')});
				// leftwork.
		    	$scope.sortData.push({value: 'leftwork', display: $translate.instant('clientbuilding_planningelementbaseline_leftwork')});
				// assignedwork.
		    	$scope.sortData.push({value: 'assignedwork', display: $translate.instant('clientbuilding_planningelementbaseline_assignedwork')});
				// dependencylevel.
		    	$scope.sortData.push({value: 'dependencylevel', display: $translate.instant('clientbuilding_planningelementbaseline_dependencylevel')});
				// initialcost.
		    	$scope.sortData.push({value: 'initialcost', display: $translate.instant('clientbuilding_planningelementbaseline_initialcost')});
				// validatedcost.
		    	$scope.sortData.push({value: 'validatedcost', display: $translate.instant('clientbuilding_planningelementbaseline_validatedcost')});
				// assignedcost.
		    	$scope.sortData.push({value: 'assignedcost', display: $translate.instant('clientbuilding_planningelementbaseline_assignedcost')});
				// realcost.
		    	$scope.sortData.push({value: 'realcost', display: $translate.instant('clientbuilding_planningelementbaseline_realcost')});
				// leftcost.
		    	$scope.sortData.push({value: 'leftcost', display: $translate.instant('clientbuilding_planningelementbaseline_leftcost')});
				// plannedcost.
		    	$scope.sortData.push({value: 'plannedcost', display: $translate.instant('clientbuilding_planningelementbaseline_plannedcost')});
				// progress.
		    	$scope.sortData.push({value: 'progress', display: $translate.instant('clientbuilding_planningelementbaseline_progress')});
				// expectedprogress.
		    	$scope.sortData.push({value: 'expectedprogress', display: $translate.instant('clientbuilding_planningelementbaseline_expectedprogress')});
				// workelementestimatedwork.
		    	$scope.sortData.push({value: 'workelementestimatedwork', display: $translate.instant('clientbuilding_planningelementbaseline_workelementestimatedwork')});
				// workelementrealwork.
		    	$scope.sortData.push({value: 'workelementrealwork', display: $translate.instant('clientbuilding_planningelementbaseline_workelementrealwork')});
				// workelementleftwork.
		    	$scope.sortData.push({value: 'workelementleftwork', display: $translate.instant('clientbuilding_planningelementbaseline_workelementleftwork')});
				// workelementcount.
		    	$scope.sortData.push({value: 'workelementcount', display: $translate.instant('clientbuilding_planningelementbaseline_workelementcount')});
				// expenseassignedamount.
		    	$scope.sortData.push({value: 'expenseassignedamount', display: $translate.instant('clientbuilding_planningelementbaseline_expenseassignedamount')});
				// expenseplannedamount.
		    	$scope.sortData.push({value: 'expenseplannedamount', display: $translate.instant('clientbuilding_planningelementbaseline_expenseplannedamount')});
				// expenserealamount.
		    	$scope.sortData.push({value: 'expenserealamount', display: $translate.instant('clientbuilding_planningelementbaseline_expenserealamount')});
				// expenseleftamount.
		    	$scope.sortData.push({value: 'expenseleftamount', display: $translate.instant('clientbuilding_planningelementbaseline_expenseleftamount')});
				// expensevalidatedamount.
		    	$scope.sortData.push({value: 'expensevalidatedamount', display: $translate.instant('clientbuilding_planningelementbaseline_expensevalidatedamount')});
				// totalassignedcost.
		    	$scope.sortData.push({value: 'totalassignedcost', display: $translate.instant('clientbuilding_planningelementbaseline_totalassignedcost')});
				// totalplannedcost.
		    	$scope.sortData.push({value: 'totalplannedcost', display: $translate.instant('clientbuilding_planningelementbaseline_totalplannedcost')});
				// totalrealcost.
		    	$scope.sortData.push({value: 'totalrealcost', display: $translate.instant('clientbuilding_planningelementbaseline_totalrealcost')});
				// totalleftcost.
		    	$scope.sortData.push({value: 'totalleftcost', display: $translate.instant('clientbuilding_planningelementbaseline_totalleftcost')});
				// totalvalidatedcost.
		    	$scope.sortData.push({value: 'totalvalidatedcost', display: $translate.instant('clientbuilding_planningelementbaseline_totalvalidatedcost')});
				// notplannedwork.
		    	$scope.sortData.push({value: 'notplannedwork', display: $translate.instant('clientbuilding_planningelementbaseline_notplannedwork')});
				// marginwork.
		    	$scope.sortData.push({value: 'marginwork', display: $translate.instant('clientbuilding_planningelementbaseline_marginwork')});
				// margincost.
		    	$scope.sortData.push({value: 'margincost', display: $translate.instant('clientbuilding_planningelementbaseline_margincost')});
				// marginworkpct.
		    	$scope.sortData.push({value: 'marginworkpct', display: $translate.instant('clientbuilding_planningelementbaseline_marginworkpct')});
				// margincostpct.
		    	$scope.sortData.push({value: 'margincostpct', display: $translate.instant('clientbuilding_planningelementbaseline_margincostpct')});
				// reserveamount.
		    	$scope.sortData.push({value: 'reserveamount', display: $translate.instant('clientbuilding_planningelementbaseline_reserveamount')});
				// validatedexpensecalculated.
		    	$scope.sortData.push({value: 'validatedexpensecalculated', display: $translate.instant('clientbuilding_planningelementbaseline_validatedexpensecalculated')});
		    }
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_planningelementbaseline_title');
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
		
		$scope.planningelementbaseline = {id: -1};

	    // Create new.
		$scope.createNew = function() {
			$scope.planningelementbaseline = { id: -1 };
		}
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage($scope.page.currentPage);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.planningelementbaseline.id = id;
			if($scope.planningelementbaseline.id > -1) {
				$scope.getById($scope.planningelementbaseline.id);
			}
			$scope.frmDirty = false;
		}
		
		// Init for view.
		$scope.initView = function(id) {
			$scope.createNew();
			$scope.planningelementbaseline.id = id;
			if($scope.planningelementbaseline.id > -1) {
				$scope.getById($scope.planningelementbaseline.id);
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
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/planningelementbaseline_form.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Show a view dialog.
	    $scope.showViewDialog = function () {
	        var htmlUrlTemplate = clientbuilding.contextPath + '/view/planningelementbaseline_view.html';
	        clientmain.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
			
		// Close dialog.
		$scope.closeDialog = function(){
			$mdToast.hide();
			$mdDialog.hide({id: $scope.planningelementbaseline.id});
		}
		
		// Reset validate.
		$scope.resetValidate = function() {
			// idbaseline.
		    $scope.frmPlanningelementbaseline.idbaseline.$setPristine();
			$scope.frmPlanningelementbaseline.idbaseline.$setUntouched();
			// idproject.
		    $scope.frmPlanningelementbaseline.idproject.$setPristine();
			$scope.frmPlanningelementbaseline.idproject.$setUntouched();
			// idplanningmode.
		    $scope.frmPlanningelementbaseline.idplanningmode.$setPristine();
			$scope.frmPlanningelementbaseline.idplanningmode.$setUntouched();
			// idref.
		    $scope.frmPlanningelementbaseline.idref.$setPristine();
			$scope.frmPlanningelementbaseline.idref.$setUntouched();
			// reftype.
		    $scope.frmPlanningelementbaseline.reftype.$setPristine();
			$scope.frmPlanningelementbaseline.reftype.$setUntouched();
			// initialstartdate.
		    $scope.frmPlanningelementbaseline.initialstartdate.$setPristine();
			$scope.frmPlanningelementbaseline.initialstartdate.$setUntouched();
			// validatedstartdate.
		    $scope.frmPlanningelementbaseline.validatedstartdate.$setPristine();
			$scope.frmPlanningelementbaseline.validatedstartdate.$setUntouched();
			// plannedstartdate.
		    $scope.frmPlanningelementbaseline.plannedstartdate.$setPristine();
			$scope.frmPlanningelementbaseline.plannedstartdate.$setUntouched();
			// realstartdate.
		    $scope.frmPlanningelementbaseline.realstartdate.$setPristine();
			$scope.frmPlanningelementbaseline.realstartdate.$setUntouched();
			// initialenddate.
		    $scope.frmPlanningelementbaseline.initialenddate.$setPristine();
			$scope.frmPlanningelementbaseline.initialenddate.$setUntouched();
			// validatedenddate.
		    $scope.frmPlanningelementbaseline.validatedenddate.$setPristine();
			$scope.frmPlanningelementbaseline.validatedenddate.$setUntouched();
			// plannedenddate.
		    $scope.frmPlanningelementbaseline.plannedenddate.$setPristine();
			$scope.frmPlanningelementbaseline.plannedenddate.$setUntouched();
			// realenddate.
		    $scope.frmPlanningelementbaseline.realenddate.$setPristine();
			$scope.frmPlanningelementbaseline.realenddate.$setUntouched();
			// initialduration.
		    $scope.frmPlanningelementbaseline.initialduration.$setPristine();
			$scope.frmPlanningelementbaseline.initialduration.$setUntouched();
			// validatedduration.
		    $scope.frmPlanningelementbaseline.validatedduration.$setPristine();
			$scope.frmPlanningelementbaseline.validatedduration.$setUntouched();
			// plannedduration.
		    $scope.frmPlanningelementbaseline.plannedduration.$setPristine();
			$scope.frmPlanningelementbaseline.plannedduration.$setUntouched();
			// realduration.
		    $scope.frmPlanningelementbaseline.realduration.$setPristine();
			$scope.frmPlanningelementbaseline.realduration.$setUntouched();
			// initialwork.
		    $scope.frmPlanningelementbaseline.initialwork.$setPristine();
			$scope.frmPlanningelementbaseline.initialwork.$setUntouched();
			// validatedwork.
		    $scope.frmPlanningelementbaseline.validatedwork.$setPristine();
			$scope.frmPlanningelementbaseline.validatedwork.$setUntouched();
			// plannedwork.
		    $scope.frmPlanningelementbaseline.plannedwork.$setPristine();
			$scope.frmPlanningelementbaseline.plannedwork.$setUntouched();
			// realwork.
		    $scope.frmPlanningelementbaseline.realwork.$setPristine();
			$scope.frmPlanningelementbaseline.realwork.$setUntouched();
			// wbs.
		    $scope.frmPlanningelementbaseline.wbs.$setPristine();
			$scope.frmPlanningelementbaseline.wbs.$setUntouched();
			// wbssortable.
		    $scope.frmPlanningelementbaseline.wbssortable.$setPristine();
			$scope.frmPlanningelementbaseline.wbssortable.$setUntouched();
			// priority.
		    $scope.frmPlanningelementbaseline.priority.$setPristine();
			$scope.frmPlanningelementbaseline.priority.$setUntouched();
			// leftwork.
		    $scope.frmPlanningelementbaseline.leftwork.$setPristine();
			$scope.frmPlanningelementbaseline.leftwork.$setUntouched();
			// assignedwork.
		    $scope.frmPlanningelementbaseline.assignedwork.$setPristine();
			$scope.frmPlanningelementbaseline.assignedwork.$setUntouched();
			// dependencylevel.
		    $scope.frmPlanningelementbaseline.dependencylevel.$setPristine();
			$scope.frmPlanningelementbaseline.dependencylevel.$setUntouched();
			// initialcost.
		    $scope.frmPlanningelementbaseline.initialcost.$setPristine();
			$scope.frmPlanningelementbaseline.initialcost.$setUntouched();
			// validatedcost.
		    $scope.frmPlanningelementbaseline.validatedcost.$setPristine();
			$scope.frmPlanningelementbaseline.validatedcost.$setUntouched();
			// assignedcost.
		    $scope.frmPlanningelementbaseline.assignedcost.$setPristine();
			$scope.frmPlanningelementbaseline.assignedcost.$setUntouched();
			// realcost.
		    $scope.frmPlanningelementbaseline.realcost.$setPristine();
			$scope.frmPlanningelementbaseline.realcost.$setUntouched();
			// leftcost.
		    $scope.frmPlanningelementbaseline.leftcost.$setPristine();
			$scope.frmPlanningelementbaseline.leftcost.$setUntouched();
			// plannedcost.
		    $scope.frmPlanningelementbaseline.plannedcost.$setPristine();
			$scope.frmPlanningelementbaseline.plannedcost.$setUntouched();
			// progress.
		    $scope.frmPlanningelementbaseline.progress.$setPristine();
			$scope.frmPlanningelementbaseline.progress.$setUntouched();
			// expectedprogress.
		    $scope.frmPlanningelementbaseline.expectedprogress.$setPristine();
			$scope.frmPlanningelementbaseline.expectedprogress.$setUntouched();
			// workelementestimatedwork.
		    $scope.frmPlanningelementbaseline.workelementestimatedwork.$setPristine();
			$scope.frmPlanningelementbaseline.workelementestimatedwork.$setUntouched();
			// workelementrealwork.
		    $scope.frmPlanningelementbaseline.workelementrealwork.$setPristine();
			$scope.frmPlanningelementbaseline.workelementrealwork.$setUntouched();
			// workelementleftwork.
		    $scope.frmPlanningelementbaseline.workelementleftwork.$setPristine();
			$scope.frmPlanningelementbaseline.workelementleftwork.$setUntouched();
			// workelementcount.
		    $scope.frmPlanningelementbaseline.workelementcount.$setPristine();
			$scope.frmPlanningelementbaseline.workelementcount.$setUntouched();
			// expenseassignedamount.
		    $scope.frmPlanningelementbaseline.expenseassignedamount.$setPristine();
			$scope.frmPlanningelementbaseline.expenseassignedamount.$setUntouched();
			// expenseplannedamount.
		    $scope.frmPlanningelementbaseline.expenseplannedamount.$setPristine();
			$scope.frmPlanningelementbaseline.expenseplannedamount.$setUntouched();
			// expenserealamount.
		    $scope.frmPlanningelementbaseline.expenserealamount.$setPristine();
			$scope.frmPlanningelementbaseline.expenserealamount.$setUntouched();
			// expenseleftamount.
		    $scope.frmPlanningelementbaseline.expenseleftamount.$setPristine();
			$scope.frmPlanningelementbaseline.expenseleftamount.$setUntouched();
			// expensevalidatedamount.
		    $scope.frmPlanningelementbaseline.expensevalidatedamount.$setPristine();
			$scope.frmPlanningelementbaseline.expensevalidatedamount.$setUntouched();
			// totalassignedcost.
		    $scope.frmPlanningelementbaseline.totalassignedcost.$setPristine();
			$scope.frmPlanningelementbaseline.totalassignedcost.$setUntouched();
			// totalplannedcost.
		    $scope.frmPlanningelementbaseline.totalplannedcost.$setPristine();
			$scope.frmPlanningelementbaseline.totalplannedcost.$setUntouched();
			// totalrealcost.
		    $scope.frmPlanningelementbaseline.totalrealcost.$setPristine();
			$scope.frmPlanningelementbaseline.totalrealcost.$setUntouched();
			// totalleftcost.
		    $scope.frmPlanningelementbaseline.totalleftcost.$setPristine();
			$scope.frmPlanningelementbaseline.totalleftcost.$setUntouched();
			// totalvalidatedcost.
		    $scope.frmPlanningelementbaseline.totalvalidatedcost.$setPristine();
			$scope.frmPlanningelementbaseline.totalvalidatedcost.$setUntouched();
			// notplannedwork.
		    $scope.frmPlanningelementbaseline.notplannedwork.$setPristine();
			$scope.frmPlanningelementbaseline.notplannedwork.$setUntouched();
			// marginwork.
		    $scope.frmPlanningelementbaseline.marginwork.$setPristine();
			$scope.frmPlanningelementbaseline.marginwork.$setUntouched();
			// margincost.
		    $scope.frmPlanningelementbaseline.margincost.$setPristine();
			$scope.frmPlanningelementbaseline.margincost.$setUntouched();
			// marginworkpct.
		    $scope.frmPlanningelementbaseline.marginworkpct.$setPristine();
			$scope.frmPlanningelementbaseline.marginworkpct.$setUntouched();
			// margincostpct.
		    $scope.frmPlanningelementbaseline.margincostpct.$setPristine();
			$scope.frmPlanningelementbaseline.margincostpct.$setUntouched();
			// reserveamount.
		    $scope.frmPlanningelementbaseline.reserveamount.$setPristine();
			$scope.frmPlanningelementbaseline.reserveamount.$setUntouched();
			// validatedexpensecalculated.
		    $scope.frmPlanningelementbaseline.validatedexpensecalculated.$setPristine();
			$scope.frmPlanningelementbaseline.validatedexpensecalculated.$setUntouched();

		    // form.
			$scope.frmPlanningelementbaseline.$setPristine();
			$scope.frmPlanningelementbaseline.$setUntouched();
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
			if($scope.frmPlanningelementbaseline.$invalid) {
				$scope.frmPlanningelementbaseline.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessageOnToast($translate.instant('clientbuilding_home_saving'));
			var result;
			if($scope.planningelementbaseline.id > -1) {
				result = planningelementbaselineService.updateWithLock($scope.planningelementbaseline.id, $scope.planningelementbaseline);
			} else {
				result = planningelementbaselineService.create($scope.planningelementbaseline);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					if($scope.planningelementbaseline.id > -1) {
						$scope.planningelementbaseline.version = response.data;
					} else {
						$scope.planningelementbaseline.id = response.data;
						$scope.planningelementbaseline.version = 1;
					}
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_saved'));
					$scope.listWithCriteriasByPage($scope.page.currentPage);
				} else {
					if(response.data.code == clientbuilding.serverCode.VERSIONDIFFERENCE) {
						$scope.showMessageOnToast($translate.instant('clientbuilding_servercode_' + response.data.code));
					} else if(response.data.code == clientbuilding.serverCode.EXISTSCOPE) {
						$scope.frmPlanningelementbaseline.scope.$invalid = true;
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
			planningelementbaselineService.updateForDeleteWithLock(id, version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToastList($translate.instant('clientbuilding_home_deleted'));
					if($scope.planningelementbaselines.length == 1 && $scope.page.currentPage > 0){
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
			planningelementbaselineService.updateForDeleteWithLock($scope.planningelementbaseline.id, $scope.planningelementbaseline.version)
			// success.
			.then(function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.showMessageOnToast($translate.instant('clientbuilding_home_deleted'));
					$scope.createNew();
					$scope.resetValidate();
					if($scope.planningelementbaselines.length == 1 && $scope.page.currentPage > 0){
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
			planningelementbaselineService.getById(id).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.planningelementbaseline = data;
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
			planningelementbaselineService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort()).then(
			// success.
			function(response) {
				if(response.status === httpStatus.code.OK) {
					$scope.planningelementbaselines = [];
					$scope.page.totalElements = 0;
					if(response.data.content && response.data.content.length > 0) {
						var result = angular.fromJson(response.data.content);
						$scope.planningelementbaselines = result;
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
				// idbaseline.
		    	//result.push({ key: 'idbaseline', operation: 'like', value: $scope.search.content, logic: 'or' });
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
				controller: 'clientbuildingplanningelementbaselineController',
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
				controller: 'clientbuildingplanningelementbaselineController',
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

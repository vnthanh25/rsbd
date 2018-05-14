
define(['require', 'angular'], function (require, angular) {

	app.aController(clientbuilding.prefix + 'leftController', function($rootScope, $scope, $state, $translate, $translatePartialLoader, $timeout) {
		if(typeof(clientbuilding.translate.left) === 'undefined' || clientbuilding.translate.left.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.left) === 'undefined') {
				clientbuilding.translate.left = '';
			}
			clientbuilding.translate.left += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/left');
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_left_title');
		    // menu label.
		    $scope.menu.home.label = $translate.instant('clientbuilding_left_home');
		    $scope.menu.test.label = $translate.instant('clientbuilding_left_test');
		    $scope.menu.usermanager.label = $translate.instant('clientbuilding_left_usermanager');
		    $scope.menu.user.label = $translate.instant('clientbuilding_left_user');
		    $scope.menu.role.label = $translate.instant('clientbuilding_left_role');
		    $scope.menu.userrole.label = $translate.instant('clientbuilding_left_userrole');
		    $scope.menu.permission.label = $translate.instant('clientbuilding_left_permission');
		    $scope.menu.project.label = $translate.instant('clientbuilding_left_project');
		    $scope.menu.activity.label = $translate.instant('clientbuilding_left_activity');
		    $scope.menu.type.label = $translate.instant('clientbuilding_left_type');
		    $scope.menu.projecttype.label = $translate.instant('clientbuilding_left_projecttype');
		    $scope.menu.activitytype.label = $translate.instant('clientbuilding_left_activitytype');
		    $scope.menu.affectation.label = $translate.instant('clientbuilding_left_affectation');
		    $scope.menu.appconfig.label = $translate.instant('clientbuilding_left_appconfig');
		    $scope.menu.assignment.label = $translate.instant('clientbuilding_left_assignment');
		    $scope.menu.attachment.label = $translate.instant('clientbuilding_left_attachment');
		    $scope.menu.baseline.label = $translate.instant('clientbuilding_left_baseline');
		    $scope.menu.client.label = $translate.instant('clientbuilding_left_client');
		    $scope.menu.comment.label = $translate.instant('clientbuilding_left_comment');
		    $scope.menu.dependable.label = $translate.instant('clientbuilding_left_dependable');
		    $scope.menu.dependency.label = $translate.instant('clientbuilding_left_dependency');
		    $scope.menu.functionrole.label = $translate.instant('clientbuilding_left_functionrole');
		    $scope.menu.history.label = $translate.instant('clientbuilding_left_history');
		    $scope.menu.notify.label = $translate.instant('clientbuilding_left_notify');
		    $scope.menu.plannedwork.label = $translate.instant('clientbuilding_left_plannedwork');
		    $scope.menu.plannedworkbaseline.label = $translate.instant('clientbuilding_left_plannedworkbaseline');
		    $scope.menu.planningelement.label = $translate.instant('clientbuilding_left_planningelement');
		    $scope.menu.planningelementbaseline.label = $translate.instant('clientbuilding_left_planningelementbaseline');
		    $scope.menu.planningmode.label = $translate.instant('clientbuilding_left_planningmode');
		    $scope.menu.status.label = $translate.instant('clientbuilding_left_status');
		    $scope.menu.work.label = $translate.instant('clientbuilding_left_work');
		    $scope.menu.workelement.label = $translate.instant('clientbuilding_left_workelement');
		    $scope.menu.workflow.label = $translate.instant('clientbuilding_left_workflow');
		    $scope.menu.workflowstatus.label = $translate.instant('clientbuilding_left_workflowstatus');
		    
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
		$translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clientbuilding_left_title');
	    });
		// goto.
		$scope.goto = function(state, params) {
			delete $rootScope.menuActiveTitle;
			$state.go(clientbuilding.prefix + state, params);
		}
		
		
		$scope.$on('$viewContentLoaded', function(event) {
			$scope.sidebarMenu = function (menu) {
				var animationSpeed = 300,
					subMenuSelector = '.sidebar-submenu';

				$(menu).on('click', 'li a', function (e) {
					var $this = $(this);
					var checkElement = $this.next();

					if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
						checkElement.slideUp(animationSpeed, function () {
							checkElement.removeClass('menu-open');
						});
						checkElement.parent("li").removeClass("active");
					}

					//If the menu is not visible
					else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
						//Get the parent menu
						var parent = $this.parents('ul').first();
						//Close all open menus within the parent
						var ul = parent.find('ul:visible').slideUp(animationSpeed);
						//Remove the menu-open class from the parent
						ul.removeClass('menu-open');
						//Get the parent li
						var parent_li = $this.parent("li");

						//Open the target menu and add the menu-open class
						checkElement.slideDown(animationSpeed, function () {
							//Add the class active to the parent li
							checkElement.addClass('menu-open');
							parent.find('li.active').removeClass('active');
							parent_li.addClass('active');
						});
					}
					//if this isn't a link, prevent the page from being redirected
					if (checkElement.is(subMenuSelector)) {
						e.preventDefault();
					}
				});
			}
			
			$scope.sidebarMenu($('.sidebar-menu'));
			
			// spliter.
			$('#widget').width('100%').height('100%').split({
				orientation: 'vertical',
				limit: 10,
				position: '20%',
				percent: true
			});

		});
		
		// menu search.
		$scope.menuSearch = function(text){
			angular.forEach($scope.menu, function(value, key){
				$scope.menu[key].hide = $scope.menu[key].label.toLowerCase().indexOf(text.toLowerCase()) < 0;
			});
		}
		
	});
	
});

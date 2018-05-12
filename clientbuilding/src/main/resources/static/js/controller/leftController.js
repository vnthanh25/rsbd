
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
		});
	});
	
});

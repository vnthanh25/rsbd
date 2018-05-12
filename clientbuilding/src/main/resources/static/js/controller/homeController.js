
define(['require', 'angular'], function (require, angular) {

	app.aController(clientbuilding.prefix + 'homeController', ['$q', '$rootScope', '$scope', '$state', '$translate', '$translatePartialLoader', '$cookies', 'store', clientbuilding.prefix + 'userService',
			function($q, $rootScope, $scope, $state, $translate, $translatePartialLoader, $cookies, store, userService) {
		if(typeof(clientbuilding.translate.home) === 'undefined' || clientbuilding.translate.home.indexOf($translate.use()) < 0) {
			console.log(clientbuilding.translate.home);
			if(typeof(clientbuilding.translate.home) === 'undefined') {
				clientbuilding.translate.home = '';
			}
			clientbuilding.translate.home += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/home');
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/servercode');
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('clientbuilding_header_title');
		    $scope.title = $translate.instant('clientbuilding_header_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
		$translate.onReady().then(function() {
	    	console.log('header onReady');
	    	$scope.title = $translate.instant('clientbuilding_header_title');
	    	$translate.refresh();
	    });
	    // goto.
		$scope.goto = function(state, params) {
			$state.go(clientbuilding.prefix + state, params);
		}
		
		$scope.show = function() {
			alert('/clientbuilding/homeController');
			$state.go(clientbuilding.prefix + 'test');
		}
		
		// Get permission for user menu.
		$rootScope.getPermissionForUserMenu = function() {
			userService.getPermissionForUserMenu().then(
					// Success.
					function(response) {
						$rootScope.permissions = response.data;
					},
					// Error.
					function(response) {
						$rootScope.permissions = {};
					}
			);
		}

		// The ngView content is reloaded.
		$scope.$on('$viewContentLoaded', function() {
			// hide loader.
			$('.loaderContain').hide();
/*			
			// Load skin.
			if(clientbuilding.currentSkin === '') {
				clientmain.removeSkin(clientbuilding.prefix + 'admin');
				clientmain.loadSkin(clientbuilding.prefix + 'admin');
				clientmain.removeFile(clientbuilding.contextPath + '/skin/admin/js/admin.js', 'js');
				clientmain.loadFile(clientbuilding.contextPath + '/skin/admin/js/admin.js', 'js');
			}
*/			
			var userinfo = store.get(clientbuilding.USER_INFO);
			if(!userinfo){
				return;
			}
			var index = clientmain.IndexOfByProperty(userinfo.modules, 'name', 'serverwh');
			if(index < 0) {
				userService.getUserInfoByUsername(userinfo.username).then(
						// Success.
						function(response) {
							var userinfo = store.get(clientbuilding.USER_INFO);
							// Add serverwh module.
							var serverwh = { name: 'serverwh', iduser: response.data.iduser, info: response.data.info}
							userinfo.modules.push(serverwh);
							// Update userinfo.
							store.set(clientbuilding.USER_INFO, userinfo);
							// Get permission.
							$rootScope.getPermissionForUserMenu();
						},
						// Error.
						function(response) {
						}
				);
			}
			else {
				// Get permission.
				$rootScope.getPermissionForUserMenu();
			}
		});
		
		// Get server info.
		$rootScope.getServerInfo = function() {
			var userinfo = store.get(clientbuilding.USER_INFO);
			var serverwh = clientmain.GetByProperty(userinfo.modules, 'name', 'serverwh');
			return { iduser: serverwh.iduser, username: userinfo.username };
		}

	}]);
	
});

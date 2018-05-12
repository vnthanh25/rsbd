
var clientbuilding = {
		clientId: 1,
		name: 'clientbuilding',
		contextPath: '/clientbuilding',
		prefix: 'clientbuilding',
		//serverUrl: 'https://localhost:1111/serverwh',
		currentSkin: '',
		translate: {}
};


var clientbuildingModule;
define(['require', 'angular', 'bootstrap', 
	'angular-ui-tree', 
	'moment', 'angular-native-dragdrop', 'angular-moment', 'angular-gantt', 'angular-gantt-plugins', 'moment-range', 'jsplumb',
	'bootstrap-filestyle',
	'tinycolor2', 'angularjs-color-picker',
	'dirPagination', 'ckeditor', 'angular-ckeditor'
	], function (require, angular) {

	clientbuildingModule = angular.module(clientbuilding.name, ['ngResource', 'angular-storage',
		'angularUtils.directives.dirPagination', 'ckeditor',
		'ui.tree',
		// gantt chart.
		'gantt', 'gantt.tree', 'gantt.groups', 'gantt.dependencies', 'gantt.movable', 'gantt.drawtask',
		// color picker.
		'color.picker'
		]);
    
    // Define route.
        app.aStateProvider
    	.state(clientbuilding.prefix + 'layout', {
    		abstract: true,
    		//url: '',
    		resolve: {
    			loadRequire: ['$ocLazyLoad', '$q', function($ocLazyLoad, $q) {
    				var deferred = $q.defer();
    				require([
    					//clientbuilding.contextPath + '/js/util/commonUtil.js',
    					clientbuilding.contextPath + '/js/common/serverCode.js',
    					clientbuilding.contextPath + '/js/common/constant.js',
    					//clientbuilding.contextPath + '/js/common/httpStatus.js',
    					//clientbuilding.contextPath + '/js/util/validation_tooltip/directive.js',
    					//clientbuilding.contextPath + '/js/util/upload-files-directive.js',
    					//clientbuilding.contextPath + '/js/util/file-style-directive.js'
    					], function() {
    						//clientmain.loadFile(clientbuilding.contextPath + '/js/util/validation_tooltip/validation-tooltip.css', 'css');
    						//clientmain.loadFile(clientbuilding.contextPath + '/css/layout.css', 'css');
							clientmain.loadFile(clientbuilding.contextPath + '/css/layoutbuilding.css', 'css');
    						deferred.resolve();
    				});
    				return deferred.promise;
    			}]
    		},
    		views: {
    			'layout': {
    				templateUrl: clientbuilding.contextPath + '/layout/layout.html'
    			}
    		}
    	})
    	.state(clientbuilding.prefix + 'main', {
    		abstract: true,
    		parent: clientbuilding.prefix + 'layout',
    		//url: '',
    		resolve: {
                loadRequire: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                    var deferred = $q.defer();
                    require([
                    	clientbuilding.contextPath + '/js/controller/headerController.js',
                    	clientbuilding.contextPath + '/js/controller/leftController.js',
                    	clientbuilding.contextPath + '/js/controller/footerController.js'
                    	], function () {
                        $ocLazyLoad.inject(clientbuilding.name);
                        deferred.resolve();
                    });
                    
                    return deferred.promise;
                }]
            },
    		views: {
    			'header': {
    				templateUrl: clientbuilding.contextPath + '/layout/header.html',
    				controller: clientbuilding.prefix + 'headerController'
    			},
    			'left': {
    				templateUrl: clientbuilding.contextPath + '/layout/left.html',
    				controller: clientbuilding.prefix + 'leftController'
    			},
    			'content': {
    				templateUrl: clientbuilding.contextPath + '/layout/content.html'
    			},
    			'footer': {
    				templateUrl: clientbuilding.contextPath + '/layout/footer.html',
    				controller: clientbuilding.prefix + 'footerController'
    			}
    		}
    	})
    	.state(clientbuilding.prefix + 'home', {
    		parent: clientbuilding.prefix + 'main',
    		url: clientbuilding.contextPath + '/home',
    		resolve: {
                loadRequire: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                    var deferred = $q.defer();
                    require([
                    	clientbuilding.contextPath + '/js/service/userService.js',
                    	clientbuilding.contextPath + '/js/controller/homeController.js'
                    	], function () {
                    	require([clientbuilding.contextPath + '/js/route.js'], function () {
    	                    $ocLazyLoad.inject(clientbuilding.name);
    	                    deferred.resolve();
    	                });
                    });
                    
                    return deferred.promise;
                }]
            },
    		views: {
    			'container': {
    				templateUrl: clientbuilding.contextPath + '/view/home.html',
    				controller: clientbuilding.prefix + 'homeController'
    			}
    		}
    	});
    
    
	// module run.
	clientbuildingModule.run(['$rootScope', '$location', function ($rootScope, $location) {
		console.log('clientbuildingModule.run');
		
		// Set server url.
		clientbuilding.serverUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/serverbuilding';
		/*
		$rootScope.clientbuildingsidebarclick = function() {
			$('.main-sidebar').toggleClass('collapse');
			$('.main-content').toggleClass('expanse');
		};*/

	}]);
	
	// return for require.
	return clientbuildingModule;
	
	
});
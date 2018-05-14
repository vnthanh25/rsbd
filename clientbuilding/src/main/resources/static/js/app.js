
var clientbuilding = {
		name: 'clientbuilding',
		contextPath: '/clientbuilding',
		prefix: 'clientbuilding',
		//serverUrl: 'https://localhost:1111/serverwh',
		currentSkin: '',
		translate: {}
}

var clientmain = {
		//authenUrl: 'https://localhost:1111',
		serverUrl: 'http://localhost:4448/servermain',
		name: 'app',
		contextPath: 'http://localhost:2228/clientmain',
		prefix: 'clientmain'
}

var gDateFormat = 'DD/MM/YYYY';
var gLanguage = 'vi';

// import require shim.
var app;
define(['require', 'angular', 'bootstrap', 
	'angular-ui-tree', 
	'moment', 'angular-native-dragdrop', 'angular-moment', 'angular-gantt', 'angular-gantt-plugins', 'moment-range', 'jsplumb',
	'bootstrap-filestyle',
	'tinycolor2', 'angularjs-color-picker',
	'dirPagination', 'ckeditor', 'angular-ckeditor'
	], function (require, angular) {
	
	app = angular.module(clientbuilding.name, ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngMaterial', 'ngMessages', 'oc.lazyLoad', 'pascalprecht.translate', 'ngCookies', 'ngResource', 'angular-storage', 'LocalStorageModule', 'angularMoment',
		'angularUtils.directives.dirPagination', 'ckeditor' , 'purplefox.numeric', 'tmh.dynamicLocale',
		'ui.tree',
		// gantt chart.
		'gantt', 'gantt.tree', 'gantt.groups', 'gantt.dependencies', 'gantt.movable', 'gantt.drawtask',
		// color picker.
		'color.picker'
		]);
	// init.
	app.init = function() {
		angular.bootstrap(document, [clientbuilding.name]);
	}
	
	app.config(['$httpProvider', '$locationProvider', '$controllerProvider', '$provide', '$compileProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', '$translatePartialLoaderProvider', '$mdDateLocaleProvider', '$mdToastProvider', '$mdThemingProvider', 'moment',
		function($httpProvider, $locationProvider, $controllerProvider, $provide, $compileProvider, $stateProvider, $urlRouterProvider, $translateProvider, $translatePartialLoaderProvider, $mdDateLocaleProvider, $mdToastProvider, $mdThemingProvider, moment) {
		
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		$httpProvider.defaults.headers.common['Accept'] = 'application/json';
		$httpProvider.defaults.headers["delete"] = {'Content-Type': 'application/json;charset=utf-8'};
		$httpProvider.defaults.headers.common['ConId'] = '0';

		//app.registerController = $controllerProvider.register;
		app.aProvide = $provide;
		
	    // Provider-based controller.
	    app.aController = function (name, constructor) {
	        $controllerProvider.register(name, constructor);
	        return (this);
	    };
	    // Provider-based service.
	    app.aService = function (name, constructor) {
	        $provide.service(name, constructor);
	        return (this);
	    };
	    // Provider-based factory.
	    app.aFactory = function (name, factory) {
	        $provide.factory(name, factory);
	        return (this);
	    };
	    // Provider-based value.
	    app.aValue = function (name, value) {
	        $provide.value(name, value);
	        return (this);
	    };
	    // Provider-based directive.
	    app.aDirective = function (name, factory) {
	        $compileProvider.directive(name, factory);
	        return (this);
	    };
	    // Provider-based state.
	    app.aStateProvider = $stateProvider;

	    // Provider-based urlRoute.
	    app.aUrlRouterProvider = $urlRouterProvider;
	    
	    app.register = {
	        controller: $controllerProvider.register,
	        service: $provide.service,
	        factory: $provide.factory,
	        value: $provide.value,
	        directive: $compileProvider.directive,
	        factory: $provide.factory,
	        urlRouterProvider: $urlRouterProvider
	        //filter: $filterProvider.register,
	        //animation: $animationProvider.register
	    };

		// $mdDateLocaleProvider
		app.mdDateLocaleProvider = $mdDateLocaleProvider;

		// $translateProvider.
	    $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}_{lang}.json'
        });
        $translateProvider.preferredLanguage(gLanguage);
        $translateProvider.fallbackLanguage(gLanguage);

	    require(['moment_' + gLanguage], function(){
	        //$translateProvider.forceAsyncReload(true);
	        //$translateProvider.useLocalStorage();
	        //$translatePartialLoaderProvider.addPart('home');
	        //$translateProvider.useLoaderCache(true);
	        // Enable escaping of HTML          
	        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');//escape, sanitizeParameters
	        $translateProvider.synchronizeLocale = true;
	        // tell angular-translate to use your custom handler
	        
	        // Change moment language.
	        moment.locale(gLanguage);
	        var localeData = moment.localeData();
	        $mdDateLocaleProvider.months      = localeData._months;
	        $mdDateLocaleProvider.shortMonths = moment.monthsShort();
	        $mdDateLocaleProvider.days        = localeData._weekdays;
	        $mdDateLocaleProvider.shortDays   = localeData._weekdaysMin;
	        $mdDateLocaleProvider.firstDayOfWeek = localeData._week.dow;
	        // parseDate
	        $mdDateLocaleProvider.parseDate = function(dateString) {
	          var m = moment(dateString, 'L', true);
	          return m.isValid() ? m.toDate() : new Date(NaN);
	        };
	        // formatDate
	        $mdDateLocaleProvider.formatDate = function(date) {
	          var m = moment(date);
	          return m.isValid() ? m.format('L') : '';
	        };
	    });
	    
	    // toastMessage.
	    $mdToastProvider.addPreset('toastMessage', {
	    	methods: ['textContent', 'action', 'templateUrl'],
	    	options: function() {
	    		return {
	    			textContent: '...',
	    			templateUrl: clientbuilding.contextPath + '/view/toast_message.html',
	    			controller: function($scope, $mdToast) {
	    				$scope.textContent = $scope.toast.textContent;
	    				$scope.action = $scope.toast.action;
	    				$scope.closeToast = function(){
	    					$mdToast.hide();
	    				}
	    			},
	    			bindToController: true,
	    			controllerAs: 'toast',
	    			position: 'top right',
	    			hideDelay: 3000
	    		};
	    	}
	    });
	    
	    // material theme.
	    $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('pink').warnPalette('red').backgroundPalette('blue-grey');
	    
	    // Default route.
	    $urlRouterProvider.otherwise(clientbuilding.contextPath + '/home');
        
        // Define route.
        app.aStateProvider
    	.state(clientbuilding.prefix + 'layout', {
    		abstract: true,
    		//url: '',
    		resolve: {
    			loadRequire: ['$ocLazyLoad', '$q', function($ocLazyLoad, $q) {
    				var deferred = $q.defer();
    				require([
    					clientbuilding.contextPath + '/js/util/commonUtil.js',
    					clientbuilding.contextPath + '/js/common/constant.js',
    					clientbuilding.contextPath + '/js/common/httpStatus.js',
    					clientbuilding.contextPath + '/js/util/validation_tooltip/directive.js',
    					clientbuilding.contextPath + '/js/util/upload-files-directive.js',
    					clientbuilding.contextPath + '/js/util/file-style-directive.js',
    					clientbuilding.contextPath + '/js/util/dualmultiselect-directive.js',
    					clientbuilding.contextPath + '/lib/jcubic-jquery.splitter/js/jquery.splitter-0.14.0.js'
    					], function() {
    						clientmain.loadFile(clientbuilding.contextPath + '/js/util/validation_tooltip/validation-tooltip.css', 'css');
    						clientmain.loadFile(clientbuilding.contextPath + '/css/layout.css', 'css');
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
	}]);
	
	// app run.
	app.run(['$rootScope', '$location', 'moment', function ($rootScope, $location, moment) {
		console.log('app.run');
		$rootScope.constants = {};
		// Set server url.
		clientbuilding.serverUrl = 'http://localhost:4449/serverbuilding';
		
		$rootScope.clientmainsidebarclick = function() {
			$('.main-sidebar').toggleClass('collapse');
			$('.main-content').toggleClass('expanse');
			$('.vsplitter').toggleClass('collapse');
			//$('.left_panel').toggleClass('collapse');
			$('.right_panel').toggleClass('collapse');
		};

		$rootScope.closeNav = function() {
		    document.getElementById("moduleNav").style.width = "0%";
		}
		
	}]);
	
	// return for require.
	return app;
	
});
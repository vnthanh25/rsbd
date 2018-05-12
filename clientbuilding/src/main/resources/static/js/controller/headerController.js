
define(['require', 'angular'], function (require, angular) {

	app.aController(clientbuilding.prefix + 'headerController', function($rootScope, $scope, $translate, $translatePartialLoader, $mdDateLocale, moment) {
		if(typeof(clientbuilding.translate.header) === 'undefined' || clientbuilding.translate.header.indexOf($translate.use()) < 0) {
			if(typeof(clientbuilding.translate.header) === 'undefined') {
				clientbuilding.translate.header = '';
			}
			clientbuilding.translate.header += $translate.use() + ';';
			$translatePartialLoader.addPart(clientbuilding.contextPath + '/js/common/message/header');
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clientbuilding_header_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
		$translate.onReady().then(function() {
	    });
		
		$scope.show = function() {
			alert($scope.title);
		}
		$scope.goto = function(state, params) {
			delete $rootScope.menuActiveTitle;
			$state.go(clientbuilding.prefix + state, params);
		}

		$scope.changeLanguage = function(language) {
			gLanguage = language;
			require(['moment_' + gLanguage], function(){
				$translate.use(gLanguage);
				//$translate.refresh();
				// Change moment language.
			    moment.locale(gLanguage);
			    var localeData = moment.localeData();
			    $mdDateLocale.months      = localeData._months;
			    $mdDateLocale.shortMonths = moment.monthsShort();
			    $mdDateLocale.days        = localeData._weekdays;
			    $mdDateLocale.shortDays   = localeData._weekdaysMin;
			    $mdDateLocale.firstDayOfWeek = localeData._week.dow;
			});
			
		}
		

		$scope.openNav = function() {
		    document.getElementById("moduleNav").style.width = "100%";
		}

	});	
});

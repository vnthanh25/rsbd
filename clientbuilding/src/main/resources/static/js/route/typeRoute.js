/**
 * Route for Type
 **/

// import require shim.
define(['require'], function (require) {
	app.aStateProvider
	.state(clientbuilding.prefix + 'type', {
		parent: clientbuilding.prefix + 'main',
		url: clientbuilding.contextPath + '/type/:scope',
		resolve: {
            loadRequire: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                var deferred = $q.defer();
                require([clientbuilding.contextPath + '/js/controller/typeController.js'], function () {
                    $ocLazyLoad.inject(clientbuilding.name);
                    deferred.resolve();
                });
                
                return deferred.promise;
            }]
        },
		views: {
			'container': {
				templateUrl: clientbuilding.contextPath + '/view/type_list.html',
				controller: clientbuilding.prefix + 'typeController'
			}
		}
	});
	
});

(function() {
    'use strict';
	
	angular.module('App.router')
		.config(router);

    router.$inject = ['$routeProvider'];

	function router($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/src/app/pages/home/home.html'
			})
			.when('/about', {
				templateUrl: '/src/app/pages/about/about.html'
			})
			.when('/fruit', {
				templateUrl: '/src/app/pages/fruit/fruit.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
})();

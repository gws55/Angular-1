(function() {
    'use strict';

    angular.module('App.layout')
		.directive('navbar', navbar);

	function navbar() {
        var directive = {
            templateUrl: './app/layout/navbar/navbar.html'
        };
        
        return directive;
	}
})();

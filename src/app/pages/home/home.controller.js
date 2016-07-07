(function() {
    'use strict';

    angular.module('App.pages')
    	.controller('HomeController', HomeController);
    
    function HomeController() {
    	var vm = this;
    	vm.hello = 'Hello!';
    }

})();
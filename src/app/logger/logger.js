(function() {
    'use strict';

    angular.module('App.logger')
	    .config(function($logProvider){
		    $logProvider.debugEnabled(true);
		});

})();

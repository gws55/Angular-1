(function() {
    'use strict';

    angular.module('App.pages')
        .service('fruitService', FruitService);
    
    FruitService.$inject = ['$resource'];

    function FruitService($resource) {
        var vm = this;

        // functions
        vm.getFruitList = getFruitList;
        vm.createFruit = createFruit;
        vm.updateFruit = updateFruit;
        vm.deleteFruit = deleteFruit;

        ///////////////////////////////////////////////////////

        function getFruitList() {
            var url = 'http://localhost:8080/api/f/get?api_key=test';

            return $resource(url).get().$promise;
        }

        function createFruit(newFruit) {
            var url = 'http://localhost:8080/api/f/insert?api_key=test';
            url += '&name=' + newFruit.name;

            return $resource(url).save().$promise;
        }

        function updateFruit(updateFruit) {
            var url = 'http://localhost:8080/api/f/update?api_key=test';
            url += '&id=' + updateFruit.id + '&name=' + updateFruit.name;

            return $resource(url).save().$promise;
        }

        function deleteFruit(deleteFruit) {
            var url = 'http://localhost:8080/api/f/delete?api_key=test';
            url += '&id=' + deleteFruit.id;

            return $resource(url).save().$promise;
        }
    }

})();
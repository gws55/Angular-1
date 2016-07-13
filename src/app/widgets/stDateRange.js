(function() {
    'use strict';

    angular.module('App.widgets')
        .directive('stDateRange', stDateRange);

    stDateRange.$inject = ['$timeout'];

    function stDateRange($timeout) {
        var directive = {
            require: '^stTable',
            scope: {
                before: '=',
                after: '='
            },
            templateUrl: '/src/app/widgets/stDateRange.html',

            link: function (scope, element, attr, table) {

                var inputs = element.find('input');
                var inputBefore = angular.element(inputs[0]);
                var inputAfter = angular.element(inputs[1]);
                var predicateName = attr.predicate;

                [inputBefore, inputAfter].forEach(function (input) {

                    input.bind('blur', function () {


                        var query = {};

                        if (!scope.isBeforeOpen && !scope.isAfterOpen) {

                            if (scope.before) {
                                query.before = scope.before;
                            }

                            if (scope.after) {
                                query.after = scope.after;
                            }

                            scope.$apply(function () {
                                table.search(query, predicateName);
                            })
                        }
                    });
                });

                function open(before) {
                    return function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        if (before) {
                            scope.isBeforeOpen = true;
                            console.log('open ebfore');
                        } else {
                            scope.isAfterOpen = true;
                            console.log('open after');
                        }
                    }
                }

                scope.openBefore = open(true);
                scope.openAfter = open();
            }
        };
        
        return directive;
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .directive('authenticated', authenticated);

    authenticated.$inject = ['UserService'];

    /* @ngInject */
    function authenticated(UserService) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var isAuthenticated = UserService.isAuthenticated();
            if (!isAuthenticated) {
                element.hide();
            }
        }
    }

})();


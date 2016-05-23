(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationInterceptor', AuthenticationInterceptor);

    AuthenticationInterceptor.$inject = ['$window'];

    /* @ngInject */
    function AuthenticationInterceptor($window) {
        var service = {
            request: request
        };
        return service;

        ////////////////

        function request(config) {
            config.headers['Authorization'] = $window.localStorage['jwtToken'];
            return config;
        }
    }

})();

(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$httpProvider'];

    /* @ngInject */
    function config($httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    }

})();
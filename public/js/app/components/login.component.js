(function () {
    'use strict';

    angular
        .module('app')
        .component('login', {
            templateUrl: 'partials/login-logout.html',
            controller: LoginController,
            controllerAs: 'vm'
        });

    LoginController.$inject = ['UserService'];

    /* @ngInject */
    function LoginController(UserService) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;
        vm.logout = logout;

        ////////////////

        function isAuthenticated() {
            return UserService.isAuthenticated();
        }

        function logout() {
            UserService.logout();
        }

    }

})();



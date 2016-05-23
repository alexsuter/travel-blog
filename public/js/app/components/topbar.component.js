(function () {
    'use strict';

    angular
        .module('app')
        .component('topbar', {
            templateUrl: 'partials/topbar.html',
            controller: TopbarController,
            controllerAs: 'vm'
        });

    TopbarController.$inject = ['UserService'];

    /* @ngInject */
    function TopbarController(UserService) {
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



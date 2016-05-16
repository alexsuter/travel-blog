(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['UserService', '$location'];

    /* @ngInject */
    function AuthenticationController(UserService, $location) {
        var vm = this;
        vm.hasError = false;
        vm.errormsg = '';
        vm.user = {};

        vm.login = login;

        ////////////////

        function login(user) {
            return UserService.login(user.username, user.password)
                .then(success)
                .catch(error);

            function success(data) {
                vm.hasError = !data.success;
                if (vm.hasError) {
                    vm.errormsg = data.msg;
                } else {
                    $location.path( "/" );
                }
            }
        }

        function error() {
            vm.hasError = true;
        }
    }

})();


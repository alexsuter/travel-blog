(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['UserService', '$location'];

    /* @ngInject */
    function AuthenticationController(UserService, $location) {
        var vm = this;
        vm.errormsg = '';
        vm.user = {};

        vm.login = login;

        ////////////////

        function login(user) {
            return UserService.login(user)
                .then(success)
                .catch(error);

            function success() {
                $location.path("/");
            }

            function error(error) {
                vm.errormsg = 'Es ist ein Fehler aufgetreten';
                if (error.data) {
                    vm.errormsg += ': ' + error.data.message;
                }
            }
        }
    }

})();


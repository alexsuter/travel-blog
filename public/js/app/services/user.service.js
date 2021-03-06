(function () {
    'use strict';

    angular
        .module('app')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$window', '$route'];

    /* @ngInject */
    function UserService($http, $window, $route) {
        const BASE_URL = '/api/user';

        this.login = login;
        this.logout = logout;
        this.isAuthenticated = isAuthenticated;

        ////////////////

        function login(user) {
            return $http.post(BASE_URL + '/login', user)
                .then(success);

            function success(response) {
                $window.localStorage['jwtToken'] = response.data.token;
                return response.data;
            }
        }

        function logout() {
            $window.localStorage.removeItem('jwtToken');
            $route.reload();
        }

        function isAuthenticated() {
            var token = $window.localStorage['jwtToken'];
            if (typeof(token) == 'undefined' || token === null) {
                return false;
            }
            if (typeof(token.length) != 'undefined') {
                return token.length != 0;
            }
            return false;
        }
    }

})();



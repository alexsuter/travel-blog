(function () {
    'use strict';

    angular
        .module('app')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$window'];

    /* @ngInject */
    function UserService($http, $window) {
        const BASE_URL = '/api/user';

        this.login = login;
        this.logout = logout;
        this.isAuthenticated = isAuthenticated;

        ////////////////

        function login(username, password) {
            return $http.post(BASE_URL + '/login', {username: username, password: password}).then(success);
        }

        function logout() {
            $window.localStorage.removeItem('jwtToken');
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

        function success(response) {
            $window.localStorage['jwtToken'] = response.data.token;
            return response.data;
        }
    }

})();



angular.module('app').factory('authenticationInjector', ['$window', function($window) {
    var authenticationInjector = {
        request: function(config) {
            config.headers['Authorization'] = $window.localStorage['jwtToken'];
            return config;
        }
    };
    return authenticationInjector;
}]);
angular.module('app').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authenticationInjector');
}]);
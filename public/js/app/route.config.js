angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'test.html',
            controller: 'TestController',
            controllerAs: 'vm'
        });
}
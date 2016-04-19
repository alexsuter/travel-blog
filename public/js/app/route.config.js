angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })
        .when('/other', {
            templateUrl: 'partials/other.html'
        })
        .when('/not-found', {
            templateUrl: 'partials/not-found.html'
        })
        .otherwise({
            redirectTo: '/not-found'
        });
}
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
        .when('/blog/:blogId', {
            templateUrl: 'partials/blog-detail.html',
            controller: 'BlogDetailController',
            controllerAs: 'vm'
        })
        .when('/not-found', {
            templateUrl: 'partials/not-found.html'
        })
        .otherwise({
            redirectTo: '/not-found'
        });
}
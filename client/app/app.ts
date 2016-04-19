'use strict';

angular.module('travelBlogApp', [
  'travelBlogApp.auth',
  'travelBlogApp.admin',
  'travelBlogApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

'use strict';

angular.module('travelBlogApp.auth', [
  'travelBlogApp.constants',
  'travelBlogApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogDetailController', BlogDetailController);

    BlogDetailController.$inject = ['$routeParams', 'TravelBlogService'];

    /* @ngInject */
    function BlogDetailController($routeParams, TravelBlogService) {
        var vm = this;
        vm.hasError = false;
        vm.blog = {};

        activate();

        ////////////////

        function activate() {
            var blogId = $routeParams.blogId;
            return TravelBlogService.get(blogId)
                .then(success)
                .catch(error);

            function success(data) {
                vm.blog = data;
            }

            function error() {
                vm.hasError = true;
            }
        }
    }

})();


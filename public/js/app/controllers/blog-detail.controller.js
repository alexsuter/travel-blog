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
        vm.isCreateFormVisible = false;

        vm.loadBlog = loadBlog;
        vm.showCreateForm = showCreateForm;
        vm.hideCreateForm = hideCreateForm;

        activate();

        ////////////////

        function activate() {
            loadBlog();
        }

        function loadBlog() {
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

        function showCreateForm() {
            vm.isCreateFormVisible = true;
        }

        function hideCreateForm() {
            vm.isCreateFormVisible = false;
        }
    }

})();


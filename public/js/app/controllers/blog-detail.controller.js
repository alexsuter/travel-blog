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
        vm.blog = {
            // Don't grab _id from server because promise is not correct resolved
            _id: $routeParams.blogId
        };
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
            return TravelBlogService.get(vm.blog._id)
                .then(success)
                .catch(error);

            function success(data) {
                vm.blog = data;
            }
        }

        function showCreateForm() {
            vm.isCreateFormVisible = true;
        }

        function hideCreateForm() {
            vm.isCreateFormVisible = false;
        }

        function error() {
            vm.hasError = true;
        }
    }

})();


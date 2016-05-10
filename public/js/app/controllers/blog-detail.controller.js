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
        vm.removeEntry = removeEntry;

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
        }

        function showCreateForm() {
            vm.isCreateFormVisible = true;
        }

        function hideCreateForm() {
            vm.isCreateFormVisible = false;
        }

        function removeEntry(entryId) {
            return TravelBlogService.removeEntry(vm.blog._id, entryId)
                .then(loadBlog)
                .catch(error)
        }

        function error() {
            vm.hasError = true;
        }
    }

})();


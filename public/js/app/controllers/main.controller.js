(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['TravelBlogService'];

    /* @ngInject */
    function MainController(TravelBlogService) {
        var vm = this;
        vm.travelBlogs = [];
        vm.errormsg = '';
        vm.isCreateFormVisible = false;

        vm.loadBlogs = loadBlogs;
        vm.showCreateForm = showCreateForm;
        vm.hideCreateForm = hideCreateForm;
        vm.removeBlog = removeBlog;

        activate();

        ////////////////

        function activate() {
            return loadBlogs();
        }

        function loadBlogs() {
            return TravelBlogService.getAll()
                .then(success)
                .catch(failed);

            function success(travelBlogs) {
                vm.travelBlogs = travelBlogs;
            }

            function failed(error) {
                if (error.data) {
                    vm.errormsg = error.data.message;
                }
            }
        }

        function showCreateForm() {
            vm.isCreateFormVisible = true;
        }

        function hideCreateForm() {
            vm.isCreateFormVisible = false;
        }

        function removeBlog(blogId) {
            return TravelBlogService.remove(blogId).then(loadBlogs);
        }

    }

})();


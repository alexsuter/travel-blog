(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogDetailController', BlogDetailController);

    BlogDetailController.$inject = ['$routeParams', 'TravelBlogService'];

    /* @ngInject */
    function BlogDetailController($routeParams, TravelBlogService) {
        var vm = this;
        vm.errormsg = '';
        vm.blog = {
            // Don't grab _id from server because promise is not correct resolved
            _id: $routeParams.blogId
        };

        vm.loadBlog = loadBlog;

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

        function error(error) {
            if (error.data) {
                vm.errormsg = error.data.message;
            }
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateBlogController', CreateBlogController)
        .component('createBlog', {
            templateUrl: 'partials/blog-form.html',
            controller: 'CreateBlogController as vm',
            bindings: {
                onSuccess: '&',
                onCancel: '&'
            }
        });

    CreateBlogController.$inject = ['TravelBlogService'];

    /* @ngInject */
    function CreateBlogController(TravelBlogService) {
        var vm = this;
        vm.blog = {};
        vm.errormsg = '';

        vm.create = create;
        vm.cancelCreation = cancelCreation;

        ////////////////

        function create(blog) {
            return TravelBlogService.create(blog)
                .then(reset)
                .then(vm.onSuccess)
                .catch(fail)
        }

        function cancelCreation() {
            reset();
            vm.onCancel();
        }

        function reset() {
            vm.blog = {};
        }

        function fail(error) {
            if (error.data) {
                vm.errormsg = error.data.message;
            }
        }
    }

})();


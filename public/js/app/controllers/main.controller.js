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

        activate();

        ////////////////

        function activate() {
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
    }

})();


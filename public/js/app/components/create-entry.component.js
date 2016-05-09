(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateEntryController', CreateEntryController)
        .component('createEntry', {
            templateUrl: 'partials/entry-form.html',
            controller: 'CreateEntryController as vm',
            bindings: {
                blogId: '<',
                onSuccess: '&',
                onCancel: '&'
            }
        });

    CreateEntryController.$inject = ['TravelBlogService'];

    /* @ngInject */
    function CreateEntryController(TravelBlogService) {
        var vm = this;
        vm.entry = {};
        vm.errormsg = '';

        vm.create = create;
        vm.cancelCreation = cancelCreation;

        ////////////////

        function create(entry) {
            return TravelBlogService.createEntry(vm.blogId, entry)
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


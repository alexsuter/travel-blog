(function () {
    'use strict';

    angular
        .module('app')
        .component('entryList', {
            templateUrl: 'partials/entry-list.html',
            controller: EntryListController,
            controllerAs: 'vm',
            bindings: {
                blogId: '@'
            }
        });

    EntryListController.$inject = ['TravelBlogService', 'EntryService'];

    /* @ngInject */
    function EntryListController(TravelBlogService, EntryService) {
        var vm = this;
        vm.entries = [];
        vm.errormsg = '';
        vm.isCreateFormVisible = false;

        vm.$onInit = $onInit;
        vm.showCreateForm = showCreateForm;
        vm.hideCreateForm = hideCreateForm;
        vm.remove = remove;
        vm.update = update;

        ////////////////

        function $onInit() {
            return TravelBlogService.getEntries(vm.blogId)
                .then(success)
                .catch(error);

            function success(data) {
                vm.entries = data
            }

            function error(error) {
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

        function remove(entry) {
            return EntryService.remove(entry._id)
                .then($onInit)
        }

        function update(entry) {
            return EntryService.update(entry)
                .then($onInit);
        }

    }

})();



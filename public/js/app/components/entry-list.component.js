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

    EntryListController.$inject = ['TravelBlogService'];

    /* @ngInject */
    function EntryListController(TravelBlogService) {
        var vm = this;
        vm.entries = [];
        vm.isCreateFormVisible = false;

        vm.$onInit = $onInit;
        vm.showCreateForm = showCreateForm;
        vm.hideCreateForm = hideCreateForm;
        vm.remove = remove;
        vm.update = update;

        ////////////////

        function $onInit() {
            return TravelBlogService.get(vm.blogId)
                .then(success);

            function success(data) {
                vm.entries = data.entries
            }
        }

        function showCreateForm() {
            vm.isCreateFormVisible = true;
        }

        function hideCreateForm() {
            vm.isCreateFormVisible = false;
        }

        function remove(entry) {
            return TravelBlogService.removeEntry(vm.blogId, entry._id)
                .then($onInit)
        }

        function update(entry) {
            return TravelBlogService.updateEntry(vm.blogId, entry)
                .then($onInit);
        }

    }

})();



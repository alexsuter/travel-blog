(function () {
    'use strict';

    angular
        .module('app')
        .component('entryDetail', {
            templateUrl: 'partials/entry-detail.html',
            controller: EntryDetailController,
            controllerAs: 'vm',
            bindings: {
                entry: '<',
                onDelete: '&',
                onUpdate: '&'
            }
        });

    EntryDetailController.$inject = [];

    /* @ngInject */
    function EntryDetailController() {
        var vm = this;

        vm.update = update;

        ////////////////

        function update(prop, value) {
            var updatedEntry = vm.entry;
            updatedEntry[prop] = value;

            vm.onUpdate({entry: updatedEntry});
        }

    }

})();



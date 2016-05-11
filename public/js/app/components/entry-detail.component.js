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
                onDelete: '&'
            }
        });

    EntryDetailController.$inject = [];

    /* @ngInject */
    function EntryDetailController() {
        var vm = this;

        ////////////////


    }

})();



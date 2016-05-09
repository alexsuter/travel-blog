(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateEntryController', CreateEntryController)
        .component('createEntry', {
            templateUrl: 'partials/entry-form.html',
            controller: 'CreateEntryController as vm',
            bindings: {
                onSuccess: '&',
                onCancel: '&'
            }
        });

    CreateEntryController.$inject = [];

    /* @ngInject */
    function CreateEntryController() {
        var vm = this;
        vm.title = "Test";

        ////////////////
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .component('editableField', {
            templateUrl: 'partials/editable-field.html',
            controller: EditableFieldController,
            controllerAs: 'vm',
            bindings: {
                fieldValue: '<',
                fieldType: '@?',
                onUpdate: '&'
            }
        });

    EditableFieldController.$inject = [];

    /* @ngInject */
    function EditableFieldController() {
        var vm = this;
        vm.editMode = false;
        vm.isCreateFormVisible = false;

        vm.$onInit = $onInit;
        vm.handleModeChange = handleModeChange;
        vm.reset = reset;

        ////////////////

        function $onInit() {
            vm.fieldValueCopy = vm.fieldValue;

            if (!vm.fieldType) {
                vm.fieldType = 'text';
            }
        }

        function handleModeChange() {
            if (vm.editMode) {
                vm.onUpdate({value: vm.fieldValue});
                vm.fieldValueCopy = vm.fieldValue;
            }
            vm.editMode = !vm.editMode;
        }

        function reset() {
            vm.fieldValue = vm.fieldValueCopy;
        }

    }

})();



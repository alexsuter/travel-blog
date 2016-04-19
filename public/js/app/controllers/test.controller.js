(function () {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController);

    /* @ngInject */
    function TestController() {
        var vm = this;
        vm.title = 'TestController';

        activate();

        ////////////////

        function activate() {
            console.log('Hui')
        }
    }

})();


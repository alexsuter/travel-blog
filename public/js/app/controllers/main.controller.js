(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    /* @ngInject */
    function MainController() {
        var vm = this;
        vm.title = 'Hello WOrld';

        activate();

        ////////////////

        function activate() {
            console.log('Hui')
        }
    }

})();


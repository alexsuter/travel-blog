(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    /* @ngInject */
    function MainController($http) {
        var vm = this;
        $http.get("/api/travel-blog").then(function (response) {
            vm.travelBlogs = response.data;
        });
    }

})();


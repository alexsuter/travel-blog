(function () {
    'use strict';

    angular
        .module('app')
        .service('TravelBlogService', TravelBlogService);

    TravelBlogService.$inject = ['$http'];

    /* @ngInject */
    function TravelBlogService($http) {
        this.getAll = getAll;

        ////////////////

        function getAll() {
            return $http.get("/api/travel-blog").then(success);

            function success(response) {
                return response.data;
            }
        }
    }

})();


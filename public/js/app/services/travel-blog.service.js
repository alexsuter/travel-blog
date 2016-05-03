(function () {
    'use strict';

    angular
        .module('app')
        .service('TravelBlogService', TravelBlogService);

    TravelBlogService.$inject = ['$http'];

    /* @ngInject */
    function TravelBlogService($http) {
        const BASE_URL = '/api/travel-blog';

        this.getAll = getAll;
        this.get = get;

        ////////////////

        function getAll() {
            return $http.get(BASE_URL).then(success);

            function success(response) {
                return response.data;
            }
        }

        function get(blogId) {
            return $http.get(BASE_URL + '/' + blogId)
                .then(success);

            function success(response) {
                return response.data;
            }
        }
    }

})();


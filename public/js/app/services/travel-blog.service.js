(function () {
    'use strict';

    angular
        .module('app')
        .service('TravelBlogService', TravelBlogService);

    TravelBlogService.$inject = ['$http'];

    /* @ngInject */
    function TravelBlogService($http) {
        const BASE_URL = '/api/travel-blog';

        this.create = create;
        this.createEntry = createEntry;
        this.getAll = getAll;
        this.remove = remove;
        this.get = get;

        ////////////////

        function create(blog) {
            return $http.post(BASE_URL, blog).then(success);
        }

        function createEntry(blogId, entry) {
            return $http.post(BASE_URL + '/' + blogId + '/entry', entry).then(success);
        }

        function getAll() {
            return $http.get(BASE_URL).then(success);
        }

        function get(blogId) {
            return $http.get(BASE_URL + '/' + blogId).then(success);
        }

        function remove(blogId) {
            return $http.delete(BASE_URL + '/' + blogId).then(success);
        }

        function success(response) {
            return response.data;
        }
    }

})();


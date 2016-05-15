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
        this.getEntries = getEntries;
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

        function getEntries(blogId) {
            return $http.get(BASE_URL + '/' + blogId + '/entry').then(convertEntry);
        }

        function remove(blogId) {
            return $http.delete(BASE_URL + '/' + blogId).then(success);
        }

        function success(response) {
            return response.data;
        }

        function convertEntry(response) {
            var entries = response.data;
            entries.forEach(function (entry) {
                entry.timestamp = new Date(entry.timestamp)
            });
            return entries
        }
    }

})();


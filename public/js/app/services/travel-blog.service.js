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
        this.removeEntry = removeEntry;
        this.updateEntry = updateEntry;
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
            return $http.get(BASE_URL + '/' + blogId + '/entry').then(success);
        }

        function remove(blogId) {
            return $http.delete(BASE_URL + '/' + blogId).then(success);
        }

        function removeEntry(blogId, entryId) {
            return $http.delete(BASE_URL + '/' + blogId + '/entry/' + entryId).then(success);
        }

        function updateEntry(blogId, entry) {
            return $http.put(BASE_URL + '/' + blogId + '/entry/' + entry._id, entry).then(success);
        }

        function success(response) {
            return response.data;
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .service('EntryService', EntryService);

    EntryService.$inject = ['$http'];

    /* @ngInject */
    function EntryService($http) {
        const BASE_URL = '/api/entry';

        this.update = update;
        this.remove = remove;

        ////////////////

        function update(entry) {
            return $http.put(BASE_URL + '/' + entry._id, entry).then(success);
        }

        function remove(entryId) {
            return $http.delete(BASE_URL + '/' + entryId).then(success);
        }


        function success(response) {
            return response.data;
        }
    }

})();



(function () {
    var app = angular.module('saycle');

    app.service('rankingService', function ($http) {

        return {
            getRankedUsers: function () {
                return $http.get('/api/getrankedusers').then(function (result) {
                    return result.data;
                });
            }
        };

    });
})();
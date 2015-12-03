(function () {
    var app = angular.module('saycle');

    app.service('loginService', function ($http) {
        var authInfo = {
            currentUser: null
        };
        
        var refreshAuthInfo = function () {
            $http.get('/api/getcurrentuser').then(function (result) {
                console.log("Refreshing auth info...");
                authInfo.currentUser = result.data === "" ? null : result.data;
            });
        };
        
        refreshAuthInfo();

        return {
            login: function (loginInfo) {
                return $http.post('/login', loginInfo).then(function () {
                    refreshAuthInfo();
                });
            },
            getAuthInfo: function () {
                return authInfo;
            }
        };
    });
})();
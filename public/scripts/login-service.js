(function () {
    var app = angular.module('saycle');
    
    app.service('loginService', function ($http, toastr, waitinfo) {
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
                waitinfo.show();
                return $http.post('/login', loginInfo).success(function () {
                    waitinfo.hide();
                    refreshAuthInfo();
                    toastr.success('You are logged in.', 'Success');
                    hideNavigation();
                }).error(function(result) {
                    waitinfo.hide();
                    toastr.error('Sorry, login failed.', 'Error');
                });
            },
            getAuthInfo: function () {
                return authInfo;
            },
            logout: function () {
                return $http.get('/logout').then(function () {
                    location.reload();
                });
            }
        };
    });
})();
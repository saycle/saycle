(function () {
    var app = angular.module('saycle');
    
    app.service('loginService', function ($http, $translate, toastr, waitinfo) {
        var authInfo = {
            currentUser: null
        };
        
        var refreshAuthInfo = function () {
            $http.get('/api/getcurrentuser').then(function (result) {
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
                    toastr.success($translate.instant('Toastr.LoginSuccess'), $translate.instant('Toastr.Welcome'));
                    hideNavigation();
                }, function(result) {
                    waitinfo.hide();
                    toastr.error($translate.instant('Toastr.LoginError.Fail'), $translate.instant('Toastr.Error'));
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
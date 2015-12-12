(function () {
    var app = angular.module('saycle');

    app.service('registerService', function ($http, toastr, waitinfo) {

        return {
            register: function (registerInfo) {
                waitinfo.show();
                return $http.post('/api/register', registerInfo).success(function () {
                    waitinfo.hide();
                    toastr.success('Your user has been registered. You can login now.', 'Success');
                }).error(function (result) {
                    waitinfo.hide();
                    toastr.error('Registering failed', 'Error');
                });
            }
        };
    });
})();
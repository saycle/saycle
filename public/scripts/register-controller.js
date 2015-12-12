(function () {
    var app = angular.module('saycle');

    app.controller('registerCtrl', function ($http, loginService, toastr, waitinfo) {
        var vm = this;
        vm.formData = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.register = function () {
            vm.submitted = true;
            if (vm.formData.password == vm.formData.passwordConfirm) {
                waitinfo.show();
                $http.post('/api/register', vm.formData).success(function () {
                    waitinfo.hide();
                    toastr.success('Your user has been registered. You can login now.', 'Success');
                    vm.submitted = false;
                }).error(function (result) {
                    waitinfo.hide();
                    toastr.error('Registering failed', 'Error');
                });
            }
            vm.submitDisabled = false;
        }
    });
})();
(function () {
    var app = angular.module('saycle');

    app.controller('registerCtrl', function ($http, loginService, toastr, waitinfo) {
        var vm = this;
        vm.userToRegister = {};
        vm.register = function () {
            waitinfo.show();
            $http.post('/api/register', vm.userToRegister).then(function () {
                waitinfo.hide();
                toastr.success('Your user has been registered. You can login now.', 'Success');
            });
        };
    });
})()
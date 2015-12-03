(function () {
    var app = angular.module('saycle');

    app.controller('registerCtrl', function ($http, loginService) {
        var vm = this;
        vm.userToRegister = {};
        vm.register = function () {
            $http.post('/api/register', vm.userToRegister);
        };
    });
})()
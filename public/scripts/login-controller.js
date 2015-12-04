(function () {
    var app = angular.module('saycle');

    app.controller('loginCtrl', function (loginService) {
        var vm = this;
        
        vm.user = {
            email: "",
            password: ""
        };
        
        vm.login = function () {
            loginService.login(vm.user);
        };

        vm.logout = function () {
            loginService.logout();
        };
        
        return vm;
    });
})()
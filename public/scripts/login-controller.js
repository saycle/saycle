(function () {
    var app = angular.module('saycle');

    app.controller('loginCtrl', function (loginService) {
        var vm = this;
        
        vm.user = {
            email: "mail",
            password: "pass"
        };
        
        vm.login = function () {
            loginService.login(vm.user);
        };
        
        
        vm.logOut = function () {
            alert("awd");
        };
        
        return vm;
    });
})()
(function () {
    var app = angular.module('saycle');

    app.controller('loginCtrl', function ($http) {
        var vm = this;
        
        vm.user = {
            email: "mail",
            password: "pass"
        };
        
        vm.login = function () {
            return $http.post('/login', vm.user);
        };
        
        return vm;
    });
})()
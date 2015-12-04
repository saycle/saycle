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
        
        
        vm.logOut = function (req, res) {
            req.session.destroy(function (err) {
                res.redirect('/'); //Inside a callback… bulletproof!
            });
            location.reload();
        };
        
        return vm;
    });
})()
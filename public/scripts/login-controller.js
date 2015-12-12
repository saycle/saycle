(function () {
    var app = angular.module('saycle');

    app.controller('loginCtrl', function (loginService) {
        var vm = this;
        vm.user = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.login = function () {
            vm.submitDisabled = true;
            vm.submitted = true;
            loginService.login(vm.formData).then(function () {
                vm.submitDisabled = false;
            });
            vm.submitDisabled = false;
        };

        vm.logout = function () {
            loginService.logout();
        };

        return vm;
    });
})();
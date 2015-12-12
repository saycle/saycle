(function () {
    var app = angular.module('saycle');

    app.controller('registerCtrl', function (registerService) {
        var vm = this;
        vm.formData = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.register = function () {
            vm.submitted = true;
            if (vm.formData.password == vm.formData.passwordConfirm) {
                registerService.register(vm.formData).then(function () {
                    vm.submitted = false;
                    vm.formData = {};
                    hideNavigation();
                });
            }
            vm.submitDisabled = false;
        }
    });
})();
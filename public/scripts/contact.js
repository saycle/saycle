//This is the js which represents the contact
(function () {
    var app = angular.module('saycle');


    app.controller('contactCtrl', function ($scope, contactService, $route, $translate) {
        var vm = this;
        vm.result = {
            class: 'hidden',
            message: ''
        };
        vm.formData = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.submit = function () {
            vm.submitted = true;
            vm.submitDisabled = true;
            contactService.send().success(function () {
                vm.submitDisabled = false;
            });
        }

    });

})();
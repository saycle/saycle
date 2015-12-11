//This is the js which represents the contact
(function () {
    var app = angular.module('saycle');
    
    
    app.controller('contactCtrl', function($scope, $route, $translate) {
        var vm = this;
        vm.result = {
            class: 'hidden',
            message: ''
        };
        vm.FormData = null;
        vm.submitDisabled = false;
        vm.submitted = false;

        vm.submit = function(form) {
            vm.submitted = true;
            vm.submitDisabled = true;
            if (form.$valid) {
                $http({
                    //send mail...
                }).success(function(result) {
                    if (result.success) {
                        vm.result.message = $translate('contact.successMessage');
                        vm.result.class = 'bg-success';
                    } else {
                        vm.submitDisabled = false;
                        vm.result.message = $translate('contact.errorMessage');
                        vm.result.class = 'bg-danger';
                    }
                });
            } else {
                vm.submitDisabled = false;
                vm.result.message = $translate('contact.invalidInputMessage');
                vm.result.class = 'bg-danger';
            }
        }
    });

})();
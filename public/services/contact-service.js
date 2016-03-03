(function () {
    var app = angular.module('saycle');

    app.service('contactService', function ($http, $translate, waitinfo, toastr) {

        return {
            send: function (formData) {
                waitinfo.show();
                return $http.post('/api/contact/send', formData).then(function (result) {
                    waitinfo.hide();
                    toastr.success($translate.instant('Toastr.Sent'), $translate.instant('Toastr.Success'));
                    
                    return result.data;
                }, function () {
                    toastr.error($translate.instant('Toastr.SentError'), $translate.instant('Toastr.Error'));
                });
            }
        };

    });
})();
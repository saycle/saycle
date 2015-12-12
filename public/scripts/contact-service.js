(function () {
    var app = angular.module('saycle');

    app.service('contactService', function ($http, waitinfo, toastr) {

        return {
            send: function (formData) {
                waitinfo.show();
                return $http.post('/api/contact/send', formData).then(function (result) {
                    waitinfo.hide();
                    toastr.success('Form sent', 'Success');
                    return result.data;
                }, function () {
                    toastr.error('Sending failed', 'Error');
                });
            }
        };

    });
})();
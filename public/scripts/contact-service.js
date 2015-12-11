(function () {
    var app = angular.module('saycle');

    app.service('contactService', function ($http, waitinfo, toastr) {

        return {
            send: function (formData) {
                waitinfo.show();
                return $http.post('/api/contact/send', formData).then(function (result) {
                    return result.data;
                    waitinfo.hide();
                    toastr.success('Form sent', 'Success');
                }, function () {
                    toastr.error('Sending failed', 'Error');
                });
            }
        };

    });
})();
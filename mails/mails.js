var Sendgrid = require('sendgrid');
var Q = require('q');
var sendgrid = Sendgrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var Mails = (function () {
    function Mails() {
    }
    Mails.send = function (options) {
        var deferred = Q.defer();
        sendgrid.send(options, function (err, json) {
            if (err) {
                deferred.reject(err);
            }
            else
                deferred.resolve(json);
        });
        return deferred.promise;
    };
    return Mails;
})();
module.exports = Mails;
//# sourceMappingURL=mails.js.map
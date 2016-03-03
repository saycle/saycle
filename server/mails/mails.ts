import Sendgrid = require('sendgrid');
import Q = require('q');

var sendgrid = Sendgrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

class Mails {
    static send(options: Sendgrid.EmailOptions) {
        var deferred = Q.defer();

        sendgrid.send(options, function (err, json) {
            if (err) { deferred.reject(err); }
            else deferred.resolve(json);
        });

        return deferred.promise;
    }
}

export = Mails;
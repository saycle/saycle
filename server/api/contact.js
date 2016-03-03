"use strict";
var express = require('express');
var Mails = require('../mails/mails');
var app = express();
app.all('/*', function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.post('/send', function (req, res) {
    var form = req.body; // name, email, reason, subject, message
    if (form.email == null || form.email == '')
        res.send(500, 'error - mail not defined');
    else {
        Mails.send({
            to: 'info@saycle.xyz', from: 'info@saycle.xyz', replyto: form.email, subject: 'Contact Form Saycle',
            text: 'Name: ' + form.name + '\nE-Mail: ' + form.email + '\nReason: ' + form.reason + '\nSubject: ' + form.subject + '\nMessage: ' + form.message
        })
            .then(function () {
            res.send(200, 'sent');
        }, function (reason) {
            res.send(500, 'error');
        });
    }
});
module.exports = app;
//# sourceMappingURL=contact.js.map
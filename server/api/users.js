"use strict";
var express = require('express');
var context = require('../dal/context');
var User = require('../models/user');
var app = express();
app.get('/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email, isAdmin: req.user.isAdmin });
    else
        res.json(null);
});
app.get('/getrankedusers', function (req, res) {
    context.Users.getRankedUsers().then(function (rankedUsers) { return res.json(rankedUsers); }, function () {
        return res.send(500, 'Error while getting ranked users');
    });
});
app.post('/register', function (req, res) {
    var user = new User(req.body);
    context.Users.addUser(user).then(function () { return res.send(200, 'registered'); }, function () {
        return res.send(500, 'Error while registering');
    });
});
module.exports = app;
//# sourceMappingURL=users.js.map
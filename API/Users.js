/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var context = require('../dal/context');
var User = require('../models/User');
var app = express();
app.get('/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email });
    else
        res.json(null);
});
app.post('/register', function (req, res) {
    var user = new User(req.body);
    context.Users.addUser(user).then(function () { return res.send(200, 'registered'); }, function () { return res.send(500, 'Error while registering'); });
});
module.exports = app;
//# sourceMappingURL=Users.js.map
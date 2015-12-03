/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var context = require('../DAL/Context');
var app = express();
app.get('/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email });
    else
        res.json(null);
});
app.post('/register', function (req, res) {
    var user = req.body;
    context.Users.addUser(user).then(res.end);
});
module.exports = app;
//# sourceMappingURL=Users.js.map
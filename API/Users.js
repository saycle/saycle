/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var auth = require('./authentication');
var app = express();
//app.post('/register',
app.get('/getuser', auth.isAuthenticated, function (req, res) {
    res.send('yippie');
});
module.exports = app;
//# sourceMappingURL=Users.js.map
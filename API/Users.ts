/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../DAL/Context');
import auth = require('./authentication');

var app = express();

//app.post('/register',
app.get('/getuser', auth.isAuthenticated, function (req, res) {
    res.send('yippie');
});

export = app;
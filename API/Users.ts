/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../DAL/Context');
import auth = require('./authentication');
import User = require('../models/User');
var extend = require('extend');

var app = express();

app.get('/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email });
    else
        res.json(null);
});

app.post('/register', function (req, res) {
    var user = new User(req.body);
    context.Users.addUser(user).then(() => res.send(200, 'registered'),
    () => res.send(500, 'Error while registering'));
});

export = app;
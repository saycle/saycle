/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../DAL/Context');
import auth = require('./authentication');
import User = require('../models/User');

var app = express();

app.get('/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email });
    else
        res.json(null);
});

app.post('/register', function (req, res) {
    var user: User = req.body;
    context.Users.addUser(user).then(res.end);
});

export = app;
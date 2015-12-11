import express = require('express');
import context = require('../dal/context');
import auth = require('./authentication');
import User = require('../models/user');

var app = express();

app.get('/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email });
    else
        res.json(null);
});

app.get('/getrankedusers', function (req, res) {
    context.Users.getRankedUsers().then((rankedUsers) => res.json(rankedUsers),
        () =>
            res.send(500, 'Error while getting ranked users'));
});

app.post('/register', function (req, res) {
    var user = new User(req.body);
    context.Users.addUser(user).then(() => res.send(200, 'registered'),
        () =>
            res.send(500, 'Error while registering'));
});

export = app;
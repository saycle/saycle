﻿import express = require('express');
import http = require('http');
import path = require('path');
import passport = require('passport');

var app = express();

// Handle static files (/public, /bower_components)
var publicFolder = path.join(__dirname, 'public');
app.use('/public', express.static(publicFolder));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

/* Passport authentication */
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
app.use(cookieParser());
app.use(express.cookieSession({
    secret: 'development' == app.get('env') ? 'very secure secret' : process.env.SESSION_SECRET,
    cookie: {
        maxAge: 86400000 // 1 day
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import authentication = require('./API/authentication');
authentication.configure(app, passport);

//import UsersApi = require('./API/Users');
//app.use('/api', UsersApi);
app.get('/api/getcurrentuser', function (req, res) {
    if (req.user)
        res.json({ name: req.user.name, email: req.user.email });
    else
        res.json(null);
});

app.get('/test', authentication.isAuthenticated, function (req, res) {
    res.send('yippie');
});

app.all('/*', function (req, res) {
    res.sendfile('index.html', { root: publicFolder });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

import express = require('express');
import http = require('http');
import path = require('path');
import context = require('./DAL/Context');

var app = express();
var publicFolder = path.join(__dirname, 'public');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));

app.use('/public', express.static(publicFolder));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.all('/*', function (req, res) {
    res.sendfile('index.html', { root: publicFolder });
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//context.UserController.getUsers().then((users) => {
//    console.log(users.length);
//});
context.Users.getUsers().then((users) => {
    console.log(users);
});
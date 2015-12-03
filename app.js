var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
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
var authentication = require('./API/authentication');
authentication.configure(app, passport);
var UsersApi = require('./API/Users');
app.use('/api', UsersApi);
app.get(/^((?!\/api).)*$/, function (req, res) {
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
//# sourceMappingURL=app.js.map
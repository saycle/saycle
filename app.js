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
var authentication = require('./server/api/authentication');
authentication.configure(app, passport);
var usersApi = require('./server/api/users');
app.use('/api', usersApi);
var contactApi = require('./server/api/contact');
app.use('/api/contact', contactApi);
var storiesApi = require('./server/api/stories');
app.use('/api/stories', storiesApi);
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
var server = http.createServer(app);
// Socket.io server listens to our app
var io = require('socket.io').listen(server);
require('./server/socket/socket.js').init(io);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map
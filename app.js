var express = require('express');
var http = require('http');
var path = require('path');
var context = require('./DAL/Context');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
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
context.Users.getUsers().then(function (users) {
    console.log(users);
});
//# sourceMappingURL=app.js.map
var Context = require('../dal/context');
var PassportLocal = require('passport-local');
var Authentication = (function () {
    function Authentication() {
    }
    Authentication.configure = function (app, passport) {
        passport.use('local-login', new PassportLocal.Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (email, password, done) {
            Context.Users.getUserByMail(email)
                .then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect e-mail.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            }, function (err) {
                done(err);
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user.email);
        });
        passport.deserializeUser(function (email, done) {
            Context.Users.getUserByMail(email)
                .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
        });
        // process the login form
        app.post('/login', passport.authenticate('local-login'), function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect('/success');
        });
        // process the logout
        app.get('/logout', function (req, res) {
            req.logout();
            delete req.session;
            res.end();
        });
    };
    ;
    Authentication.isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.send(401, 'LoginFirst');
    };
    ;
    Authentication.isAdmin = function (req, res, next) {
        if (req.isAuthenticated() && req.user.isadmin)
            return next();
        res.send(401, 'LoginAdmin');
    };
    ;
    return Authentication;
})();
module.exports = Authentication;
//# sourceMappingURL=authentication.js.map
import Context = require('../DAL/Context');
import passportLocal = require('passport-local');

var authentication = {
    configure: function (app, passport) {

        var LocalStrategy = passportLocal.Strategy;

        passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            function (email, password, done) {
                Context.Users.getUserByMail(email).then(function (user) {
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
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user.email);
        });

        passport.deserializeUser(function (email, done) {
            Context.Users.getUserByMail(email).then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login'),
            function (req, res) {
                // If this function gets called, authentication was successful.
                // `req.user` contains the authenticated user.
                res.redirect('/success');
            });

    },

    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.send('Unauthorized!');
    }
};

export = authentication;
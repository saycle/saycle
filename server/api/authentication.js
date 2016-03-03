"use strict";
var Context = require('../dal/context');
var PassportLocal = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var User = require('../models/user');
var Authentication = (function () {
    function Authentication() {
    }
    Authentication.configure = function (app, passport) {
        // Local Authentication
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
        // Facebook Authentication
        passport.use(new FacebookStrategy.Strategy({
            // pull in our app id and secret from our auth.js file
            clientID: process.env.FACEBOOK_APP_ID ? process.env.FACEBOOK_APP_ID : 'facebook app id',
            clientSecret: process.env.FACEBOOK_APP_SECRET ? process.env.FACEBOOK_APP_SECRET : 'we keep this private',
            callbackURL: '/loginfacebook/callback'
        }, 
        // facebook will send back the token and profile
        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id
                Context.Users.getUserByMail(profile.id).then(function (user) {
                    if (user)
                        return done(null, user);
                    else {
                        // if there is no user found with that facebook id, create it
                        var user = new User({});
                        user.email = profile.id;
                        user.name = profile.displayName;
                        Context.Users.addUser(user).then(function () { return done(null, user); }, function (err) { throw err; });
                    }
                }, function (err) {
                    return done(err);
                });
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
        // process the local login form
        app.post('/login', passport.authenticate('local-login'), function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect('/success');
        });
        // process the facebook 
        app.get('/loginfacebook', passport.authenticate('facebook', { scope: 'email' }));
        // handle the callback after facebook has authenticated the user
        app.get('/loginfacebook/callback', passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }));
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
}());
module.exports = Authentication;
//# sourceMappingURL=authentication.js.map
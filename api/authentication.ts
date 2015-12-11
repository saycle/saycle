import Context = require('../dal/context');
import PassportLocal = require('passport-local');
import Express = require('express');
import Passport = require('passport');

class Authentication {
    static configure(app: Express.Application, passport: Passport.Passport) {

        passport.use('local-login', new PassportLocal.Strategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                Context.Users.getUserByMail(email)
                    .then((user) => {
                        if (!user) {
                            return done(null, false, { message: 'Incorrect e-mail.' });
                        }
                        if (!user.validPassword(password)) {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                        return done(null, user);
                    }, (err) => {
                        done(err);
                    });
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user.email);
        });

        passport.deserializeUser(function (email, done) {
            Context.Users.getUserByMail(email)
                .then(user => {
                done(null, user);
            }, err => {
                done(err, null);
            });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login'),
            (req, res) => {
                // If this function gets called, authentication was successful.
                // `req.user` contains the authenticated user.
                res.redirect('/success');
            });

         
        // process the logout
        app.get('/logout',
            (req, res) => {
                req.logout();
                delete req.session;
                res.end();
            });

    };

    static isAuthenticated (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.send(401, 'Unauthorized - please login');
    };

    static isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.isadmin)
            return next();
        res.send(401, 'Unauthorized - please login as admin');
    };
}


export = Authentication;
import Context = require('../dal/context');
import PassportLocal = require('passport-local');
import FacebookStrategy = require('passport-facebook');
import Express = require('express');
import Passport = require('passport');
import User = require('../models/user');

class Authentication {
    static configure(app: Express.Application, passport: Passport.Passport) {


        // Local Authentication
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

        // Facebook Authentication
        passport.use(new FacebookStrategy.Strategy({

            // pull in our app id and secret from our auth.js file
            clientID: process.env.FACEBOOK_APP_ID ? process.env.FACEBOOK_APP_ID : 'facebook app id',
            clientSecret: process.env.FACEBOOK_APP_SECRET ? process.env.FACEBOOK_APP_SECRET : 'we keep this private',
            callbackURL: '/loginfacebook/callback'

        },

            // facebook will send back the token and profile
            function (token, refreshToken, profile, done) {

                // asynchronous
                process.nextTick(function () {

                    // find the user in the database based on their facebook id
                    Context.Users.getUserByMail(profile.id).then(
                        (user) => {
                            if (user)
                                return done(null, user);
                            else {
                                // if there is no user found with that facebook id, create it

                                var user = new User({});
                                user.email = profile.id;
                                user.name = profile.displayName;
                                

                                Context.Users.addUser(user).then(
                                    () => { return done(null, user); },
                                    (err) => { throw err; });

                                //// set all of the facebook information in our user model
                                //newUser.facebook.id = profile.id; // set the users facebook id                   
                                //newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                                //newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                                //newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                                
                            }
                        },
                        (err) => {
                            return done(err);
                        });
                });

            }));

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

        // process the local login form
        app.post('/login', passport.authenticate('local-login'),
            (req, res) => {
                // If this function gets called, authentication was successful.
                // `req.user` contains the authenticated user.
                res.redirect('/success');
            });

        // process the facebook 
        app.get('/loginfacebook', passport.authenticate('facebook', { scope: 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/loginfacebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/'
            }));


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
        res.send(401, 'LoginFirst');
    };

    static isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.isadmin)
            return next();
        res.send(401, 'LoginAdmin');
    };
}


export = Authentication;
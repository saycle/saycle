/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var context = require('../dal/context');
var auth = require('./authentication');
var app = express();
app.get('/getstories', function (req, res) {
    context.Stories.getStories().then(function (stories) {
        res.json(stories);
    });
});
app.get('/getstorybyid', function (req, res) {
    context.Stories.getStoryById(req.query.id).then(function (story) {
        res.json(story);
    });
});
app.post('/addcycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    cycle.username = req.user.name;
    context.Stories.addCycle(cycle).then(function () {
        res.send(200, 'added cycle');
    }, function (reason) {
        res.send(500, { message: 'error while adding cycle', error: reason });
    });
});
module.exports = app;
//# sourceMappingURL=stories.js.map
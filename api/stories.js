/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var context = require('../dal/context');
var auth = require('./authentication');
var socket = require('../socket/socket');
var app = express();
app.get('/getstories', function (req, res) {
    context.Stories.getStories().then(function (stories) {
        res.json(stories);
    }, function (reason) {
        res.send(500, { message: 'error', error: reason });
    });
});
app.get('/getstorybyid', function (req, res) {
    context.Stories.getStoryById(req.query.id).then(function (story) {
        res.json(story);
    });
});
app.post('/addstory', auth.isAuthenticated, function (req, res) {
    var story = req.body;
    story.username = req.user.name;
    context.Stories.addStory(req.body).then(function () {
        res.send(200, 'added story');
    }, function (reason) {
        res.send(500, { mesage: 'error while adding story', error: reason });
    });
});
app.post('/addcycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    cycle.username = req.user.name;
    context.Stories.addCycle(cycle).then(function () {
        res.send(200, 'added cycle');
        socket.getIO().sockets.emit('refreshStory', { id: cycle.story });
    }, function (reason) {
        res.send(500, { message: 'error while adding cycle', error: reason });
    });
});
module.exports = app;
//# sourceMappingURL=stories.js.map
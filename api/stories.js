var express = require('express');
var context = require('../dal/context');
var auth = require('./authentication');
var socket = require('../socket/socket');
var app = express();
app.all('/*', function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.get('/getstories', function (req, res) {
    context.Stories.getStories().then(function (stories) {
        res.json(stories);
    }, function (reason) {
        res.send(500, { message: 'getStoriesError', error: reason });
    });
});
app.get('/getstorybyid', function (req, res) {
    context.Stories.getStoryById(req.query.id).then(function (story) {
        story.isLockedBy = lockedStories[story.id] ? lockedStories[story.id].user : null;
        res.json(story);
    });
});
app.post('/addstory', auth.isAuthenticated, function (req, res) {
    var story = req.body;
    story.username = req.user.name;
    context.Stories.addStory(req.body).then(function () {
        res.send(200, 'added story');
    }, function (reason) {
        res.send(500, { mesage: 'addStoryError', error: reason });
    });
});
app.post('/addcycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    cycle.username = req.user.name;
    context.Stories.addCycle(cycle).then(function () {
        delete lockedStories[cycle.story];
        res.send(200, 'added cycle');
        socket.getIO().sockets.emit('refreshStory', { id: cycle.story });
    }, function (reason) {
        res.send(500, { message: 'addCycleError', error: reason });
    });
    res.send(500, { mesage: 'storyLockedError' });
});
var lockedStories = {};
app.post('/lock', auth.isAuthenticated, function (req, res) {
    if (lockedStories[req.body.id])
        res.send(500, 'storyLockedError');
    else {
        lockedStories[req.body.id] = { user: req.user.name };
        socket.getIO().sockets.emit('refreshStory', { id: req.body.id });
        res.send(200, 'soryLockedSuccess');
    }
});
app.post('/canceledit', auth.isAuthenticated, function (req, res) {
    delete lockedStories[req.body.id];
    res.send(200, 'cancelled edit');
    socket.getIO().sockets.emit('refreshStory', { id: req.body.id });
});
setTimeout(function () {
    socket.getIO().sockets.on('connection', function (client) {
        client.on('draftChanged', function (draft) {
            socket.getIO().sockets.emit('updateDraft', draft);
        });
    });
}, 500);
module.exports = app;
//# sourceMappingURL=stories.js.map
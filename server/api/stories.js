"use strict";
var express = require('express');
var context = require('../dal/context');
var auth = require('./authentication');
var socket = require('../socket/socket');
var app = express();
var lockedStories = {};
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
        if (story.deleted) {
            res.send(500, { message: 'storyDeletedError' });
        }
        else {
            story.isLockedBy = lockedStories[story.id] ? lockedStories[story.id].user : null;
            res.json(story);
        }
    }, function (reason) {
        res.send(500, { message: 'getStoriesByIdError', error: reason });
    });
});
app.post('/addstory', auth.isAuthenticated, function (req, res) {
    var story = req.body;
    story.username = req.user.name;
    context.Stories.addStory(story).then(function () {
        res.send(200, 'added story');
    }, function (reason) {
        res.send(500, { mesage: 'addStoryError', error: reason });
    });
});
app.post('/deletestory', auth.isAdmin, function (req, res) {
    context.Stories.deleteStory(req.body).then(function () {
        res.send(200, 'deleted story');
    }, function (reason) {
        res.send(500, { mesage: 'deleteStoryError', error: reason });
    });
});
app.post('/undeletestory', auth.isAdmin, function (req, res) {
    context.Stories.undeleteStory(req.body).then(function () {
        res.send(200, 'undeleted story');
    }, function (reason) {
        res.send(500, { mesage: 'undeleteStoryError', error: reason });
    });
});
app.post('/finaldeletestory', auth.isAdmin, function (req, res) {
    context.Stories.finalDeleteStory(req.body).then(function () {
        res.send(200, 'final deleted story');
    }, function (reason) {
        res.send(500, { mesage: 'finalDeleteStoryError', error: reason });
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
});
app.post('/changecycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    context.Stories.changeCycle(cycle).then(function () {
        delete lockedStories[cycle.story];
        res.send(200, 'changed cycle');
        socket.getIO().sockets.emit('refreshStory', { id: cycle.story });
    }, function (reason) {
        res.send(500, { message: 'changeCycleError', error: reason });
    });
});
app.post('/deletecycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    context.Stories.deleteCycle(cycle).then(function () {
        delete lockedStories[cycle.story];
        res.send(200, 'deleted cycle');
        socket.getIO().sockets.emit('refreshStory', { id: cycle.story });
    }, function (reason) {
        res.send(500, { message: 'deleteCycleError', error: reason });
    });
});
app.post('/lock', auth.isAuthenticated, function (req, res) {
    if (lockedStories[req.body.id])
        res.send(500, 'storyLockedError');
    else {
        lockedStories[req.body.id] = { user: req.user.name };
        socket.getIO().sockets.emit('refreshStory', { id: req.body.id });
        res.send(200, 'storyLockedSuccess');
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
/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../dal/context');
import auth = require('./authentication');
import Story = require('../models/story');
import socket = require('../socket/socket');

var app = express();

app.all('/*', function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/getstories', function (req, res) {
    context.Stories.getStories().then((stories) => {
        res.json(stories);
    }, (reason) => {
        res.send(500, { message: 'error', error: reason });
    });
});

app.get('/getstorybyid', function (req, res) {
    context.Stories.getStoryById(req.query.id).then((story) => {
        story.isLockedBy = lockedStories[story.id] ? lockedStories[story.id].user : null;
        res.json(story);
    });
});

app.post('/addstory', auth.isAuthenticated, function(req, res) {
    var story = req.body;
    story.username = req.user.name;
    context.Stories.addStory(req.body).then(() => {
        res.send(200, 'added story');
    }, (reason) => {
        res.send(500, { mesage: 'error while adding story', error: reason });
    });
});

app.post('/addcycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    cycle.username = req.user.name;
    context.Stories.addCycle(cycle).then(() => {
        delete lockedStories[cycle.story];
        res.send(200, 'added cycle');
        socket.getIO().sockets.emit('refreshStory', { id: cycle.story });
    }, (reason) => {
        res.send(500, { message: 'error while adding cycle', error: reason });
    });
});

var lockedStories = {};
app.post('/lock', auth.isAuthenticated, function (req, res) {
    if (lockedStories[req.body.id])
        res.send(500, 'story is already locked');
    else {
        lockedStories[req.body.id] = { user: req.user.name };
        socket.getIO().sockets.emit('refreshStory', { id: req.body.id });
        res.send(200, 'story locked');
    }
});

export = app;
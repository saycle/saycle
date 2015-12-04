/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../dal/context');
import auth = require('./authentication');
import Story = require('../models/story');
import socket = require('../socket/socket');

var app = express();

app.get('/getstories', function (req, res) {
    context.Stories.getStories().then((stories) => {
        res.json(stories);
    }, (reason) => {
        res.send(500, { message: 'error', error: reason });
    });
});

app.get('/getstorybyid', function (req, res) {
    context.Stories.getStoryById(req.query.id).then((story) => {
        res.json(story);
    });
});

app.post('/addcycle', auth.isAuthenticated, function (req, res) {
    var cycle = req.body;
    cycle.username = req.user.name;
    context.Stories.addCycle(cycle).then(() => {
        res.send(200, 'added cycle');
        socket.getIO().sockets.emit('refreshStory', { id: cycle.story });
    }, (reason) => {
        res.send(500, { message: 'error while adding cycle', error: reason });
    });
});

export = app;
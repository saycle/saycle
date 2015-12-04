/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../dal/context');
import auth = require('./authentication');
import Story = require('../models/story');

var app = express();

app.get('/getstories', function (req, res) {
    context.Stories.getStories().then((stories) => {
        res.json(stories);
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
    }, () => {
        res.send(500, 'error while adding cycle');
    });
});

export = app;
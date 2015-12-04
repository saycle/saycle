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

export = app;
/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var context = require('../dal/context');
var app = express();
app.get('/getstories', function (req, res) {
    context.Stories.getStories().then(function (stories) {
        res.json(stories);
    });
});
module.exports = app;
//# sourceMappingURL=stories.js.map
/// <reference path="../Scripts/typings/express/express.d.ts" />
import express = require('express');
import context = require('../DAL/Context');
import auth = require('./authentication');

var router: any = new express.Router();

//app.post('/register',
router.get('/getcurrentuser', auth.isAuthenticated, function (req, res) {
    res.json({ name: "Server name" });
});

export = router;
/// <reference path="../Scripts/typings/express/express.d.ts" />
var express = require('express');
var auth = require('./authentication');
var router = new express.Router();
//app.post('/register',
router.get('/getcurrentuser', auth.isAuthenticated, function (req, res) {
    res.json({ name: "Server name" });
});
module.exports = router;
//# sourceMappingURL=Users.js.map
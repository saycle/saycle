var User = require('../models/User');
var RunQuery = require('./RunQuery');
var UserController = (function () {
    function UserController() {
    }
    UserController.getUsers = function () {
        return RunQuery.runQuery("SELECT * FROM users", []);
    };
    ;
    UserController.getUserByMail = function (email) {
        return RunQuery.runQuery("SELECT * FROM users WHERE email = $1", [email]).then(function (user) {
            return new User(user.rows[0]);
        });
    };
    ;
    UserController.addUser = function (user) {
        return RunQuery.runQuery("INSERT INTO users (name, password, verified, email) VALUES ($1, $2, $3, $4)", [user.name, "", user.verified, user.email]);
    };
    ;
    UserController.verifyUser = function (user) {
        return RunQuery.runQuery("UPDATE users SET verified = 1 WHERE email = $1", [user.email]);
    };
    ;
    return UserController;
})();
module.exports = UserController;
//# sourceMappingURL=UserController.js.map
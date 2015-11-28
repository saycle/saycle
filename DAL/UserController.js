var RunQuery = require('./RunQuery');
var UserController = (function () {
    function UserController() {
    }
    UserController.getUsers = function () {
        return RunQuery.runQuery("SELECT * FROM users", []);
    };
    ;
    UserController.getUserByName = function (name) {
        return RunQuery.runQuery("SELECT * FROM users WHERE name = $1", [name]);
    };
    ;
    UserController.addUser = function (user) {
        return RunQuery.runQuery("INSERT INTO users (name, password, verified, email) VALUES ($1, $2, $3, $4)", [user.name, user.password, user.verified, user.email]);
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
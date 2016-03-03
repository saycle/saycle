var User = require('../models/user');
var RunQuery = require('./runquery');
var UserController = (function () {
    function UserController() {
    }
    UserController.getUsers = function () {
        return RunQuery.runQuery("SELECT * FROM users", []);
    };
    ;
    UserController.getRankedUsers = function () {
        return RunQuery.runQuery('SELECT storymostrecent.name "username", SUM(storylengths.length) "charCount", storymostrecent.story "recentStoryId", stories.title "recentStoryTitle" ' +
            'FROM (SELECT name, LENGTH(text) "length" FROM users LEFT JOIN cycles ON users.name = cycles.username) AS storylengths ' +
            'INNER JOIN (SELECT name, story ' +
            'FROM users LEFT JOIN cycles ON users.name = cycles.username WHERE cycles.date = (SELECT max(date) FROM cycles WHERE cycles.username = users.name)) AS storymostrecent ' +
            'ON storymostrecent.name = storylengths.name ' +
            'INNER JOIN stories ON storymostrecent.story = stories.id ' +
            'GROUP BY storylengths.name, storymostrecent.name, storymostrecent.story, stories.title ORDER BY SUM(storylengths.length) DESC;', []).then(function (result) {
            return result.rows;
        });
        ;
    };
    ;
    UserController.getUserByMail = function (email) {
        return RunQuery.runQuery("SELECT * FROM users WHERE email = $1", [email]).then(function (user) {
            if (user.rows.length > 0)
                return new User(user.rows[0]);
            return null;
        });
    };
    ;
    UserController.addUser = function (user) {
        user.setPassword(user.password); // This will encrypt the password which is plain-text until here
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
//# sourceMappingURL=usercontroller.js.map
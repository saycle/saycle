import User = require('../models/User');
import RunQuery = require('./RunQuery');
import Q = require('q');

class UserController {

    static getUsers(): Q.Promise<User[]> {
        return RunQuery.runQuery("SELECT * FROM users", []);
    };

    static getUserByName(name: string): Q.Promise<User> {
        return RunQuery.runQuery("SELECT * FROM users WHERE name = $1", [name]);
    };

    static addUser(user: User): Q.Promise<any> {
        return RunQuery.runQuery("INSERT INTO users (name, password, verified, email) VALUES ($1, $2, $3, $4)",
            [user.name, user.password, user.verified, user.email])
    };

    static verifyUser(user: User) {
        return RunQuery.runQuery("UPDATE users SET verified = 1 WHERE email = $1",
            [user.email]);
    };

}

export = UserController;
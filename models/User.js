var bcrypt = require('bcrypt-node');
var User = (function () {
    function User(userObj) {
        this.name = userObj.name;
        this.password = userObj.password;
        this.verified = userObj.verified;
        this.email = userObj.email;
    }
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    ;
    User.prototype.setPassword = function (password) {
        throw "Error: not implemented yet";
    };
    return User;
})();
module.exports = User;
//# sourceMappingURL=User.js.map
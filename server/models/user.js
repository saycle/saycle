var bcrypt = require('bcrypt-node');
var User = (function () {
    function User(userObj) {
        if (userObj == null)
            return;
        this.name = userObj.name;
        this.password = userObj.password;
        this.verified = userObj.verified;
        this.email = userObj.email;
        this.isadmin = userObj.isadmin;
    }
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    ;
    User.prototype.setPassword = function (password) {
        this.password = bcrypt.hashSync(password);
    };
    ;
    return User;
})();
module.exports = User;
//# sourceMappingURL=user.js.map
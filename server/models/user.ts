var bcrypt = require('bcrypt-node');

class User {
    constructor(userObj: any) {
        if (userObj == null)
            return;

        this.name = userObj.name;
        this.password = userObj.password;
        this.verified = userObj.verified;
        this.email = userObj.email;
        this.isAdmin = userObj.isAdmin;
    }
    name: string;
    password: string;
    verified: boolean;
    email: string;
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    };
    setPassword(password) {
        this.password = bcrypt.hashSync(password);
    };
    isAdmin: boolean;
}

export = User;
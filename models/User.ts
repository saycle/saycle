var bcrypt = require('bcrypt-node');

class User {
    constructor(userObj: any) {
        this.name = userObj.name;
        this.password = userObj.password;
        this.verified = userObj.verified;
        this.email = userObj.email;
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
    }
}

export = User;
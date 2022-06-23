let dbhandler = require("../db/dbhandler")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

function Accounts()
{
    this.accs = new Map();

    this.getAccounts = function() {
        return this.accs;
    }

}

Accounts.prototype.insert = function(obj) {
    this.getAccounts().set(obj.id, obj);
};

Accounts.prototype.exists = function(id) {
    if (this.getAccounts().get(id))
        return true;

    return false;
};

Accounts.prototype.get = function(id) {
    return this.getAccounts().get(id);
};


class Account {

    constructor(_id, username)
    {
        this._id = _id;
        this.username = username;
    }

    static login(username, password, token) {

        if (token)
            return "LOGIN_ALREADY_LOGGED_IN"

        dbhandler.colAccounts.find({username: username.toLowerCase()}).limit(1).toArray((err, data) => {

            if (err || data.length === 0) {
                console.log("Got lookup user ERROR");
                console.log(err);
                console.log("Acc doesnt exists!");
                return "LOGIN_ACCOUNT_NOT_FOUND"
            }
            if (data) {
                console.log("Got login user FOUND");
                console.log(data);

                bcrypt.compare(password, data[0].password, function (err, res) {
                    if (res) {
                        console.log("Acc exists!");


                        if (!Accounts.exists(data[0]._id)) {
                            Accounts.insert(new Account(data[0]._id, data[0].username))
                        }

                    } else {
                        console.log("Acc doesnt exist!");
                        return "LOGIN_ACCOUNT_NOT_FOUND"
                    }
                });
            }

        });
    }
}
let dbhandler = require("../db/dbhandler")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


let accs = new Accounts()

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

    static async login(username, password, token) {

        if (token)
            return "LOGIN_ALREADY_LOGGED_IN"

        console.log(dbhandler)
        let data = await dbhandler.cols.list.colAccounts.find({username: username.toLowerCase()}).limit(1).toArray()

        if (!data) {
            console.log("Acc doesnt exists!");
            return "LOGIN_ACCOUNT_NOT_FOUND"
        }

        console.log("Login: user FOUND");
        console.log(data);

        return await new Promise((resolve, rej) => {
            bcrypt.compare(password, data[0].password, function (err, res) {
                if (res) {
                    console.log("Password matches!");


                    if (!accs.exists(data[0]._id)) {
                        accs.insert(new Accounts(data[0]._id, data[0].username))
                    }

                    return resolve({
                        token: data[0].token,
                        username: data[0].username
                    })

                } else {
                    console.log("Passwords dont match!");
                    return resolve("LOGIN_ACCOUNT_NOT_FOUND")
                }
            });
        } )

    }
}

module.exports = {Account, Accounts}
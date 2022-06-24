let dbhandler = require("../db/dbhandler")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Config = require("../Config.json");


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

const SECRET_KEY = Config.SECRET_KEY;

class Account {

    constructor(_id, username)
    {
        this._id = _id;
        this.username = username;
    }

    /*** ACCOUNT LOGIN ***/
    static async login(unameOrEmail, password, token) {

        if (token)
            return "LOGIN_ALREADY_LOGGED_IN"

        let data = await dbhandler.cols.list.colAccounts.findOne({username: unameOrEmail.toLowerCase()})

        if (!data) {
            data = await dbhandler.cols.list.colAccounts.findOne({email: unameOrEmail.toLowerCase()})
            if (!data) {
                console.log("Acc doesnt exist!");
                return "LOGIN_ACCOUNT_NOT_FOUND"
            }
        }

        console.log("Login: user FOUND");
        console.log(data);

        return await new Promise((resolve, rej) => {
            bcrypt.compare(password, data.password, function (err, res) {
                if (res) {
                    console.log("Password matches!");


                    if (!accs.exists(data._id)) {
                        accs.insert(new Accounts(data._id, data.username))
                    }

                    return resolve({
                        token: data.token,
                        username: data.username
                    })

                } else {
                    console.log("Passwords dont match!");
                    return resolve("LOGIN_ACCOUNT_NOT_FOUND")
                }
            });
        } )

    }

    /*** ACCOUNT REGISTRATION ***/
    static async register(username, password, email) {

        let data = await dbhandler.cols.list.colAccounts.findOne({
            username: username
        })

        // *** ALL RETURN VALUS: (as string) ***:
        // ACCOUNT_NOTFOUND
        // ACCOUNT_USERNAME_UNAVAILABLE
        // ACCOUNT_CREATION_OK
        // ACCOUNT_CREATION_ERROR


        if (data) {
            console.log("Username is unavailable");
            return "ACCOUNT_USERNAME_UNAVAILABLE"
        }


        data = await dbhandler.cols.list.colAccounts.findOne({
            email: email
        })

        if (data) {
            console.log("Username is unavailable");
            return "ACCOUNT_EMAIL_ALREADY_REGISTERED"
        }

        let nid = 0;

        data = await dbhandler.cols.list.colAccounts.find().sort({
            _id: -1
        }).limit(1).toArray()

        if (!data) {
            console.log("Got error with latest ID");
            nid = 1;
            // return "ACCOUNT_CREATION_ERROR"
        } else {
            console.log("Got latest ID:");
            console.log(data);
            nid = data[0]._id + 1;
        }

        return new Promise((resolve, reject) => {
            //hashing is async
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    return resolve("ACCOUNT_CREATION_ERROR")
                }

                let expy = Date.now() + 3600 * 24 * 365;
                let user = {
                    _id: nid,
                    exp: expy
                };
                let ntoken = jwt.sign(user, SECRET_KEY);

                let respy = {
                    resp: 'success',
                    username: username,
                    token: ntoken
                };
                console.log("Sending resp");
                console.log(respy);

                dbhandler.cols.list.colAccounts.insertOne({
                    _id: nid,
                    username: username,
                    email: email,
                    password: hash,
                    token: ntoken,
                });

                return resolve({resp: "ACCOUNT_CREATION_OK", data: respy})
            });
        })
    }
}

module.exports = {Account, Accounts}
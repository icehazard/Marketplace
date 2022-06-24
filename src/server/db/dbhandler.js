let Config = require('../Config.json');
const MongoPool = require("./MongoDB");
let mongo = { db: null }
let serverConfig = require('./table_names')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

let cols = { list: {} }
let colAccounts

MongoPool.getInstance(function (db) {
    mongo.db = db.db(Config.MONGO_DB);
    colAccounts = mongo.db.collection(serverConfig.COLLECTION_ACCOUNTS)
    cols.list.colAccounts = colAccounts
});

var SECRET_KEY = Config.SECRET_KEY;



module.exports = { mongo, cols }

module.exports.register = async function (username, password, email) {

    let data = await colAccounts.findOne({
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


    let nid = 0;

    data = await colAccounts.find().sort({
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

            colAccounts.insertOne({
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



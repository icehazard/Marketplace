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

module.exports = { mongo, cols }


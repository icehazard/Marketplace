let Config = require('../Config.json');
const MongoPool = require("./MongoDB");
let mongo = { db: null }
let serverConfig = require('./table_names')

let cols = { list: {} }
let colAccounts;
let colShops;

MongoPool.getInstance(function (db) {
    mongo.db = db.db(Config.MONGO_DB);

    colAccounts = mongo.db.collection(serverConfig.COLLECTION_ACCOUNTS)
    cols.list.colAccounts = colAccounts

    colShops = mongo.db.collection(serverConfig.COLLECTION_SHOPS)
    cols.list.colShops = colShops
});

module.exports = { mongo, cols }


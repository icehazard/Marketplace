let Config = require('../Config.json');
const MongoPool = require("./MongoDB");
let mongo = { db: null }
let serverConfig = require('./table_names')

let cols = { list: {} }

MongoPool.getInstance(function (db) {
    mongo.db = db.db(Config.MONGO_DB);

    cols.list.colAccounts = mongo.db.collection(serverConfig.COLLECTION_ACCOUNTS)
    cols.list.colShops = mongo.db.collection(serverConfig.COLLECTION_SHOPS)
    cols.list.colProducts = mongo.db.collection(serverConfig.COLLECTION_PRODUCTS)
    cols.list.colRoles = mongo.db.collection(serverConfig.COLLECTION_ROLES)
    cols.list.colAddress = mongo.db.collection(serverConfig.COLLECTION_ADDRESS)

});

module.exports = { mongo, cols }


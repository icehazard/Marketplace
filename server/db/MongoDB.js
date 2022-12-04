let Config = require('../Config.json');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
// let bluebird = require('bluebird');
//
// bluebird.promisifyAll(MongoDB);

if (Config.MONGO_ON_SAME_HOST)
    Config.MONGO_HOST = '127.0.0.1';
var url;

if (Config.customStr) {
    url = Config.customStr;
}
else url = 'mongodb://'+Config.MONGO_USERNAME+':'+Config.MONGO_PW+'@'+Config.MONGO_HOST+':'+Config.MONGO_PORT+'/'+Config.MONGO_DB;
console.log('debug', 'MongoDB Connecting to '+url);
option = { maxPoolSize : 2, wtimeoutMS: 30000, useNewUrlParser: true };

function MongoPool(){}

var p_db;

function initPool(cb){
    MongoClient.connect(url, option, function(err, db) {
        if (err) throw err;

        p_db = db;

        if(cb && typeof(cb) == 'function')
            cb(p_db);
    });
    return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb){
    if(!p_db){
        initPool(cb)
    }
    else{
        if(cb && typeof(cb) == 'function')
            cb(p_db);
    }
}

function getConnection(){
    return p_db;
}

MongoPool.getConnection = getConnection;
MongoPool.getInstance = getInstance;

module.exports = MongoPool;

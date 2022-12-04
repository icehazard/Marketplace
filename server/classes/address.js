let dbhandler = require("../db/dbhandler")
const HdAddGen = require('hdaddressgenerator')
let accountHandler = require("./accounts")
const Config = require("../Config.json")
let addresses = new Addresses()

function Addresses()
{
    this.addresses = new Map();
    this.addressesByKeyId = new Map();
    this.mnemonic = Config.WALLET_MNEMONIC;

    this.getAddresses = function() {
        return this.addresses;
    }
    this.getAddressesByKeyId = function() {
        return this.addressesByKeyId;
    }
}

Addresses.prototype.set = function(obj) {
    this.getAddresses().set(obj._id, obj)
    this.getAddressesByKeyId().set(obj.keyId, obj)
};

Addresses.prototype.get = function(id) {
    return this.getAddresses().get(id);
};

Addresses.prototype.hasByKeyId = function(id) {
    return this.getAddressesByKeyId().has(id);
};


Addresses.prototype.getByKeyId = function(id) {
    return this.getAddressesByKeyId().get(id);
};


Addresses.prototype.has = function(id) {
    return this.getAddresses().has(id);
};

Addresses.prototype.delete = function(obj) {
    if (!this.getAddresses().has(obj._id))
        return;

    this.getAddresses().get(obj._id).deleteFromDB();
    this.getAddresses().delete(obj._id)
    this.getAddressesByKeyId().delete(obj._id)
};

Addresses.prototype.loadFromDB = async function() {
    let data = await dbhandler.cols.list.colAddress.find({}).toArray()

    for (let addr of data)
        if (!this.getAddresses().has(addr._id)) {
            let a = new Address(addr._id, addr)
            this.getAddresses().set(addr._id, a)
            this.getAddressesByKeyId().set(addr.keyId, a)
            if (accountHandler.Accounts.has(addr.ownerID))
            {
                let acc = accountHandler.Accounts.getAccounts().get(addr.ownerID)
                acc.addresses.get(addr.symbol).set(addr._id, a)
            }
            else
                console.log("Acchandler doesnt have ownerID", addr.ownerID)
        }

    console.log(`*** Loaded ${this.getAddresses().size} Addresses!`)
};

class Address {

    constructor(_id, data)
    {
        this._id = _id;
        this.ownerID = data.ownerID
        this.symbol = data.symbol;  //symbol is e.g BTC
        this.keyId = data.keyId;
    }

    async saveToDB() {
        //dont need await
        let exists = await dbhandler.cols.list.colAddress.findOne({_id: this._id})
        if (exists)
        {
            dbhandler.cols.list.colAddress.insertOne({_id: this._id,
                ownerID: this.ownerID, symbol: this.symbol, keyId: this.keyId, t: new Date()})
        }
        else
            dbhandler.cols.list.colAddress.updateOne({_id: this._id},
                {$set: {ownerID: this.ownerID, symbol: this.symbol, keyId: this.keyId}}, {upsert: true})
    }

    async getPrivKey() {
        // console.log("Checking for symbol", this.symbol)
        let bip84 = HdAddGen.withMnemonic(addresses.mnemonic,false, this.symbol, false, 84)
        let addressesx = await bip84.generate(1, this.keyId)

        // console.log(addressesx)

        if (!addressesx.length)
            return false

        return addressesx[0].privKey
    }
}

module.exports = {Address, Addresses: addresses}
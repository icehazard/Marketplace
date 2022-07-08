let dbhandler = require("../db/dbhandler")

let addresses = new Addresses()

function Addresses()
{
    this.addresses = new Map();

    this.getAddresses = function() {
        return this.addresses;
    }
}

Addresses.prototype.insert = function(obj) {
    this.getAddresses().set(obj._id, obj)
};

Addresses.prototype.exists = function(id) {
    if (this.getAddresses().get(id))
        return true;

    return false;
};

Addresses.prototype.get = function(id) {
    return this.getAddresses().get(id);
};

Addresses.prototype.has = function(id) {
    return this.getAddresses().has(id);
};

Addresses.prototype.delete = function(id) {
    this.getAddresses().get(id).deleteFromDB();
    this.getAddresses().delete(id)
};

Addresses.prototype.loadFromDB = async function(id) {
    // let data = await dbhandler.cols.list.colAddresses.find({}).toArray()
    //
    // for (let p of data)
    //     if (!this.getAddresses().has(p._id))
    //         this.getAddresses().set(p._id, new Product(p._id, p))
    //
    // console.log(`*** Loaded ${this.getAddresses().size} Addresses!`)
};

class Address {

    constructor(_id, data, symbol)
    {
        this._id = _id;
        this.ownerID = data.ownerID
        this.symbol = symbol;  //symbol is e.g BTC
    }
}

module.exports = {Address, Addresses: addresses}
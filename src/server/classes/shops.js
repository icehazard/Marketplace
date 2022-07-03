let dbhandler = require("../db/dbhandler")

let items = new Shops()

function Shops()
{
    this.items = new Map();

    this.getItems = function() {
        return this.items;
    }

}

Shops.prototype.insert = function(obj) {
    this.getItems().set(obj._id, obj);
};

Shops.prototype.exists = function(id) {
    if (this.getItems().get(id))
        return true;

    return false;
};

Shops.prototype.get = function(id) {
    return this.getItems().get(id);
};

class Shop {

    constructor(_id, data)
    {
        this._id = _id;
        this.name = data.name;
        this.type = data.type;
        this.ownerID = data.ownerID;
        this.address = data.address;
        this.nameBankAccount = data.nameBankAccount;
        this.bankName = data.bankName;
        this.BankAccountNumber = data.BankAccountNumber;
    }

    static async postShop(userID, payload)
    {
        let nid = 0;

        let data = await dbhandler.cols.list.colShops.find().sort({
            _id: -1
        }).limit(1).toArray()

        if (!data || !data.length) {
            console.log("Got error with getting Shop latest ID");
            nid = 1;
            // return "ACCOUNT_CREATION_ERROR"
        } else {
            console.log("Got Shop latest ID:");
            console.log(data);
            nid = data[0]._id + 1;
        }

        payload._id = nid;
        payload.status = 0;

        items.insert(new Shops(userID, payload))
        //let result =  await dbhandler.cols.list.colShops.findOne({name : 'name'})
        let result =  await dbhandler.cols.list.colShops.insertOne(payload)
        console.log("🚀 result", result)
    }

    static async getShopsByUserId(uid)
    {
        let data = await dbhandler.cols.list.colShops.find({ownerID: uid}).toArray()

        if (!data || !data.length)
            return


        return data.map(i => {return {"_id": i._id, "status": i.status || 0}});
    }
}

module.exports = {Shop, Shops}
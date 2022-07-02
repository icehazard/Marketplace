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
    this.getItems().set(obj.id, obj);
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

    static async postShop(userID, data) {

     items.insert(new Shops(userID, data))
     
        let result =  await dbhandler.cols.list.colShops.findOne({name : 'name'})
        console.log("🚀 result", result)
    }
}

module.exports = {Shop, Shops}
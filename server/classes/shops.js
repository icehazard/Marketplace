let dbhandler = require("../db/dbhandler")
let productHandler = require("./products")

let shops = new Shops()

function Shops() {
    this.shops = new Map();
    this.shopsByOwner = new Map();

    this.getShops = function () {
        return this.shops;
    }

    this.getShopsByOwner = function () {
        return this.shopsByOwner;
    }
}

Shops.prototype.insert = function (obj) {
    this.getShops().set(obj._id, obj)
    this.getShopsByOwner().set(obj.ownerID, obj)
};

Shops.prototype.exists = function (id) {
    if (this.getShops().get(id))
        return true;

    return false;
};

Shops.prototype.get = function (id) {
    return this.getShops().get(id);
};

Shops.prototype.has = function (id) {
    return this.getShops().has(id);
};
Shops.prototype.getShopsForApproval = function () {
    let final = []
   
    for (let x of this.shops.values()) {
        if (x.status == 0) final.push(x)
    }
    return final
};
Shops.prototype.getShopByOwnerId = function (oid) {
    console.log(this.getShopsByOwner())
    console.log("oid is", oid)
    return this.getShopsByOwner().get(oid);
};

Shops.prototype.loadFromDB = async function (id) {
    let data = await dbhandler.cols.list.colShops.find({}).toArray()

    for (let shop of data) {
        if (!this.getShops().has(shop._id)) {
            this.insert(new Shop(shop._id, shop))
        }
    }

    console.log(`*** Loaded ${this.getShops().size} shops!`)
};

// console.log(shopHandler.Shops)
// let shopProducts = shopHandler.Shops.get(p.shopID).products

// for (let p of data)
//     if (!shopProducts.has(p._id))
//         shopProducts.set(p._id, new Product(p._id, p))

Shops.prototype.loadProductsIntoShops = async function (id) {
    let data = await dbhandler.cols.list.colShops.find({}).toArray()

    for (let [k, v] of productHandler.Products.products) {
        if (!this.getShops().has(v.shopID)) {
            console.log(`Shop with ID ${v.shopID} not found while trying to load products into!`);
            continue;
        }

        this.getShops().get(v.shopID).products.set(k, v)
        console.log(`*** Loaded products!`)
    }

};

class Shop {

    constructor(_id, data) {
        this._id = _id;
        this.shopName = data.shopName;
        this.shopType = data.shopType;
        this.ownerID = data.ownerID;
        this.address = data.address;
        this.paymentMask = data.paymentMask;
        this.nameBankAccount = data.nameBankAccount;
        this.bankName = data.bankName;
        this.BankAccountNumber = data.BankAccountNumber;
        this.products = new Map();
        this.description = data.description || null;
        this.cover = data.cover || null;
        this.profile = data.profile || null;
        this.status = data.status
    }

    static async postShop(userID, payload) {
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

        shops.insert(new Shops(userID, payload))
        //let result =  await dbhandler.cols.list.colShops.findOne({name : 'name'})
        let result = await dbhandler.cols.list.colShops.insertOne(payload)
        console.log("🚀 result", result)
    }

    getProductList(onlyActive = false) {
        let res = []

        for (let [k, v] of this.products) {
            if (onlyActive && v.status != 1)
                continue;

            let shop = shops.get(v.shopID);
            v.shopName = shop.shopName
            res.push(v)
        }
        return res
    }
    async addProduct(payload) {
        let nid = 0;

        let data = await dbhandler.cols.list.colProducts.find().sort({
            _id: -1
        }).limit(1).toArray()

        if (!data || !data.length) {
            console.log("Got error with getting product latest ID");
            nid = 1;
            // return "ACCOUNT_CREATION_ERROR"
        } else {
            console.log("Got product latest ID:");
            console.log(data);
            nid = data[0]._id + 1;
        }

        payload._id = nid;
        payload.shopID = this._id;

        let pobj = new productHandler.Product(nid, payload)
        productHandler.Products.insert(pobj)
        this.products.set(nid, pobj)
        pobj.saveToDB()
        return { status: "ok", nid }
    }

    editShop(data) {
        //validate
        if (data.shopName && data.shopName.length >= 40)
            return { status: "error", error: "Shop name is too long, please try again!" }

        if (data.description && data.description.length >= 100)
            return { status: "error", error: "Shop name is too long, please try again!" }

        if (data.shopName)
            this.shopName = data.shopName;
        if (data.description)
            this.description = data.description;
        if (data.address)
            this.address = data.address;
        if (data.nameBankAccount)
            this.nameBankAccount = data.nameBankAccount;
        if (data.bankName)
            this.bankName = data.bankName;
        if (data.BankAccountNumber)
            this.BankAccountNumber = data.BankAccountNumber;
        if (data.shipping)
            this.shipping = data.shipping;
        if (data.paymentMask)
            this.paymentMask = data.paymentMask;


        this.saveToDB();
        return true;
    }

    editAlbum(type, file) {
        if (type === "cover")
            this.cover = file;
        else if (type === "profile")
            this.profile = file;
        else
            return false;

        this.saveToDB();
        return true;
    }

    async saveToDB() {
        dbhandler.cols.list.colShops.updateOne({ _id: this._id }, {
            $set: {
                shopName: this.shopName, address: this.address, paymentMask: this.paymentMask,
                nameBankAccount: this.nameBankAccount, bankName: this.bankName, BankAccountNumber: this.BankAccountNumber,
                cover: this.cover, profile: this.profile, description: this.description, shipping: this.shipping, status: this.status
            }
        })
    }

    async editProduct(pid, payload) {
        console.log("LOgging edit", pid, payload)
        if (this.products.has(pid)) {
            let p = this.products.get(pid)
            return p.editProduct(this.ownerID, pid, payload)
        }
        return { status: "error", error: "Shop does not contain this product!" }
    }

    async approveShop() {
        this.status = 1;
        this.saveToDB()
    }

    async deleteProduct(pid) {
        if (this.products.has(pid)) {
            //delete from db first then from shop's memory, doesnt need await
            this.products.get(pid).deleteFromDB()
            this.products.delete(pid)
            return { status: "ok" }
        }
        return { status: "error", error: "Couldn't find product in the Shop's list" }
    }

    static async getShopsByUserId(uid) {
        let data = await dbhandler.cols.list.colShops.find({ ownerID: uid }).toArray()

        if (!data || !data.length)
            return


        return data.map(i => { return { "_id": i._id, "status": i.status || 0 } });
    }
}

module.exports = { Shop, Shops: shops }
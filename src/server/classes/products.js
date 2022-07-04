let dbhandler = require("../db/dbhandler")

let products = new Products()

function Products()
{
    this.products = new Map();

    this.getProducts = function() {
        return this.products;
    }
}

Products.prototype.insert = function(obj) {
    this.getProducts().set(obj._id, obj)
};

Products.prototype.exists = function(id) {
    if (this.getProducts().get(id))
        return true;

    return false;
};

Products.prototype.get = function(id) {
    return this.getProducts().get(id);
};

Products.prototype.has = function(id) {
    return this.getProducts().has(id);
};

Products.prototype.delete = function(id) {
    this.getProducts().get(id).deleteFromDB();
    this.getProducts().delete(id)
};



Products.prototype.loadFromDB = async function(id) {
    let data = await dbhandler.cols.list.colProducts.find({}).toArray()

    for (let p of data)
        if (!this.getProducts().has(p._id))
            this.getProducts().set(p._id, new Product(p._id, p))

    console.log(`*** Loaded ${this.getProducts().size} products!`)
};

class Product {

    constructor(_id, data)
    {
        this._id = _id;
        this.name = data.name;
        this.desc = data.desc;
        this.imageURL = data.imageURL;
        this.shopID = data.shopID;
        this.price = data.price;
        this.qty = data.qty;
    }

    async saveToDB() {
        //dont need await
        dbhandler.cols.list.colProducts.updateOne({_id: this._id}, {$set: {name: this.name, desc: this.desc,
                imageURL: this.imageURL, shopID: this.shopID}}, {upsert: true})
    }

    async deleteFromDB() {
        //dont need await
        dbhandler.cols.list.colProducts.deleteOne({_id: this._id})
    }

    async editProduct(ownerID, pid, payload)
    {
        if (!products.has(pid))
            return {status: "error", error: `Cant find product with ID ${pid}`}

        let pobj = products.get(pid)
        //
        // if (pobj.ownerID != ownerID)
        //     return {status: "error", error: "You do not have permission to edit this product!"}

        //check if owns that product
        if (payload.desc)
            pobj.desc = payload.desc
        if (payload.imageURL)
            pobj.imageURL = payload.imageURL
        if (payload.name)
            pobj.name = payload.name

        pobj.saveToDB()
        return {status: "ok"}
    }
}

module.exports = {Product, Products: products}
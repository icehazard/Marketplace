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
        this.shopID = data.shopID;
        this.price = data.price;
        this.qty = data.qty;
        this.photos = data.photos || {};
        this.status = data.status || 0;
        console.log("Status ", this.status)
    }

    async saveToDB() {
        //dont need await
        dbhandler.cols.list.colProducts.updateOne({_id: this._id}, {$set: {name: this.name, desc: this.desc,
             shopID: this.shopID, price: this.price, qty: this.qty, photos: this.photos,
                status: this.status}}, {upsert: true})
    }

    async deleteFromDB() {
        //dont need await
        dbhandler.cols.list.colProducts.deleteOne({_id: this._id})
    }

    addOrEditPhoto(index, file)
    {
        this.photos[index] = file;

        this.saveToDB();
        return true;
    }

    deletePhoto(index)
    {
        let fstr = this.photos[index]
        if (this.photos[index])
            delete this.photos[index];

        this.saveToDB();
        return fstr;
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
        if (payload.hasOwnProperty("desc"))
        {
            let parsed = String(payload.desc)
            if (parsed.length >= 150)
                return {status: "error", error: `Invalid description length!`}

            pobj.desc = parsed
        }
        if (payload.hasOwnProperty("name"))
        {
            let parsed = String(payload.name)
            if (parsed.length <= 0 || parsed.length >= 70)
                return {status: "error", error: `Invalid name length!`}

            pobj.name = parsed
        }
        if (payload.hasOwnProperty("price")) {
            let parsed = Number(payload.qty)
            if (parsed <= 0 || parsed >= 100000)
                return {status: "error", error: `Invalid price!`}

            pobj.price = parsed
        }
        if (payload.hasOwnProperty("qty")) {
            let parsed = Number(payload.qty)
            if (parsed <= 0 || parsed >= 2000)
                return {status: "error", error: `Invalid quantity!`}

            pobj.qty = parsed
        }
        if (payload.hasOwnProperty("status"))
            pobj.status = payload.status

        pobj.saveToDB()
        return {status: "ok"}
    }
}

module.exports = {Product, Products: products}
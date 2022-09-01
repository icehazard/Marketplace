let dbhandler = require("../db/dbhandler")
let productHandler = require('./products')
const accountHandler = require("./accounts")
let shopHandler = require('./shops')

let orders = new Orders()

function Orders()
{
    this.orders = new Map();

    this.getOrders = function() {
        return this.orders;
    }
}

Orders.prototype.insert = async function(payload) {
    let nid = 0;

    let data = await dbhandler.cols.list.colOrders.find().sort({
        _id: -1
    }).limit(1).toArray()

    if (!data || !data.length) {
        console.log("Got error with getting orders latest ID");
        nid = 1;
        // return "ACCOUNT_CREATION_ERROR"
    } else {
        console.log("Got orders latest ID:");
        console.log(data);
        nid = data[0]._id + 1;
    }

    payload._id = nid;
    payload.created_at = new Date();
    let orderObj = new Order(nid, payload)
    this.orders.set(nid, orderObj)
    orderObj.saveToDB();
    console.log("PUSHING NID", nid)
    accountHandler.Accounts.get(payload.uid).orders.push(nid)
   
    return {status: "ok", orderId: nid}
};

Orders.prototype.exists = function(id) {
    if (this.getOrders().get(id))
        return true;

    return false;
};

Orders.prototype.get = function(id) {
    return this.getOrders().get(id);
};

Orders.prototype.has = function(id) {
    return this.getOrders().has(id);
};

Orders.prototype.delete = function(id) {
    this.getOrders().get(id).deleteFromDB();
    this.getOrders().delete(id)
};



Orders.prototype.loadFromDB = async function(id) {
    let data = await dbhandler.cols.list.colOrders.find({}).toArray()

    for (let p of data)
        if (!this.getOrders().has(p._id)) {
            this.getOrders().set(p._id, new Order(p._id, p))

            if (accountHandler.Accounts.has(p.uid)) {
                let acc = accountHandler.Accounts.get(p.uid)
                acc.orders.push(p._id)
            }
        }

    console.log(`*** Loaded ${this.getOrders().size} orders!`)
};

class Order {

    constructor(_id, data)
    {
    
   
        let item = productHandler.Products.get(data.products[0]._id)
        this._id = _id;
        this.address = data.address;
        this.paymentType = data.paymentType;
        this.products = data.products ? data.products.map(i => {return {_id: i._id, qty: i.qty}}) : []
        this.shopId = data.shopId;
        this.uid = data.uid;
        this.created_at = data.created_at;
        this.total = data.total;
        this.shopName = shopHandler.Shops.get(data.shopId).shopName
        this.productPhoto =  Object.values(item.photos)[0] 
    }

    async saveToDB() {
        //dont need await
        dbhandler.cols.list.colOrders.updateOne({_id: this._id, address: this.address, paymentType: this.paymentType, shopName: this.shopName,
        products: this.products, shopId: this.shopId, uid: this.uid, created_at: this.created_at, total: this.total, productPhoto: this.productPhoto},
        {$set: {}}, {upsert: true})
    }

    async deleteFromDB() {
        //dont need await
        dbhandler.cols.list.colOrders.deleteOne({_id: this._id})
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
        if (!orders.has(pid))
            return {status: "error", error: `Cant find product with ID ${pid}`}

        let pobj = orders.get(pid)
        //
        // if (pobj.ownerID != ownerID)
        //     return {status: "error", error: "You do not have permission to edit this product!"}

        //check if owns that product
        if (payload.desc)
            pobj.desc = payload.desc
        if (payload.name)
            pobj.name = payload.name
        if (payload.price)
            pobj.price = payload.price
        if (payload.qty)
            pobj.qty = payload.qty
        if (payload.total)
            pobj.total = payload.total

        pobj.saveToDB()
        return {status: "ok"}
    }
}

module.exports = {Order, Orders: orders}
let dbhandler = require("../db/dbhandler")
let productHandler = require('./products')
const accountHandler = require("./accounts")
let shopHandler = require('./shops')

let chats = new Chats()

function Chats()
{
    this.chats = new Map();

    this.getChats = function() {
        return this.chats;
    }
}

Chats.prototype.insert = async function(payload) {
    let nid = 0;

    let data = await dbhandler.cols.list.colChat.find().sort({
        _id: -1
    }).limit(1).toArray()

    if (!data || !data.length) {
        console.log("Got error with getting chats latest ID");
        nid = 1;
        // return "ACCOUNT_CREATION_ERROR"
    } else {
        console.log("Got chats latest ID:");
        console.log(data);
        nid = data[0]._id + 1;
    }

    payload._id = nid;
    payload.created_at = new Date();
    let msgObj = new ChatMessage(nid, payload)
    this.chats.set(nid, msgObj)
    msgObj.saveToDB();
    console.log("PUSHING MSG NID", nid)

    return {status: "ok", orderId: nid}
};

Chats.prototype.exists = function(id) {
    if (this.getChats().get(id))
        return true;

    return false;
};

Chats.prototype.get = function(id) {
    return this.getChats().get(id);
};

Chats.prototype.has = function(id) {
    return this.getChats().has(id);
};

Chats.prototype.delete = function(id) {
    this.getChats().get(id).deleteFromDB();
    this.getChats().delete(id)
};



Chats.prototype.loadFromDB = async function(id) {
    let data = await dbhandler.cols.list.colChat.find({}).toArray()

    for (let p of data) {
        if (!this.getChats().has(p.orderId)) {
            this.getChats().set(p.orderId, [new ChatMessage(p._id, p)])
        } else
            this.getChats().get(p.orderId).push(p.orderId, [new ChatMessage(p._id, p)])
    }

    console.log(`*** Loaded ${this.getChats().size} chat messages!`)
};

Chats.prototype.getMessagesByOrderId = async function(oid) {
    if (!this.getChats().has(oid))
        return []
    else
        return this.getChats().get(p.orderId)
}

class ChatMessage {

    constructor(_id, data)
    {
        this._id = _id;
        this.msg = data.msg;
        this.senderId = data.senderId;

    }

    async saveToDB() {
        //dont need await
        dbhandler.cols.list.colChats.updateOne({_id: this._id, address: this.address, paymentType: this.paymentType, shopName: this.shopName,
        products: this.products, shopId: this.shopId, uid: this.uid, created_at: this.created_at, total: this.total, productPhoto: this.productPhoto},
        {$set: {}}, {upsert: true})
    }

    async deleteFromDB() {
        //dont need await
        dbhandler.cols.list.colChats.deleteOne({_id: this._id})
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
        if (!chats.has(pid))
            return {status: "error", error: `Cant find product with ID ${pid}`}

        let pobj = chats.get(pid)
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

module.exports = {Chat: ChatMessage, Chats: chats}
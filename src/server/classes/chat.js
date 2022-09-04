let dbhandler = require("../db/dbhandler")
let productHandler = require('./products')
const accountHandler = require("./accounts")
let shopHandler = require('./shops')
const common = require('./common')
let chats = new Chats()

function Chats()
{
    this.chats = new Map();

    this.getChats = function() {
        return this.chats;
    }
}

Chats.prototype.insert = async function(payload) {

    let msgObj = new ChatMessage(payload._id, payload)
    if (!this.chats.has(payload.orderId))
        this.chats.set(payload.orderId, [msgObj])
    else
        this.chats.get(payload.orderId).push(msgObj)

    msgObj.saveToDB();
    console.log("PUSHING MSG NID", payload._id)

    return {status: "ok"}
};

Chats.prototype.exists = function(oid) {
    if (this.getChats().get(oid))
        return true;

    return false;
};

Chats.prototype.get = function(oid) {
    return this.getChats().get(oid);
};

Chats.prototype.has = function(oid) {
    return this.getChats().has(oid);
};

Chats.prototype.loadFromDB = async function(id) {
    let data = await dbhandler.cols.list.colChat.find({}).toArray()

    for (let p of data) {
        if (!this.getChats().has(p.orderId)) {
            this.getChats().set(p.orderId, [new ChatMessage(p._id, p)])
        } else {
            this.getChats().get(p.orderId).push(new ChatMessage(p._id, p))
        }

    }

    console.log(`*** Loaded ${this.getChats().size} chat messages!`)
};

Chats.prototype.getMessagesByOrderId = function(oid) {
    if (!this.getChats().has(oid))
        return []
    else
        return this.getChats().get(oid)
}

class ChatMessage {

    constructor(_id, data)
    {
        this._id = _id;
        this.msg = data.msg;
        this.senderId = data.senderId;
        this.orderId = data.orderId;
    }

    async saveToDB() {
        //dont need await
        dbhandler.cols.list.colChat.updateOne({_id: this._id},
        {$set: { msg: this.msg, senderId: this.senderId, orderId: this.orderId}}, {upsert: true})
    }

    async deleteFromDB() {
        //dont need await
        dbhandler.cols.list.colChat.deleteOne({_id: this._id})
    }
}

module.exports = {Chat: ChatMessage, Chats: chats}
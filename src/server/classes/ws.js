
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({
    port: 8085
});
let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
let productHandler = require('../classes/products')
let addressHandler = require('../classes/address')
let orderHandler = require('../classes/orders')

const {auth} = require('../routes/auth')

function getSocketById(_id) {
    for (const [k,v] of wss.clients.entries())
        if (v._id === _id)
            return wss.clients[k]

    return false
}
function sendToId(_id, msg) {
    let tar = getSocketById(_id);

    if (!tar)
        return false;

    try {
        tar.send(msg)
    }
    catch(e) {

    }
}

wss.on('connection', async function(ws, req) {
    ws.haveMutualOrderByTarUid = function(targetUid) {
        let sender = this._id;
        let acc = accountHandler.Accounts.get(sender)
        let ord = acc.orders;

        let orders = (ord && ord.length) ? ord.map(i => {
            return orderHandler.Orders.get(i)
        }) : []

        if (!orders || !orders.length)
            return false;

        for (let o of orders)
            if (shopHandler.Shops.has(o.shopID) && shopHandler.Shops.get(o.shopID).ownerID == targetUid)
                return true
    }
    ws.haveMutualOrderByShopId = function(shopId) {
        let sender = this._id;
        let acc = accountHandler.Accounts.get(sender)
        let ord = acc.orders;

        let orders = (ord && ord.length) ? ord.map(i => {
            return orderHandler.Orders.get(i)
        }) : []

        if (!orders || !orders.length)
            return false;

        for (let o of orders)
            if (o.shopID == shopId)
                return true
    }

    if (!req.url.includes("/?token="))
        return ws.close();

    let token = req.url.replace("/?token=", "");
    const authed = await auth({token})

    if (token !== "guest" && !authed) {
        console.log("WS UNAUTHED!", token)
        return ws.close();
    }

    if (token !== "guest") {
        const _id = authed._id;
        ws._id = _id;
    }

    ws.on('message', function(message) {
        console.log('received: %s', message);
        let json;
        try {
            json = JSON.parse(message)

            if (json.opcode == "chat") {
                let receiverId = json.receiverId
                //if (wss.clients)
                if (ws.haveMutualOrderByTarUid(receiverId))
                    sendToId(receiverId, json)
                else
                    console.log("NO MUTUAL ORDER WITH REC ID", receiverId)
            }

        }
        catch (e) {
            console.log("Couldnt parse json message", e)
        }

    });
    ws.send('something');
});

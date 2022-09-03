
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({
    port: 8085
});
let dbHandler = require("../db/dbhandler")
let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
let productHandler = require('../classes/products')
let addressHandler = require('../classes/address')
let orderHandler = require('../classes/orders')

const {auth} = require('../routes/auth')

function getSocketsById(_id) {
    let sockets = []
    wss.clients.forEach(function each(client) {
        if (client._id == _id) {
            console.log('Client.ID: ' + _id);
            sockets.push(client)
        }
    });
    console.log("FINISHED")
    // for (const [k,v] of wss.clients.entries()) {
    //     //console.log(v._id);
    //     if (v._id === _id)
    //         return wss.clients[k]
    // }
    return sockets
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
function sendToIdByShop(shopId, msg) {

    if (!shopHandler.Shops.has(shopId)) {
        console.log(`Shop has no shopid`, shopId)
        return false;
    }

    let shop = shopHandler.Shops.get(shopId)
    let _id = shop.ownerID;
    let tar = getSocketsById(_id);

    if (!tar || !tar.length) {
        console.log('Couldnt find target', tar);
        return false;
    }

    for (let s of tar) {
        console.log("Sending from ", s._id)
        try {
            s.send(msg)
        } catch (e) {
            console.log(e)
        }
    }
    return true
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

        for (let o of orders) {
            //console.log(o)
            if (shopHandler.Shops.has(o.shopId) && shopHandler.Shops.get(o.shopId).ownerID === targetUid)
                return true
        }
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
            if (o.shopId == shopId) {
                console.log("Found WS target!")
                return true
            }
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
                if (ws.haveMutualOrderByShopId(receiverId)) {
                    sendToIdByShop(receiverId, JSON.stringify(json))

                }
                else
                    console.log("NO MUTUAL ORDER WITH REC ID", receiverId)
            }

        }
        catch (e) {
            console.log("Couldnt parse json message", e)
        }

    });
});

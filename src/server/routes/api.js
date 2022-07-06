const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");
var jwt = require('jsonwebtoken');

let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
let productHandler = require('../classes/products')

const Config = require("../Config.json");

const SECRET_KEY = Config.SECRET_KEY;

var options = {
    secret: SECRET_KEY,
    timeout: 300000 // 30 seconds to send the authentication message
};

async function auth(data) {
    //clearTimeout(auth_timeout);
    try {

        if (!data.token)
            return false

        const decoded = await jwt.verify(data.token, options.secret, options)
        console.log('Decoded is', decoded)

        if (decoded) {
            return decoded;
        }

        return false
    }
    catch (e) {
        console.log("Unauthorized!!!");
        return false;
    }
}

api.post('/register', async (req, res) => {
    const { username, password, email } = req.body


    let reg = await accountHandler.Account.register(username, password, email)

    let payload = typeof reg === 'object' ? reg.data : null

    if (payload) {
        res.status(200).send(payload)
        return //success
    }

    switch (reg) {
        case "ACCOUNT_CREATION_OK": {
            // handled above
        }
        case "ACCOUNT_USERNAME_UNAVAILABLE": {
            res.status(400).json(reg)
            break;
        }
        default:
            res.status(400).json(reg)
            break;
    }

})

api.post('/login', async (req, res) => {
    const { username, password } = req.body

    let success = await accountHandler.Account.login(username, password)

    console.log(success)
    if (typeof success === 'object') {
        console.log(success)
        res.status(200).send(success)
    } else
        res.status(400).json({ error: success })
})

api.post('/shop', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const userID = authed._id;


    const data = req.body;
    console.log("Got shop data", data)

    let success = await shopHandler.Shop.postShop(userID, {ownerID: userID, ...data})

    res.status(200).json({ status: 'ok!' })
})


api.get('/shop/:sid', async (req, res) => {

    const sid = req.params.sid

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "Shop with given SID doesn't exist!"})

    let getShop = shopHandler.Shops.get(parseInt(sid))


    let payload = {}
    payload._id = getShop._id;
    payload.shopName = getShop.shopName;
    payload.shopType = getShop.shopType;
    payload.ownerID = getShop.ownerID;
    payload.address = getShop.address;

    return res.status(200).json(payload)
})

api.post('/shop/:sid/product', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const sid = req.params.sid
    const data = req.body;
    console.log("Got product data", data)

    //let shopId = (await accountHandler.Accounts.get(accId).getShopIds())[0]._id

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)

    let add = await shopHandler.Shops.get(parseInt(sid)).addProduct(data)

    if (add.status !== "ok")
        return res.status(400).json(add)

    return res.status(200).json(add)
})

api.patch('/product/:pid', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const pid = parseInt(req.params.pid)
    const data = req.body;
    console.log("Got edit product data", data)

    //let shopId = (await accountHandler.Accounts.get(accId).getShopIds())[0]._id


    if (!productHandler.Products.has(pid))
        return res.status(400).json({status: "error", error: "This product doesn't exist!"})

    let p = productHandler.Products.get(pid)
    let sid = p.shopID

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)

    let edit = await shopHandler.Shops.get(parseInt(sid)).editProduct(pid, data)

    if (edit.status !== "ok")
        return res.status(400).json(edit)

    return res.status(200).json(edit)
})

api.delete('/shop/:sid/product/:id', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(403).json();
    }

    const accId = authed._id;
    const pid = parseInt(req.params.id)
    const sid = parseInt(req.params.sid)

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)
    let del = await shopHandler.Shops.get(sid).deleteProduct(pid)

    if (del.status !== "ok")
        return res.status(400).json(del)

    return res.status(200).json(del)
})

api.get('/shop/:sid/product', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const sid = req.params.sid


    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    console.log("Got shop ID", sid)
    let list = await shopHandler.Shops.get(parseInt(sid)).getProductList()

    if (!list.length)
        return res.status(400).json(list)

    return res.status(200).json(list)
})

api.get('/me', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const userID = authed._id;

    let me = accountHandler.Accounts.get(userID)

    if (!me) {
        return res.status(400).json({status: 'Error! Couldnt get user id for /me'})
    }

    let sids = await me.getShopIds()
    console.log("Got sids", sids)
    if (!sids) sids = []
    res.status(200).json(sids)
})

module.exports = api

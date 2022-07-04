const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");
var jwt = require('jsonwebtoken');

let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
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



api.post('/shop/:sid/product', async (req, res) => {
    console.log('asdf')
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const sid = req.params.sid
    const data = req.body;
    console.log("Got product data", data)

    //let shopId = (await accountHandler.Accounts.get(accId).getShopIds())[0]._id

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)
    let add = await shopHandler.Shops.get(sid).addProduct(data)

    if (add.status !== "ok")
        return res.status(400).json(add)

    return res.status(200).json(add)
})

api.delete('/shop/:sid/product/:id', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const pid = req.params.id


    let shopId = (await accountHandler.Accounts.get(accId).getShopIds())[0]._id

    console.log("Got shop ID", shopId)
    let add = await shopHandler.Shops.get(shopId).addProduct(data)

    if (add.status !== "ok")
        return res.status(400).json(add)

    return res.status(200).json(add)
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

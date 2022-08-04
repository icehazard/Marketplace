const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");
var jwt = require('jsonwebtoken');
const btcAddrValid = require( 'bitcoin-address-validation');
const myCrypto = require("../classes/cryptography")
let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
let productHandler = require('../classes/products')
let addressHandler = require('../classes/address')

const fetch = require("node-fetch");
const Config = require("../Config.json");
const common = require("../classes/common.js")
let base64 = require('base-64');
const axios = require('axios')
const NBXClient = require("nbxplorer-client")
let mnemonic = require('mnemonic-to-private-key/lib/index')
const HdAddGen = require('hdaddressgenerator')
const Avatar = require('../classes/upload');

const multer  = require('multer')
const upload = multer({ dest: 'images/' })
const {auth} = require("./auth")

api.post('/', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const userID = authed._id;


    const data = req.body;
    console.log("Got shop data", data)

    let success = await shopHandler.Shop.postShop(userID, {ownerID: userID, ...data})

    res.status(200).json({ status: 'ok!' })
})

api.post('/:sid/album',  async function (req, res, next) {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }


    let {sid} = req.params
    sid = parseInt(sid)

    let {type} = req.query
    const accId = authed._id;

    if (type !== "cover" && type !== "profile" && type !== "profile")
        return res.status(400).json({status: "error", error: "Type must be either cover or profile!"})

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "Shop with given SID doesn't exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    Avatar.uploadnew(req, res, sid, type)
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

api.get('/:sid', async (req, res) => {

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

api.patch('/:sid', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;
    const sid = req.params.sid
    const data = req.body;

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "Shop with given SID doesn't exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})


    let shop = shopHandler.Shops.get(parseInt(sid))
    let resp = shop.editShop(data)
    if (typeof resp === 'object')
        return res.status(400).json(resp)

    return res.status(200).end();
})

api.post('/:sid/product', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
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

api.delete('/:sid/product/:id', async (req, res) => {
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

api.get('/:sid/product', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;
    const sid = req.params.sid


    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    console.log("Got shop ID", sid)
    let list = await shopHandler.Shops.get(parseInt(sid)).getProductList()

    if (!list.length)
        return res.status(200).json(list)

    return res.status(200).json(list)
})

module.exports = api

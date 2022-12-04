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
const orderHandler = require("../classes/orders");

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

    Avatar.uploadShopImg(req, res, sid, type)
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

api.get('/:sid', async (req, res) => {

    const sid = req.params.sid

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "Shop with given SID doesn't exist!"})

    let getShop = shopHandler.Shops.get(parseInt(sid))
    let products = shopHandler.Shops.get(getShop._id).getProductList();

    let payload = {}
    payload._id = getShop._id;
    payload.description = getShop.description;
    payload.shopName = getShop.shopName;
    payload.shopType = getShop.shopType;
    payload.ownerID = getShop.ownerID;
    payload.address = getShop.address;
    payload.cover = getShop.cover;
    payload.profile = getShop.profile;
    payload.products = products;
    payload.paymentMask = getShop.paymentMask
    payload.BankAccountNumber = getShop.BankAccountNumber
    payload.nameBankAccount = getShop.nameBankAccount
    payload.bankName = getShop.bankName

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

    if (!data.qty)
        data.qty = 0;
    if (!data.name)
        data.name = "";
    if (!data.desc)
        data.desc = "";
    if (!data.price)
        data.price = 0;

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

api.post('/:sid/order', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }
    const accId = authed._id;
    let acc =  accountHandler.Accounts.get(accId)
    const sid = req.params.sid

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (await acc.ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You cannot make order to yourself."});


    let {items, address, payment} = req.body;

    if (!items.length)
    {
        return res.status(400).json({status: "error", error: "You must provide items! Currently empty."});
    }

    if (!acc.hasDeliveryAddress(address))
        return res.status(400).json({status: "error", error: "You did not create this delivery address! Try again."});

    if (payment !== "BANK" && payment !== "CRYPTO")
        return res.status(400).json({status: "error", error: "Invalid payment type! Must be either CRYPTO or BANK"});



    let add = orderHandler.Orders.insert(trade)

    if (add.status === "error")
        return res.status(400).json(res);

})

module.exports = api

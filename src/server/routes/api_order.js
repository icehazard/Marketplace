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
let orderHandler = require('../classes/orders')

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
    let {products, paymentType, address, shopId} = req.body;

    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const userID = authed._id;

    let me = accountHandler.Accounts.has(userID)

    if (!me) {
        return res.status(400).json({status: 'Error! Couldnt find your user ID! Please contact admin.'})
    }
    me = accountHandler.Accounts.get(userID)

    if (!shopHandler.Shops.has(parseInt(shopId)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    let shop = shopHandler.Shops.get(parseInt(shopId));

    if (await me.ownsShopID(shopId))
        return res.status(400).json({status: "error", error: "You cannot make an order to your own shop!"})

    if (products.length > 20)
        return res.status(400).json({status: "error", error: "You cannot buy more than 20 items at once!"});

    let errorIds = [];
    for (let p of products) {
        let pId = p._id
        if (!productHandler.Products.has(pId)) {
            errorIds.push(pId);
        }
        p.qty = Number(p.qty)

        if (!p.qty) {
            errorIds.push(pId);
        }

        let memProd = productHandler.Products.get(pId)

        if (pId != shopId)
            errorIds.push(pId);

        if (p.qty > memProd.qty)
            errorIds.push(pId);
        else
        {
            memProd.qty -= p.qty;
            memProd.saveToDB()
        }
    }

    if (errorIds.length) {
        return res.status(400).json({status: "error", error: "Some item IDs are invalid!", data: errorIds});
    }

    if (!me.hasDeliveryAddress(address))
        return res.status(400).json({status: "error", error: "You dont have this delivery address saved! Contact admin please."});

    if (paymentType !== "BANK" && paymentType !== "CRYPTO")
        return res.status(400).json({status: "error", error: "Payment type is invalid!", data: errorIds});

    let resp = await orderHandler.Orders.insert(req.body)

    if (resp.status === "error")
        return res.status(400).json(resp);

    return res.status(200).json(resp)
})

module.exports = api

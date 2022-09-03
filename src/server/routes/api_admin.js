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

api.post('/approveShop', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;

    if (!accountHandler.Accounts.has(accId))
        return res.status(400).json({status: "error", error: "Your acc doesnt exist! Contact admin please."})

    let acc = accountHandler.Accounts.get(accId)

    if (await acc.getRoleId() < common.roles.ROLE_ADMIN)
        return res.status(400).json({status: "error", error: "No permission!"})

    const shopId = parseInt(req.body.shopId)

    if (!shopId)
    {
        return res.status(400).json({status: "error", error: "Shop id is invalid!"})
    }

    if (!shopHandler.Shops.has(shopId))
        return res.status(400).json({status: "error", error: "Shop doesnt exist!"})

    shop.approveShop()

    return res.status(200).end()
})

module.exports = api

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

api.get('/:id', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;

    if (!accountHandler.Accounts.has(accId))
        return res.status(400).json({status: "error", error: "Your acc doesnt exist! Contact admin please."})

    let acc = accountHandler.Accounts.get(accId)
    const oid = parseInt(req.params.id)

    if (!oid)
    {
        return res.status(400).json({status: "error", error: "Order id is invalid!"})
    }

    if (!acc.hasOrder(oid))
        return res.status(400).json({status: "error", error: "This order doesn't belong to you!"})

    if (!orderHandler.Orders.has(oid))
        return res.status(400).json({status: "error", error: "Order doesnt exist!"})

    let order = orderHandler.Orders.get(oid)

    return res.status(200).json(order.getChatMessages())
})

module.exports = api

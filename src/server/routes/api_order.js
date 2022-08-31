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
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }


    let {products, paymentType} = req.body;

    if (products.length > 20)
        return res.status(400).json({status: "error", error: "You cannot buy more than 20 items at once!"});

    let errorIds = [];
    for (let pId of products) {
        if (!productHandler.Products.has(pId)) {
            errorIds.push(pId);
        }
    }

    if (errorIds.length) {
        return res.status(400).json({status: "error", error: "Some item IDs are invalid!", data: errorIds});
    }

    if (paymentType !== "BANK" && paymentType !== "CRYPTO")
        return res.status(400).json({status: "error", error: "Payment type is invalid!", data: errorIds});

    let add = orderHandler.Orders.insert(req.body)

    if (add.status === "error")
        return res.status(400).json(res);

})

module.exports = api

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
const {auth} = require("./auth")

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
//
// var bitcoin = require('bitcoinjs-lib');
// const ecc = require("tiny-secp256k1")
// const {ECPairFactory} = require("ecpair")
// const {BIP32Factory} = require("bip32")
// const ECPair = ECPairFactory(ecc);
// const bip32 = BIP32Factory(ecc);

api.post('/:pid/album', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;
    const {index} = req.query;

    if (!index)
        return res.status(400).json({status: "error", error: "Image index must be provided!"})

    if (index < 0 || index > 4)
        return res.status(400).json({status: "error", error: "Image index must be between 0 and 4"})

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

    Avatar.uploadProdImg(req, res, pid, index)
})

api.delete('/:pid/album', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;
    const {index} = req.query;

    if (!index)
        return res.status(400).json({status: "error", error: "Image index must be provided!"})

    if (index < 0 || index > 4)
        return res.status(400).json({status: "error", error: "Image index must be between 0 and 4"})

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

    let shop = shopHandler.Shops.get(parseInt(sid))

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)

    let str = shop.photos[index]

    if (str)
        Avatar.delete(str)

    return res.status(200).end();
})

api.patch('/:pid', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
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

module.exports = api

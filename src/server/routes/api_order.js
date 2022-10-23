const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");
var jwt = require('jsonwebtoken');
const btcAddrValid = require('bitcoin-address-validation');
const myCrypto = require("../classes/cryptography")
let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
let productHandler = require('../classes/products')
let addressHandler = require('../classes/address')
let orderHandler = require('../classes/orders')
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const Config = require("../Config.json");
const common = require("../classes/common.js")
let base64 = require('base-64');
const axios = require('axios')
const NBXClient = require("nbxplorer-client")
let mnemonic = require('mnemonic-to-private-key/lib/index')
const HdAddGen = require('hdaddressgenerator')
const Avatar = require('../classes/upload');
var tracker = require('delivery-tracker')
var courier = tracker.courier(tracker.COURIER.KERRYTHAI.CODE)

const multer = require('multer')
const upload = multer({ dest: 'images/' })
const { auth } = require("./auth")

api.post('/', async (req, res) => {
    let { products, paymentType, address, shopId } = req.body;

    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const userID = authed._id;

    let me = accountHandler.Accounts.has(userID)

    if (!me) {
        return res.status(400).json({ status: 'Error! Couldnt find your user ID! Please contact admin.' })
    }
    me = accountHandler.Accounts.get(userID)

    if (!shopHandler.Shops.has(parseInt(shopId)))
        return res.status(400).json({ status: "error", error: "That shop does not exist!" })

    let shop = shopHandler.Shops.get(parseInt(shopId));

    if (await me.ownsShopID(shopId))
        return res.status(400).json({ status: "error", error: "You cannot make an order to your own shop!" })

    if (!products || !products.length)
        return res.status(400).json({ status: "error", error: "You must provide product list!" });

    if (products.length > 20)
        return res.status(400).json({ status: "error", error: "You cannot buy more than 20 items at once!" });

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

        if (memProd.shopID != shopId) {
            errorIds.push(pId);
        }

        if (p.qty > memProd.qty) {
            errorIds.push(pId);
        }
    }

    if (errorIds.length) {
        return res.status(400).json({ status: "error", error: "Some item IDs are invalid!", data: errorIds });
    }

    // order fine, now reduce existing qty
    let sum = 0

    for (let p of products) {
        let pId = p._id

        let memProd = productHandler.Products.get(pId)

        sum += Number(memProd.price) * Number(p.qty)
        if (p.qty <= memProd.qty) {
            memProd.qty -= p.qty;
            memProd.saveToDB()
        }
    }

    req.body.total = sum;
    if (!me.hasDeliveryAddress(address))
        return res.status(400).json({ status: "error", error: "You dont have this delivery address saved! Contact admin please." });

    if (paymentType !== "BANK" && paymentType !== "CRYPTO")
        return res.status(400).json({ status: "error", error: "Payment type is invalid!", data: errorIds });

    req.body.uid = userID;
    let resp = await orderHandler.Orders.insert(req.body)

    if (resp.status === "error")
        return res.status(400).json(resp);

    return res.status(200).json(resp)
})

api.get('/:id', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;

    if (!accountHandler.Accounts.has(accId))
        return res.status(400).json({ status: "error", error: "Your acc doesnt exist! Contact admin please." })

    let acc = accountHandler.Accounts.get(accId)
    const oid = parseInt(req.params.id)

    if (!oid) {
        return res.status(400).json({ status: "error", error: "Order id is invalid!" })
    }

    if (!acc.hasOrder(oid))
        return res.status(400).json({ status: "error", error: "This order doesn't belong to you!" })

    if (!orderHandler.Orders.has(oid))
        return res.status(400).json({ status: "error", error: "Order doesnt exist!" })

    let order = orderHandler.Orders.get(oid)
    order.shop = shopHandler.Shops.get(parseInt(order.shopId));

    for (let x in order.products) {
        let prod = order.products[x]
        let qty = prod.qty
        let memProd = productHandler.Products.get(prod._id)
        order.products[x] = memProd
        order.products[x].qty = qty
    }

    return res.status(200).json(order)
})

api.post('/:id/markpaid', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;

    if (!accountHandler.Accounts.has(accId))
        return res.status(400).json({ status: "error", error: "Your acc doesnt exist! Contact admin please." })

    let acc = accountHandler.Accounts.get(accId)
    const oid = parseInt(req.params.id)

    if (!oid) {
        return res.status(400).json({ status: "error", error: "Order id is invalid!" })
    }

    if (!acc.hasOrder(oid))
        return res.status(400).json({ status: "error", error: "This order doesn't belong to you!" })

    if (!orderHandler.Orders.has(oid))
        return res.status(400).json({ status: "error", error: "Order doesnt exist!" })

    let order = orderHandler.Orders.get(oid)

    order.markPaid()

    return res.json({ status: 'ok' })
})

api.patch('/:id', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end();
    }

    const accId = authed._id;

    if (!accountHandler.Accounts.has(accId))
        return res.status(400).json({ status: "error", error: "Your acc doesnt exist! Contact admin please." })

    let acc = accountHandler.Accounts.get(accId)
    const oid = parseInt(req.params.id)

    if (!oid) {
        return res.status(400).json({ status: "error", error: "Order id is invalid!" })
    }

    if (!acc.hasOrder(oid))
        return res.status(400).json({ status: "error", error: "This order doesn't belong to you!" })

    if (!orderHandler.Orders.has(oid))
        return res.status(400).json({ status: "error", error: "Order doesnt exist!" })

    orderHandler.Orders.get(oid).editOrder(oid, req.body)

    return res.json({ status: 'ok' })
})

api.post('/track', async (req, res) => {
    let orderId = req.body.id
    let url = `https://api.parcelstrace.com/trace/query`
    let track = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "pno_items": [req.body.trackingNo] }),
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": 'en-US,en;q=0.9'
        }
    });
    track = await track.json()

    if (track.code == 1 ){
        let flashDelived = track.data.items[0].route_state_text == 'Delivered'
        if (flashDelived) orderHandler.Orders.get(orderId).editOrder(orderId, {deliveryStatus: 3})
        return res.json({ status: 'ok', data: track.data.items[0]})
    }

    let kerry = {}
    courier.trace(req.body.trackingNo, function (err, result) {
        if (!result) return   res.json({ status: 'error'})
        kerry.express_icon = 'https://upload.wikimedia.org/wikipedia/commons/0/07/Kerrry_Express.svg'
        kerry.express_name = 'Kerry Express'
        kerry.routes = result.checkpoints
        kerry.pno = result.number

        for (let x of kerry.routes){
            x.routed_at = x.time
        }
        let kerryDeliverd = result.checkpoints[0].message.includes('delivered')
        if (kerryDeliverd) orderHandler.Orders.get(orderId).editOrder(orderId, {deliveryStatus: 3})
        if (kerry.pno) return res.json({ status: 'ok', data: kerry})
      })
})

module.exports = api

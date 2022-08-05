const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { WEB_SERVER_PORT } = require('./Config.json')
const apiRoute = require('./routes/api.js')
const productRoute = require('./routes/api_product')
const shopRoute = require('./routes/api_shop.js')

const path = require('path')
const dbhandler = require("./db/dbhandler")
const common = require("./classes/common")
const accountHandler = require("./classes/accounts.js");
const shopHandler = require("./classes/shops");
const productHandler = require("./classes/products");
const addressHandler = require("./classes/address");
const serverHandler = require("./classes/server");

//const trackTxHandler = require("./classes/tracktx");
const txHandler = require("./classes/tx");
const bitcore = require("bitcore-lib");
const bitcoin = require('bitcoinjs-lib');

const Config = require("./Config.json");
const fetch = require("node-fetch");
const base64 = require("base-64");
const { check } = require("bitcoinjs-lib/src/bip66");

let WebSocketServer = require('ws').Server
let wss = new WebSocketServer({ port: 8085 });

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});

(async () => {

    await new Promise((res, rej) => {
        let ret = () => {
            setTimeout(() => {
                if (Object.keys(dbhandler.cols.list).length) {
                    console.log(">> DB INITED!!!")
                    return res()
                }

                console.log(">> DB not init yet, trying again!!!")
                console.log(dbhandler.cols.list)
                return ret()
            }, 500)
        }
        ret()
    })

    // *** PRESERVE ORDER (IMPORTANT)
    await accountHandler.Accounts.loadFromDB()
    await shopHandler.Shops.loadFromDB()
    await productHandler.Products.loadFromDB()
    await shopHandler.Shops.loadProductsIntoShops()
    await addressHandler.Addresses.loadFromDB() //has to be after accounts
    await serverHandler.Server.loadFromDB()
    //await trackTxHandler.Tracktx.loadFromDB()

    let checkEvents = (symbol) => {
        setTimeout(async () => {
            let lastEventId = serverHandler.Server.lastEventId;
            //console.log("Starting checking events from ID", lastEventId)
            let url = `${common.nbUrl}/v1/cryptos/${symbol}/events?lastEventId=${lastEventId}`
            //console.log("Got url", url)
            //let url = `${Config.BTC_PAY_URL}/api/v1/stores/${Config.BTC_PAY_STOREID}/payment-methods/onchain/${symbol}/wallet/address?forceGenerate=true`
            try {
                let r = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: 'Basic ' + base64.encode("__cookie__:" + Config.NBXPLORER_COOKIE_PW)
                    }
                })


                if (r.status != 200) {
                    console.log("Got bad status requesting checkEvents", r.status)
                    return checkEvents(symbol)
                }

                let json = await r.json()

                if (!json.length) {
                    //console.log("No new events")
                    return checkEvents(symbol)
                }

                console.log(`Got ${json.length} new events`)
                let currentEventId = 0;

                for (let e of json) {
                    currentEventId = e.eventId

                    if (e.type !== "newtransaction") {
                        serverHandler.Server.lastEventId = currentEventId
                        serverHandler.Server.saveToDB()
                        continue
                    }

                    // let derivationStrategy = e.data.derivationStrategy
                    // if (derivationStrategy.includes("tpub")) {
                    //     symbol = symbol[symbol.length - 1] === "t" ? symbol : symbol + "t"
                    //     console.log("TX IS TESTNE. SETTING SYMBOL PROPERLY")
                    // }

                    let transactionData = e.data.transactionData

                    let rawTrans = transactionData.transaction
                    let txHash = transactionData.transactionHash

                    let url = `${common.nbUrl}/v1/cryptos/${symbol}/transactions/${txHash}`

                    let txReq = await fetch(url, {
                        method: "GET",
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Basic ' + base64.encode("__cookie__:" + Config.NBXPLORER_COOKIE_PW)
                        }
                    });

                    if (txReq.status !== 200) {
                        console.log("Got bad status requesting tx data", txReq.status, txHash)
                        throw new Error(`Got bad status requesting tx data ${txReq.status} ${txHash}`)
                    }

                    let txJson = await txReq.json()

                    if (txJson.confirmations <= 0) {
                        //schedule for a next check with custom opts later
                        console.log("TX not confirmed yet!")
                        //trackTxHandler.Tracktx.insert(txHash, symbol, rawTrans)
                        serverHandler.Server.lastEventId = currentEventId
                        serverHandler.Server.saveToDB()
                        continue;
                    }

                    if (serverHandler.Server.processedTxs.has(txHash)) {
                        console.log(`Tx ${txHash} has already been processed! Skipping`)
                        serverHandler.Server.lastEventId = currentEventId
                        serverHandler.Server.saveToDB()
                        continue
                    }

                    console.log(`TX ${txHash} confirmed! Crediting user now...`)

                    /*                if (!addressHandler.Addresses.has(txHash))
                                    {
                                        console.log("Couldnt find account connected to this txhash", txHash)
                                        continue
                                    }*/
                    //
                    // let adr = addressHandler.Addresses.get(txHash)
                    // let ownerAcc = accountHandler.Accounts.get(adr.ownerID)

                    // const tx2 = bitcoin.Transaction.fromHex(rawTrans);
                    // console.log(tx2)
                    let tx = new bitcore.Transaction(Buffer.from(rawTrans, "hex"))

                    let out = tx.toJSON().outputs
                    //console.log("Got output", out)

                    for (let o of out) {
                        let url = `${common.nbUrl}/v1/cryptos/${symbol}/derivations/${Config.BTC_DERIV_SCHEME}/scripts/${o.script}`

                        let s = await fetch(url, {
                            method: "GET",
                            headers: {
                                Accept: 'application/json',
                                Authorization: 'Basic ' + base64.encode("__cookie__:" + Config.NBXPLORER_COOKIE_PW)
                            }
                        });

                        if (s.status !== 200) {
                            console.log("Got bad status requesting script data", s.status, o.script)
                            continue
                        }

                        let sjson = await s.json()
                        let addr = sjson.address

                        if (!addressHandler.Addresses.has(addr)) {
                            console.log("Couldnt find address which was output (maybe sent to another custodian)")
                            continue
                        }

                        let addrFromMem = addressHandler.Addresses.get(addr)

                        if (!accountHandler.Accounts.has(addrFromMem.ownerID)) {
                            console.log("Account to be credited doesnt exist.  Crediting balance to main wallet")
                            continue
                        }

                        let ownerAcc = accountHandler.Accounts.get(addrFromMem.ownerID)
                        ownerAcc.creditBalance(symbol, o.satoshis)
                        ownerAcc.saveToDB()
                        serverHandler.Server.processTx(txHash)
                        //trackTxHandler.Tracktx.insert(txHash)
                        console.log(`Credited Acc ${ownerAcc._id} with ${o.satoshis} sat [${symbol}]`)
                    }


                    serverHandler.Server.lastEventId = currentEventId
                    serverHandler.Server.saveToDB()
                }

                return checkEvents(symbol)
            }
            catch (e) {
                console.log("Got error fetching events, trying again")
                return checkEvents(symbol)
            }

        }, 5e3)
    }

    // no t for Test, just BTC cause its nbxplorer

    checkEvents("BTC")

    app.use(cors())
    app.use(bodyParser.json())
    app.use(morgan('tiny'))
    // app.use(express.limit('4M'));
    app.use('/api', apiRoute)
    app.use('/api/product', productRoute)
    app.use('/api/shop', shopRoute)

    function auth(data) {
        //clearTimeout(auth_timeout);
        jwt.verify(data.token, options.secret, options, function (err, decoded) {
            if (err) {
                socket.disconnect('unauthorized');
                console.log("Unauthorized!!!");
                return false;
            }
            if (!err && decoded) {
                //restore temporarily disabled connection
                //ws.sockets.connected[socket.id] = socket;

                socket.decoded_token = decoded;
                socket.connectedAt = new Date();
                console.info(socket.decoded_token);

                console.log('SOCKET [%s] CONNECTED', socket.id);
                return true;
            }
        })
    }

    app.listen(WEB_SERVER_PORT, () => console.log('Webserver (express) is running at port ' + WEB_SERVER_PORT))

})()



const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { WEB_SERVER_PORT } = require('./Config.json')
const apiRoute = require('./routes/api.js')
const path = require('path')
const dbhandler = require("./db/dbhandler")
const accountHandler = require("./classes/accounts.js");
const shopHandler = require("./classes/shops");
const productHandler = require("./classes/products");
const addressHandler = require("./classes/address");
const serverHandler = require("./classes/server");

const trackTxHandler = require("./classes/tracktx");
const txHandler = require("./classes/tx");
const bitcore = require("bitcore-lib");
const bitcoin = require('bitcoinjs-lib');

const Config = require("./Config.json");
const fetch = require("node-fetch");
const base64 = require("base-64");
const {check} = require("bitcoinjs-lib/src/bip66");

(async() => {

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
    await trackTxHandler.Tracktx.loadFromDB()

     let checkEvents = (symbol)  => {
        setTimeout(async () => {
            let lastEventId = serverHandler.Server.lastEventId;
            console.log("Starting checking events from ID", lastEventId)
            let url = `${Config.NBXPLORER_URL}/v1/cryptos/${symbol}/events?lastEventId=${lastEventId}`
            //let url = `${Config.BTC_PAY_URL}/api/v1/stores/${Config.BTC_PAY_STOREID}/payment-methods/onchain/${symbol}/wallet/address?forceGenerate=true`

            let r = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
                }
            });

            if (r.status != 200)
            {
                console.log("Got bad status requesting checkEvents", r.status)
                return checkEvents(symbol)
            }

            let json = await r.json()

            if (!json.length) {
                console.log("No new events")
                return checkEvents(symbol)
            }

            console.log(`Got ${json.length} new events`)
            let currentEventId = 0;

            for (let e of json)
            {
                currentEventId = e.eventId

                if (e.type !== "newtransaction")
                    continue

                let transactionData = e.data.transactionData

                let rawTrans = transactionData.transaction
                let txHash = transactionData.transactionHash

                let url = `${Config.NBXPLORER_URL}/v1/cryptos/${symbol}/transactions/${txHash}`

                let txReq = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
                    }
                });


                if (txReq.status != 200)
                {
                    console.log("Got bad status requesting tx data", r.status, txHash)
                    continue
                }

                let txJson = await txReq.json()

                if (txJson.confirmations <= 0) {
                    //schedule for a next check with custom opts later
                    console.log("TX not confirmed yet!")
                    trackTxHandler.Tracktx.insert(txHash, symbol)
                    continue;
                }

                if (serverHandler.Server.processedTxs.has(txHash))
                {
                    console.log(`Tx ${txHash} has already been processed! Skipping`)
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

                for (let o of out)
                {
                    let url = `${Config.NBXPLORER_URL}/v1/cryptos/${symbol}/derivations/${Config.BTC_DERIV_SCHEME}/scripts/${o.script}`

                    let s = await fetch(url, {
                        method: "GET",
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
                        }
                    });

                    if (s.status !== 200)
                    {
                        console.log("Got bad status requesting script data", s.status, o.script)
                        continue
                    }

                    let sjson = await s.json()
                    let addr = sjson.address

                    if (!addressHandler.Addresses.has(addr))
                    {
                        console.log("Couldnt find address which was output (maybe sent to another custodian)")
                        continue
                    }

                    let addrFromMem = addressHandler.Addresses.get(addr)

                    if (!accountHandler.Accounts.has(addrFromMem.ownerID))
                    {
                        console.log("Account to be credited doesnt exist.  Crediting balance to main wallet")
                        continue
                    }

                    let ownerAcc = accountHandler.Accounts.get(addrFromMem.ownerID)
                    ownerAcc.creditBalance(symbol, o.satoshis)
                    ownerAcc.saveToDB()
                    serverHandler.Server.processTx(txHash)
                    trackTxHandler.Tracktx.insert(txHash)
                    console.log(`Credited Acc ${ownerAcc._id} with ${o.satoshis} sat [${symbol}]`)
                }


            }

            serverHandler.Server.lastEventId = currentEventId
            serverHandler.Server.saveToDB()
            return checkEvents(symbol)

        }, 5e3)
    }

    // no t for Test, just BTC cause its nbxplorer

    checkEvents("BTC")

    app.use(cors())
    app.use(bodyParser.json())
    app.use(morgan('tiny'))

    app.use('/api', apiRoute)

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



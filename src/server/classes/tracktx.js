let dbhandler = require("../db/dbhandler")
const fetch = require("node-fetch");
const base64 = require("base-64");
const Config = require("../Config.json");
const serverHandler = require("./server");
const bitcore = require("bitcore-lib");
const addressHandler = require("./address");
const accountHandler = require("./accounts");
const common = require("./common")

class Tracktx {
    constructor() {
        // tx hash list
        this.trackedtxs = new Map([['BTC', []], ['DOGE', []], ['LTC', []],
            ['ETH', []],  ['BTCt', []]])

        for (let k of this.trackedtxs.keys())
                this.checker(k)
    }

    removeTrackedTx(symbol, txHash) {
        let updatedTxs = tracktx.trackedtxs.get(symbol).filter(i => i._id !== txHash)
        tracktx.trackedtxs.set(symbol, updatedTxs)
        dbhandler.cols.list.colTrackedTxs.deleteOne({_id: txHash})
    }

    async checker(symbol) {
        setInterval(async _ => {
            if (!this.trackedtxs.get(symbol).length)
                return

            let txs = this.trackedtxs.get(symbol)
            for (let trans of txs) {
                console.log(`Tracking ${symbol}`)

                let txHash = trans._id
                let nbSymbol = common.toNbSymbol(symbol)
                let url = `${common.nbUrl}/v1/cryptos/${nbSymbol}/transactions/${txHash}`
                console.log("URL is", url)
                let txReq = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: 'Basic ' + base64.encode("__cookie__:" + Config.NBXPLORER_COOKIE_PW)
                    }
                });

                if (txReq.status !== 200) {
                    console.log("Got bad status requesting tx data", txReq.status, txHash)
                    continue
                }

                let txJson = await txReq.json()

                if (txJson.confirmations <= 0) {
                    //schedule for a next check with custom opts later
                    console.log("TX not confirmed yet!")
                    continue;
                }

                if (serverHandler.Server.processedTxs.has(txHash)) {
                    console.log(`Tx ${txHash} has already been processed! Skipping`)
                    this.removeTrackedTx(symbol, txHash)
                    continue
                }

                console.log(`TX ${txHash} confirmed! Crediting user now...`)

                let tx = new bitcore.Transaction(Buffer.from(txJson.rawTrans, "hex"))

                let out = tx.toJSON().outputs
                //console.log("Got output", out)

                for (let o of out)
                {
                    let url = `${common.nbUrl}/v1/cryptos/${nbSymbol}/derivations/${Config.BTC_DERIV_SCHEME}/scripts/${o.script}`

                    let s = await fetch(url, {
                        method: "GET",
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_COOKIE_PW)
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
                    this.removeTrackedTx(symbol, txHash)


                    console.log(`Credited Acc ${ownerAcc._id} with ${o.satoshis} sat [${symbol}]`)
                }
            }
        }, 10e3)
    }

    async loadFromDB() {
        let data = await dbhandler.cols.list.colServer.findOne({_id: "data"})

        if (!data)
            return;

        this.lastEventId = data.lastEventId;

        data = await dbhandler.cols.list.colTrackedTxs.find({}).toArray()
        for (let d of data)
            if (this.trackedtxs.has(d.symbol))
                this.trackedtxs.get(d.symbol).push(d)
    }

    async saveToDB() {
        dbhandler.cols.list.colServer.updateOne({_id: "data"},
            {$set: {lastEventId: this.lastEventId}}, {upsert: true})
    }

    async insert(hash, symbol, rawData) {
        if (Config.USE_TESTNET)
            symbol += "t"

        if (!this.trackedtxs.has(symbol))
            return

        let obj = {_id: hash, symbol: symbol, rawData: rawData, t: new Date()}
        this.trackedtxs.get(symbol).push(obj)
        dbhandler.cols.list.colTrackedTxs.insertOne(obj).catch(err => {})
    }



}
let tracktx = new Tracktx()

module.exports = {Tracktx: tracktx}
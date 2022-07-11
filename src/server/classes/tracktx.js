let dbhandler = require("../db/dbhandler")
const fetch = require("node-fetch");
const base64 = require("base-64");
const Config = require("../Config.json");
const serverHandler = require("./server");


class Tracktx {
    constructor() {
        this.trackedtxs = [];
        this.checker()
    }

    async checker() {
        setInterval(async _ => {
            console.log("Tracking", this.trackedtxs)

            // let url = `${Config.NBXPLORER_URL}/v1/cryptos/${symbol}/transactions/${txHash}`
            //
            // let txReq = await fetch(url, {
            //     method: "GET",
            //     headers: {
            //         Accept: 'application/json',
            //         Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
            //     }
            // });
            //
            //
            // if (txReq.status != 200)
            // {
            //     console.log("Got bad status requesting tx data", r.status, txHash)
            //     continue
            // }
            //
            // let txJson = await txReq.json()
            //
            // if (txJson.confirmations <= 0) {
            //     //schedule for a next check with custom opts later
            //     console.log("TX not confirmed yet!")
            //     trackTxHandler.Tracktx.insert(txHash)
            //     continue;
            // }
            //
            // if (serverHandler.Server.processedTxs.has(txHash))
            // {
            //     console.log(`Tx ${txHash} has already been processed! Skipping`)
            //     continue
            // }
            //
            // console.log(`TX ${txHash} confirmed! Crediting user now...`)

        }, 10e3)
    }

    async loadFromDB() {
        let data = await dbhandler.cols.list.colServer.findOne({_id: "data"})

        if (!data)
            return;

        this.lastEventId = data.lastEventId;
    }

    async saveToDB() {
        dbhandler.cols.list.colServer.updateOne({_id: "data"},
            {$set: {lastEventId: this.lastEventId}}, {upsert: true})
    }

    async insert(hash) {
        this.trackedtxs.push(hash)
        dbhandler.cols.list.colTrackedTxs.insertOne({_id: hash, t: new Date()}).catch(err => {})
    }



}
let tracktx = new Tracktx()

module.exports = {Tracktx: tracktx}
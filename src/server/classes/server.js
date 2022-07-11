let dbhandler = require("../db/dbhandler")


class Server {
    constructor() {
        this.lastEventId = 0;
        this.processedTxs = new Map()
    }

    async loadFromDB() {
        let data = await dbhandler.cols.list.colServer.findOne({_id: "data"})

        if (!data)
            return;

        this.lastEventId = data.lastEventId;

        data = await dbhandler.cols.list.colProcessedTxs.find({}).toArray()

        if (data.length)
        {
            for (let t of data)
                this.processedTxs.set(t._id, t)
        }

    }

    async saveToDB() {
        dbhandler.cols.list.colServer.updateOne({_id: "data"},
            {$set: {lastEventId: this.lastEventId}}, {upsert: true})

        let list = []
        for (const [k,v] of this.processedTxs)
            list.push(v)

        dbhandler.cols.list.colProcessedTxs.insertMany(list, {ordered: false}).catch(err=>{

        })
    }

    async processTx(hash) {
        this.processedTxs.set(hash, {_id: hash})

        this.saveToDB()
    }

}

let server = new Server()

module.exports = {Server: server}
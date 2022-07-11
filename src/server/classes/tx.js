let dbhandler = require("../db/dbhandler")

class Tx {
    constructor() {
        this.lastChecked = null

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
}

module.exports = {Tx}
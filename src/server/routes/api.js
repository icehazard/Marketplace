const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')

let accounts = require("../classes/accounts")

api.post('/register', async (req, res) => {
    const { username, password, email } = req.body


    let reg = await db.register(username, password, email)

    switch (reg) {
        case "ACCOUNT_CREATION_OK": {
            res.status(200).send()
            break;
        }
        case "ACCOUNT_USERNAME_UNAVAILABLE": {
            res.status(400).json({error: "Username is unavailable"})
            break;
        }
        default:
            res.status(400).json({error: "Unhandled error. Please contact admin."})
            break;
    }

})

api.post('/login', async (req, res) => {
    const {username, password} = req.body

    let success = await accounts.Account.login(username, password)

    console.log(success)
    if (typeof success === 'object') {
        console.log(success)
        res.status(200).send(success)
    } else
        res.status(400).json({error: success})
})

module.exports = api

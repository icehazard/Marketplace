const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')

api.post('/register', async (req, res) => {
    const { username, password, email } = req.body


    let reg = await db.register(username, password, email)

    switch (reg) {
        case "ACCOUNT_USERNAME_UNAVAILABLE":
            res.status(400).json({error: "Username is unavailable"})
        case "ACCOUNT_CREATION_OK":
            res.status(200).send()
        default:
            res.status(400).json({error: "Unhandled error. Please contact admin."})
    }

})

module.exports = api

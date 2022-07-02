const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");

let accounts = require("../classes/accounts")
let shops = require('../classes/shops')

function auth(data) {
    //clearTimeout(auth_timeout);
    try {
        const decoded = jwt.verify(data.token, options.secret, options)

        if (decoded) {
            return true;
        }
    }
    catch (e) {
        console.log("Unauthorized!!!");
        return false;
    }
}

api.post('/register', async (req, res) => {
    const { username, password, email } = req.body


    let reg = await accounts.Account.register(username, password, email)

    let payload = typeof reg === 'object' ? reg.data : null

    if (payload) {
        res.status(200).send(payload)
        return //success
    }

    switch (reg) {
        case "ACCOUNT_CREATION_OK": {
            // handled above
        }
        case "ACCOUNT_USERNAME_UNAVAILABLE": {
            res.status(400).json(reg)
            break;
        }
        default:
            res.status(400).json(reg)
            break;
    }

})

api.post('/login', async (req, res) => {
    const { username, password } = req.body

    let success = await accounts.Account.login(username, password)

    console.log(success)
    if (typeof success === 'object') {
        console.log(success)
        res.status(200).send(success)
    } else
        res.status(400).json({ error: success })
})

api.post('/store', async (req, res) => {
    const userID = jwtDecode(req.body.token)._id;
    const data = req.body;
    let success = await shops.Shop.postShop(userID, data)
    

    res.status(200).json({ status: 'ok!' })
})

module.exports = api

const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");
var jwt = require('jsonwebtoken');
const myCrypto = require("../classes/cryptography")
let accountHandler = require("../classes/accounts")
let shopHandler = require('../classes/shops')
let productHandler = require('../classes/products')
let addressHandler = require('../classes/address')

const fetch = require("node-fetch");
const Config = require("../Config.json");
const common = require("../classes/common.js")
let base64 = require('base-64');
const axios = require('axios')
const NBXClient = require("nbxplorer-client")
let mnemonic = require('mnemonic-to-private-key/lib/index')
const HdAddGen = require('hdaddressgenerator')

//
// var bitcoin = require('bitcoinjs-lib');
// const ecc = require("tiny-secp256k1")
// const {ECPairFactory} = require("ecpair")
// const {BIP32Factory} = require("bip32")
// const ECPair = ECPairFactory(ecc);
// const bip32 = BIP32Factory(ecc);

const bitcore = require("bitcore-lib");


const SECRET_KEY = Config.SECRET_KEY;

var options = {
    secret: SECRET_KEY,
    timeout: 300000 // 30 seconds to send the authentication message
};


async function auth(data) {
    //clearTimeout(auth_timeout);
    try {

        if (!data.token)
            return false

        const decoded = await jwt.verify(data.token, options.secret, options)
        console.log('Decoded is', decoded)

        if (decoded) {
            return decoded;
        }

        return false
    }
    catch (e) {
        console.log("Unauthorized!!!");
        return false;
    }
}

api.post('/register', async (req, res) => {
    const { username, password, email } = req.body


    let reg = await accountHandler.Account.register(username, password, email)

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

    let success = await accountHandler.Account.login(username, password)

    console.log(success)
    if (typeof success === 'object') {
        console.log(success)
        res.status(200).send(success)
    } else
        res.status(400).json({ error: success })
})

api.post('/shop', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const userID = authed._id;


    const data = req.body;
    console.log("Got shop data", data)

    let success = await shopHandler.Shop.postShop(userID, {ownerID: userID, ...data})

    res.status(200).json({ status: 'ok!' })
})


api.get('/shop/:sid', async (req, res) => {

    const sid = req.params.sid

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "Shop with given SID doesn't exist!"})

    let getShop = shopHandler.Shops.get(parseInt(sid))


    let payload = {}
    payload._id = getShop._id;
    payload.shopName = getShop.shopName;
    payload.shopType = getShop.shopType;
    payload.ownerID = getShop.ownerID;
    payload.address = getShop.address;

    return res.status(200).json(payload)
})

api.post('/shop/:sid/product', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const sid = req.params.sid
    const data = req.body;
    console.log("Got product data", data)

    //let shopId = (await accountHandler.Accounts.get(accId).getShopIds())[0]._id

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)

    let add = await shopHandler.Shops.get(parseInt(sid)).addProduct(data)

    if (add.status !== "ok")
        return res.status(400).json(add)

    return res.status(200).json(add)
})

api.patch('/product/:pid', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const pid = parseInt(req.params.pid)
    const data = req.body;
    console.log("Got edit product data", data)

    //let shopId = (await accountHandler.Accounts.get(accId).getShopIds())[0]._id


    if (!productHandler.Products.has(pid))
        return res.status(400).json({status: "error", error: "This product doesn't exist!"})

    let p = productHandler.Products.get(pid)
    let sid = p.shopID

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)

    let edit = await shopHandler.Shops.get(parseInt(sid)).editProduct(pid, data)

    if (edit.status !== "ok")
        return res.status(400).json(edit)

    return res.status(200).json(edit)
})

api.delete('/shop/:sid/product/:id', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(403).json();
    }

    const accId = authed._id;
    const pid = parseInt(req.params.id)
    const sid = parseInt(req.params.sid)

    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    if (!await accountHandler.Accounts.get(accId).ownsShopID(sid))
        return res.status(400).json({status: "error", error: "You do not own this shop!"})

    console.log("Got shop ID", sid)
    let del = await shopHandler.Shops.get(sid).deleteProduct(pid)

    if (del.status !== "ok")
        return res.status(400).json(del)

    return res.status(200).json(del)
})

api.get('/shop/:sid/product', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const accId = authed._id;
    const sid = req.params.sid


    if (!shopHandler.Shops.has(parseInt(sid)))
        return res.status(400).json({status: "error", error: "That shop does not exist!"})

    console.log("Got shop ID", sid)
    let list = await shopHandler.Shops.get(parseInt(sid)).getProductList()

    if (!list.length)
        return res.status(400).json(list)

    return res.status(200).json(list)
})

api.get('/me', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).json()
    }

    const userID = authed._id;

    let me = accountHandler.Accounts.has(userID)

    if (!me) {
        return res.status(400).json({status: 'Error! Couldnt get user id for /me'})
    }
    me = accountHandler.Accounts.get(userID)

    let sids = await me.getShopIds()
    console.log("Got sids", sids)
    if (!sids) sids = []
    res.status(200).json({shops: sids, recentAddresses: me.getRecentAddresses()})
})

api.get('/address/:symbol', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const userID = authed._id;

    if (!accountHandler.Accounts.has(userID))
        return res.status(400).json({status: "error", error: `Account doesnt exist!`})

    let userAccount = accountHandler.Accounts.get(userID)
    const symbol = req.params.symbol

    if (!common.cryptoCodes.includes(symbol))
        return res.status(400).json({status: "error", error: 'Cant get new address for the given cryptoCode'})

    let url = `${Config.NBXPLORER_URL}/v1/cryptos/${symbol}/derivations/${Config.BTC_DERIV_SCHEME}/addresses/unused?reserve=true`
    //let url = `${Config.BTC_PAY_URL}/api/v1/stores/${Config.BTC_PAY_STOREID}/payment-methods/onchain/${symbol}/wallet/address?forceGenerate=true`

    console.log("Trying", url)
    // let r = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `token ${Config.BTC_PAY_TOKEN}`
    //     },
    // });

    let r = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
        },
    });

    console.log("Got symbol", symbol)
    // console.log("Got resp", await r.text())
    try {
        let json = await r.json()

        if (!json.address)
            return res.status(400).json({status: "error", error: `Unknown error while getting address data. Contact admin.`})


        let keyId = json.keyPath.split("/")[1]
        let a = new addressHandler.Address(json.address, userID, Config.USE_TESTNET ? symbol + "t" : symbol, keyId)
        userAccount.insertAddress(a)
        addressHandler.Addresses.set(a)

        a.saveToDB()

        return res.status(200).json({address: json.address})
    }
    catch(e)
    {
        return res.status(400).json({status: "error", error: `Couldnt get address. Please try again ${e}`})
    }
})


const sendBitcoin = async (receiverAddress, amountToSend) => {
    // console.log("Got priv key", mnemonic.createPrivateKey(mn)
    //     .derived._buffers.privateKey.toString("hex"))

    // const cli = new NBXClient.NBXClient({
    //     uri: 'https://btcpay.cocksuckas.com:23002',
    //     cryptoCode: 'btc',
    //     cookieFilePath: './.cookie', // Only if noauth is not active
    // });
    //
    // const healthCheckResponse = await cli.healthCheck();
    // console.log("HC", healthCheckResponse)
    const sochain_network = "BTCTEST";
    //L16uEoXwk71DxqpuhCXJw2y8Bc1Z9DnrTis7VKuqHqoThdwdzaQv
    //cTCrhzNjUgZpJry1FeGUEb7Qa8gfkkU6ng2BmheysLfQ5h8QtStx
    // console.log("Got", pkey.toAddress(bitcore.Networks.testnet))
    // console.log("Got WIF", pkey)
    const sourceAddress = "tb1qaxukg3rwr0jzs2a6atfhz2deartn2f8nvfnl98";
    const satoshiToSend = amountToSend * 100000000;
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;
    let url = `${Config.NBXPLORER_URL}/v1/cryptos/BTC/derivations/${Config.BTC_DERIV_SCHEME}/utxos`
    console.log("Got url", url)
    let utxos = await fetch(url, { headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
        }});
    utxos = await utxos.json()

    const transaction = new bitcore.Transaction();
    let totalAmountAvailable = 0;

    let inputs = [];
    let pkeys = []

    for (let element of utxos.confirmed.utxOs) {
        let utxo = {};
        utxo.satoshis = element.value;
        utxo.script = element.scriptPubKey;

        let keyId = element.keyPath.split("/")[1]
        let address = addressHandler.Addresses.getByKeyId(parseInt(keyId))

        utxo.address = address._id;
        utxo.txId = element.transactionHash;
        utxo.outputIndex = element.index;
        totalAmountAvailable += utxo.satoshis;
        inputCount += 1;
        inputs.push(utxo);
        let pkey = await address.getPrivKey()
        pkeys.push(pkey)
        //console.log('Got', utxo)
        console.log("Got pkey", pkey)
    }

    // let utxo = {};
    // utxo.satoshis = 20.26216 * 100000000;
    // utxo.address = "tb1qstfmn6j5r7x8dfj8z3gjdr2xw6lkkfzadz6yj2"
    // utxo.txId = element.txid;
    // utxo.outputIndex = element.output_no;
    // inputs.push({
    //
    // })

    console.log(inputs)
    transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
    // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte

    fee = transactionSize * 20
    if (totalAmountAvailable - satoshiToSend - fee  < 0) {
        return {"status": "error", error: "ERROR_LOW_BALANCE"}
    }

    //Set transaction input
    transaction.from(inputs);

    // set the recieving address and the amount to send
    transaction.to(receiverAddress, satoshiToSend);

    // Set change address - Address to receive the left over funds after transfer
    transaction.change(sourceAddress);

    //manually set transaction fees: 20 satoshis per byte
    transaction.fee(fee * 2);

    // Sign transaction with your private key
    transaction.sign(pkeys);

    // serialize Transactions
    const serializedTransaction = transaction.serialize();
    // Send transaction
    //return result.data.data;
    return serializedTransaction
};

api.post('/send/:symbol', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const userID = authed._id;

    // var keyPair = ECPair.fromWIF('cUDA2gkxCPP6mrrSbsCf9XceBBFmjcjfND4ySh3i4x3wb7mr6qvq', bitcoin.networks.testnet);
    // var tx = new bitcoin.Psbt({network: bitcoin.networks.testnet});
    //
    // tx.addInput({hash: 'tb1qstfmn6j5r7x8dfj8z3gjdr2xw6lkkfzadz6yj2', index: 0, value: 10000});
    // tx.addOutput({address: 'msWccFYm5PPCn6TNPbNEnprA4hydPGadBN', value: 5000});
    // tx.addOutput({address: 'tb1qstfmn6j5r7x8dfj8z3gjdr2xw6lkkfzadz6yj2', value: 4800});
    //
    // tx.sign(0, keyPair);
    //
    // let data = tx.build().toHex()

    let data = await sendBitcoin("msWccFYm5PPCn6TNPbNEnprA4hydPGadBN", 0.0001)
    console.log("Got data", data)

    if (!accountHandler.Accounts.has(userID))
        return res.status(400).json({status: "error", error: `Account doesnt exist!`})

    let userAccount = accountHandler.Accounts.get(userID)
    const symbol = req.params.symbol

    if (!common.cryptoCodes.includes(symbol))
        return res.status(400).json({status: "error", error: 'Cant get new address for the given cryptoCode'})

    let url = `${Config.NBXPLORER_URL}/v1/cryptos/${symbol}/transactions`
    //let url = `${Config.BTC_PAY_URL}/api/v1/stores/${Config.BTC_PAY_STOREID}/payment-methods/onchain/${symbol}/wallet/address?forceGenerate=true`

    let r = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_PASSWORD)
        },
        body: Buffer.from(data, "hex")
    });

    console.log("Got symbol", symbol)

    let t = await r.text()
    console.log("Got status", r.status, t)
    return res.status(200).json({t})
    // try {
    //     let json = await r.json()
    //
    //     if (!json.address)
    //         return res.status(400).json({status: "error", error: `Unknown error while getting address data. Contact admin.`})
    //
    //
    //
    //     return res.status(200).json({address: json.address})
    // }
    // catch(e)
    // {
    //     return res.status(400).json({status: "error", error: `Couldnt get address. Please try again ${e}`})
    // }
})

module.exports = api

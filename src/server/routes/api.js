const { Router } = require('express')
const api = Router()
const db = require('../db/dbhandler')
const jwtDecode = require("jwt-decode");
var jwt = require('jsonwebtoken');
const btcAddrValid = require( 'bitcoin-address-validation');
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
const Avatar = require('../classes/upload');

const multer  = require('multer')
const upload = multer({ dest: 'images/' })

//
// var bitcoin = require('bitcoinjs-lib');
// const ecc = require("tiny-secp256k1")
// const {ECPairFactory} = require("ecpair")
// const {BIP32Factory} = require("bip32")
// const ECPair = ECPairFactory(ecc);
// const bip32 = BIP32Factory(ecc);

const bitcore = require("bitcore-lib");
const {auth} = require("./auth")

async function getSendBtcTxData(receiverAddress, amountToSend, balance) {
    // console.log("Got priv key", mnemonic.createPrivateKey(mn)
    //     .derived._buffers.privateKey.toString("hex"))

    // const cli = new NBXClient.NBXClient({
    //     uri: 'https://btcpay.cocksuckas.com:23002',
    //     cryptoCode: 'btc',
    //     cookieFilePath: './.cookie', // Only if noauth is not active
    // });
    //
    // const healthCheckResponse = await cli.healthCheck();
    console.log("Got wallet balance", balance)
    // console.log("HC", healthCheckResponse)
    const sochain_network = "BTCTEST";
    //L16uEoXwk71DxqpuhCXJw2y8Bc1Z9DnrTis7VKuqHqoThdwdzaQv
    //cTCrhzNjUgZpJry1FeGUEb7Qa8gfkkU6ng2BmheysLfQ5h8QtStx
    // console.log("Got", pkey.toAddress(bitcore.Networks.testnet))
    // console.log("Got WIF", pkey)



    const changeAddress = Config.WALLET_CHANGE_ADDRESS; // should be tied to non-existing user id
    let satoshiToSend = common.toSatoshis(amountToSend)

    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;
    let url = `${common.nbUrl}/v1/cryptos/BTC/derivations/${Config.BTC_DERIV_SCHEME}/utxos`
    console.log("Got url", url)
    let utxos = await fetch(url, { headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_COOKIE_PW)
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

        let keyId = parseInt(element.keyPath.split("/")[1])
        console.log("Got keyid", keyId)

        // will never use master/change address (?)
        if (!addressHandler.Addresses.hasByKeyId(keyId) && keyId !== 0) {
            console.log("ADR HANDLER DONT HAVE")
            continue //address was not added through our API
        }

        let address = addressHandler.Addresses.getByKeyId(keyId)

        utxo.address = address._id;
        utxo.txId = element.transactionHash;
        utxo.outputIndex = element.index;
        totalAmountAvailable += element.value;
        inputCount += 1;
        inputs.push(utxo);
        let pkey = await address.getPrivKey()
        pkeys.push(pkey)
        //console.log('Got', utxo)
        //console.log("Got pkey", pkey)
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
    let transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
    // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte

    fee = transactionSize * 20

    satoshiToSend = satoshiToSend - fee

    if (totalAmountAvailable - (satoshiToSend + fee) < 0) {
        return {"status": "error", error: `ERROR_LOW_BALANCE - b: ${balance} sat ${satoshiToSend} fee ${fee} taa ${totalAmountAvailable}`}
    }

    if (balance - (satoshiToSend + fee) < 0) {
        return {"status": "error", error: `ERROR_LOW_BALANCE2 - fee ${fee} taa ${totalAmountAvailable}`}
    }


    //Set transaction input
    transaction.from(inputs);

    // set the recieving address and the amount to send
    transaction.to(receiverAddress, satoshiToSend);

    // Set change address - Address to receive the left over funds after transfer
    transaction.change(changeAddress);

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

api.get('/me', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end()
    }

    const userID = authed._id;

    let me = accountHandler.Accounts.has(userID)

    if (!me) {
        return res.status(400).json({status: 'Error! Couldnt get user id for /me'})
    }
    me = accountHandler.Accounts.get(userID)

    let sids = await me.getShopIds()

    if (!sids) sids = []

    let payload = {
        shops: sids,
        recentAddresses: me.getRecentAddresses(),
        balances: me.getAllBalances(),
        deliveryAddresses: me.getDeliveryAddresses(),
    }

    res.status(200).json(payload)
})

api.post('/me', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end()
    }

    const userID = authed._id; //TO-DO check for exist in DB

    let me = accountHandler.Accounts.has(userID)

    if (!me) {
        return res.status(400).json({status: 'Error! Couldnt get user id for /me'})
    }
    me = accountHandler.Accounts.get(userID)

    const {address} = req.body;

    if (address)
        me.newDeliveryAddress(address);

    me.saveToDB();

    res.status(200).end()
})

api.delete('/me', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return res.status(401).end()
    }

    const userID = authed._id; //TO-DO check for exist in DB

    let me = accountHandler.Accounts.has(userID)

    if (!me) {
        return res.status(400).json({status: 'Error! Couldnt get user id for /me'})
    }
    me = accountHandler.Accounts.get(userID)

    const {address} = req.body;

    if (address)
        me.deleteDeliveryAddress(address);

    me.saveToDB();

    res.status(200).end()
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

    let url = `${Config.NBXPLORER_URL_TESTNET}/v1/cryptos/${symbol}/derivations/${Config.BTC_DERIV_SCHEME}/addresses/unused?reserve=true`
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
            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_COOKIE_PW)
        },
    });

    console.log("Got symbol", symbol)
    // console.log("Got resp", await r.text())
    try {
        let json = await r.json()

        if (!json.address)
            return res.status(400).json({status: "error", error: `Unknown error while getting address data. Contact admin.`})


        let keyId = parseInt(json.keyPath.split("/")[1])
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

api.post('/send/:symbol', async (req, res) => {
    const authed = await auth(req.headers)

    if (!authed) {
        return;
    }

    const userID = authed._id;
    const {to, amount} = req.body
    const symbol = req.params.symbol

    // *** VALIDATE ADDRESS
    if (common.symToMainnet(symbol) === "BTC")
        if (!btcAddrValid.validate(to, Config.USE_TESTNET ? "testnet" : "mainnet"))
            return res.status(400).json({status: "error", error: `Invalid recipient address! Please try again!`})


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


    if (!accountHandler.Accounts.has(userID))
        return res.status(400).json({status: "error", error: `Account doesnt exist!`})

    let userAccount = accountHandler.Accounts.get(userID)

    if (!common.cryptoCodes.includes(symbol))
        return res.status(400).json({status: "error", error: 'Cant find the given cryptoCode'})


    // *** INTERNAL TX
    if (addressHandler.Addresses.has(to))
    {
        if (common.toSatoshis(amount) > userAccount.getBalance(symbol))
            return res.status(400).json({"status": "error", error: `ERROR_LOW_BALANCE`})

        let targetAddr = addressHandler.Addresses.get(to)
        if (!accountHandler.Accounts.has(targetAddr.ownerID))
        {
            return res.status(400).json({"status": "error", error: `ERROR_TARGET_ACC_DOESNT_EXIST`})
        }
        let targetAcc = accountHandler.Accounts.get(targetAddr.ownerID)
        targetAcc.creditBalance("BTC", common.toSatoshis(amount))
        userAccount.deduceBalance("BTC", common.toSatoshis(amount))
        targetAcc.saveToDB()
        userAccount.saveToDB()

        console.log(">>> Processed internal tx")
        return res.sendStatus(200)
    }

    let data = await getSendBtcTxData(to, amount, userAccount.getBalance(symbol))

    if (data.status)
        return res.status(400).json(data)

    console.log("Got data", data)

    let nbSymbol = common.toNbSymbol(symbol)
    let url = `${Config.NBXPLORER_URL_TESTNET}/v1/cryptos/${nbSymbol}/transactions`
    //let url = `${Config.BTC_PAY_URL}/api/v1/stores/${Config.BTC_PAY_STOREID}/payment-methods/onchain/${symbol}/wallet/address?forceGenerate=true`

    let r = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
            Authorization: 'Basic ' + base64.encode("__cookie__:" +  Config.NBXPLORER_COOKIE_PW)
        },
        body: Buffer.from(data, "hex")
    });

    console.log("Got symbol", symbol)

    let t = await r.text()
    console.log("Got status", r.status, t)

    if (r.status === 200) {
        userAccount.deduceBalance(symbol, common.toSatoshis(amount))
        userAccount.saveToDB()
    }

    return res.sendStatus(r.status)
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

api.post('/multishop', async (req, res) => {
    let {shops, onlyactive} = req.body;

    console.log("Shops: ", shops)
    if (!Array.isArray(shops))
    {
        return res.status(400).json({status: "error", error: `Shops field should be an array!`})
    }

    if (onlyactive)
        onlyactive = true;

    let payload = {};

    for (let shopId of shops) {
        if (!shopHandler.Shops.has(shopId))
            return res.status(400).json({
                status: "error",
                error: `One of the shop ids is invalid! Check provided list!`
            })
        payload[shopId] = shopHandler.Shops.get(shopId).getProductList(onlyactive);
    }

    return res.status(200).json(payload);
})

api.get('/shops', async (req, res) => {
    let {limit, order} = req.params;

    let shops = shopHandler.Shops.shops;
    let shopsRev = Array.from(shops.keys()).reverse();
    let payload = [];

    if (!limit)
        limit = 20;

    console.log(shopsRev)
    for (let i = 0; i < limit; i++) {
        let tr = shopsRev[shopsRev.length - 1 - i];
        if (!tr)
            continue;
        payload.push(tr)
    }
    return res.status(200).json(payload);
})

api.get('/image/:image',   Avatar.getImage)

module.exports = api

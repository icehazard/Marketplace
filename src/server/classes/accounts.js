let dbhandler = require("../db/dbhandler")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Config = require("../Config.json");
const common = require("./common")
const shopHandler = require("./shops")

const fetch = require("node-fetch");
const base64 = require("base-64");
const bitcore = require("bitcore-lib");

function Accounts()
{
    this.accs = new Map();

    this.getAccounts = function() {
        return this.accs;
    }

}

Accounts.prototype.insert = function(obj) {
    this.getAccounts().set(obj._id, obj);
};

Accounts.prototype.get = function(id) {
    return this.getAccounts().get(id);
};

Accounts.prototype.has = function(id) {
    return this.getAccounts().has(id);
};

Accounts.prototype.loadFromDB = async function() {
    let data = await dbhandler.cols.list.colAccounts.find({}).toArray()

    for (let a of data)
        if (!this.getAccounts().has(a._id)) {
            this.getAccounts().set(a._id, new Account(a))
        }


    console.log(`*** Loaded ${this.getAccounts().size} accounts!`)
};

const SECRET_KEY = Config.SECRET_KEY;

class Account {

    constructor(a)
    {
        this._id = a._id;
        this.username = a.username;
        this.addresses = a.addresses || new Map([['BTC', new Map()], ['DOGE', new Map()], ['LTC', new Map()],
            ['ETH', new Map()],  ['BTCt', new Map()]])
        this.balances = a.balances || {BTC: 0, DOGE: 0, LTC: 0, ETH: 0, BTCt: 0}
        this.deliveryAddresses = a.deliveryAddresses || [];
        this.orders = a.orders || [];
    }

    /*** ACCOUNT LOGIN ***/
    static async login(unameOrEmail, password, token) {

        if (token)
            return "LOGIN_ALREADY_LOGGED_IN"

        let data = await dbhandler.cols.list.colAccounts.findOne({username: unameOrEmail.toLowerCase()})

        if (!data) {
            data = await dbhandler.cols.list.colAccounts.findOne({email: unameOrEmail.toLowerCase()})
            if (!data) {
                console.log("Acc doesnt exist!");
                return "LOGIN_ACCOUNT_NOT_FOUND"
            }
        }

        console.log("Login: user FOUND");
        console.log(data);

        return await new Promise((resolve, rej) => {
            bcrypt.compare(password, data.password, function (err, res) {
                if (res) {
                    console.log("Password matches!");

                    if (!accs.has(data._id)) {
                        accs.insert(new Account(data))
                    }

                    return resolve({
                        token: data.token,
                        username: data.username
                    })

                } else {
                    console.log("Passwords dont match!");
                    return resolve("LOGIN_ACCOUNT_NOT_FOUND")
                }
            });
        } )

    }

    /*** ACCOUNT REGISTRATION ***/
    static async register(username, password, email) {

        let data = await dbhandler.cols.list.colAccounts.findOne({
            username: username
        })

        // *** ALL RETURN VALUS: (as string) ***:
        // ACCOUNT_NOTFOUND
        // ACCOUNT_USERNAME_UNAVAILABLE
        // ACCOUNT_CREATION_OK
        // ACCOUNT_CREATION_ERROR


        if (data) {
            console.log("Username is unavailable");
            return "ACCOUNT_USERNAME_UNAVAILABLE"
        }


        data = await dbhandler.cols.list.colAccounts.findOne({
            email: email
        })

        if (data) {
            console.log("Username is unavailable");
            return "ACCOUNT_EMAIL_ALREADY_REGISTERED"
        }

        let nid = 0;

        data = await dbhandler.cols.list.colAccounts.find().sort({
            _id: -1
        }).limit(1).toArray()

        if (!data || !data.length) {
            console.log("Got error with latest ID");
            nid = 1;
            // return "ACCOUNT_CREATION_ERROR"
        } else {
            console.log("Got latest ID:");
            console.log(data);
            nid = data[0]._id + 1;
        }

        return new Promise((resolve, reject) => {
            //hashing is async
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    return resolve("ACCOUNT_CREATION_ERROR")
                }

                let expy = Date.now() + 3600 * 24 * 365;
                let user = {
                    _id: nid,
                    exp: expy
                };
                let ntoken = jwt.sign(user, SECRET_KEY);

                let respy = {
                    resp: 'success',
                    username: username,
                    token: ntoken
                };
                console.log("Sending resp");
                console.log(respy);

                let data = {
                    _id: nid,
                    username: username,
                    email: email,
                    password: hash,
                    token: ntoken
                }

                dbhandler.cols.list.colAccounts.insertOne(data);
                accs.insert(new Account(data))

                return resolve({resp: "ACCOUNT_CREATION_OK", data: respy})
            });
        })
    }

    async getRoleId() {
        let data = await dbhandler.cols.list.colRoles.findOne({
            _id: this._id
        })

        if (!data)
            return common.roles.ROLE_USER

        return data.role;
        // switch (data._id) {
        //     case common.roles.ROLE_SHOP_OWNER:
        //         return common.roles.ROLE_SHOP_OWNER
        //     case common.roles.ROLE_SHOP_MANAGER:
        //         return common.roles.ROLE_SHOP_MANAGER
        //     case common.roles.ROLE_ADMIN:
        //         return common.roles.ROLE_ADMIN
        //     default:
        //         return common.roles.ROLE_USER
        // }

    }
    async getShopIds() {
        return shopHandler.Shop.getShopsByUserId(this._id)
    }
    async hasShop() {
        return shopHandler.Shops.getShopByOwnerId(this._id)
    }

    async ownsShopID(sid) {
        let shopObject = await shopHandler.Shops.getShopByOwnerId(this._id)
        console.log("🚀 ~ file: accounts.js ~ line 208 ~ Account ~ ownsShopID ~ shopObjects", this._id)

        if (!shopObject) //has no shop
            return false

        if (shopObject._id == sid)
            return true
        else console.log("BOPE", shopObject.ownerID, sid)
        return false
    }

    async getDepositAddress() {

    }

    async createDepositAddress() {

    }

    insertAddress(obj) {
        if (!this.addresses.has(obj.symbol))
            return;

        this.addresses.get(obj.symbol).set(obj.address, obj)
    }

    creditBalance(symbol, amount) {
        if (Config.USE_TESTNET)
            symbol = common.symToTestNet(symbol)

        if (!this.balances[symbol])
            this.balances[symbol] = 0;

        console.log("Old balance", this.balances[symbol], "adding", amount)
        this.balances[symbol] += amount;
        console.log("New balance", this.balances[symbol])
    }

    deduceBalance(symbol, amount) {
        if (Config.USE_TESTNET)
            symbol = common.symToTestNet(symbol)

        this.balances[symbol] -= amount;
    }

    async saveToDB() {
        console.log(this.deliveryAddresses)
        dbhandler.cols.list.colAccounts.updateOne({_id: this._id},
            {$set: {balances: this.balances, deliveryAddresses: this.deliveryAddresses}}, {upsert: true})
    }
    getRecentAddresses() {
        let payload = {
            BTC: null,
            DOGE: null,
            ETH: null,
            LTC: null,
            BTCt: null,
        }

        //console.log(this.addresses)
        for (const [k,v] of this.addresses.entries())
        {
            if (!v.size)
                continue

            let latest = Array.from(v.values())[v.size - 1];
            //console.log(latest)
            payload[k] = {_id: latest._id, symbol: latest.symbol}
            ///console.log(`Recent address Setting ${k} to ${latest}`)
            // for (let a of v) //loop thru addresses
            // {
            //
            // }
        }
       // console.log(this.addresses)
        return payload;
    }

    getBalance(symbol) {
        if (!this.balances[symbol])
            return 0

        return this.balances[symbol]
    }

    getAllBalances() {
        return this.balances
    }
    getDeliveryAddresses() {
        return this.deliveryAddresses;
    }
    getOrders() {
        return this.orders
    }
    newDeliveryAddress(adr) {
        if (adr.default) {
            this.deliveryAddresses = this.deliveryAddresses.filter(i => {
                if (i.default)
                    delete i["default"];

                return true
            })
        } //unsert all defaults

        let f = this.deliveryAddresses.findIndex(i => i.address === adr.oldAddress || i.address === adr.address);
        if (f !== -1) {

            this.deliveryAddresses[f] = adr;
            return;
        }

        this.deliveryAddresses.push(adr);
    }

    deleteDeliveryAddress(adr) {
        console.log(this.deliveryAddresses)
        this.deliveryAddresses = this.deliveryAddresses.filter(i => i.address !== adr.address
        )
    }

    hasDeliveryAddress(adr) {
        return this.deliveryAddresses.findIndex(i => i.address === adr) !== -1;
    }

    getDeliveryAddress(adr) {
        let idx = this.deliveryAddresses.findIndex(i => i.address === adr)
        if (idx !== -1)
            return this.deliveryAddresses[idx]

        return false
    }

    hasOrder(oid) {
        if (!this.orders || !this.orders.length)
            return false;

        return this.orders.includes(oid)
    }


}

let accs = new Accounts()

module.exports = {Account, Accounts: accs}
const Config = require("../Config.json")

module.exports = {
    cryptoCodes: ['BTC', 'ETH', 'DOGE', 'BTCt'],
    roles: {
        ROLE_ADMIN: 9,
        ROLE_SUPPORT: 8,
        ROLE_SHOP_OWNER: 2,
        ROLE_SHOP_MANAGER: 1,
        ROLE_USER: 0,
    },
    nbUrl: Config.USE_TESTNET ? Config.NBXPLORER_URL_TESTNET : Config.NBXPLORER_URL_MAINNET,
    toNbSymbol: function(symbol) {
        return Config.USE_TESTNET ? symbol.substring(0, symbol.length - 1) : symbol
    },
    symToTestNet: function(symbol) {
        if (symbol[symbol.length-1] === 't')
            return symbol;

        return symbol + "t"
    },
    symToMainnet: function(symbol) {
        if (symbol[symbol.length-1] !== 't')
            return symbol;

        return symbol.substr(0, symbol.length - 1)
    },
    toSatoshis: function(val) {
        return val * 100000000
    }
}
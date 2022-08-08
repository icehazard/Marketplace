const Config = require("../Config.json");
const jwt = require("jsonwebtoken");

const SECRET_KEY = Config.SECRET_KEY;

var options = {
    secret: SECRET_KEY,
    timeout: 300000 // 30 seconds to send the authentication message
};

// NEED TO CHECK IF ACC ID EXISTS
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

module.exports = {auth}
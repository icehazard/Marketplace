const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { WEB_SERVER_PORT } = require('./Config.json')
const apiRoute = require('./routes/api.js')
const path = require('path')
const dbhandler = require("./db/dbhandler")
const accountHandler = require("./classes/accounts.js");

(async() => {

    await new Promise((res, rej) => {
        let ret = () => {
            setTimeout(() => {
                if (Object.keys(dbhandler.cols.list).length) {
                    console.log(">> DB INITED!!!")
                    return res()
                }

                console.log(">> DB not init yet, trying again!!!")
                console.log(dbhandler.cols.list)
                return ret()
            }, 500)
        }
        ret()
    })

    await accountHandler.Accounts.loadFromDB()

    app.use(cors())
    app.use(bodyParser.json())
    app.use(morgan('tiny'))

    app.use('/api', apiRoute)

    function auth(data) {
        //clearTimeout(auth_timeout);
        jwt.verify(data.token, options.secret, options, function (err, decoded) {
            if (err) {
                socket.disconnect('unauthorized');
                console.log("Unauthorized!!!");
                return false;
            }
            if (!err && decoded) {
                //restore temporarily disabled connection
                //ws.sockets.connected[socket.id] = socket;

                socket.decoded_token = decoded;
                socket.connectedAt = new Date();
                console.info(socket.decoded_token);

                console.log('SOCKET [%s] CONNECTED', socket.id);
                return true;
            }
        })
    }

    app.listen(WEB_SERVER_PORT, () => console.log('Webserver (express) is running at port ' + WEB_SERVER_PORT))

})()



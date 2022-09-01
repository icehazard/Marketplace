
const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({
    port: 8085
});

const {auth} = require('../routes/auth')

function getSocketById(_id) {
    for (const [k,v] of wss.clients.entries())
        if (v._id === _id)
            return wss.clients[k]

    return false
}
function sendToId(_id, msg) {
    let tar = getSocketById(_id);

    if (!tar)
        return false;

    try {
        tar.send(msg)
    }
    catch(e) {

    }
}

wss.on('connection', async function(ws, req) {
    if (!req.url.includes("/?token="))
        return ws.close();

    let token = req.url.replace("/?token=", "");
    const authed = await auth({token})

    if (!authed) {
        console.log("WS UNAUTHED!", token)
        return ws.close();
    }

    const _id = authed._id;
    ws._id = _id;

    ws.on('message', function(message) {
        console.log('received: %s', message);
        let json;
        try {
            json = JSON.parse(message)

            if (json.opcode == "chat") {
                let receiverId = json.receiverId
                //if (wss.clients)
                sendToId(receiverId, json)
            }

        }
        catch (e) {
            console.log("Couldnt parse json message", e)
        }

    });
    ws.send('something');
});

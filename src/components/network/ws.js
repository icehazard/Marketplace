import ReconnectingWebSocket from 'reconnecting-websocket';
import user from "@/store/user.js";
const ws = new ReconnectingWebSocket(`ws://127.0.0.1:8085?token=${user.val('token')}`);

ws.addEventListener("open", function (event) {
    console.log("WS connected");
});

ws.addEventListener("close", function (event) {
    console.log("Encountered close, trying to reconnect");
});

ws.addEventListener("error", function (event) {
    console.log("Encountered error, trying to reconnect");
});

ws.addEventListener("message", function (event) {
    try {
        let json = JSON.parse(event.data);
        console.log(json)
    }
     catch (e) {
        console.log("Couldnt parse WS message");
        console.log(event.data)
    }
})

export default ws
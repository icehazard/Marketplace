import ReconnectingWebSocket from 'reconnecting-websocket';
import user from "@/store/user.js";
import { persist, get, post, hasError, del } from '@/assets/library/CommonFunctions.js'

const ws = new ReconnectingWebSocket(`ws://127.0.0.1:8085?token=${user.val('token') || "guest"}`);
const data = {
    wsdata: [],
}
const context = persist('wsdata', data)

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
        context.commit('wsdata', [...context.val('wsdata'), json])
    }
    catch (e) {
        console.log("Couldnt parse WS message");
        console.log(event.data)
    }
})
export default context
export {ws}
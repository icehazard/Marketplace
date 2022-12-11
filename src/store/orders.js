import { persist, get, post, patch } from '@/assets/js/util.js'
import { notify } from "@/assets/js/util.js";

const data = {
    order: {},
    chat: [],
    tracking: {},
    smMenu: true
}

const context = persist('orders', data)

context.get = async function (id) {
    let res = await get(`api/order/${id}`)
    context.commit('order', res)
    return res;
}
context.getChat = async function (id) {
    let res = await get(`api/chat/${id}`)
    context.commit('chat', res)
    return res;
}
context.markAsPaid = async function (id) {
    return await post(`api/order/${id}/markPaid`)
}
context.patch = async function (id, data) {
    return await patch(`api/order/${id}`, data)
}
context.track = async function (data) {
    let order = context.val('order')
    let payload = { trackingNo: data, id: order._id }
    let res = await post(`api/order/track`, payload)
    context.commit('tracking', res.data || false)
    return res
}
context.addMsgToStore = async function (msg) {
    let chat = context.val('chat')
    let active = context.val('order')
    if (active._id !== msg.orderId) return notify(1, msg.msg)
    let exists = chat.find(el => el._id == msg._id)
    if (exists >= 0) return;
    context.commit('chat', [...chat, msg])
}

export default context;


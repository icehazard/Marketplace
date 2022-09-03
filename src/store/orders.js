import { persist, post, get, hasError, postImage, patch, deleteImage } from '@/assets/library/CommonFunctions.js'
import { derived } from "svelte/store";
import { push } from "svelte-spa-router";
import user from '@/store/user'
import products from '@/store/products'
import { notify } from "@/assets/library/CommonFunctions.js";

const data = {
    order: {},
    chat: []
}

const context = persist('orders', data)

context.get = async function (id) {
    let res = await get(`api/order/${id}`)
    context.commit('order', res)
    return res;
}

context.getChat = async function (id) {
    return;
    let res = await get(`api/chat/${id}`)
    context.commit('chat', res)
    return res;
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


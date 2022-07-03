import { push } from "svelte-spa-router";
import { persist, get } from '@/assets/library/CommonFunctions.js'

const data = {
    username: '',
    token: '',
    me: {}
}

const context = persist('user', data)

context.logout = function () {
    context.set(data)
    push('#/login')
}
context.get = async function () {
    let res = await get('api/me')
    return context.commit('me', res)
}
context.isShopActive = function () {
    return context.val('me').length > 0;
}
context.isShopPending = function () {
    if (!context.val('me')[0]) return false;
    return context.val('me')[0].status == 0;
}

export default context

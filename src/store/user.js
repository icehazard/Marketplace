import { push } from "svelte-spa-router";
import { persist, get } from '@/assets/library/CommonFunctions.js'

const data = {
    username: '',
    token: '',
    currency: 'THB',
    theme: 'dark',
    lang: "ENG",
    me: []
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
context.shopID = function () {
    if (!context.val('me')[0]) return 0;
    return context.val('me')[0]._id
}
context.setTheme = function (data) {
    let theme = data ? data : context.val('theme')
    document.documentElement.setAttribute("data-theme", theme);
    context.commit('theme', theme)
}

export default context

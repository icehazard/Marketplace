import { push } from "svelte-spa-router";
import { derived } from "svelte/store";
import { persist, get, hasError } from '@/assets/library/CommonFunctions.js'

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
    res = hasError(res, data.me)
    return context.commit('me', res)
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
export const isShopPending = derived(context, () => {
    if (!context.val('me')[0]) return false;
    return context.val('me')[0].status == 0;
});
export const isShopActive = derived(context, () => {
    return context.val('me').length > 0;
});

export default context

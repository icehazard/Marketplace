import { push } from "svelte-spa-router";
import { derived } from "svelte/store";
import { persist, get, post, hasError, del } from '@/assets/library/CommonFunctions.js'

const data = {
    username: '',
    token: '',
    currency: 'THB',
    theme: 'dark',
    lang: "ENG",
    address: '',
    addresses: [],
    balances: {},
    me: [],
    drawer: false
}

const context = persist('user', data)

context.logout = function () {
    context.reset(data)
    push('#/login')
}
context.getAddress = async function () {
    let res = await get("api/address/BTC");
    res = hasError(res, data.address)
    return context.commit('address', res.address)
}
context.postHomeAddress = async function (data) {
    let addresses = context.val('addresses')
    context.commit('addresses', [...addresses, data])
     let res = await post("api/me", {address : data});
    return res
}
context.delHomeAddress = async function (idx, item) {
    let addresses = context.val('addresses')
    addresses.splice(idx, 1)
    context.commit('addresses', addresses)
    let res = await del("api/me", {address : item});
    return res
}
context.editHomeAddress = async function (idx, data) {
    let addresses = context.val('addresses')
    let oldAddress = addresses[idx].address
    addresses[idx] = data
    data.oldAddress = oldAddress;
    context.commit('addresses', addresses)
    let res = await post("api/me", {address : data});
    return res
}
context.get = async function () {
    let res = await get('api/me')
    res = hasError(res, data.me)
    context.commit('me', res.shops)
    context.commit('address', res.recentAddresses?.BTCt?._id)
    context.commit('balances', res.balances)
    context.commit('shipping', res.shipping)
    context.commit('addresses', res.deliveryAddresses)
}
context.shopID = function () {
    if (!context.val('me')[0]) return 0;
    return context.val('me')[0]._id
}
context.setTheme = function (data) {
    let theme = data ? data : context.val('theme')
    document.documentElement.setAttribute("data-theme", theme)
    context.commit('theme', theme)
}
export const isShopPending = derived(context, () => {
    if (!context.val('me')[0]) return false;
    return context.val('me')[0].status == 0;
});
export const isShopActive = derived(context, () => {
    return context.val('me').length > 0;
});
export const totalBalance = derived(context, () => {
    return context.val('balances')?.BTCt;
});

export default context

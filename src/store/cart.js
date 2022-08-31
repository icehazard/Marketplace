import user from '@/store/user'
import { derived } from "svelte/store";
import { persist, get, post, hasError, del } from '@/assets/library/CommonFunctions.js'

const data = {
    cart: [],
}

const context = persist('cart', data)

context.addToCart = async function (item) {
    console.log("🚀 ~ item", item)
    let cartVal = context.val('cart')
    let el = cartVal.findIndex((el) => el._id == item._id)
    if (el >= 0) {
        cartVal[el].qty = Number(cartVal[el].qty) + 1
        context.commit('cart', [...cartVal])
    } else {
        item.qty = 1
        context.commit('cart', [...cartVal, item])
    }
}
context.syncCartFromServer = async function () {
    let cartVal = context.val('cart')
    let products = cartVal.map(el => el._id)
    let res = await post(`api/multiproduct`, {products})
    res = Object.values(res).flat();
    res.forEach((el, idx) => el.qtyCart = cartVal[idx].qtyCart)
    console.log("🚀 ~ res", res)
    context.commit('cart', res)
    return res
}
context.removeFromCart = async function (item) {
    let index = context.val('cart').findIndex((el) => Object.is(el, item));
    context.val('cart').splice(index, 1)
    context.commit('cart', context.val('cart'))
}
context.updateItem = function (item) {
    item.qty = Number(item.qty)
    let cartVal = context.val('cart')
    if (Math.sign(item.qty) < 1) context.removeFromCart(item)
    context.commit('cart', [...cartVal])
}

context.submitCart = async function (address, paymentType) {
    let data = {};
    let item = []
    let cartVal = context.val('cart')
    cartVal.forEach(el => item.push({ _id: el._id, shopID: el.shopID, qty: el.qty }))
    data.products = item;
    data.address = address;
    data.paymentType = paymentType;
    return await post("api/order", data);
}

export const sumPriceTotal = derived(context, () => {
    return context.val('cart').reduce((accumulator, curValue) => {
        let price = Number(curValue.price) * Number(curValue.qty)
        return accumulator + price
    }, 0)
});
export const sumQtyTotal = derived(context, () => {
    return context.val('cart').reduce((accumulator, curValue) => {
        return accumulator + Number(curValue.qty)
    }, 0)
});

export default context;
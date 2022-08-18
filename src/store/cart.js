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

context.submitCart = async function (address, payment) {
    let data = [];
    let item = []
    let cartVal = context.val('cart')
    cartVal.forEach(el => item.push({ _id: el._id, shopID: el.shopID, qty: el.qty }))
    data.items = item;
    data.address = address;
    data.payment = payment;
    console.log("🚀 ~ data", data)
   // let res = await get("api/payment", data);
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
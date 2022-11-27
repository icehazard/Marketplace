import { derived } from "svelte/store";
import { acts } from "@tadashi/svelte-notification";
import { persist, post,} from '@/assets/js/util.js'

const data = {
    cart: [],
    smList: true
}

const context = persist('cart', data)

context.addToCart = async function (item) {
    let cartVal = context.val('cart');
    let el = cartVal.findIndex((el) => el._id == item._id)
    if (el >= 0) {
        cartVal[el].qtyCart = Number(cartVal[el].qtyCart) + 1
        context.commit('cart', [...cartVal])
    } else {
        item.qtyCart = 1
        context.commit('cart', [...cartVal, item])
    }
}
context.syncCartFromServer = async function () {
    let cartVal = context.val('cart')
    let products = cartVal.map(el => el._id)
    let res = await post(`api/multiproduct`, { products })
    res = Object.values(res).flat();
    res.forEach((el, idx) => el.qtyCart = cartVal[idx].qtyCart)
    context.checkValid(res)
    context.commit('cart', res)
    return res
}
context.checkValid = async function (items) {
    let cartVal = context.val('cart')
    let validate = items.map(validFunc)
    validate = validate.includes(true)
    if (!validate) return;
    let notify ={ mode: "danger", message: `A product's price or stock level has changed`, lifetime: 2 };
    acts.add(notify)
    console.log("ERROR You cart has been updated")
    items.map((el, idx) => el.qtyCart = Number(cartVal[idx].qty))
}
context.removeFromCart = async function (item) {
    let index = context.val('cart').findIndex((el) => Object.is(el, item));
    context.val('cart').splice(index, 1)
    context.commit('cart', context.val('cart'))
}
context.updateItem = function (item) {
    let cartVal = context.val('cart')
    let con1 = Number(item.qty) < Number(item.qtyCart)
    if (con1) item.qtyCart = Number(item.qty)
    let notify = { mode: "danger", message: `Not enough items in the store's stock to add to your cart`, lifetime: 2 };
    if (con1) acts.add(notify)
    else item.qtyCart = Number(item.qtyCart)
    if (Math.sign(item.qtyCart) < 1) context.removeFromCart(item)
    context.commit('cart', [...cartVal])
}

context.submitCart = async function (address, paymentType) {
    let data = {};
    let item = []
    let cartVal = context.val('cart')
    cartVal.forEach(el => item.push({ _id: el._id, qty: el.qtyCart }))
    data.products = item;
    data.address = address;
    data.paymentType = paymentType;
    data.shopId = cartVal[0].shopID
    return await post("api/order", data);
}

export const sumPriceTotal = derived(context, () => {
    return context.val('cart').reduce((accumulator, curValue) => {
        let price = Number(curValue.price) * Number(curValue.qtyCart)
        return accumulator + price
    }, 0)
});
export const sumQtyTotal = derived(context, () => {
    return context.val('cart').reduce((accumulator, curValue) => {
        return accumulator + Number(curValue.qtyCart)
    }, 0)
});

export default context;

function validFunc(el, idx) {
    let cartVal = context.val('cart')
    let con1 = cartVal[idx].qtyCart > Number(el.qty)
    let con2 = Number(cartVal[idx].price) !== Number(el.price)
    return con1 || con2
}
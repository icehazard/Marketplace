import { persist, post, get, del, patch, hasError } from '@/assets/library/CommonFunctions.js'
import user from '@/store/user.js'
import { derived } from "svelte/store";
import {hasErrorNonRetarded} from "../assets/library/CommonFunctions";

const data = {
    products: [],
    productsAll: [],
    product: {},
}

const context = persist('products', data)

context.post = async function () {
    const id = user.shopID();
    const prod = context.val('product');
    return await post(`api/shop/${id}/product`, prod)
}
context.edit = async function (payload) {
    const id = context.val('product')._id;
    const prod = context.val('product');
    let res = await patch(`api/product/${id}`, {...prod, ...payload});
    let error = hasErrorNonRetarded(res)
    if (!error)
        context.commit('product', {...prod, ...payload})
    return error;
}
context.get = async function () {
    const id = user.shopID();
    if (!id) return;
    let res = await get(`api/shop/${id}/product`)
    res = hasError(res, data.products)
    return context.commit('products', res)
}
context.getProduct = async function (id) {
    if (!id) return;
    let res = await get(`api/product/${id}`)
    res = hasError(res, data.product)
    return context.commit('product', res)
}
context.getAllProducts = async function (onlyactive=false) {
    let shops = await get(`api/shops`)
    let res = await post(`api/multishop` + (onlyactive ? "?onlyactive=true" : ""), {shops, onlyactive})
    console.log(res)
    res = Object.values(res).flat();
    context.commit('productsAll', res)
    return res
}
context.del = async function (id) {
    const sid = user.shopID();
    let res = await del(`api/shop/${sid}/product/${id}`);
    await context.get();
    await context.getAllProducts()
    return
}

export const isOwnProduct = derived(context, () => {
    let ownShops = (user.val('me'));
    let id = context.val('product');
    let shopID = ownShops.find((el) => Number(el._id) === id.shopID);
    if (!shopID) return false
    return shopID._id >= 0 ? true : false;
});

export default context

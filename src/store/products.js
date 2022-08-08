import { persist, post, get, del, patch, hasError } from '@/assets/library/CommonFunctions.js'
import user from '@/store/user.js'
import { derived } from "svelte/store";

const data = {
    // _id: 0,
    // shopID: 0,
    // name: '',
    // imageURL: '', //DelETE ME 
    // photos: [],
    // price: 0,
    // qty: 0,
    // desc: '',
    products: [],
    product: {},
}

const context = persist('products', data)

context.post = async function () {
    const id = user.shopID();
    const items = {
        name: context.val('name'),
        imageURL: context.val('imageURL'), //delete me
        price: context.val('price'),
        qty: context.val('qty'),
        desc: context.val('desc'),
        _id: context.val('_id'),
        shopID: context.val('shopID'),
        photos: context.val('photos'),

    }
    return await post(`api/shop/${id}/product`, items)
}
context.edit = async function () {
    const id = context.val('product')._id;
    const items = {
        name: context.val('name'),
        imageURL: context.val('imageURL'), //delete me
        price: context.val('price'),
        qty: context.val('qty'),
        desc: context.val('desc'),
        _id: context.val('_id'),
        shopID: context.val('shopID'),
        photos: context.val('photos'),
    }
    return await patch(`api/product/${id}`, items)
}
context.get = async function () {
    const id = user.shopID();
    if (!id) return;
    let res = await get(`api/shop/${id}/product`)
    res = hasError(res, data.products)
    return context.commit('products', res)
}
context.getAllProducts = async function () {
    let shops = await get(`api/shops`)
    let res = await post(`api/multishop`, shops)

    res = Object.values(res).flat();
    console.log("🚀 ~ res", res)
    return context.commit('products', res)
}
context.del = async function (id) {
    const sid = user.shopID();
    await del(`api/shop/${sid}/product/${id}`);
    await context.get();
    return
}
context.spreadProduct = async function () {
    let prod = context.val('product')
    context.commit('name', prod.name)
    context.commit('imageURL', prod.imageURL), //delete me
    context.commit('price', prod.price)
    context.commit('qty', prod.qty)
    context.commit('desc', prod.desc)
    context.commit('_id', prod._id)
    context.commit('shopID', prod.shopID)
    context.commit('photos', prod.photos)
}

export const isOwnProduct = derived(context, () => {
    let ownShops = (user.val('me'));
    let id = context.val('product');
    let shopID = ownShops.find((el) => Number(el._id) === id.shopID);
    if (!shopID) return false
    return shopID._id >= 0 ? true : false;
});

export default context

import { persist, post, get, del, patch, hasError } from '@/assets/library/CommonFunctions.js'
import user from '@/store/user.js'

const data = {
    name: '',
    imageURL: '',
    price: 0,
    qty: 0,
    desc: '',
    products: [],
    product: {},
}

const context = persist('products', data)

context.post = async function () {
    const id = user.shopID();
    const items = {
        name: context.val('name'),
        imageURL: context.val('imageURL'),
        price: context.val('price'),
        qty: context.val('qty'),
        desc: context.val('desc'),
    }
    return await post(`api/shop/${id}/product`, items)
}
context.edit = async function () {
    const id = context.val('product')._id;
    const items = {
        name: context.val('name'),
        imageURL: context.val('imageURL'),
        price: context.val('price'),
        qty: context.val('qty'),
        desc: context.val('desc'),
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
    context.commit('imageURL', prod.imageURL)
    context.commit('price', prod.price)
    context.commit('qty', prod.qty)
    context.commit('desc', prod.desc)
}

export default context

import { persist, post, get, del, patch } from '@/assets/library/CommonFunctions.js'
import user from '@/store/user.js'

const data = {
    name: '',
    imageURL: '',
    price: 0,
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
        desc: context.val('desc'),
    }
    return await patch(`api/product/${id}`, items)
}
context.get = async function () {
    const id = user.shopID();
    let res = await get(`api/shop/${id}/product`)
    return context.commit('products', res)
}
context.del = async function (id) {
    const sid = user.shopID();
     await del(`api/shop/${sid}/product/${id}`);
     await context.get();
     return
}
context.getById = async function (id) {
    let res = await get(`api/products/${id}`)
    return context.commit('product', res)
}
context.spreadProduct = async function () {
    let prod = context.val('product')
    context.commit('name', prod.name)
    context.commit('imageURL', prod.imageURL)
    context.commit('price', prod.price)
    context.commit('desc', prod.desc)

}

export default context

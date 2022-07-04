import { persist, post, get, del } from '@/assets/library/CommonFunctions.js'
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
context.get = async function () {
    let res = await get('api/shop/1/product')
    return context.commit('products', res)
}
context.del = async function () {
    return await del('api/shop/1/product/delete')
}
context.getById = async function (id) {
    let res = await get(`products/${id}`)
    return context.commit('product', res)
}

export default context

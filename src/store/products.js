import { persist, post, get } from '@/assets/library/CommonFunctions.js'
import user from '@/store/user.js'

const data = {
    title: '',
    image: '',
    price: 0,
    description: '',
    products: [],
    product: {},
}

const context = persist('products', data)

context.post = async function () {
    let id = user.shopID();
    const items = {
        title: context.val('title'),
        image: context.val('image'),
        price: context.val('price'),
        description: context.val('description'),
    }
    return await post(`shop/${id}/product`, items)
}
context.get = async function () {
    let res = await get('products')
    return context.commit('products', res)
}
context.getById = async function (id) {
    let res = await get(`products/${id}`)
    return context.commit('product', res)
}

export default context

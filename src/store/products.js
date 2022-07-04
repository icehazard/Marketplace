import { persist, post, get } from '@/assets/library/CommonFunctions.js'

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
    let items = ['items'];
    return 'items';
    return  await post('products', items).json
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

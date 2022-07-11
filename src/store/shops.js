import { persist, post, get, hasError } from '@/assets/library/CommonFunctions.js'

const data = {
    id: "",
    name: "",
    desc: "",
    coverPic: "",
    displayPic: "",
    loc: "",
    shop: {
        coverPic: "",
        displayPic: "",
        sellerPic: "",
        name: "",
        desc: "",
        loc: "",
        sales: "",
        sellerContact: "",
        allProducts: [],
        featuredProducts: [],
        reviews: {}
    }
}

const context = persist('shops', data)

context.get = async function (id) {
    if (!id) return;
    let res = await get(`api/shop/${id}`)
    res = hasError(res, data.products)
    context.commit('id', res._id)
    context.commit('name', res.shopName)
    context.commit('address', res.address)
    context.commit('shopType', res.shopType)
    context.commit('name', res.shopName)
}

export default context;
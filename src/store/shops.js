import { persist, post, get, hasError, postImage, patch, deleteImage, push } from '@/assets/js/util.js'
import { derived } from "svelte/store";
import user from '@/store/user'
import products from '@/store/products'

const data = {
    id: 0,
    name: "",
    desc: "",
    address: "",
    coverPic: "",
    displayPic: "",
    products: [],
    paymentMask: 0,
    shipping: {
        regular: 35,
        minFree: 1000,
        minSpend: 200,
    },
}

const context = persist('shops', data)

context.get = async function (id) {
    let res = await get(`api/shop/${id}`)
    console.log("🚀 ~ res", res)
    let paymentMask = 'paymentMask' in res ? res.paymentMask : 3;
    res = hasError(res, data.products)
    context.commit('id', res._id)
    context.commit('name', res.shopName)
    context.commit('address', res.address)
    context.commit('shopType', res.shopType)
    context.commit('name', res.shopName)
    context.commit('products', res.products)
    context.commit('displayPic', res.profile)
    context.commit('coverPic', res.cover)
    context.commit('desc', res.description)
    context.commit('shipping', res.shipping)
    context.commit('paymentMask', paymentMask)
    if (res.length == 0) push('#/')
    return res
}

context.postCover = async function (data) {
    let url = `api/shop/${context.val('id')}/album?type=cover`
    let res = await postImage(url, data)
    context.commit('coverPic', res.avatar)
    return res.avatar
}

context.postProductImage = async function (data, index) {
    let url = `api/product/${products.val('product')._id}/album?index=` + index;
    return await postImage(url, data);
}

context.deleteProductImage = async function (data, index) {
    let url = `api/product/${products.val('product')._id}/album?index=` + index;
    return await deleteImage(url, data)
}

context.postProfile = async function (data) {
    let url = `api/shop/${context.val('id')}/album?type=profile`
    let res = await postImage(url, data)
    context.commit('displayPic', res.avatar)
    return res.avatar
}

context.patch = async function (data) {
    return await patch(`api/shop/${context.val('id')}`, data)
}

export default context;
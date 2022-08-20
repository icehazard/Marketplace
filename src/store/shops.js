import { persist, post, get, hasError, postImage, patch, deleteImage } from '@/assets/library/CommonFunctions.js'
import { derived } from "svelte/store";
import { push } from "svelte-spa-router";
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
    shipping: {
        regular: 35,
        minFree: 1000,
        minSpend: 200,
    },
}

const context = persist('shops', data)

context.get = async function (id) {
    let res = await get(`api/shop/${id}`)
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
   // context.commit('shipping', res.shipping)
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
    let res = await postImage(url, data)
    return res.avatar
}

context.deleteProductImage = async function (data, index) {
    let url = `api/product/${products.val('product')._id}/album?index=` + index;
    let res = await deleteImage(url, data)
    return 
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

export const isOwnShop = derived(context, () => {
    let ownShops = (user.val('me'));
    let id = context.val('id');
    let shopID = ownShops.find((el) => Number(el._id) === id);
    if (!shopID) return false
    return shopID._id >= 0 ? true : false;
});

export default context;
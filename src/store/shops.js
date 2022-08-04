import { persist, post, get, hasError, postImage, patch } from '@/assets/library/CommonFunctions.js'
import user from '@/store/user'

const data = {
    id: 0,
    name: "",
    desc: "",
    coverPic: "",
    displayPic: "",
    loc: "",
    // shop: {
    //     coverPic: "",
    //     displayPic: "",
    //     sellerPic: "",
    //     name: "",
    //     desc: "",
    //     loc: "",
    //     sales: "",
    //     sellerContact: "",
    //     allProducts: [],
    //     featuredProducts: [],
    //     reviews: {}
    // }
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

context.postCover = async function (data) {
    let url = `api/shop/${context.val('id')}/album?type=cover`
    let res = await postImage(url, data)
    context.commit('coverPic', res.avatar)
    return res.avatar
}

context.postProfile = async function (data) {
    let url = `api/shop/${context.val('id')}/album?type=profile`
    let res = await postImage(url, data)
    context.commit('displayPic', res.avatar)
    return res.avatar
}

context.patch = async function (data) {
    let res = await patch(`api/shop/${context.val('id')}`, data)
    return res.avatar
}

// context.post = async function (data) {
//     let coverImage = await context.postImage(data)
// }

context.isOwnShop = function () {
    let ownShops = (user.val('me'));
    let id = context.val('id');
    let shopID = ownShops.find((el) => Number(el._id) === id);
    if (!shopID) return false
    return shopID._id >= 0 ? true : false;
}

export default context;
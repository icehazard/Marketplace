import { persist, post, get, hasError, postImage } from '@/assets/library/CommonFunctions.js'
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

context.postImage = async function (data) {
    let res = await postImage('api/shop/self', data)
    context.commit('coverPic', res.avatar)
    return res.avatar
}

context.post = async function (data) {
    let coverImage = await context.postImage(data)
   // return await post('api/shops', { coverImage });

}

context.isOwnShop = function () {
    let ownShops = Object.keys(user.val('me'));
    let id = context.val('id');
    let shopID = ownShops.find((el) => Number(el) === id);
    return shopID >= 0 ? true : false;
}

export default context;
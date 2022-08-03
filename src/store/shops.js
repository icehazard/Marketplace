import { persist, post, get, hasError , postImage} from '@/assets/library/CommonFunctions.js'
import { WEBPACK_URL } from "@/config";

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
context.post = async function (data) {
    let res = await postImage('api/shop/self', data)
    context.commit('coverPic', res.avatar)
}

export default context;
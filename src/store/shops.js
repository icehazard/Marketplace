import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
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
        featuredProducts: []
    }
}

const context = persist('shops', data)

export default context;
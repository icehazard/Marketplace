import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
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

const context = persist('shop', data)

export default context;
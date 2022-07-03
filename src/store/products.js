import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
    title: '',
    image: '',
    price: 0,
    description: '',
    products: [],
    product: {},
}

const context = persist('products', data)

export default context

import { set } from '@/assets/library/CommonFunctions.js'

export const title = set('title', '')
export const image = set('image', '')
export const price = set('price', 0)
export const description = set('description', '')
export const products = set('products', [])
export const product = set('product', {})

export function reset(){
    title.set('')
    image.set('')
    price.set(0)
    description.set('')
    products.set([])
    product.set({})
}
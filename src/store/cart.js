import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
    cart: [],
}

const context = persist('cart', data)

context.addToCart = async function (item) {
    let cartVal = context.val('cart')
    context.commit('cart', [...cartVal, item])
}
context.removeFromCart = async function (item) {
    let index = context.val('cart').findIndex((el) => Object.is(el, item));
    context.val('cart').splice(index, 1)
    context.commit('cart', context.val('cart'))
}
context.sumPrice = function (item) {
    return context.val('cart').reduce((accumulator, curValue) => {
        let price = Number(curValue.price)
        return accumulator + price
    }, 0)
}

export default context;
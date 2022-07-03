import { get } from "svelte/store";
import { set } from '@/assets/library/CommonFunctions.js'

export const cart = set('cart', [])

export const addToCart = (product) => {
    cart.set([...get(cart), product])
}


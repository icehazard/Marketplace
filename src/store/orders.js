import { persist, post, get, hasError, postImage, patch, deleteImage } from '@/assets/library/CommonFunctions.js'
import { derived } from "svelte/store";
import { push } from "svelte-spa-router";
import user from '@/store/user'
import products from '@/store/products'

const data = {
    order: {}
}

const context = persist('orders', data)

context.get = async function (id) {
    let res = await get(`api/order/${id}`)
    context.commit('order', res)
    return;
}

export default context;
import { persist, post, get, hasError, postImage, patch, deleteImage } from '@/assets/library/CommonFunctions.js'
import { derived } from "svelte/store";
import { push } from "svelte-spa-router";
import user from '@/store/user'
import products from '@/store/products'

const data = {

}

const context = persist('orders', data)

context.get = async function (id) {
    let res = await get(`api/shop/${id}`)
    console.log("🚀 ~ res", res)
}

export default context;
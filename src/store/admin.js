import { persist, get, post, hasError } from '@/assets/library/CommonFunctions.js'

const data = {
    pendingShops: [],
}

const context = persist('admin', data)

context.get = async function () {
    let res = await get(`api/admin/approveShop`)
    res = hasError(res, data.pendingShops)
    return context.commit('pendingShops', res)
}

context.post = async function (id) {
    let data = {shopId: id}
    return await post(`api/admin/approveShop`, data)
}

export default context

import { persist, get, hasError } from '@/assets/library/CommonFunctions.js'

const data = {
    pendingShops: [],
}

const context = persist('admin', data)

context.get = async function () {
    let res = await get(`/api/chat/${id}`)
    res = hasError(res, data.products)
    return context.commit('pendingShops', res)
}

context.post = async function (id) {
    return await post(`/api/admin/approveShop`, id)
}

export default context

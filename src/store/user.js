import { push } from "svelte-spa-router";
import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
    username: '',
    token: ''
}

const context = persist('user', data)

context.logout = function () {
    context.set(data)
    push('#/login')
}

export default context

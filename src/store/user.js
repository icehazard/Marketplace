import { push } from "svelte-spa-router";
import { set } from '@/assets/library/CommonFunctions.js'

export const token_ = set('token_', '')
export const username_ = set('username_', '')

export function logout(){
    token_.set('')
    username_.set('')
    push('#/login')
}




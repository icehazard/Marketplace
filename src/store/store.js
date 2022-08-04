import { set } from '@/assets/library/CommonFunctions.js'

export const active = set('active', 0)
export const shopValid = set('shopValid', [false, false, false, false, false])


export function reset(){
    shopValid.set([false, false, false, false, false])
    active.set('')
}


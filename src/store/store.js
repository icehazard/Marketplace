import { set } from '@/assets/library/CommonFunctions.js'

export const active = set('active', 0)
export const shopValid = set('shopValid', [])
export const shopName = set('shopName', '')
export const shopType = set('shopType', '')
export const address = set('address', '')
export const bankName = set('bankName', '')
export const bankNumber = set('bankNumber', '')
export const nameOnAccount = set('nameOnAccount', '')


export function reset(){
    shopValid.set([false, false, false, false, false])
    shopName.set('')
    shopType.set('')
    address.set('')
    active.set('')
    bankName.set('')
}


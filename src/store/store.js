import { set } from '@/assets/js/util.js'

export const active = set('active', 0)
export const shopValid = set('shopValid', [false, false, false, false, false])


export function reset(){
    shopValid.set([false, false, false, false, false])
    active.set('')
}

import { persist } from '@/assets/js/util.js'

const data = {
    active: 0,
    valid: [false, false, false, false, false]
}

const context = persist('wizardStore', data)

export default context

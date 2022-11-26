import { persist} from '@/assets/js/util.js'

const data = {
    url: '/'
}

const context = persist('app', data)

export default context

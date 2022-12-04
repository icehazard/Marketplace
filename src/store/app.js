import { persist} from '@/assets/js/util.js'

const data = {
    url: '/',
    loading: true
}

const context = persist('app', data)

export default context

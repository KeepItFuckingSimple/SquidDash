import './actions/http'
import { http } from './actions/http'
const actions = {
    'http': http
}

export function call_action(action,data){
    actions[action](data)
}


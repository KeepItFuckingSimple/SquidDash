import * as http from './http';
const actions = {
    'http': http
}

export function call_action(action,data){
    actions[action].action(data)
}

export function get_all_actions(){
    return Object.keys(actions)
}

export function get_action_info(action){
    console.log(action)
    return actions[action].infos
}


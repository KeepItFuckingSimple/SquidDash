import * as http from './http';
import * as mqtt from './mqtt'
const modules = {
    'http': http,
    'mqtt': mqtt
}

export function call_module(event,data){
    var module_name = data.events[event].selected_module
    var module_data = data.events[event].action_data
    modules[module_name].action(module_data)
}

export function get_all_modules(){
    return Object.keys(modules)
}

export function get_module_info(module){
    return modules[module].infos
}


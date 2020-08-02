import * as http from './http';
import * as mqtt from './mqtt'
const modules = {
    'http': http,
    'mqtt': mqtt
}

export function call_module(module,data){
    modules[module].action(data)
}

export function get_all_modules(){
    return Object.keys(modules)
}

export function get_module_info(module){
    return modules[module].infos
}


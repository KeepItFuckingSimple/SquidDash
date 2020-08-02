import * as http from './http';
const modules = {
    'http': http
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


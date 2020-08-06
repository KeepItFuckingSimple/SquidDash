import * as http from './http';
import * as mqtt from './mqtt'
import * as storage from "local-storage"
const modules = {
    'http': http,
    'mqtt': mqtt
}

export function call_module(event,data){
    if (!data.events[event].use_preset){
        var module_name = data.events[event].selected_module
        var module_data = data.events[event].action_data
        modules[module_name].action(module_data)
    }else{
        var presets = storage.get("content").presets
        var preset = presets[data.events[event].selected_preset - 1]
        var preset_module_name = preset.selected_module
        var preset_module_data = {}
        var result;

        for (var key in preset.data){
            var analyze = [...preset.data[key].matchAll(/\$\{(.*?)\}/g)]
            var replacements = []
            var tempresult;
            if (analyze.length > 0 ){
                analyze.forEach((tag) => {
                var to_replace = tag[0]
                var replace_with = data.events[event].preset_data[tag[1]]
                console.log("Replace : "+to_replace+" by : "+replace_with)
                replacements.push({to_replace: to_replace,replace_with: replace_with})
                //result = preset.data[key].replace(to_replace,replace_with)
                console.log(result)
                })
            tempresult = preset.data[key]
            replacements.forEach((replacement) => {
                tempresult = tempresult.replace(replacement.to_replace, replacement.replace_with)
            })
            result = tempresult
            }else{
                result = preset.data[key]
            }
            preset_module_data[key] = result
        }
        console.log(preset_module_data)
        modules[preset_module_name].action(preset_module_data)
    }
}

export function get_all_modules(){
    return Object.keys(modules)
}

export function get_module_info(module){
    return modules[module].infos
}


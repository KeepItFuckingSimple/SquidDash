export function getEventData(total_data,event_name){
    return total_data[event_name]
}
export function getEventActionInputs(event_data){
    return event_data.module_data.actions[event_data.selected_action].inputs
}

export function getEventActionInputData(event,input_name){
    return event.action_data[input_name]
}
export function getEventModule(event){
    return event.selected_module
}
export function getEventModuleActions(event){
    return event.module_data.actions
}


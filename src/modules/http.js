import axios from 'axios'

export function action(data){
    axios.get(data.url)
}

export const infos = {
    name: "HTTP Official Module",
    actions: {
            "GET":{
                identifiers: {
                    method: "GET"
                },
                inputs: {
                    "url": {
                        required: true
                    }
                }
            }
        }
    
}



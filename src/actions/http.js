import axios from 'axios'

export function action(data){
    console.log("DO HTTP")
    axios.get(data.url)
}

export const infos = {
    name: "HTTP Official Action",
    variants: {
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



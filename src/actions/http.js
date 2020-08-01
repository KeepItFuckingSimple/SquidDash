import axios from 'axios'
export function http(data){
    console.log("DO HTTP")
    axios.get(data.url)
}
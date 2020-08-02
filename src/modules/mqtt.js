var mqtt = require('mqtt')
export function action(data){
    var client  = mqtt.connect('tcp://broker.hivemq.com:8000/mqtt')

    client.on('connect', function () {
    client.publish('testxxtest', data.content)
    })
    console.log("Sended : "+data.content)
}

export const infos = {
    name: "MQTT Official Module",
    actions: {
            "Publish":{
                identifiers: {
                    action: "PUBLISH"
                },
                inputs: {
                    "content": {
                        required: true
                    }
                }
            }
        }
    
}



import mqtt from "mqtt";
const MQTT_HOST = 'mqtt://85.89.43.95:9001';


export default function Climetbutton(props) {
    props = props.props
    const commands = props[0]
    const fulldata = props[1]


    const handlePublish = (data, command) => {
        const client = mqtt.connect(MQTT_HOST, {
            username: 'mattias',
            password: '8W6aG2g2apPN'
        });

        client.on('error', (error) => {
            console.error('connection failed', error)
        })

        // Publish a message to the topic associated with the card
        // client.publish(`AC/${id}`, `{ command : ${command}}`,{ qos: 0, retain: false });
        // client.publish("AC/1", "hello",{ qos: 0, retain: false });
        client.on('connect', () => {
            data.command = command
            client.publish(`AC/${data.id}`, JSON.stringify(data), { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                } else {
                    client.end();
                }
            })
        })
    };

  return (
    <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(fulldata, commands[1])}>{commands[0]}</button>

  )
}
 

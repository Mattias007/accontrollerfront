import mqtt from "mqtt";
const MQTT_HOST = 'ws://192.168.1.25:9001';


export default function Card(props) {
    const handlePublish = (id ,command) => {
        const client = mqtt.connect(MQTT_HOST, {
            username: 'mattias',
            password: '8W6aG2g2apPN'
        });
        // Publish a message to the topic associated with the card
        client.publish(`AC/${id}`, JSON.stringify({"command": command}));
        client.end();
    };

return(
<div key={props.id} className="props p-2 bg-cyan-200 rounded-xl">
                        <h2>ID : {props.id}</h2>
                        <p>Temp : {props.temp}</p>
                        <p>Hum : {props.hum}</p>
                        <p>Mode : {props.command}</p>

                        <div className="grid-cols-3 grid gap-2">
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(props.id ,0)}>Off</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(props.id ,1)}>Auto</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(props.id ,2)}>Heat</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(props.id ,3)}>Dry</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(props.id ,4)}>Cool</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(props.id ,5)}>Fan</button>
                        </div>
                    </div>
)
}
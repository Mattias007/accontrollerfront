'use server'
import mqtt from "mqtt";

const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_HOST, {
    username: process.env.NEXT_PUBLIC_MQTT_USER,
    password: process.env.NEXT_PUBLIC_MQTT_PASS
});

client.on("connect", () => {
    client.subscribe('AC/+/web', { qos: 0 })
});

client.on('message', (topic, message, packet) => {
    message = String.fromCharCode.apply(null, message);
    message = JSON.parse(message);
    console.log(message)
})
console.log(client)
"use client"
import mqtt from "mqtt";
import { useState, useEffect, useRef } from 'react';

const MQTT_HOST = 'ws://192.168.1.25:9001';

export default function MqttList() {
    const [cards, setCards] = useState([{"temp":25,"hum":50}]);
    let ref = useRef(null);



    useEffect(() => {
            const client = mqtt.connect(MQTT_HOST, {
                username: 'mattias',
                password: '8W6aG2g2apPN'
            });
        
            client.on("connect", () => {
                client.subscribe('AC/+', { qos: 0 })
            });

            client.on('message', (topic, message, packet) => {
                message = JSON.parse(message)
                message.id = parseFloat(topic.slice(3)) // slices AC/ and makes the id in to number

                const existingCardIndex = ref.current.findIndex(card => card.id == message.id);
                if (existingCardIndex != -1) {
                    // Update existing card
                    const updatedCards = [...ref.current];
                    updatedCards[existingCardIndex] = message;
                    ref.current = updatedCards
                    setCards(updatedCards);
                } else {
                    // Create a new card
                    const newCard =  message;
                                        
                    setCards(prevCards => [...prevCards, newCard]);
                }
            });return () => {
                // Disconnect client when component unmounts
                client.end();
            };


            
        }, []); // Empty dependency array to run effect only once
        
        ref.current = cards
        const sortedCards = cards.slice().sort((a, b) => a.id - b.id);

        const handlePublish = (data ,command) => {
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
                
                client.publish(`AC/${data.id}`,`{ "command" : ${command}, "id" : ${data.id}, "temp": ${data.temp},"hum": ${data.temp}  }`,{ qos: 0, retain: true }, (error) => {
                  if (error) {
                    console.error(error)
                  }else{
                    client.end();
                  }
                })
              })
        };


    return (
        <div>
            <h1>Wild Card Topic Cards</h1>
            <div className="card-container flex p-2 gap-10 flex-wrap flex-1">


            {sortedCards.map((card) => (
                    <div key={card.id} className="card p-2 bg-cyan-200 rounded-xl">
                        <h2>ID : {card.id}</h2>
                        <p>Temp : {card.temp}</p>
                        <p>Hum : {card.hum}</p>
                        <p>Mode : {card.command}</p>

                        <div className="grid-cols-3 grid gap-2">
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(card ,0)}>Off</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(card ,1)}>Auto</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(card ,2)}>Heat</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(card ,3)}>Dry</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(card ,4)}>Cool</button>
                        <button className="bg-cyan-300 p-2 rounded-xl" onClick={() => handlePublish(card ,5)}>Fan</button>
                        </div>




                    </div>
                ))}
            </div>
        </div>
    );

}
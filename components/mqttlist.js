"use client"
import mqtt from "mqtt";
import { useState, useEffect, useRef } from 'react';
import Climetbutton from "@/components/climetbutton";

const MQTT_HOST = 'mqtt://192.168.1.25:9001';

export default function MqttList() {
    const [cards, setCards] = useState([]);
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
            message = String.fromCharCode.apply(null, message);
            message = JSON.parse(message);

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
                const newCard = message;

                setCards(prevCards => [...prevCards, newCard]);
            }
        }); return () => {
            // Disconnect client when component unmounts
            client.end();
        };



    }, []); // Empty dependency array to run effect only once

    ref.current = cards
    const sortedCards = cards.slice().sort((a, b) => a.id - b.id);



    const Modes = [
        ["Off", 0],
        ["On", 1],
        ["Heat", 2],
        ["Cool", 3],
        ["Dry", 4],
        ["Fan", 5]
      ]
    return (
        <div>
            <h1>Wild Card Topic Cards</h1>
            <div className="card-container grid p-2 gap-10 grid-cols-3">

                {sortedCards.map((card) => (
                    <div key={card.id} className="card p-4  border border-gray-200 rounded-xl">
                        <h2>ID : {card.id}</h2>
                        <p>Temp : {card.temp}</p>
                        <p>Hum : {card.hum}</p>
                        <p>Mode : {Modes[card.command][0]}</p>

                        <div className="grid-cols-3 grid gap-2">
                            {Modes.map((mode) => (  
                                <Climetbutton  key={mode[0]} props={[mode,card]}  />
                            ))}

                            {/* <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(card ,0)}>Off</button>
                        <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(card ,1)}>Auto</button>
                        <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(card ,2)}>Heat</button>
                        <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(card ,3)}>Dry</button>
                        <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(card ,4)}>Cool</button>
                        <button className="bg-sky-100  p-2 rounded-xl" onClick={() => handlePublish(card ,5)}>Fan</button> */}
                        </div>




                    </div>
                ))}
            </div>
        </div>
    );

}
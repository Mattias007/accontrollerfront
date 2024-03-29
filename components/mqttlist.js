"use client"
import mqtt from "mqtt";
import { useState, useEffect, useRef  } from 'react';
import Climetbutton from "@/components/climetbutton";
import Overidebutton from "./overidebuttons";
import Targettemp from "./targettemp";
import ProfileClient from "./clientProfile";


const MQTT_HOST = 'mqtt://85.89.43.95:9001';

export default function MqttList() {

    const [cards, setCards] = useState([]);
    const [mqttclient, setmqttclient] = useState();


    let ref = useRef(null);

        
    useEffect(() => {


        const client = mqtt.connect(MQTT_HOST, {
            username: 'mattias',
            password: '8W6aG2g2apPN'
        });

        client.on("connect", () => {
            client.subscribe('AC/+/web', { qos: 0 })
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
            setmqttclient(client);
        }); return () => {
            // Disconnect client when component unmounts
            client.end();
        };



    }, []); // Empty dependency array to run effect only once




    ref.current = cards
    const sortedCards = cards.slice().sort((a, b) => a.id - b.id);

    const Modes = [
        ["Off",0],
        ["Auto",1],
        ["Heat",2],
        ["Cool",3],
        ["Dry",4],
        ["Fan",5]
      ]
      const Logic = [
        ["Off",0],
        ["Solar Power",1],
        ["Energy Price",2],
      ]

      function renderClimetButtons(card){
        if(card.overide == 0){
            return(
                <div className="grid-cols-3 grid gap-2 p-2">    
                    <h1 className="text-center col-span-full">Manual Mode</h1>
                    {Modes.map((mode) => (  
                        <Climetbutton  key={mode[0]} props={[mode,card,mqttclient]}  />
                    ))}
                </div>
            )
        }else{
            return <h1 className="col-span-full text-center">Controlled By Skynet©</h1>
        }
      }

    return (
        <div className="">
            <h1 className="text-center font-mono text-xl">AC Controllers</h1>

            <ProfileClient/>

            <div className="card-container grid p-2 gap-6 grid-cols-1 md:grid-cols-3">

                {sortedCards.map((card) => (
                    <div key={card.id} className="card p-4 bg-white shadow-md rounded-xl">
                        <h2 className="text-center">{card.name}</h2>
                        <div className="grid grid-cols-2 text-center text-lg">
                        <p>{card.temp.toFixed(2)}°C</p>
                        <p>{card.hum.toFixed(2)}%</p>
                        </div>
                        <h1 className="text-center">Target Temperature</h1>
                        <Targettemp props={[card,mqttclient]}/>

                        {/* <div className="grid-cols-3 grid gap-2 p-2">

                            {
                            Logic.map((logi) => (  
                                <Overidebutton  key={logi[0]} props={[logi,card,mqttclient]}  />
                            ))
                            }
                        </div> */}

                            {renderClimetButtons(card)}
                        <div className="grid-cols-3 grid gap-2 p-2">
                        </div>




                    </div>
                ))}
            </div>
        </div>
    );

}
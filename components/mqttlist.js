"use client"
import mqtt from "mqtt";
import { useState, useEffect, useRef  } from 'react';
import Climetbutton from "@/components/climetbutton";
import Overidebutton from "./overidebuttons";
import Targettemp from "./targettemp";
import Image from 'next/image'


export default function MqttList() {

    const [cards, setCards] = useState([{id:0,name:"Loading",temp:0,hum:0,overide:0,targettemp:0}]);
    const [mqttclient, setmqttclient] = useState();


    let ref = useRef(null);

        
    useEffect(() => {

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
            return (
            <div className="flex justify-center flex-col items-center">
                <h1 className="col-span-full text-center">Controlled By Skynet©</h1>
                <Image src="/who-me.gif"       
                width={110}
                height={110}
                priority={true}
                alt="Skynet android looking at camera"
                className="shadow"
                />
            </div>
        )
        }
      }

    return (
        <div className="">
            <h1 className="text-center font-mono text-xl">AC Controllers</h1>

            <div className="card-container grid p-2 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                {sortedCards.map((card) => (
                    <div key={card.id} className="card p-4 bg-white shadow-md rounded-xl">
                        <h2 className="text-center">{card.name}</h2>
                        <div className="grid grid-cols-2 text-center text-lg">
                        <p>{card.temp.toFixed(2)}°C</p>
                        <p>{card.hum.toFixed(2)}%</p>
                        </div>
                        <h1 className="text-center">Target Temperature</h1>
                        <Targettemp props={[card,mqttclient]}/>

                        <div className="grid-cols-3 grid gap-2 p-2">

                            {
                            Logic.map((logi) => (  
                                <Overidebutton  key={logi[0]} props={[logi,card,mqttclient]}  />
                            ))
                            }
                        </div>

                            {renderClimetButtons(card)}
                        <div className="grid-cols-3 grid gap-2 p-2">
                        </div>




                    </div>
                ))}
            </div>
        </div>
    );

}
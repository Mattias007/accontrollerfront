import MqttList from "@/components/mqttlist";
export default function Home() {


return (  
  <main className="">
      <MqttList />
      <a href="/api/auth/logout">Logout</a>
    </main>
  );
}

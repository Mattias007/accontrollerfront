import Logout from "@/components/logout";
import MqttList from "@/components/mqttlist";
export default function Home() {


return (  
  <main className="w-screen min-h-screen">
      <MqttList />
      <Logout/>
  </main>
  );
}

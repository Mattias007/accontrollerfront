import ProfileClient from "@/components/clientProfile";
import Graph from "@/components/graph";
import Logout from "@/components/logout";
import MqttList from "@/components/mqttlist";
export default function Home() {


return (  
  <main className="w-screen min-h-screen">
      <ProfileClient />
      <MqttList />
      {/* <Graph /> */}
      <Logout />
  </main>
  );
}

import ProfileClient from "@/components/clientProfile";
import Graphhum from "@/components/graphhum";
import Graphtemp from "@/components/graphtemp";
import Logout from "@/components/logout";
import MqttList from "@/components/mqttlist";
export default function Home() {


return (  
  <main className="w-screen overflow-hidden min-h-screen">
      {/* <ProfileClient /> */}
      <MqttList />
      <div className="grid grid-cols-1 md:grid-cols-2">
      <Graphtemp />
      <Graphhum />        
      </div>
      <Logout />
  </main>
  );
}

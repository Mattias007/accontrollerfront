import ProfileClient from "@/components/clientProfile";
import Graphhum2 from "@/components/graph2/graphhum2";
import Graphtemp2 from "@/components/graph2/graphtemp2";
import Graphhum from "@/components/graphhum";
import Graphtemp from "@/components/graphtemp";
import Logout from "@/components/logout";
import MqttList from "@/components/mqttlist";
export default function Home() {


return (  
  <main className="">
      {/* <ProfileClient /> */}
      <MqttList />
      <div className="grid grid-cols-1 md:grid-cols-2">
      <Graphtemp />
      <Graphhum />      
      <Graphtemp2/>
      <Graphhum2/>  
      </div>
      <Logout />
  </main>
  );
}

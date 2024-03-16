import Logout from "@/components/logout";
import MqttList from "@/components/mqttlist";

export default function Dashboard() {
  


return (
    <main className="">
      <MqttList />
      <Logout />
    </main>
  );
}

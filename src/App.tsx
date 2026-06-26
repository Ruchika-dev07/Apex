import { useState, useCallback } from "react";
import StatBar from "./components/StatBar";
import LeftSidebar from "./components/LeftSidebar";
import CenterCharts from "./components/CenterCharts";
import ChatPanel from "./components/ChatPanel";
import MouseTrail from "./components/MouseTrail";

function App() {
  const [chatTrigger, setChatTrigger] = useState<string | undefined>(undefined);

  const handleDistrictClick = useCallback((districtName: string) => {
    setChatTrigger(`Tell me about ${districtName}`);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F5F0E8] overflow-hidden">
      <MouseTrail />
      <StatBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar onDistrictClick={handleDistrictClick} />
        <CenterCharts />
        <ChatPanel initialMessage={chatTrigger} />
      </div>
    </div>
  );
}

export default App;

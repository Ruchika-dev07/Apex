import { useState, useCallback } from "react";
import NavBar, { type Tab } from "./components/NavBar";
import StatBar from "./components/StatBar";
import LeftSidebar from "./components/LeftSidebar";
import CenterCharts from "./components/CenterCharts";
import ChatPanel from "./components/ChatPanel";
import PropertiesTab from "./components/PropertiesTab";
import InsightsTab from "./components/InsightsTab";
import LandingSection from "./components/LandingSection";
import MouseTrail from "./components/MouseTrail";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [chatTrigger, setChatTrigger] = useState<string | undefined>(undefined);

  const handleDistrictClick = useCallback((districtName: string) => {
    setChatTrigger(`Tell me about ${districtName}`);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F5F0E8] overflow-hidden">
      <MouseTrail />
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
      <StatBar />

      <div className="flex flex-1 overflow-hidden">
        {activeTab === "dashboard" && (
          <>
            <LeftSidebar onDistrictClick={handleDistrictClick} />
            <CenterCharts />
          </>
        )}
        {activeTab === "properties" && (
          <PropertiesTab onDistrictClick={handleDistrictClick} />
        )}
        {activeTab === "insights" && (
          <InsightsTab onDistrictClick={handleDistrictClick} />
        )}
        <ChatPanel initialMessage={chatTrigger} />
      </div>

      <LandingSection />
    </div>
  );
}

export default App;

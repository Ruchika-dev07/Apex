import { LayoutDashboard, Building2, Lightbulb, Hexagon } from "lucide-react";

export type Tab = "dashboard" | "properties" | "insights";

interface NavBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: "properties", label: "Properties", icon: <Building2 className="w-4 h-4" /> },
  { key: "insights", label: "Insights", icon: <Lightbulb className="w-4 h-4" /> },
];

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <div className="h-14 bg-[#F5F0E8] border-b border-[#D4C5B0] flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-2">
        <Hexagon className="w-6 h-6 text-[#5C3D2E]" />
        <span className="text-lg font-bold text-[#1A1A1A] tracking-tight">APEX</span>
      </div>
      <div className="flex items-center gap-1 bg-white/60 rounded-lg border border-[#D4C5B0] p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
              ${activeTab === t.key
                ? "bg-[#8B6F47] text-white shadow-sm"
                : "text-[#8B6F47] hover:bg-[#8B6F47]/10"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      <div className="w-24" />
    </div>
  );
}

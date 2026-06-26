import { Activity } from "lucide-react";

export default function StatBar() {
  return (
    <div className="h-10 bg-[#F5F0E8] border-b border-[#D4C5B0] flex items-center px-5 gap-6 shrink-0">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-[#8B6F47]" />
        <span className="text-xs font-semibold text-[#1A1A1A]">Apex</span>
      </div>
      <div className="h-4 w-px bg-[#D4C5B0]" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-[#8B6F47]">20 Districts</span>
      </div>
      <div className="h-4 w-px bg-[#D4C5B0]" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-[#8B6F47]">7 Data Sources</span>
      </div>
      <div className="h-4 w-px bg-[#D4C5B0]" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-[#8B6F47]">600 Parcels</span>
      </div>
      <div className="h-4 w-px bg-[#D4C5B0]" />
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        <span className="text-xs text-green-600 font-medium">Live</span>
      </div>
    </div>
  );
}

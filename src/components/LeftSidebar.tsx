import { useState, useEffect } from "react";
import { districts, getScoreColor } from "../data/districts";
import { MapPin } from "lucide-react";

interface LeftSidebarProps {
  onDistrictClick: (districtName: string) => void;
}

export default function LeftSidebar({ onDistrictClick }: LeftSidebarProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    districts.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * 60)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClick = (id: string, name: string) => {
    setSelectedId(id);
    onDistrictClick(name);
  };

  return (
    <div className="w-[280px] flex flex-col h-full bg-[#F5F0E8] border-r border-[#D4C5B0]">
      <div className="px-4 py-5 border-b border-[#D4C5B0]">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#8B6F47]" />
          <h2 className="text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase">
            Districts
          </h2>
        </div>
        <p className="text-xs text-[#8B6F47] mt-1">{districts.length} areas analyzed</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {districts.map((district, index) => {
          const isSelected = selectedId === district.id;
          const scoreColor = getScoreColor(district.score);
          return (
            <button
              key={district.id}
              onClick={() => handleClick(district.id, district.name)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-[#D4C5B0]/50 transition-all duration-300 cursor-pointer
                ${isSelected ? "bg-[#8B6F47]/10" : "hover:bg-[#8B6F47]/5"}
                ${visible[index] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
              `}
              style={{ transitionProperty: "opacity, transform, background-color" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: scoreColor }}
              >
                {district.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#1A1A1A] truncate">
                  {district.name}
                </div>
                <div className="text-xs text-[#8B6F47]">{district.areaType}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

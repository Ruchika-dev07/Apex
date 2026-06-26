import { districts } from "../data/districts";
import { priceDemandData } from "../data/charts";
import { getScoreColor } from "../data/districts";
import { MapPin, TrendingUp, BarChart3, Home } from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

interface PropertiesTabProps {
  onDistrictClick: (districtName: string) => void;
}

const recommendedUse: Record<string, string> = {
  "Al Raha Beach": "Luxury residential & hospitality",
  "Al Bateen": "High-end villas & waterfront",
  "Al Reef": "Family villas & townhouses",
  "Al Ghadeer": "Eco-friendly suburban homes",
  "Corniche": "Mixed-use commercial & tourism",
  "Al Shamkha": "Affordable housing expansion",
  "Al Reem Island": "High-rise residential & offices",
  "Yas Island": "Entertainment & tourism assets",
  "Khalifa City": "Family communities & schools",
  "Al Bahia": "Logistics & light industrial",
  "Al Khalidiyah": "Urban mixed-use redevelopment",
  "Zayed City": "Government & civic district",
  "Mohammed Bin Zayed City": "Mid-income residential",
  "Danet Abu Dhabi": "Retail & residential hub",
  "Masdar City": "Clean-tech & sustainable living",
  "Saadiyat Island": "Cultural & luxury hospitality",
  "Musaffah": "Heavy industrial & warehousing",
  "Al Maryah Island": "Financial district & offices",
  "Al Nahyan": "Heritage & boutique retail",
  "Al Zahiyah": "Downtown revitalization",
};

const scatter3DData = districts.map((d) => {
  const pd = priceDemandData.find((p) => p.district === d.name);
  return {
    name: d.name,
    x: pd?.price ?? 2500,
    y: d.score,
    z: pd?.demand ?? 70,
    areaType: d.areaType,
  };
});

const COLORS = [
  "#5C3D2E",
  "#8B6F47",
  "#A89070",
  "#D4C5B0",
  "#3D2B1F",
  "#6B5235",
  "#9E8560",
  "#C4B49A",
];

export default function PropertiesTab({ onDistrictClick }: PropertiesTabProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F0E8] p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 3D Scatter Plot */}
        <div className="bg-white/60 rounded-xl border border-[#D4C5B0] p-5">
          <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-1">
            District Intelligence Matrix
          </h3>
          <p className="text-xs text-[#8B6F47] mb-4">
            X: Price/sqm (AED) · Y: Development Score · Bubble size: Demand Index
          </p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D4" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Price/sqm"
                  unit=" AED"
                  tick={{ fontSize: 11, fill: "#8B6F47" }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Score"
                  domain={[60, 80]}
                  tick={{ fontSize: 11, fill: "#8B6F47" }}
                />
                <ZAxis type="number" dataKey="z" range={[60, 300]} name="Demand" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D4C5B0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string, props: any) => {
                    if (name === "Price/sqm") return [`${value} AED`, name];
                    if (name === "Score") return [value, "Development Score"];
                    if (name === "Demand") return [value, "Demand Index"];
                    return [value, name];
                  }}
                  labelFormatter={(_, payload: any) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.name;
                    }
                    return "";
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Scatter data={scatter3DData} name="Districts">
                  {scatter3DData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div>
          <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">
            All 20 Districts
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {districts.map((district) => {
              const pd = priceDemandData.find((p) => p.district === district.name);
              const scoreColor = getScoreColor(district.score);
              return (
                <button
                  key={district.id}
                  onClick={() => onDistrictClick(district.name)}
                  className="bg-white/60 rounded-xl border border-[#D4C5B0] p-4 text-left hover:shadow-md hover:border-[#8B6F47] transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8B6F47]" />
                      <span className="font-semibold text-[#1A1A1A] text-sm">
                        {district.name}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: scoreColor }}
                    >
                      {district.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#8B6F47] mb-2">
                    <span className="flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      {district.areaType}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {pd?.price ?? "—"} AED/m²
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      Demand {pd?.demand ?? "—"}
                    </span>
                  </div>
                  <div className="text-xs text-[#5C3D2E] font-medium">
                    {recommendedUse[district.name] ?? "Mixed use development"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import {
  topDistrictsData,
  priceDemandData,
  transactionTypesData,
  monthlyVolumeData,
} from "../data/charts";

const COLORS = ["#5C3D2E", "#8B6F47", "#D4C5B0", "#A89070"];

export default function CenterCharts() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#F5F0E8] p-5 gap-5 overflow-y-auto">
      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
        {/* Top Left: Horizontal Bar Chart */}
        <div className="bg-white/60 rounded-xl border border-[#D4C5B0] p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Top 10 Districts by Development Score
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topDistrictsData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D4" />
                <XAxis type="number" domain={[60, 80]} tick={{ fontSize: 11, fill: "#8B6F47" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fontSize: 10, fill: "#1A1A1A" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D4C5B0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {topDistrictsData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.score >= 75 ? "#5C3D2E" : "#8B6F47"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Right: Scatter Plot */}
        <div className="bg-white/60 rounded-xl border border-[#D4C5B0] p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Price vs Demand Index
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D4" />
                <XAxis
                  type="number"
                  dataKey="price"
                  name="Price per sqm"
                  unit=" AED"
                  tick={{ fontSize: 11, fill: "#8B6F47" }}
                />
                <YAxis
                  type="number"
                  dataKey="demand"
                  name="Demand Index"
                  tick={{ fontSize: 11, fill: "#8B6F47" }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D4C5B0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "Price per sqm") return [`${value} AED`, name];
                    return [value, name];
                  }}
                />
                <Scatter data={priceDemandData} fill="#8B6F47" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Left: Transaction Types */}
        <div className="bg-white/60 rounded-xl border border-[#D4C5B0] p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Transaction Types
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionTypesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D4" />
                <XAxis dataKey="type" tick={{ fontSize: 11, fill: "#1A1A1A" }} />
                <YAxis tick={{ fontSize: 11, fill: "#8B6F47" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D4C5B0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {transactionTypesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Right: Monthly Volume */}
        <div className="bg-white/60 rounded-xl border border-[#D4C5B0] p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Monthly Transaction Volume (Jan-Jun 2026)
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyVolumeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D4" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#1A1A1A" }} />
                <YAxis tick={{ fontSize: 11, fill: "#8B6F47" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D4C5B0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#5C3D2E"
                  strokeWidth={2}
                  dot={{ fill: "#5C3D2E", r: 4 }}
                  name="Transactions"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B6F47"
                  strokeWidth={2}
                  dot={{ fill: "#8B6F47", r: 4 }}
                  name="Value (B AED)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

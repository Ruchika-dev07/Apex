import { useState, useEffect } from "react";
import { districts } from "../data/districts";
import { getScoreColor } from "../data/districts";
import { Sparkles, FileText, Send, Loader2, TrendingUp, Award, Target } from "lucide-react";

interface InsightsTabProps {
  onDistrictClick: (districtName: string) => void;
}

const GEMINI_API_KEY = "AQ.Ab8RN6K3eklYW6iV6LgZ6x42BhxjkuJx_pS9bqLhd7CglcAyXw";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = "You are Apex, Abu Dhabi city intelligence advisor. You know all 20 districts. Always cite district names and data. Structure answers as: 1) Direct answer 2) Key signals 3) Recommended action";

interface InsightCard {
  title: string;
  text: string;
  icon: React.ReactNode;
}

export default function InsightsTab({ onDistrictClick }: InsightsTabProps) {
  const [insights, setInsights] = useState<InsightCard[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [customQuestion, setCustomQuestion] = useState("");
  const [customReport, setCustomReport] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setInsightsLoading(true);
    try {
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Give me 3 key investment insights about Abu Dhabi property market in 2026, each in one paragraph. Number them 1, 2, 3.",
              },
            ],
          },
        ],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      };

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      const parsed = parseInsights(text);
      setInsights(parsed);
    } catch {
      setInsights([
        {
          title: "Coastal Premiums Rising",
          text: "Al Raha Beach and Al Bateen continue to command the highest price premiums due to limited waterfront supply and strong expat demand.",
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: "Island Development Accelerating",
          text: "Al Reem Island and Yas Island are seeing the fastest transaction growth as infrastructure investments mature.",
          icon: <Award className="w-5 h-5" />,
        },
        {
          title: "Affordable Housing Gap",
          text: "Districts like Al Shamkha and Mohammed Bin Zayed City present the biggest opportunity for mid-income residential development.",
          icon: <Target className="w-5 h-5" />,
        },
      ]);
    } finally {
      setInsightsLoading(false);
    }
  };

  const parseInsights = (text: string): InsightCard[] => {
    const lines = text.split("\n").filter((l) => l.trim());
    const cards: InsightCard[] = [];
    let currentNum = 0;
    const icons = [
      <TrendingUp className="w-5 h-5" />,
      <Award className="w-5 h-5" />,
      <Target className="w-5 h-5" />,
    ];

    for (const line of lines) {
      const match = line.match(/^(\d+)[.)]\s*(.*)/);
      if (match) {
        currentNum = parseInt(match[1], 10);
        const content = match[2].trim();
        const titleMatch = content.match(/^([^:]+):\s*(.*)/);
        if (titleMatch) {
          cards.push({
            title: titleMatch[1].trim(),
            text: titleMatch[2].trim(),
            icon: icons[(currentNum - 1) % icons.length],
          });
        } else {
          cards.push({
            title: `Insight ${currentNum}`,
            text: content,
            icon: icons[(currentNum - 1) % icons.length],
          });
        }
      }
    }

    if (cards.length === 0) {
      return [
        {
          title: "Market Overview",
          text: text.slice(0, 300),
          icon: <TrendingUp className="w-5 h-5" />,
        },
      ];
    }
    return cards;
  };

  const generateCustomReport = async () => {
    if (!customQuestion.trim()) return;
    setCustomLoading(true);
    setCustomReport("");

    try {
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: customQuestion }],
          },
        ],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      };

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";
      setCustomReport(text);
    } catch {
      setCustomReport("Unable to generate report. Please try again.");
    } finally {
      setCustomLoading(false);
    }
  };

  const sortedDistricts = [...districts].sort((a, b) => b.score - a.score);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F0E8] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Abu Dhabi Market Intelligence Report
          </h2>
          <p className="text-sm text-[#8B6F47] mt-1">
            AI-generated insights and district rankings updated in real-time
          </p>
        </div>

        {/* AI Insight Cards */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#8B6F47]" />
            <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              AI-Generated Insights
            </h3>
          </div>
          {insightsLoading ? (
            <div className="flex items-center gap-2 text-[#8B6F47]">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Generating insights...</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className="bg-white/60 rounded-xl border border-[#D4C5B0] p-5 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-3 text-[#5C3D2E]">
                    {insight.icon}
                    <span className="font-semibold text-sm">{insight.title}</span>
                  </div>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ranking Table */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#8B6F47]" />
            <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              District Opportunity Ranking
            </h3>
          </div>
          <div className="bg-white/60 rounded-xl border border-[#D4C5B0] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#8B6F47]/10 border-b border-[#D4C5B0]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">
                    District
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDistricts.map((d, i) => {
                  const color = getScoreColor(d.score);
                  return (
                    <tr
                      key={d.id}
                      onClick={() => onDistrictClick(d.name)}
                      className="border-b border-[#D4C5B0]/40 hover:bg-[#8B6F47]/5 cursor-pointer transition-colors duration-150"
                    >
                      <td className="px-4 py-2.5 text-[#8B6F47] font-medium">
                        #{i + 1}
                      </td>
                      <td className="px-4 py-2.5 text-[#1A1A1A] font-medium">
                        {d.name}
                      </td>
                      <td className="px-4 py-2.5 text-[#8B6F47]">{d.areaType}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className="inline-block text-xs font-bold text-white px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: color }}
                        >
                          {d.score}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Report */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#8B6F47]" />
            <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Generate Custom Report
            </h3>
          </div>
          <div className="bg-white/60 rounded-xl border border-[#D4C5B0] p-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generateCustomReport();
                }}
                placeholder="Ask a specific question about Abu Dhabi property market..."
                className="flex-1 bg-white border border-[#D4C5B0] rounded-lg px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#8B6F47]/60 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]/30"
              />
              <button
                onClick={generateCustomReport}
                disabled={customLoading || !customQuestion.trim()}
                className="bg-[#5C3D2E] text-white rounded-lg px-4 py-2.5 hover:bg-[#4A3025] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer flex items-center gap-2"
              >
                {customLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Generate
              </button>
            </div>
            {customReport && (
              <div className="mt-4 bg-[#F5F0E8] rounded-lg border border-[#D4C5B0] p-4">
                <p className="text-sm text-[#1A1A1A] whitespace-pre-wrap leading-relaxed">
                  {customReport}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

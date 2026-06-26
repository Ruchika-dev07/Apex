import { Hexagon } from "lucide-react";

export default function LandingSection() {
  return (
    <div className="w-full bg-[#F5F0E8] border-t border-[#D4C5B0]">
      {/* Hero */}
      <div className="py-16 px-6 text-center">
        <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tight mb-4">
          APEX
        </h1>
        <p className="text-lg text-[#8B6F47] font-medium tracking-wide">
          The Intelligence Layer for Abu Dhabi&apos;s Future
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="px-4 py-1.5 rounded-full bg-[#8B6F47]/10 text-xs font-medium text-[#5C3D2E] border border-[#D4C5B0]">
            20 Districts Analyzed
          </span>
          <span className="px-4 py-1.5 rounded-full bg-[#8B6F47]/10 text-xs font-medium text-[#5C3D2E] border border-[#D4C5B0]">
            AI-Powered Decisions
          </span>
          <span className="px-4 py-1.5 rounded-full bg-[#8B6F47]/10 text-xs font-medium text-[#5C3D2E] border border-[#D4C5B0]">
            Real-Time Intelligence
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#3D2B1F] px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-[#D4C5B0]" />
            <span className="text-sm text-[#D4C5B0]">
              Abu Dhabi District Intelligence Platform
            </span>
          </div>
          <div className="text-xs text-[#D4C5B0]/70">
            Built for the Abu Dhabi AI PropTech Challenge 2026
          </div>
          <div className="text-xs text-[#D4C5B0]/70">
            Powered by Gemini AI · Track 4: Decision Intelligence
          </div>
        </div>
      </div>
    </div>
  );
}

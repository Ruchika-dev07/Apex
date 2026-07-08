import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatPanelProps {
  initialMessage?: string;
}

const GEMINI_API_KEY = "AQ.Ab8RN6K3eklYW6iV6LgZ6x42BhxjkuJx_pS9bqLhd7CglcAyXw";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT =
  "You are Apex, Abu Dhabi city intelligence advisor. You know all 20 districts. Always cite district names and data. Structure answers as: 1) Direct answer 2) Key signals 3) Recommended action";

const STARTER_SUGGESTIONS = [
  "Which district has the highest development potential?",
  "Where should we build affordable housing?",
  "Which districts need better community services?",
  "Where are investors most active?",
  "What is the biggest land opportunity today?",
];

export default function ChatPanel({ initialMessage }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello, I'm Apex. I've analyzed 20 Abu Dhabi districts. What decision can I help you make?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const payload = {
        contents: [
          ...history,
          { role: "user", parts: [{ text: userMsg.text }] },
        ],
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
      };

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "I'm sorry, I couldn't process that.";

      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Error: ${err instanceof Error ? err.message : "Failed to reach Gemini API."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    sendMessage(text);
  };

  return (
    <div className="w-[320px] flex flex-col h-full bg-[#F5F0E8] border-l border-[#D4C5B0]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#D4C5B0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#8B6F47]" />
          <h2 className="text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase">
            Ask Apex
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-[10px] text-[#8B6F47] font-medium">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-[#5C3D2E] text-white"
                  : "bg-[#8B6F47] text-white"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-3.5 h-3.5" />
              ) : (
                <Bot className="w-3.5 h-3.5" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#5C3D2E] text-white"
                  : "bg-white/80 border border-[#D4C5B0] text-[#1A1A1A]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-[#8B6F47] text-white flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white/80 border border-[#D4C5B0] rounded-xl px-3 py-2 text-sm text-[#8B6F47]">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {STARTER_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="text-[10px] px-2.5 py-1.5 rounded-full border border-[#D4C5B0] bg-white/60 text-[#1A1A1A] hover:bg-[#8B6F47] hover:text-white hover:border-[#8B6F47] transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-[#D4C5B0] flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Abu Dhabi districts..."
          className="flex-1 bg-white/80 border border-[#D4C5B0] rounded-lg px-3 py-2 text-sm text-[#1A1A1A] placeholder:text-[#8B6F47]/60 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]/30"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-[#5C3D2E] text-white rounded-lg px-3 py-2 hover:bg-[#4A3025] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

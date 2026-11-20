import React, { useState } from "react";
import { Zap, Sparkles } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface NodeData {
  id: string;
  name: string;
  sub: string;
  color: string;
  glowColor: string;
  badge: string;
}

const AI_NODES: NodeData[] = [
  { id: "gemini", name: "Gemini", sub: "Google 2.5 & 3.8", color: "#38bdf8", glowColor: "rgba(56, 189, 248, 0.4)", badge: "2M Context" },
  { id: "claude", name: "Claude", sub: "Anthropic 3.7", color: "#d97706", glowColor: "rgba(217, 119, 6, 0.4)", badge: "Hybrid CoT" },
  { id: "deepseek", name: "DeepSeek", sub: "R1 Reasoning", color: "#60a5fa", glowColor: "rgba(96, 165, 250, 0.4)", badge: "SOTA" },
  { id: "openai", name: "OpenAI", sub: "GPT-4o & o3", color: "#10a37f", glowColor: "rgba(16, 163, 127, 0.4)", badge: "Flagship" },
  { id: "groq", name: "Groq", sub: "LPU Engine", color: "#f97316", glowColor: "rgba(249, 115, 22, 0.4)", badge: "500 tok/s" },
  { id: "together", name: "Together", sub: "Open Source", color: "#ec4899", glowColor: "rgba(236, 72, 153, 0.4)", badge: "Turbo" },
];

export function AIRouterPipelines() {
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-4 sm:p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1612] via-[#090d0b] to-[#050806] shadow-[0_15px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-emerald-500/20 border border-emerald-400/40 grid place-items-center text-emerald-400">
            <Zap className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
            Universal AI Router Matrix
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
          6 Active LLM Backbones
        </span>
      </div>

      {/* Tree Mind-Map Layout (Exact match to User's Hand-drawn Diagram) */}
      <div className="relative flex items-center gap-3 sm:gap-6 py-2">
        {/* Left Parent Hub: Smart Canvas AI Router */}
        <div className="relative shrink-0 w-32 sm:w-40 p-4 rounded-2xl border-2 border-emerald-400/70 bg-gradient-to-br from-[#12231b] via-[#0b1712] to-[#07100c] shadow-[0_0_25px_rgba(52,199,89,0.35)] flex flex-col items-center justify-center text-center z-20">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-black shadow-glow mb-2">
            <Zap className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h4 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-tight">
            Smart Canvas
          </h4>
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold mt-0.5">
            AI ROUTER
          </span>
          <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Multi-Model</span>
          </div>
        </div>

        {/* Dynamic Curved Trunk SVG Bus Lines (Branching from Left Hub to Each Right Node) */}
        <div className="relative flex-1 flex flex-col justify-between py-1 space-y-2">
          {AI_NODES.map((node) => {
            const isHovered = activeHoverNode === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveHoverNode(node.id)}
                onMouseLeave={() => setActiveHoverNode(null)}
                className={`group relative flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? "bg-white/[0.08] border-white/40 shadow-lg translate-x-1"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
                style={{
                  borderColor: isHovered ? node.color : undefined,
                  boxShadow: isHovered ? `0 0 15px ${node.glowColor}` : undefined,
                }}
              >
                {/* Horizontal branch indicator line on left of chip */}
                <div
                  className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 h-[2px] w-3 sm:w-6 transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? node.color : "rgba(255, 255, 255, 0.2)",
                  }}
                />

                {/* Left side info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-7 w-7 rounded-lg bg-black/60 border border-white/10 p-1 shrink-0 grid place-items-center">
                    <BrandLogo id={node.id} className="h-full w-full object-contain" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="font-display font-bold text-xs sm:text-sm text-white block leading-tight truncate">
                      {node.name}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 block truncate">
                      {node.sub}
                    </span>
                  </div>
                </div>

                {/* Right side spec badge */}
                <span
                  className="font-mono text-[9px] px-2 py-0.5 rounded-md border font-semibold shrink-0 ml-2"
                  style={{
                    color: node.color,
                    backgroundColor: `${node.color}15`,
                    borderColor: `${node.color}35`,
                  }}
                >
                  {node.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Zap } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface NodeData {
  id: string;
  name: string;
  sub: string;
  color: string;
  glowColor: string;
  angle: number; // Exact circular angle (degrees)
  badge?: string;
}

// Exactly symmetrical 8 points (360 / 8 = 45 deg intervals):
// -90 (Top), -45 (Top-Right), 0 (Right), 45 (Bottom-Right), 90 (Bottom), 135 (Bottom-Left), 180 (Left), 225 (Top-Left)
const AI_NODES: NodeData[] = [
  { id: "gemini", name: "Gemini", sub: "Google", color: "#38bdf8", glowColor: "rgba(56, 189, 248, 0.6)", angle: -90, badge: "2M Context" },
  { id: "deepseek", name: "DeepSeek", sub: "R1 Reasoning", color: "#60a5fa", glowColor: "rgba(96, 165, 250, 0.6)", angle: -45, badge: "SOTA" },
  { id: "groq", name: "Groq", sub: "LPU Engine", color: "#f97316", glowColor: "rgba(249, 115, 22, 0.6)", angle: 0, badge: "500 tok/s" },
  { id: "openrouter", name: "OpenRouter", sub: "Universal API", color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.6)", angle: 45, badge: "Free" },
  { id: "cerebras", name: "Cerebras", sub: "Wafer Scale", color: "#10b981", glowColor: "rgba(16, 185, 129, 0.6)", angle: 90, badge: "1500 t/s" },
  { id: "together", name: "Together", sub: "Open Source", color: "#ec4899", glowColor: "rgba(236, 72, 153, 0.6)", angle: 135, badge: "Turbo" },
  { id: "openai", name: "OpenAI", sub: "GPT-4o & o3", color: "#10a37f", glowColor: "rgba(16, 163, 127, 0.6)", angle: 180, badge: "Flagship" },
  { id: "claude", name: "Claude", sub: "Anthropic 3.7", color: "#d97706", glowColor: "rgba(217, 119, 6, 0.6)", angle: 225, badge: "Hybrid CoT" },
];

export function AIRouterPipelines() {
  const center = 270; // 540x540 canvas center
  const radius = 200; // Perfect uniform circular orbit radius
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[560px] h-[540px] mx-auto flex items-center justify-center select-none">
      {/* Symmetrical Cyber Ambient Radial Halo */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/15 to-cyan-500/20 blur-3xl pointer-events-none" />

      {/* SVG Pipeline Circuits & Laser Radar */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 540 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34C759" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#34C759" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 100% Perfect Concentric Circles */}
        <circle cx={center} cy={center} r={radius} stroke="currentColor" strokeWidth="1" className="text-border/40" strokeDasharray="4 6" />
        <circle cx={center} cy={center} r={radius * 0.65} stroke="currentColor" strokeWidth="1" className="text-border/25" />
        <circle cx={center} cy={center} r={radius * 0.38} fill="url(#hubGlow)" />

        {/* 8 Bus Pipeline Circuits Connecting Center to Each Chip */}
        {AI_NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const targetX = center + radius * Math.cos(rad);
          const targetY = center + radius * Math.sin(rad);

          // Connecting directly to chip anchor point
          const isHovered = activeHoverNode === node.id;

          return (
            <g key={node.id}>
              {/* Circuit Bus Line */}
              <line
                x1={center}
                y1={center}
                x2={targetX}
                y2={targetY}
                stroke={node.color}
                strokeWidth={isHovered ? "3.5" : "1.8"}
                strokeOpacity={isHovered ? "0.9" : "0.35"}
                filter={isHovered ? "url(#neonGlow)" : undefined}
                className="transition-all duration-300"
              />

              {/* Laser Pulses Traveling Outward */}
              <line
                x1={center}
                y1={center}
                x2={targetX}
                y2={targetY}
                stroke="#ffffff"
                strokeWidth={isHovered ? "3" : "2"}
                strokeDasharray="6 20"
                filter="url(#neonGlow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="52"
                  to="0"
                  dur={isHovered ? "0.7s" : "1.6s"}
                  repeatCount="indefinite"
                />
              </line>

              {/* Node Terminal Soldering Pad on Circle */}
              <circle
                cx={targetX}
                cy={targetY}
                r={isHovered ? "5" : "3.5"}
                fill={node.color}
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* CENTER ROUTER CORE: 3D Multi-Layered Neumorphic Squircle */}
      <div className="relative z-20 group">
        <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

        <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl border-2 border-emerald-400/80 bg-gradient-to-b from-[#132220] to-[#08100f] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(52,199,89,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] p-2 backdrop-blur-2xl transition-transform duration-500 group-hover:scale-105">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-primary to-cyan-400 grid place-items-center shadow-[0_0_20px_rgba(52,199,89,0.8)] mb-1">
            <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-black fill-current animate-bounce duration-1000" strokeWidth={2.8} />
            <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none" />
          </div>

          <span className="font-display text-[11px] sm:text-xs font-bold text-white tracking-tight text-center leading-none mt-0.5">
            Smart Canvas
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[8px] text-emerald-300 font-semibold uppercase tracking-widest">
              AI ROUTER
            </span>
          </div>
        </div>
      </div>

      {/* 8 SURROUNDING HIGH-FIDELITY AI BRAND CHIPS (Strict Equidistant Angular Alignment) */}
      {AI_NODES.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        const isHovered = activeHoverNode === node.id;

        return (
          <div
            key={node.id}
            onMouseEnter={() => setActiveHoverNode(node.id)}
            onMouseLeave={() => setActiveHoverNode(null)}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-20 group"
          >
            {/* Glowing aura on hover */}
            <div
              className={`absolute -inset-1.5 rounded-2xl blur-lg transition-opacity duration-300 pointer-events-none ${
                isHovered ? "opacity-100 scale-110" : "opacity-0"
              }`}
              style={{ backgroundColor: node.glowColor }}
            />

            {/* Futuristic Glassmorphic Chip Card */}
            <div
              className={`relative px-3 py-2 rounded-2xl border transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-xl ${
                isHovered
                  ? "bg-surface border-white/60 scale-110 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                  : "bg-surface/85 border-border/80 hover:border-primary/50"
              }`}
            >
              {/* Brand Icon Avatar */}
              <div
                className="h-7 w-7 rounded-xl grid place-items-center text-white shadow-inner shrink-0 p-1"
                style={{
                  backgroundColor: node.color,
                  boxShadow: `0 0 12px ${node.glowColor}`,
                }}
              >
                <BrandLogo id={node.id} className="h-4 w-4" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xs font-bold text-foreground tracking-tight whitespace-nowrap">
                    {node.name}
                  </span>
                  {node.badge && (
                    <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-emerald-400 font-semibold border border-white/10">
                      {node.badge}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[9px] text-muted-foreground whitespace-nowrap">
                  {node.sub}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

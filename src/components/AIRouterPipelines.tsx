import React from "react";
import { Zap, Sparkles } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  sub: string;
  color: string;
  glowColor: string;
  angle: number; // in degrees for circular orbit
  dist: number;  // radius distance from center in px
}

const AI_NODES: NodeData[] = [
  { id: "gemini", name: "Gemini", sub: "Google", color: "#38bdf8", glowColor: "rgba(56, 189, 248, 0.4)", angle: -90, dist: 165 },
  { id: "deepseek", name: "DeepSeek", sub: "R1 Reasoning", color: "#60a5fa", glowColor: "rgba(96, 165, 250, 0.4)", angle: -45, dist: 175 },
  { id: "groq", name: "Groq", sub: "LPU 500 tok/s", color: "#f97316", glowColor: "rgba(249, 115, 22, 0.4)", angle: 0, dist: 185 },
  { id: "openrouter", name: "OpenRouter", sub: "Multi-Model", color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", angle: 45, dist: 175 },
  { id: "cerebras", name: "Cerebras", sub: "1500 tok/s", color: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", angle: 90, dist: 165 },
  { id: "together", name: "Together", sub: "Open Source", color: "#ec4899", glowColor: "rgba(236, 72, 153, 0.4)", angle: 135, dist: 175 },
  { id: "openai", name: "OpenAI", sub: "GPT-4o", color: "#10a37f", glowColor: "rgba(16, 163, 127, 0.4)", angle: 180, dist: 185 },
  { id: "claude", name: "Claude", sub: "Anthropic", color: "#d97706", glowColor: "rgba(217, 119, 6, 0.4)", angle: 225, dist: 175 },
];

export function AIRouterPipelines() {
  const center = 210; // svg center x and y

  return (
    <div className="relative w-full max-w-[460px] h-[440px] mx-auto flex items-center justify-center select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-4 bg-gradient-to-tr from-primary/20 via-accent/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Pipeline Circuits & Data Streams */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbital concentric guide rings */}
        <circle cx={center} cy={center} r="168" stroke="currentColor" strokeWidth="1" className="text-border/40" strokeDasharray="4 4" />
        <circle cx={center} cy={center} r="105" stroke="currentColor" strokeWidth="1" className="text-border/30" />

        {AI_NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const targetX = center + node.dist * Math.cos(rad);
          const targetY = center + node.dist * Math.sin(rad);

          // Curving control point for smooth circuit bus routing
          const midX = (center + targetX) / 2 + Math.sin(rad) * 15;
          const midY = (center + targetY) / 2 - Math.cos(rad) * 15;

          const pathD = `M ${center} ${center} Q ${midX} ${midY} ${targetX} ${targetY}`;

          return (
            <g key={node.id}>
              {/* Background glowing line */}
              <path
                d={pathD}
                stroke={node.color}
                strokeWidth="2.5"
                strokeOpacity="0.25"
                fill="none"
              />
              {/* Animated Glowing Packet Flow */}
              <path
                d={pathD}
                stroke={node.color}
                strokeWidth="2"
                strokeDasharray="6 14"
                fill="none"
                className="animate-[dash_3s_linear_infinite]"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="40"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Pulsing Target Dot */}
              <circle
                cx={targetX}
                cy={targetY}
                r="3.5"
                fill={node.color}
                className="animate-pulse"
              />
            </g>
          );
        })}
      </svg>

      {/* CENTER NODE: Smart Canvas Grow Logo Hexagon / Badge */}
      <div className="relative z-20 group">
        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl sm:rounded-3xl border-2 border-primary/60 bg-gradient-to-b from-surface to-[#0a1212] flex flex-col items-center justify-center shadow-[0_0_35px_rgba(52,199,89,0.35)] p-2 backdrop-blur-xl">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary via-emerald-400 to-accent grid place-items-center shadow-glow mb-1">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={2.8} />
          </div>
          <span className="font-display text-[10px] sm:text-[11px] font-bold text-foreground tracking-tight text-center leading-none">
            Smart Canvas
          </span>
          <span className="font-mono text-[8px] text-primary-glow uppercase tracking-widest mt-0.5">
            AI Router
          </span>
        </div>
      </div>

      {/* SURROUNDING AI BRAND CHIPS */}
      {AI_NODES.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = center + node.dist * Math.cos(rad);
        const y = center + node.dist * Math.sin(rad);

        return (
          <div
            key={node.id}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-10 group"
          >
            {/* Ambient hover glow */}
            <div
              className="absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: node.glowColor }}
            />

            {/* Chip Container */}
            <div className="relative px-2.5 py-1.5 rounded-xl border border-border/80 bg-surface/90 backdrop-blur-md shadow-card hover:border-primary/50 transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-105">
              <span
                className="h-2 w-2 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: node.color }}
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-display text-[11px] font-semibold text-foreground tracking-tight whitespace-nowrap">
                  {node.name}
                </span>
                <span className="font-mono text-[8px] text-muted-foreground whitespace-nowrap">
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


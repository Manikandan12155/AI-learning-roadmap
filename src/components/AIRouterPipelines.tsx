import React, { useState } from "react";
import { Zap } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface NodeData {
  id: string;
  name: string;
  sub: string;
  color: string;
  glowColor: string;
  badge: string;
  wirePath: string; // Exact curved SVG path from Left Hub to this specific Node
  yPos: number; // Vertical anchor on right side
}

// 6 Nodes distributed vertically (0 to 350)
const AI_NODES: NodeData[] = [
  {
    id: "gemini",
    name: "Gemini",
    sub: "Google 2.5 & 3.8",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.8)",
    badge: "2M Context",
    yPos: 15,
    // Top-most curved wire: Exits top-right of hub, arches up and travels right
    wirePath: "M 130 175 C 130 50, 180 32, 280 32",
  },
  {
    id: "claude",
    name: "Claude",
    sub: "Anthropic 3.7",
    color: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.8)",
    badge: "Hybrid CoT",
    yPos: 78,
    // Upper-mid curved wire: Exits upper-right of hub, curves upward into node
    wirePath: "M 130 175 C 145 110, 195 95, 280 95",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    sub: "R1 Reasoning",
    color: "#60a5fa",
    glowColor: "rgba(96, 165, 250, 0.8)",
    badge: "SOTA",
    yPos: 141,
    // Straight-ish middle upper branch
    wirePath: "M 130 175 C 170 175, 210 158, 280 158",
  },
  {
    id: "openai",
    name: "OpenAI",
    sub: "GPT-4o & o3",
    color: "#10a37f",
    glowColor: "rgba(16, 163, 127, 0.8)",
    badge: "Flagship",
    yPos: 204,
    // Straight-ish middle lower branch
    wirePath: "M 130 175 C 170 175, 210 221, 280 221",
  },
  {
    id: "groq",
    name: "Groq",
    sub: "LPU Engine",
    color: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.8)",
    badge: "500 tok/s",
    yPos: 267,
    // Lower-mid curved wire: Exits lower-right of hub, curves downward into node
    wirePath: "M 130 175 C 145 240, 195 284, 280 284",
  },
  {
    id: "together",
    name: "Together",
    sub: "Open Source",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.8)",
    badge: "Turbo",
    yPos: 330,
    // Bottom-most curved wire: Exits bottom-right of hub, arches down and travels right
    wirePath: "M 130 175 C 130 300, 180 347, 280 347",
  },
];

export function AIRouterPipelines() {
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 relative select-none">
      <style>{`
        @keyframes electricPulse {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 4px #34C759); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px #34C759); }
        }
        .animate-electric-pulse {
          stroke-dasharray: 10 20;
          animation: electricPulse 1.8s linear infinite;
        }
        .animate-fast-pulse {
          stroke-dasharray: 6 12;
          animation: electricPulse 0.9s linear infinite;
        }
      `}</style>

      {/* Background Cyber Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Schematic Diagram Area (Exact 1:1 match to Hand-Drawn Sketch) */}
      <div className="relative w-full h-[410px] sm:h-[420px] flex items-center justify-between">
        {/* SVG Power Supply Wires with Electric Energy Surges */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hubWireGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34C759" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#22C55E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.7" />
            </linearGradient>

            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw each branching curved power wire using percentage coords (0-100) */}
          {AI_NODES.map((node, idx) => {
            const isHovered = activeHoverNode === node.id;
            // Left Hub center is at x: ~22%, y: 50%
            // Right 6 chips are evenly spaced vertically at y: ~7%, ~24%, ~41%, ~58%, ~75%, ~92%
            // Right socket attachment point is at x: ~60% (left edge of right column)
            const targetY = 7.5 + idx * 17.0;
            const pathD = `M 23 50 C 35 50, 45 ${targetY}, 60 ${targetY}`;

            return (
              <g key={node.id}>
                {/* 1. Underlying Dark High-Voltage Conduit Tube */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth={isHovered ? "1.2" : "0.8"}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* 2. Core Fiber Light Wire */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHovered ? node.color : "rgba(52, 199, 89, 0.5)"}
                  strokeWidth={isHovered ? "0.9" : "0.5"}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* 3. Electric Laser Energy Packets Traveling from Hub to Node (Power Supply) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHovered ? node.color : "#4ADE80"}
                  strokeWidth={isHovered ? "1.2" : "0.8"}
                  strokeLinecap="round"
                  className={isHovered ? "animate-fast-pulse" : "animate-electric-pulse"}
                  filter={isHovered ? "url(#laserGlow)" : undefined}
                  vectorEffect="non-scaling-stroke"
                />

                {/* 4. Connection Terminal Dot on Right Chip Socket */}
                <circle
                  cx="60"
                  cy={targetY}
                  r="0.8"
                  fill={isHovered ? node.color : "#4ADE80"}
                />
              </g>
            );
          })}
        </svg>

        {/* LEFT PARENT HUB: Smart Canvas Power Generator */}
        <div className="relative z-20 w-[120px] sm:w-[135px] h-[120px] sm:h-[135px] rounded-2xl sm:rounded-3xl border-2 border-emerald-400 bg-gradient-to-b from-[#14281e] via-[#0c1a14] to-[#07110d] shadow-[0_0_35px_rgba(52,199,89,0.5)] flex flex-col items-center justify-center text-center p-3 shrink-0 ml-1">
          {/* Pulsing Power Reactor Orb */}
          <div className="relative mb-2">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-black shadow-[0_0_20px_rgba(52,199,89,0.7)] animate-pulse">
              <Zap className="h-7 w-7 stroke-[2.5]" />
            </div>
            {/* Energy Ring */}
            <div className="absolute -inset-1 rounded-2xl border border-emerald-400/50 animate-ping pointer-events-none" />
          </div>

          <h3 className="font-display font-black text-xs sm:text-sm text-white tracking-tight leading-tight">
            Smart Canvas
          </h3>
        </div>

        {/* RIGHT BRANCHED NODES: The 6 AI Chips (Receiving Power Supply) */}
        <div className="relative z-20 flex flex-col justify-between h-full py-1 w-[200px] sm:w-[240px] shrink-0 mr-1">
          {AI_NODES.map((node) => {
            const isHovered = activeHoverNode === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveHoverNode(node.id)}
                onMouseLeave={() => setActiveHoverNode(null)}
                className={`relative group flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "bg-white/[0.12] border-white/60 shadow-xl translate-x-1 scale-[1.03]"
                    : "bg-[#0b120f]/90 border-white/15 hover:border-white/30 backdrop-blur-md"
                }`}
                style={{
                  borderColor: isHovered ? node.color : undefined,
                  boxShadow: isHovered
                    ? `0 0 20px ${node.glowColor}, inset 0 0 10px ${node.glowColor}`
                    : "0 4px 15px rgba(0,0,0,0.6)",
                }}
              >
                {/* Power Socket Plug on Left Edge of Chip */}
                <div
                  className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? node.color : "#22C55E",
                    borderColor: "#FFFFFF",
                    boxShadow: isHovered
                      ? `0 0 10px ${node.color}`
                      : "0 0 6px rgba(52,199,89,0.8)",
                  }}
                />

                {/* Left Side: Brand Logo + Name + Context */}
                <div className="flex items-center gap-2 min-w-0 pl-1">
                  <div className="h-6 w-6 rounded-lg bg-black/70 border border-white/10 p-0.5 shrink-0 grid place-items-center">
                    <BrandLogo id={node.id} className="h-full w-full object-contain" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="font-display font-extrabold text-xs text-white block leading-tight truncate">
                      {node.name}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 block truncate leading-none mt-0.5">
                      {node.sub}
                    </span>
                  </div>
                </div>

                {/* Right Side: High-Precision Badge */}
                <span
                  className="font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded border font-bold shrink-0 ml-1.5"
                  style={{
                    color: node.color,
                    backgroundColor: `${node.color}15`,
                    borderColor: `${node.color}40`,
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

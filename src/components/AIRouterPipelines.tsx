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
          viewBox="0 0 600 380"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hubWireGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34C759" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#22C55E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.7" />
            </linearGradient>

            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw each branching curved power wire */}
          {AI_NODES.map((node) => {
            const isHovered = activeHoverNode === node.id;

            return (
              <g key={node.id}>
                {/* 1. Underlying Dark High-Voltage Conduit Tube */}
                <path
                  d={node.wirePath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth={isHovered ? "4" : "3"}
                  strokeLinecap="round"
                />

                {/* 2. Core Fiber Light Wire */}
                <path
                  d={node.wirePath}
                  fill="none"
                  stroke={isHovered ? node.color : "rgba(52, 199, 89, 0.45)"}
                  strokeWidth={isHovered ? "2.5" : "1.8"}
                  strokeLinecap="round"
                />

                {/* 3. Electric Laser Energy Packets Traveling from Hub to Node (Power Supply) */}
                <path
                  d={node.wirePath}
                  fill="none"
                  stroke={isHovered ? node.color : "#4ADE80"}
                  strokeWidth={isHovered ? "3.5" : "2.5"}
                  strokeLinecap="round"
                  className={isHovered ? "animate-fast-pulse" : "animate-electric-pulse"}
                  filter={isHovered ? "url(#laserGlow)" : undefined}
                />

                {/* 4. Terminal Spark Plug at Connection Points */}
                <circle
                  cx="130"
                  cy="175"
                  r="3.5"
                  fill="#4ADE80"
                  className="animate-ping opacity-30"
                />
              </g>
            );
          })}
        </svg>

        {/* LEFT PARENT HUB: Smart Canvas AI Router (Power Generator) */}
        <div className="relative z-20 w-[115px] sm:w-[135px] h-[130px] sm:h-[145px] rounded-2xl sm:rounded-3xl border-2 border-emerald-400 bg-gradient-to-b from-[#14281e] via-[#0c1a14] to-[#07110d] shadow-[0_0_35px_rgba(52,199,89,0.5)] flex flex-col items-center justify-center text-center p-3">
          {/* Pulsing Power Reactor Orb */}
          <div className="relative mb-2">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-black shadow-[0_0_20px_rgba(52,199,89,0.7)] animate-pulse">
              <Zap className="h-6 w-6 stroke-[2.5]" />
            </div>
            {/* Energy Ring */}
            <div className="absolute -inset-1 rounded-2xl border border-emerald-400/50 animate-ping pointer-events-none" />
          </div>

          <h3 className="font-display font-black text-xs sm:text-sm text-white tracking-tight leading-tight">
            Smart Canvas
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-extrabold mt-0.5">
            AI ROUTER
          </span>

          {/* Live Status Pip */}
          <div className="mt-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[8px] font-mono font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>POWER ON</span>
          </div>
        </div>

        {/* RIGHT BRANCHED NODES: Pure 3D / Brand Logos Receiving Power Supply */}
        <div className="relative z-20 flex flex-col justify-between h-full pl-4 sm:pl-10 py-1 flex-1 max-w-[120px] sm:max-w-[140px] ml-auto">
          {AI_NODES.map((node) => {
            const isHovered = activeHoverNode === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveHoverNode(node.id)}
                onMouseLeave={() => setActiveHoverNode(null)}
                className={`relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "bg-white/[0.15] border-white/80 shadow-2xl translate-x-1.5 scale-110"
                    : "bg-[#0b120f]/90 border-white/20 hover:border-white/40 backdrop-blur-md"
                }`}
                style={{
                  borderColor: isHovered ? node.color : undefined,
                  boxShadow: isHovered
                    ? `0 0 25px ${node.glowColor}, inset 0 0 10px ${node.glowColor}`
                    : "0 6px 18px rgba(0,0,0,0.6)",
                }}
                title={`${node.name} (${node.sub})`}
              >
                {/* Power Socket Plug on Left Edge of Chip */}
                <div
                  className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? node.color : "#22C55E",
                    borderColor: "#FFFFFF",
                    boxShadow: isHovered
                      ? `0 0 12px ${node.color}`
                      : "0 0 6px rgba(52,199,89,0.8)",
                  }}
                />

                {/* Pure Brand Logo Only (Centered & Crisp) */}
                <div className="h-7 w-7 sm:h-8 sm:w-8 grid place-items-center">
                  <BrandLogo id={node.id} className="h-full w-full object-contain filter drop-shadow" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

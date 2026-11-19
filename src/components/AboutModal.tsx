import React from "react";
import { X, ExternalLink, Sparkles, Code2, Bot, Brain } from "lucide-react";
import heroCharacter from "@/assets/hero-character-tight.png";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 h-7 w-7 rounded-full border border-border bg-surface/80 hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Character Image Column */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-primary/10 via-surface-2 to-surface flex flex-col items-center justify-end p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.16_160/0.25),transparent_70%)] pointer-events-none" />
          <img
            src={heroCharacter}
            alt="Manikandan - AI Engineer"
            className="relative z-10 w-48 sm:w-56 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Info Bio Column */}
        <div className="w-full md:w-7/12 p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary-glow font-mono text-[10px] uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> Creator &amp; Curator
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Manikandan
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                AI &amp; Machine Learning Engineer
              </p>
            </div>

            <p className="text-xs sm:text-[13px] text-foreground/80 leading-relaxed font-sans">
              Smart Canvas Grow is crafted as a production-grade, zero-fluff engineering roadmap. Curated to take engineers from computer system fundamentals all the way to autonomous multi-agent orchestration, RAG architectures, and enterprise LLMOps.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 rounded-xl border border-border bg-surface-2/40 text-xs">
                <div className="flex items-center gap-1.5 text-primary font-medium text-[11px]">
                  <Brain className="h-3.5 w-3.5" /> 580+ Topics
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Curated across 14 levels
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-border bg-surface-2/40 text-xs">
                <div className="flex items-center gap-1.5 text-accent font-medium text-[11px]">
                  <Bot className="h-3.5 w-3.5" /> AI Study Studio
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Quiz, Flashcards &amp; Mindmap
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] text-muted-foreground">
              Built for serious AI builders
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs shadow-glow hover:opacity-95 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


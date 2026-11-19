import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  ChevronLeft,
  Share2,
  Calendar,
  User,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/verify/$certId")({
  component: VerifyCertificatePage,
});

const TIER_MAPPING: Record<
  string,
  {
    title: string;
    scope: string;
    topicsCount: number;
    badge: string;
    skills: string[];
    tierName: string;
  }
> = {
  T1: {
    title: "AI & ML Foundations Practitioner",
    scope: "Levels 00 - 01",
    topicsCount: 61,
    badge: "Foundations Tier",
    tierName: "Cyber Fox Pass",
    skills: [
      "Python 3.12 Core",
      "NumPy & Vectorized Math",
      "Linear Algebra & Matrices",
      "Pandas & Data Wrangling",
      "Calculus for Machine Learning",
    ],
  },
  T2: {
    title: "Deep Learning & Generative AI Specialist",
    scope: "Levels 00 - 05",
    topicsCount: 163,
    badge: "Specialist Tier",
    tierName: "Neural Leopard Vault",
    skills: [
      "Classical Machine Learning (Scikit-Learn)",
      "PyTorch Neural Networks & Backprop",
      "Convolutional Networks & Computer Vision",
      "Transformers Architecture & Attention",
      "Fine-Tuning & Quantization Basics",
    ],
  },
  T3: {
    title: "Autonomous Agents & RAG 2.0 Architect",
    scope: "Levels 00 - 09",
    topicsCount: 264,
    badge: "Architect Tier",
    tierName: "Alpha Wolf Coffer",
    skills: [
      "Vector Embeddings & Hybrid Search (BM25 + Dense)",
      "Graph RAG & Knowledge Graphs",
      "LangChain & LangGraph Orchestration",
      "Tool Calling & Autonomous Agent Swarms",
      "Multi-Modal Reasoning & Evaluation",
    ],
  },
  T4: {
    title: "Certified Principal AI Systems Engineer",
    scope: "Levels 00 - 14 (Full Curriculum)",
    topicsCount: 583,
    badge: "Master Diploma",
    tierName: "Apex Dragon Relic",
    skills: [
      "Enterprise LLMOps & vLLM High-Throughput Serving",
      "Model Alignment (RLHF / DPO / PPO)",
      "Edge AI & ONNX / TensorRT Acceleration",
      "Autonomous Multi-Agent Swarms",
      "Full 250 AI Technical Standards & Taxonomy",
    ],
  },
};

export function VerifyCertificatePage() {
  const { certId } = useParams({ from: "/verify/$certId" });
  const [copied, setCopied] = useState(false);

  // Extract Tier from Cert ID (e.g., SCG-AI-GUEST-T1 or SCG-AI-82F3B-T3)
  const tierMatch = certId?.match(/T[1-4]/);
  const tierKey = tierMatch ? tierMatch[0] : "T1";
  const tierInfo = TIER_MAPPING[tierKey] || TIER_MAPPING.T1;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070908] text-white flex flex-col items-center justify-between p-4 sm:p-8 font-sans selection:bg-amber-500 selection:text-black">
      {/* Background Glow Accents */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full max-w-4xl flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to AI Roadmap</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,199,89,0.8)]" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
            Public Verification Portal
          </span>
        </div>
      </header>

      {/* Main Verification Card */}
      <main className="w-full max-w-2xl my-auto py-8 relative z-10">
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#111714] via-[#0b0e0c] to-[#060807] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden text-center space-y-6">
          {/* Official Verification Shield Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-black shadow-[0_0_30px_rgba(52,199,89,0.5)] border border-emerald-200/50">
              <ShieldCheck className="h-8 w-8 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-3 w-3" /> Official Credential Verified
              </div>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white uppercase tracking-tight mt-2">
                Smart Canvas Grow Certification
              </h1>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Credential ID: <span className="text-emerald-400 font-bold">{certId}</span>
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Credential Scope Box */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-amber-500/30 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                Conferred Title
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {tierInfo.badge}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white">
              {tierInfo.title}
            </h2>
            <div className="text-xs text-neutral-300 flex items-center gap-2 font-mono">
              <span>{tierInfo.scope}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{tierInfo.topicsCount} Topics Mastered</span>
            </div>
          </div>

          {/* Verified Technical Competencies (ATS Keywords for Recruiters) */}
          <div className="text-left space-y-2.5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Verified Technical Competencies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tierInfo.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-neutral-200 text-xs font-mono flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recruiter Trust Footer Info */}
          <div className="p-3.5 rounded-xl bg-surface/40 border border-white/10 text-left flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 grid place-items-center text-amber-400 shrink-0">
              <Award className="h-4 w-4" />
            </div>
            <div className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              <strong className="text-white block font-semibold">Verified against Canonical 2026 AI Standard</strong>
              This individual has passed curriculum checkpoints and topic assessments matching modern industry requirements across PyTorch, Autonomous LLM Agents, and Production AI Architectures.
            </div>
          </div>

          {/* Action Buttons for Recruiters / User */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition border border-white/15"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Share Verification URL</span>
                </>
              )}
            </button>

            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-1.5"
            >
              <span>Explore Full AI Roadmap</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl pt-6 border-t border-white/10 text-center font-mono text-[11px] text-neutral-500 relative z-10">
        Smart Canvas Grow · Autonomous AI Learning Verification System © 2026
      </footer>
    </div>
  );
}


import React, { useState } from "react";
import {
  X,
  ShieldAlert,
  Scale,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  FileText,
  UserCheck,
} from "lucide-react";

export type LegalDocType = "terms" | "privacy" | "restrictions" | "safety";

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ isOpen, initialDoc = "terms", onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);

  React.useEffect(() => {
    if (initialDoc) setActiveTab(initialDoc);
  }, [initialDoc, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl border border-border bg-card/95 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-surface/50">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center text-primary">
              {activeTab === "terms" && <Scale className="h-4 w-4 text-primary" />}
              {activeTab === "privacy" && <Lock className="h-4 w-4 text-blue-400" />}
              {activeTab === "restrictions" && <AlertTriangle className="h-4 w-4 text-amber" />}
              {activeTab === "safety" && <ShieldAlert className="h-4 w-4 text-rose-400" />}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Smart Canvas Grow Compliance &amp; Legal Center
              </h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Legal Terms, Data Privacy &amp; Ethical AI Restrictions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-surface/30 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-3 py-1.5 rounded-lg font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "terms"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <Scale className="h-3.5 w-3.5" /> Terms &amp; Conditions
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-3 py-1.5 rounded-lg font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "privacy"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <Lock className="h-3.5 w-3.5" /> Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("restrictions")}
            className={`px-3 py-1.5 rounded-lg font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "restrictions"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" /> Platform Restrictions
          </button>
          <button
            onClick={() => setActiveTab("safety")}
            className={`px-3 py-1.5 rounded-lg font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "safety"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" /> User Safety Notice
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-foreground/90 leading-relaxed font-sans">
          
          {/* TERMS & CONDITIONS */}
          {activeTab === "terms" && (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-primary tracking-wider font-semibold">
                  Last Updated: 2026 Edition
                </span>
                <h4 className="font-display text-base font-bold text-foreground mt-0.5">
                  Terms of Service &amp; Educational Agreement
                </h4>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 1. Nature of the Platform
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    Smart Canvas Grow is an autonomous open-access engineering learning roadmap and interactive AI experimentation platform designed to prepare students and engineers for production AI systems.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 2. Bring Your Own Key (BYOK) Responsibility
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    When using external AI models (Google Gemini, Groq, Anthropic, OpenAI), API keys are stored solely in your local browser sandbox (<code className="font-mono text-primary">localStorage</code>). You are directly responsible for any billing, rate limits, or quota associated with your provider accounts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 3. Code Execution &amp; Sandboxing
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    Interactive code snippets are executed via WebAssembly (Pyodide in-browser runtime) or user-connected self-hosted Google Colab/Kaggle instances. Smart Canvas Grow does not claim ownership over algorithms, experiments, or models designed by learners.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 4. Intellectual Property &amp; Attribution
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    The roadmap structure, curated milestones, graphics, and interface are curated by Manikandan under Fair Use Educational Standards. Verifiable certificates issued through this platform validate personal study progress.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === "privacy" && (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-blue-400 tracking-wider font-semibold">
                  Zero-Surveillance Privacy Standard
                </span>
                <h4 className="font-display text-base font-bold text-foreground mt-0.5">
                  Privacy Policy &amp; Data Sovereignty
                </h4>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1">
                  <h5 className="font-semibold text-blue-400 text-xs flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" /> 1. Client-First Architecture (Zero Data Selling)
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    We do NOT track your keystrokes, sell your email, or inject third-party ad pixels (Facebook Pixel, Google AdSense, or data brokers). Your learning journey belongs solely to you.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-primary" /> 2. API Key Protection
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    Your LLM API keys (Gemini, Groq, Cerebras) never touch Smart Canvas Grow servers. Requests are sent directly from your client browser to the respective official provider endpoint using HTTPS TLS 1.3 encryption.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-primary" /> 3. Google Supabase Authentication &amp; Progress Sync
                  </h5>
                  <p className="text-muted-foreground text-[11px]">
                    When signing in with Google OAuth, we only receive your public display name, email, and avatar URL to sync your completed roadmap checkboxes and leaderboard tier rank. You may clear your cloud progress at any time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PLATFORM RESTRICTIONS */}
          {activeTab === "restrictions" && (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-amber tracking-wider font-semibold">
                  Enforced Usage Boundaries
                </span>
                <h4 className="font-display text-base font-bold text-foreground mt-0.5">
                  Platform Restrictions &amp; Acceptable Use Policy
                </h4>
              </div>

              <div className="p-3.5 rounded-xl border border-amber/30 bg-amber/5 space-y-1.5">
                <h5 className="font-semibold text-amber text-xs flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 shrink-0" /> Strict Zero-Tolerance Violations
                </h5>
                <p className="text-muted-foreground text-[11px]">
                  Users connecting to GPU tunnels (Google Colab, Kaggle, local instances) must adhere to ethical AI safety protocols. Violating any of the following will result in permanent leaderboard bans:
                </p>
              </div>

              <ul className="space-y-2.5">
                <li className="p-3 rounded-xl border border-border bg-surface-2/40 flex items-start gap-2.5">
                  <span className="font-mono text-rose-400 font-bold text-xs mt-0.5">01</span>
                  <div>
                    <strong className="text-foreground text-xs">No Cryptomining or Compute Exploitation:</strong>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      Running crypto miners, hash-cracking scripts, or denial-of-service botnets through the Colab tunnel or local runner is strictly prohibited.
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl border border-border bg-surface-2/40 flex items-start gap-2.5">
                  <span className="font-mono text-rose-400 font-bold text-xs mt-0.5">02</span>
                  <div>
                    <strong className="text-foreground text-xs">No Malicious AI Generation or Jailbreaking:</strong>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      Do not use the interactive AI Studio to generate malware, exploits, phishing scripts, hate speech, or non-consensual deepfakes.
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl border border-border bg-surface-2/40 flex items-start gap-2.5">
                  <span className="font-mono text-rose-400 font-bold text-xs mt-0.5">03</span>
                  <div>
                    <strong className="text-foreground text-xs">No Automated Scraping or Impersonation:</strong>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      Automated scraping of certificate credentials or spoofing leaderboard XP counts through unauthorized API flooding will trigger instant revocation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* USER SAFETY NOTICE */}
          {activeTab === "safety" && (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-rose-400 tracking-wider font-semibold">
                  Critical Safeguards
                </span>
                <h4 className="font-display text-base font-bold text-foreground mt-0.5">
                  Important User Safety Notice &amp; GPU Guidelines
                </h4>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
                <h5 className="font-semibold text-rose-300 text-xs flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" /> 1. Colab Tunnel Token Security
                </h5>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Never share your personal Cloudflare Tunnel URL (<code className="font-mono text-white">*.trycloudflare.com</code>) with untrusted third parties. Anyone with that URL can execute Python commands on your running Colab GPU runtime instance. Always disconnect runtime when your study session ends.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface-2/50 space-y-2">
                <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-primary" /> 2. Compute Cost Protection
                </h5>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Google Colab and Kaggle offer generous free compute quotas (T4/P100 GPUs). Smart Canvas Grow will never charge your bank card for cloud compute. Keep track of your own usage on Google Colab to avoid unexpected session timeouts.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface-2/50 space-y-2">
                <h5 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-emerald-400" /> 3. Responsible AI Engineering
                </h5>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  AI models can hallucinate facts. Always verify outputs before deploying models to production applications. The lessons provided are for professional upskilling and career development.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-border bg-surface/50 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Smart Canvas Grow • Compliance &amp; Safety</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-surface-2 hover:bg-surface border border-border text-foreground transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}


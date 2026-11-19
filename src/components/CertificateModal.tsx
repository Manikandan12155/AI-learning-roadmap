import React, { useRef, useState } from "react";
import {
  X,
  Award,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Lock,
  ChevronRight,
  Milestone,
} from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  doneCount: number;
  totalCount: number;
  completedLevels: number;
}

interface MilestoneTier {
  tierNumber: number;
  title: string;
  scope: string;
  requiredLevels: number;
  requiredTopics: number;
  badge: string;
  description: string;
}

const MILESTONE_TIERS: MilestoneTier[] = [
  {
    tierNumber: 1,
    title: "AI & ML Foundations Practitioner",
    scope: "Levels 00 - 01",
    requiredLevels: 1,
    requiredTopics: 20,
    badge: "Foundations Tier",
    description: "Core Python, Matrix Math, Linear Algebra, and Data Science Fundamentals.",
  },
  {
    tierNumber: 2,
    title: "Deep Learning & Generative AI Specialist",
    scope: "Levels 00 - 04",
    requiredLevels: 4,
    requiredTopics: 80,
    badge: "Specialist Tier",
    description: "PyTorch, Neural Networks, Computer Vision, Transformers & Fine-tuning.",
  },
  {
    tierNumber: 3,
    title: "Autonomous Agents & RAG 2.0 Architect",
    scope: "Levels 00 - 08",
    requiredLevels: 8,
    requiredTopics: 160,
    badge: "Architect Tier",
    description: "Vector Databases, Hybrid Search, Graph RAG, LangChain & Agent Workflows.",
  },
  {
    tierNumber: 4,
    title: "Certified Principal AI Systems Engineer",
    scope: "Levels 00 - 13 (Full Curriculum)",
    requiredLevels: 14,
    requiredTopics: 280,
    badge: "Master Diploma",
    description: "Enterprise LLMOps, vLLM Serving, Multi-Agent Swarms & Production AI Architecture.",
  },
];

export function CertificateModal({
  isOpen,
  onClose,
  currentUser,
  doneCount,
  totalCount,
  completedLevels,
}: CertificateModalProps) {
  const [activeView, setActiveView] = useState<"certificate" | "journey">("certificate");
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const userDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "AI Engineer";

  // Current active highest unlocked tier
  let highestTierIndex = 0;
  if (completedLevels >= 14 || doneCount >= 280) highestTierIndex = 3;
  else if (completedLevels >= 8 || doneCount >= 160) highestTierIndex = 2;
  else if (completedLevels >= 4 || doneCount >= 80) highestTierIndex = 1;
  else if (completedLevels >= 1 || doneCount >= 20) highestTierIndex = 0;

  const currentDisplayTier = MILESTONE_TIERS[selectedMilestoneIndex];
  const isSelectedTierUnlocked =
    completedLevels >= currentDisplayTier.requiredLevels || doneCount >= currentDisplayTier.requiredTopics;

  const userId = currentUser?.id || "GUEST";
  const certId = `SCG-AI-${userId.slice(0, 5).toUpperCase()}-T${currentDisplayTier.tierNumber}`;

  const issueDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const verificationUrl = `https://consistency-ai-learn.vercel.app/verify/${certId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleAddToLinkedIn = () => {
    const orgName = "Smart Canvas Grow";
    const certUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      currentDisplayTier.title
    )}&organizationName=${encodeURIComponent(orgName)}&issueYear=${new Date().getFullYear()}&issueMonth=${
      new Date().getMonth() + 1
    }&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(certId)}`;
    window.open(certUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-border/80 bg-card shadow-2xl p-5 sm:p-7 space-y-5 my-auto overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber/15 border border-amber/30 grid place-items-center text-amber">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                Verifiable Credentials &amp; Learning Journey
              </h3>
              <p className="text-xs text-muted-foreground">
                Industry proof of work for Naukri, LinkedIn &amp; Indeed profiles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* View Switcher Tabs: Certificate View vs Journey Roadmap View */}
        <div className="flex items-center justify-between gap-2 p-1 rounded-xl bg-surface-2/60 border border-border">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveView("certificate")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeView === "certificate"
                  ? "bg-surface text-foreground shadow-sm border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              📜 Certificate Document
            </button>
            <button
              onClick={() => setActiveView("journey")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeView === "journey"
                  ? "bg-surface text-foreground shadow-sm border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Milestone className="h-3.5 w-3.5 text-amber" />
              <span>4-Milestone Journey Map</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground pr-2 hidden sm:block">
            {completedLevels}/14 Levels Completed
          </div>
        </div>

        {/* MILESTONE STEPPER BAR (Always Visible) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MILESTONE_TIERS.map((tier, idx) => {
            const isUnlocked = completedLevels >= tier.requiredLevels || doneCount >= tier.requiredTopics;
            const isSelected = selectedMilestoneIndex === idx;

            return (
              <button
                key={tier.tierNumber}
                onClick={() => {
                  setSelectedMilestoneIndex(idx);
                  setActiveView("certificate");
                }}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "border-amber-500/70 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : isUnlocked
                    ? "border-border bg-surface/80 hover:border-amber-500/40"
                    : "border-border/40 bg-surface/30 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Tier {tier.tierNumber}
                  </span>
                  {isUnlocked ? (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,199,89,0.8)]" title="Unlocked" />
                  ) : (
                    <Lock className="h-3 w-3 text-muted-foreground/60" />
                  )}
                </div>
                <div className="font-display font-semibold text-xs text-foreground truncate">
                  {tier.title.split(" ")[0]} {tier.title.split(" ")[1]}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  {tier.scope}
                </div>
              </button>
            );
          })}
        </div>

        {/* 1. CERTIFICATE DOCUMENT VIEW */}
        {activeView === "certificate" && (
          <div className="space-y-4">
            <div
              ref={certRef}
              className="relative rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-[#0c1210] via-[#060a08] to-[#040807] p-6 sm:p-9 shadow-[0_0_40px_rgba(245,158,11,0.15)] text-center space-y-5 overflow-hidden"
            >
              {/* Lock overlay if user hasn't achieved this tier yet */}
              {!isSelectedTierUnlocked && (
                <div className="absolute inset-0 z-30 backdrop-blur-[6px] bg-black/75 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 border border-amber-500/40 grid place-items-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white">
                    {currentDisplayTier.title} Locked
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md leading-relaxed font-sans">
                    Complete <strong>{currentDisplayTier.scope}</strong> ({currentDisplayTier.requiredTopics}+ topics) to unlock and claim this industry-verifiable credential.
                  </p>
                  <div className="font-mono text-[11px] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    Your Current Progress: {doneCount}/{currentDisplayTier.requiredTopics} topics completed
                  </div>
                </div>
              )}

              {/* Ornamental Luxury Border Accents */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-amber-400/70" />
              <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-amber-400/70" />
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-amber-400/70" />
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-amber-400/70" />

              {/* Watermark Logo Backdrop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Award className="w-80 h-80 text-amber-300" />
              </div>

              {/* Certificate Header Branding */}
              <div className="space-y-1 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
                  <Sparkles className="h-3 w-3" /> Smart Canvas Grow · AI Curriculum
                </div>
                <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white uppercase pt-1">
                  Certificate of Achievement
                </h2>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Standard AI &amp; ML Production Competency Verification
                </p>
              </div>

              {/* Recipient Details */}
              <div className="space-y-1 relative z-10 pt-1">
                <p className="text-xs text-muted-foreground italic">This is proudly presented to</p>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 drop-shadow-md">
                  {userDisplayName}
                </h1>
                <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto my-2" />
                <p className="text-xs text-neutral-300 max-w-xl mx-auto leading-relaxed">
                  for successfully completing and verifying mastery in {currentDisplayTier.description}
                </p>
              </div>

              {/* Awarded Degree */}
              <div className="relative z-10 inline-block bg-white/[0.03] border border-amber-500/30 rounded-xl px-4 py-2">
                <span className="font-mono text-[9px] text-amber-400/80 uppercase tracking-widest block">
                  Conferred Credential
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-white">
                  {currentDisplayTier.title}
                </span>
                <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px] font-mono text-muted-foreground">
                  <span>{currentDisplayTier.badge}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{currentDisplayTier.scope} Verified</span>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left relative z-10">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-wider block">
                    Credential ID &amp; Verification
                  </span>
                  <span className="font-mono text-xs font-semibold text-emerald-400">{certId}</span>
                  <span className="font-mono text-[9px] text-neutral-400 block">Issued on: {issueDate}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center sm:text-right">
                    <span className="font-serif italic text-xs text-neutral-200 block border-b border-white/20 pb-0.5">
                      Manikandan
                    </span>
                    <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest block mt-0.5">
                      Curator &amp; Lead AI Engineer
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-full border-2 border-amber-400/50 bg-amber-500/10 grid place-items-center text-amber-400 shadow-glow">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            {isSelectedTierUnlocked ? (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleAddToLinkedIn}
                  className="flex-1 min-w-[160px] h-9 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-medium text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>Add to LinkedIn</span>
                </button>

                <button
                  onClick={handlePrintCertificate}
                  className="h-9 px-4 rounded-xl border border-border bg-surface hover:bg-surface-2 text-foreground font-medium text-xs transition inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4 text-primary" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="h-9 px-4 rounded-xl border border-border bg-surface hover:bg-surface-2 text-foreground font-medium text-xs transition inline-flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-muted-foreground" />
                      <span>Copy for Resume</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-neutral-300 flex items-center justify-between">
                <span>🔒 Complete the required topics in the roadmap to unlock this badge.</span>
                <button
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg bg-primary/20 text-primary-glow font-mono text-xs hover:bg-primary/30 transition"
                >
                  Go to Roadmap →
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. JOURNEY ROADMAP BREAKDOWN VIEW */}
        {activeView === "journey" && (
          <div className="space-y-3 p-1">
            <div className="text-xs text-muted-foreground leading-relaxed">
              Certification flows sequentially across 4 industry milestones. As you mark topics completed in the roadmap, each credential unlocks automatically:
            </div>

            <div className="space-y-2.5">
              {MILESTONE_TIERS.map((tier, idx) => {
                const isUnlocked = completedLevels >= tier.requiredLevels || doneCount >= tier.requiredTopics;
                const progressPct = Math.min(Math.round((doneCount / tier.requiredTopics) * 100), 100);

                return (
                  <div
                    key={tier.tierNumber}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isUnlocked
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-border bg-surface-2/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold ${
                            isUnlocked
                              ? "bg-emerald-500 text-black"
                              : "bg-surface-2 text-muted-foreground border border-border"
                          }`}
                        >
                          {isUnlocked ? "✓" : tier.tierNumber}
                        </span>
                        <h4 className="font-display font-semibold text-xs sm:text-sm text-foreground">
                          {tier.title}
                        </h4>
                        <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
                          ({tier.scope})
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-400">
                        {isUnlocked ? "Unlocked 🎉" : `${progressPct}% Complete`}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                      {tier.description}
                    </p>

                    <div className="mt-2.5 pl-7 flex items-center gap-3">
                      <div className="h-1.5 flex-1 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-primary transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {Math.min(doneCount, tier.requiredTopics)}/{tier.requiredTopics} topics
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

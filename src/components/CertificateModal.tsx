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
} from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  doneCount: number;
  totalCount: number;
  completedLevels: number;
}

export function CertificateModal({
  isOpen,
  onClose,
  currentUser,
  doneCount,
  totalCount,
  completedLevels,
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const userDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "AI Engineer";

  // Derive unique credential ID based on user or date
  const userId = currentUser?.id || "GUEST";
  const certId = `SCG-AI-${userId.slice(0, 5).toUpperCase()}-${Math.min(completedLevels, 14)}`;

  // Determine Milestone Tier
  let tierTitle = "AI Engineering Apprentice";
  let tierBadge = "Foundation Level";
  let isEligible = false;

  if (completedLevels >= 14 || doneCount >= 280) {
    tierTitle = "Certified Principal AI Systems Engineer";
    tierBadge = "Full Master Diploma (Level 00 - 13)";
    isEligible = true;
  } else if (completedLevels >= 8 || doneCount >= 160) {
    tierTitle = "Autonomous Agents & RAG 2.0 Architect";
    tierBadge = "Advanced Systems Tier (Level 00 - 08)";
    isEligible = true;
  } else if (completedLevels >= 4 || doneCount >= 80) {
    tierTitle = "Deep Learning & Generative AI Specialist";
    tierBadge = "Intermediate Tier (Level 00 - 04)";
    isEligible = true;
  } else if (completedLevels >= 1 || doneCount >= 20) {
    tierTitle = "AI & ML Foundations Practitioner";
    tierBadge = "Foundations Tier (Level 00 - 01)";
    isEligible = true;
  }

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
      tierTitle
    )}&organizationName=${encodeURIComponent(orgName)}&issueYear=${new Date().getFullYear()}&issueMonth=${
      new Date().getMonth() + 1
    }&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(certId)}`;
    window.open(certUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-border/80 bg-card shadow-2xl p-5 sm:p-7 space-y-6 my-auto overflow-hidden">
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
                Verifiable AI Engineering Credential
              </h3>
              <p className="text-xs text-muted-foreground">
                Industry-grade proof of work for Naukri, LinkedIn &amp; Indeed
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

        {/* PRINTABLE / DISPLAYABLE CERTIFICATE CANVAS */}
        <div
          ref={certRef}
          className="relative rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-[#0c1210] via-[#060a08] to-[#040807] p-6 sm:p-10 shadow-[0_0_40px_rgba(245,158,11,0.15)] text-center space-y-6 overflow-hidden"
        >
          {/* Ornamental Luxury Border Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/70" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/70" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/70" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/70" />

          {/* Watermark Logo Backdrop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Award className="w-80 h-80 text-amber-300" />
          </div>

          {/* Certificate Header Branding */}
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> Smart Canvas Grow · AI Curriculum
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase pt-2">
              Certificate of Achievement
            </h2>
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
              Standard AI &amp; ML Production Competency Verification
            </p>
          </div>

          {/* Recipient Details */}
          <div className="space-y-2 relative z-10 pt-2">
            <p className="text-xs text-muted-foreground italic">This is proudly presented to</p>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 drop-shadow-md">
              {userDisplayName}
            </h1>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto my-2" />
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              for successfully mastering and demonstrating technical competency in the comprehensive 14-Level AI Engineering Curriculum, spanning Foundations, Deep Learning, LLM Fine-Tuning, Advanced RAG 2.0, and Production Autonomous Agents.
            </p>
          </div>

          {/* Awarded Degree & Competency Track */}
          <div className="relative z-10 inline-block bg-white/[0.03] border border-amber-500/30 rounded-xl px-4 py-2.5">
            <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-widest block">
              Conferred Credential
            </span>
            <span className="font-display text-sm sm:text-base font-bold text-white">
              {tierTitle}
            </span>
            <div className="flex items-center justify-center gap-2 mt-1 text-[11px] font-mono text-muted-foreground">
              <span>{tierBadge}</span>
              <span>•</span>
              <span className="text-emerald-400">{doneCount}/{totalCount} Topics Verified</span>
            </div>
          </div>

          {/* Certificate Footer Signatures & QR Verification */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left relative z-10">
            {/* Verification Hash & ID */}
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider block">
                Credential ID &amp; Verification
              </span>
              <span className="font-mono text-xs font-semibold text-emerald-400">{certId}</span>
              <span className="font-mono text-[10px] text-neutral-400 block">Issued on: {issueDate}</span>
            </div>

            {/* Official Seal / Signature Badge */}
            <div className="flex items-center gap-3">
              <div className="text-center sm:text-right">
                <span className="font-serif italic text-xs sm:text-sm text-neutral-200 block border-b border-white/20 pb-0.5">
                  Manikandan
                </span>
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mt-0.5">
                  Curator &amp; Lead AI Engineer
                </span>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-amber-400/50 bg-amber-500/10 grid place-items-center text-amber-400 shadow-glow">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls for Naukri, LinkedIn & Resume */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* LinkedIn Add Button */}
            <button
              onClick={handleAddToLinkedIn}
              className="flex-1 min-w-[170px] h-10 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-medium text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
              <span>Add to LinkedIn Profile</span>
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrintCertificate}
              className="h-10 px-4 rounded-xl border border-border bg-surface hover:bg-surface-2 text-foreground font-medium text-xs transition inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4 text-primary" />
              <span>Print / Download PDF</span>
            </button>

            {/* Copy Verifiable Link for Naukri/Indeed Resume */}
            <button
              onClick={handleCopyLink}
              className="h-10 px-4 rounded-xl border border-border bg-surface hover:bg-surface-2 text-foreground font-medium text-xs transition inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  <span>Copy Link for Resume</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Resume Tip:</strong> Paste this verification link directly into your Naukri / Indeed portfolio section under Certifications.
              </span>
            </div>
            <span className="font-mono text-[10px] text-primary-glow font-semibold shrink-0">
              Verifiable 24/7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


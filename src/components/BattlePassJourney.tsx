import React, { useState } from "react";
import {
  Trophy,
  Lock,
  Check,
  Sparkles,
  Zap,
  Gift,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";
import avatarTier1 from "@/assets/animal-tier-1.jpg";
import avatarTier2 from "@/assets/animal-tier-2.jpg";
import avatarTier3 from "@/assets/animal-tier-3.jpg";
import avatarTier4 from "@/assets/animal-tier-4.jpg";

interface BattlePassJourneyProps {
  completedTopicsCount: number;
  totalTopicsCount: number;
  onOpenCertificateModal: () => void;
}

interface ChestReward {
  level: number;
  topicsNeeded: number;
  title: string;
  badge: string;
  tierName: string;
  guardianName: string;
  rewardType: "bronze" | "silver" | "gold" | "master";
  avatarImg: string;
  subtitle: string;
}

const REWARD_CHESTS: ChestReward[] = [
  {
    level: 1,
    topicsNeeded: 61,
    title: "Cyber Fox Chest",
    guardianName: "Cyber Fennec Fox",
    badge: "Foundations & Python",
    tierName: "AI Practitioner Credential",
    rewardType: "bronze",
    avatarImg: avatarTier1,
    subtitle: "Complete Levels 00-01 (Agile Apprentice • 61 Topics)",
  },
  {
    level: 5,
    topicsNeeded: 163,
    title: "Leopard Vault",
    guardianName: "Neural Snow Leopard",
    badge: "Math, ML & Deep Learning",
    tierName: "GenAI Specialist Credential",
    rewardType: "silver",
    avatarImg: avatarTier2,
    subtitle: "Complete Levels 00-05 (Predator Speed & Focus • 163 Topics)",
  },
  {
    level: 9,
    topicsNeeded: 264,
    title: "Alpha Wolf Coffer",
    guardianName: "Armored Silver Wolf",
    badge: "GenAI, Agents & AI Apps",
    tierName: "Autonomous Agents Credential",
    rewardType: "gold",
    avatarImg: avatarTier3,
    subtitle: "Complete Levels 00-09 (Tactical Alpha Leader • 264 Topics)",
  },
  {
    level: 15,
    topicsNeeded: 583,
    title: "Apex Dragon Relic",
    guardianName: "Apex Dragon-Lion King",
    badge: "Master Diploma + Glossary",
    tierName: "Principal AI Systems Diploma",
    rewardType: "master",
    avatarImg: avatarTier4,
    subtitle: "100% Supreme Mastery (All 14 Levels + 250 Glossary Terms)",
  },
];

export function BattlePassJourney({
  completedTopicsCount,
  totalTopicsCount,
  onOpenCertificateModal,
}: BattlePassJourneyProps) {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(1);

  // Overall progress percentage along the golden battle track
  const maxTrackTopics = totalTopicsCount || 583;
  const trackPercentage = Math.min(
    Math.round((completedTopicsCount / maxTrackTopics) * 100),
    100
  );

  return (
    <div className="w-full my-8 rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-[#171411] via-[#0d0c0a] to-[#070605] p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
      {/* Stone / Dungeon Castle Ambient Lighting */}
      <div className="absolute -top-16 left-1/4 w-72 h-36 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-16 right-1/4 w-72 h-36 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header: Clash of Clans Style */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 grid place-items-center shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-200/50">
            <Trophy className="h-5 w-5 text-black fill-current" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-wide text-white uppercase drop-shadow">
                AI Engineering Journey
              </h3>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Milestone Pass
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Clear topics across levels to unlock verifiable certificates &amp; claim milestone chests!
            </p>
          </div>
        </div>

        {/* Live Topic Gems & Star Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl shadow-inner">
            <span className="text-base">💎</span>
            <div className="text-left font-mono">
              <span className="text-xs font-bold text-cyan-400">{completedTopicsCount}</span>
              <span className="text-[10px] text-neutral-500"> / {totalTopicsCount} Topics</span>
            </div>
          </div>

          <button
            onClick={onOpenCertificateModal}
            className="h-9 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-1.5 active:scale-95"
          >
            <Award className="h-4 w-4" />
            <span>View Diplomas</span>
          </button>
        </div>
      </div>

      {/* 3D HORIZONTAL BATTLE PASS TRACK CONTAINER */}
      <div className="relative pt-16 pb-6 px-2 sm:px-8 overflow-x-auto">
        <div className="min-w-[650px] relative">
          {/* THE 4 CHEST MILESTONES */}
          <div className="grid grid-cols-4 gap-4 relative z-20 mb-3">
            {REWARD_CHESTS.map((chest, idx) => {
              const isClaimed = completedTopicsCount >= chest.topicsNeeded;
              const isCurrentTarget =
                !isClaimed &&
                (idx === 0 || completedTopicsCount >= REWARD_CHESTS[idx - 1].topicsNeeded);

              return (
                <div
                  key={chest.level}
                  className="flex flex-col items-center text-center relative group cursor-pointer"
                  onClick={() => {
                    setActiveTooltip(idx);
                    if (isClaimed) onOpenCertificateModal();
                  }}
                >
                  {/* Floating Action Claim Popup (Clash Style Green Bubble) */}
                  {isCurrentTarget && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 animate-bounce duration-700 pointer-events-auto">
                      <div className="relative bg-gradient-to-b from-[#4cd964] to-[#2ac046] border-2 border-[#bbf7c8] text-black px-3.5 py-1 rounded-xl shadow-[0_6px_25px_rgba(76,217,100,0.7)] flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                        <span className="font-display font-extrabold text-[11px] uppercase tracking-wider text-black">
                          Next Goal: {chest.topicsNeeded - completedTopicsCount} left
                        </span>
                        {/* Downward triangle pointer */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#2ac046]" />
                      </div>
                    </div>
                  )}

                  {isClaimed && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30">
                      <div className="bg-[#22c55e] border border-white text-black font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] flex items-center gap-1 whitespace-nowrap">
                        <Check className="h-3 w-3 stroke-[3]" /> Claimed!
                      </div>
                    </div>
                  )}

                  {/* 3D HERO AVATAR CARD (Clash of Clans Style Portrait Box) */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform group-hover:scale-105 overflow-hidden ${
                      isClaimed
                        ? "border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.6)]"
                        : isCurrentTarget
                        ? "border-2 border-emerald-400 shadow-[0_0_20px_rgba(52,199,89,0.5)] ring-2 ring-emerald-400/40"
                        : "border border-white/20 opacity-60 grayscale-[40%]"
                    }`}
                  >
                    {/* Character Avatar Real Image */}
                    <img
                      src={chest.avatarImg}
                      alt={chest.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Dark gradient vignette over avatar bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Locked Status Overlay or Claimed Stamp */}
                    <div className="absolute bottom-1.5 right-1.5 z-10">
                      {isClaimed ? (
                        <div className="h-6 w-6 rounded-full bg-emerald-500 text-black border border-white grid place-items-center shadow-glow">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-black/80 border border-white/30 text-white grid place-items-center shadow-md">
                          <Lock className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chest Title & Required Score */}
                  <div className="mt-3 space-y-0.5">
                    <span className="font-display font-extrabold text-xs text-white uppercase tracking-tight block">
                      {chest.title}
                    </span>
                    <span className="font-mono text-[10px] text-amber-400 block font-semibold">
                      {chest.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* THE GOLDEN 3D BATTLE TRACK BAR (Clash of Clans Yellow Stone Rail) */}
          <div className="relative h-6 rounded-full bg-[#1e1913] border-2 border-[#3d3122] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] p-0.5 flex items-center">
            {/* The Animated Golden Fill Progress */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.8)] transition-all duration-700"
              style={{ width: `${Math.max(trackPercentage, 3)}%` }}
            />

            {/* Step Checkpoint Flag Plugs on the Rail */}
            <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-12 pointer-events-none">
              {REWARD_CHESTS.map((chest) => {
                const reached = completedTopicsCount >= chest.topicsNeeded;
                return (
                  <div
                    key={chest.level}
                    className={`h-7 w-7 rounded-lg border-2 grid place-items-center font-mono text-[10px] font-extrabold shadow-md transform -translate-y-0.5 transition-all ${
                      reached
                        ? "bg-yellow-400 border-yellow-200 text-black shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                        : "bg-[#2b2319] border-[#4a3b2b] text-neutral-400"
                    }`}
                  >
                    {chest.topicsNeeded}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Under-Track Indicators */}
          <div className="flex items-center justify-between px-6 sm:px-10 mt-2 font-mono text-[10px] text-neutral-500">
            <span>61 Topics (L0-L1)</span>
            <span>163 Topics (L0-L5)</span>
            <span>264 Topics (L0-L9)</span>
            <span>583 Topics (Complete)</span>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Zap, Clock, Bell, UserCheck, Minimize2, Maximize2 } from "lucide-react";

interface LaunchCountdownModalProps {
  currentUser: any;
  onOpenAuthModal: () => void;
}

// Target Release: December 1, 2026 00:00:00 (Local Time)
const TARGET_RELEASE_TIMESTAMP = new Date(2026, 11, 1, 0, 0, 0).getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = TARGET_RELEASE_TIMESTAMP - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isUnlocked: false };
}

export function LaunchCountdownModal({ currentUser, onOpenAuthModal }: LaunchCountdownModalProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  // Allow creator/admin preview bypass with local state or stored bypass key
  const [adminBypassed, setAdminBypassed] = useState<boolean>(() => {
    return localStorage.getItem("scg_launch_bypass") === "true";
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // If time has officially passed Dec 1, 2026 OR admin has explicitly bypassed for dev
  if (timeLeft.isUnlocked || adminBypassed) {
    return null;
  }

  const userDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "AI Engineer";

  const userAvatar = currentUser?.user_metadata?.avatar_url || currentUser?.user_metadata?.picture;

  // Minimized Widget: Floating in bottom-left/right as a compact countdown pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 p-3 px-4 rounded-2xl border border-emerald-500/40 bg-[#070d0a]/95 backdrop-blur-2xl shadow-[0_0_30px_rgba(52,199,89,0.3)] animate-in slide-in-from-bottom-5 duration-300">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 grid place-items-center text-black shadow-[0_0_15px_rgba(52,199,89,0.5)] shrink-0">
          <Zap className="h-4 w-4 stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            AI Launch In
          </span>
          <div className="flex items-center gap-1 font-mono text-xs font-black text-white tabular-nums">
            <span className="text-emerald-400">{String(timeLeft.days).padStart(2, "0")}d</span>
            <span>:</span>
            <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
            <span>:</span>
            <span className="text-teal-300">{String(timeLeft.seconds).padStart(2, "0")}s</span>
          </div>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition ml-1"
          title="Expand Countdown"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl select-none animate-in fade-in duration-300">
      {/* Background Neural / Radial Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Popup Card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-[#070d0a]/95 backdrop-blur-3xl shadow-[0_0_60px_rgba(52,199,89,0.25)] p-6 sm:p-8 text-center space-y-6 overflow-hidden">
        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition"
          title="Minimize to corner"
        >
          <Minimize2 className="h-4 w-4" />
        </button>

        {/* Subtle Top Glowing Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34C759]" />

        {/* Header Icon / Power Reactor */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 grid place-items-center text-black shadow-[0_0_30px_rgba(52,199,89,0.6)] animate-pulse">
              <Zap className="h-9 w-9 sm:h-11 sm:w-11 stroke-[2.5]" />
            </div>
            {/* Subtle Orbiting Ping Ring */}
            <div className="absolute -inset-2 rounded-3xl border border-emerald-400/40 animate-ping pointer-events-none" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-[11px] font-mono font-bold text-emerald-300 tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Official Launch Countdown
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            AI Will Come Soon
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed font-sans">
            The complete 14-Level Autonomous AI &amp; Systems Engineering roadmap is scheduled for official global release on <strong className="text-emerald-400 font-semibold">December 1, 2026</strong>.
          </p>
        </div>

        {/* 4-Card Reverse Countdown Display */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 py-1">
          {/* Days */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="font-mono text-2xl sm:text-3xl font-black text-teal-300 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(45,212,191,0.5)] animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
              Secs
            </span>
          </div>
        </div>

        {/* Pre-login with Google Section */}
        <div className="pt-2 border-t border-white/10 space-y-3">
          {currentUser ? (
            /* Logged in state -> VIP Access Confirmation */
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5 min-w-0">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userDisplayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold grid place-items-center uppercase shrink-0">
                    {userDisplayName.slice(0, 1)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">{userDisplayName}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      VIP EARLY BIRD
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate">
                    Cloud progress sync &amp; priority launch pass active
                  </p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            </div>
          ) : (
            /* Not logged in -> Pre-login with Google CTA */
            <div className="space-y-2">
              <p className="text-xs text-neutral-300 font-medium">
                Pre-register your account to reserve your spot &amp; cloud study sync:
              </p>
              <button
                onClick={onOpenAuthModal}
                className="w-full h-11 px-4 rounded-xl font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 bg-white text-black hover:bg-neutral-100 transition-all font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Pre-login with Google</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info & Admin Bypass link */}
        <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>Target: Dec 01, 2026 00:00:00</span>
          {/* Hidden Admin/Dev switch */}
          <button
            onClick={() => {
              localStorage.setItem("scg_launch_bypass", "true");
              setAdminBypassed(true);
            }}
            className="text-[10px] text-neutral-500 hover:text-emerald-400 transition underline underline-offset-2"
            title="Creator development preview mode"
          >
            Creator Bypass →
          </button>
        </div>
      </div>
    </div>
  );
}


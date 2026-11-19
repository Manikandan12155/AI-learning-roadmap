import React from "react";
import {
  X,
  Settings,
  User,
  Compass,
  KeyRound,
  ShieldCheck,
  Check,
  Sparkles,
  ExternalLink,
  LogOut,
  Moon,
  Sun,
  Layers,
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  journeyTrack: boolean;
  onToggleJourneyTrack: () => void;
  onOpenKeysModal: () => void;
  hasApiKey: boolean;
  activeProviderName: string | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  completedTopicsCount: number;
  totalTopicsCount: number;
}

export function SettingsModal({
  isOpen,
  onClose,
  currentUser,
  journeyTrack,
  onToggleJourneyTrack,
  onOpenKeysModal,
  hasApiKey,
  activeProviderName,
  onOpenAuthModal,
  onSignOut,
  theme,
  onToggleTheme,
  completedTopicsCount,
  totalTopicsCount,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const userDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "Guest Explorer";

  const userEmail = currentUser?.email || "Not signed in";
  const userAvatar = currentUser?.user_metadata?.avatar_url;
  const progressPct = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card shadow-2xl p-6 sm:p-7 space-y-6 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-surface-2 border border-border grid place-items-center text-primary">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Preferences &amp; Settings</h3>
              <p className="text-xs text-muted-foreground">Manage profile, learning journey, and AI keys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Card Section */}
        <div className="p-4 rounded-xl border border-border bg-surface-2/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User className="h-3 w-3 text-primary" /> Profile Account
            </span>
            {currentUser ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" /> Cloud Synced
              </span>
            ) : (
              <span className="text-[11px] font-mono text-amber bg-amber/10 px-2 py-0.5 rounded-full border border-amber/20">
                Guest Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-3.5">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userDisplayName}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/50 shadow-glow"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 text-primary-glow text-lg font-bold grid place-items-center uppercase">
                {userDisplayName.slice(0, 1)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-display font-semibold text-foreground text-sm truncate">
                {userDisplayName}
              </h4>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                <span>Progress: {progressPct}%</span>
                <span>•</span>
                <span>{completedTopicsCount}/{totalTopicsCount} topics</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition inline-flex items-center justify-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-primary text-black text-xs font-semibold hover:opacity-95 shadow-[0_0_12px_rgba(52,199,89,0.3)] transition inline-flex items-center justify-center gap-1.5"
              >
                Sign In with Google to Sync
              </button>
            )}
          </div>
        </div>

        {/* Journey Track Toggle Section */}
        <div className="p-4 rounded-xl border border-border bg-surface-2/40 space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Journey Track Mode</span>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary-glow border border-primary/20">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Step-by-step sequential learning. Level mudicha dhaan next level unlock aagum; matha topics blurred-ah irukum.
              </p>
            </div>

            {/* Apple macOS 27 Style Toggle (#34C759) */}
            <button
              onClick={onToggleJourneyTrack}
              type="button"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                journeyTrack ? "bg-[#34C759]" : "bg-neutral-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  journeyTrack ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground/80 pt-1">
            Status: {journeyTrack ? (
              <span className="text-emerald-400">ON (Strict Step-by-Step Prerequisite Flow)</span>
            ) : (
              <span className="text-amber">OFF (Open Sandbox Mode — All Levels Explorable)</span>
            )}
          </div>
        </div>

        {/* AI Key Manager Integration */}
        <div className="p-4 rounded-xl border border-border bg-surface-2/40 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">AI API Keys</span>
              {hasApiKey && (
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeProviderName || "Active"}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Manage free keys for Gemini, Groq, Cerebras, OpenRouter &amp; Together.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenKeysModal();
            }}
            className="px-3.5 py-1.5 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary-glow text-xs font-mono font-medium transition"
          >
            Configure →
          </button>
        </div>

        {/* Theme & Aesthetics */}
        <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-surface-2/30">
          <div className="flex items-center gap-2">
            {theme === "dark" ? (
              <Moon className="h-4 w-4 text-primary" />
            ) : (
              <Sun className="h-4 w-4 text-amber" />
            )}
            <span className="text-xs font-medium text-foreground">Theme Mode</span>
          </div>
          <button
            onClick={onToggleTheme}
            className="h-8 px-3 rounded-lg border border-border bg-surface hover:bg-surface-2 text-xs font-mono transition"
          >
            {theme === "dark" ? "Dark Theme" : "Light Theme"}
          </button>
        </div>
      </div>
    </div>
  );
}


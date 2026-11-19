import React, { useState } from "react";
import { X, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured) {
      // In demo mode without Supabase env keys, provide simulated login for testing
      const simulatedUser = {
        id: "demo-user-" + Date.now(),
        email: "engineer@example.com",
        user_metadata: {
          full_name: "AI Engineer",
          avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=engineer",
        },
      };
      localStorage.setItem("scg_demo_user", JSON.stringify(simulatedUser));
      if (onSuccess) onSuccess();
      onClose();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (signInError) throw signInError;
    } catch (err: any) {
      setError(err?.message || "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-card shadow-2xl p-6 sm:p-7 space-y-6 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/25 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-glow font-mono text-[10px] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Join 1000+ AI Builders
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">
            Sign In with Google
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Unlock AI Study Studio (Quiz, Flashcards &amp; Mind Map) and sync your roadmap progress across all devices.
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-2.5 p-3.5 rounded-xl border border-border bg-surface-2/40 text-xs">
          <div className="flex items-center gap-2 text-foreground/90">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Sync level &amp; topic progress to the cloud</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/90">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Access full AI Study Studio with your free keys</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/90">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Generate interactive quizzes &amp; flashcards</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border border-border bg-surface hover:bg-surface-2 text-foreground font-semibold text-xs transition flex items-center justify-center gap-3 shadow-card hover:border-primary/50 group"
          >
            {/* Google SVG Icon */}
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{loading ? "Connecting..." : "Continue with Google"}</span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Secure 1-click Google OAuth authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}


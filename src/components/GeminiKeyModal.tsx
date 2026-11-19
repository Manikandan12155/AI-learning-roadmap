import React, { useState, useEffect } from "react";
import { KeyRound, Sparkles, X, ExternalLink, Check, Trash2, ShieldCheck } from "lucide-react";

interface GeminiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export function GeminiKeyModal({ isOpen, onClose, onKeyUpdated }: GeminiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem("gemini_user_api_key");
        if (stored) {
          setSavedKey(stored);
          setApiKey(stored);
        } else {
          setSavedKey(null);
          setApiKey("");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem("gemini_user_api_key", trimmed);
      setSavedKey(trimmed);
      setSavedStatus(true);
      onKeyUpdated();
      setTimeout(() => {
        setSavedStatus(false);
        onClose();
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemove = () => {
    try {
      localStorage.removeItem("gemini_user_api_key");
      setSavedKey(null);
      setApiKey("");
      onKeyUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary grid place-items-center">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-foreground">
                Gemini API Key Setup
              </h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                BYOK · Instant AI Tutor Configuration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Info */}
        <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground leading-relaxed space-y-2">
          <div className="flex items-center gap-1.5 text-primary font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>100% Free &amp; Stored locally in your browser</span>
          </div>
          <p>
            Generate a free API key from Google AI Studio and paste it here to unlock instant AI tutoring and deep topic insights across the entire curriculum.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground flex items-center justify-between">
            <span>Gemini API Key:</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline text-[11px] font-mono inline-flex items-center gap-1"
            >
              Get free key (1-click) <ExternalLink className="h-3 w-3" />
            </a>
          </label>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary font-mono"
          />
        </div>

        {/* Current status */}
        {savedKey && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-2 border border-border text-xs">
            <span className="text-muted-foreground">
              Current Key: <strong className="text-foreground font-mono">••••••••{savedKey.slice(-4)}</strong>
            </span>
            <button
              onClick={handleRemove}
              className="text-destructive hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
            >
              <Trash2 className="h-3 w-3" /> Remove
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border bg-surface text-muted-foreground hover:text-foreground text-xs font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 disabled:opacity-50 transition inline-flex items-center gap-1.5 shadow-glow"
          >
            {savedStatus ? (
              <>
                <Check className="h-3.5 w-3.5" /> Saved!
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" /> Save API Key
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


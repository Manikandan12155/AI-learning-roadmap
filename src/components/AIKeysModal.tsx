import React, { useState, useEffect } from "react";
import { KeyRound, Sparkles, X, ExternalLink, Check, Trash2, ShieldCheck, Zap } from "lucide-react";
import { AI_PROVIDERS, type AIProviderConfig } from "@/data/aiProviders";

interface AIKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeysUpdated: () => void;
}

export function AIKeysModal({ isOpen, onClose, onKeysUpdated }: AIKeysModalProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>("gemini");
  const [keysState, setKeysState] = useState<Record<string, string>>({});
  const [inputVal, setInputVal] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedProvider: AIProviderConfig =
    AI_PROVIDERS.find((p) => p.id === selectedProviderId) || AI_PROVIDERS[0];

  useEffect(() => {
    if (isOpen) {
      const loaded: Record<string, string> = {};
      AI_PROVIDERS.forEach((p) => {
        try {
          const val = localStorage.getItem(p.keyStorageKey);
          if (val) loaded[p.id] = val;
        } catch (e) {
          console.error(e);
        }
      });
      setKeysState(loaded);
      setInputVal(loaded[selectedProviderId] || "");
    }
  }, [isOpen, selectedProviderId]);

  const handleSelectProvider = (provId: string) => {
    setSelectedProviderId(provId);
    setInputVal(keysState[provId] || "");
    setSaveSuccess(false);
  };

  const handleSaveCurrent = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem(selectedProvider.keyStorageKey, trimmed);
      setKeysState((prev) => ({ ...prev, [selectedProviderId]: trimmed }));
      setSaveSuccess(true);
      onKeysUpdated();
      setTimeout(() => setSaveSuccess(false), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveCurrent = () => {
    try {
      localStorage.removeItem(selectedProvider.keyStorageKey);
      setKeysState((prev) => {
        const next = { ...prev };
        delete next[selectedProviderId];
        return next;
      });
      setInputVal("");
      onKeysUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Left Sidebar: 5 Providers List */}
        <div className="w-full md:w-5/12 bg-surface/80 border-b md:border-b-0 md:border-r border-border p-4 space-y-2 overflow-y-auto">
          <div className="flex items-center gap-2 px-2 py-1">
            <Zap className="h-4 w-4 text-primary" />
            <h4 className="font-display font-semibold text-xs text-foreground uppercase tracking-wider">
              Free AI Providers
            </h4>
          </div>

          <div className="space-y-1">
            {AI_PROVIDERS.map((prov) => {
              const isConnected = !!keysState[prov.id];
              const isSelected = selectedProviderId === prov.id;

              return (
                <button
                  key={prov.id}
                  onClick={() => handleSelectProvider(prov.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-primary/15 border-primary/50 text-foreground shadow-sm"
                      : "bg-surface-2/40 border-border/60 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-xs truncate flex items-center gap-1.5">
                      <span>{prov.name}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate font-mono">
                      {prov.tag}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {isConnected ? (
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,199,89,0.7)]" title="Key Active" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-mono">Setup</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-[11px] text-muted-foreground space-y-1">
            <div className="flex items-center gap-1 text-primary font-medium">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Free &amp; Private
            </div>
            <p className="leading-relaxed">
              Keys are saved locally in your browser. Any 1 free key is enough to unlock full features!
            </p>
          </div>
        </div>

        {/* Right Content: Selected Provider Key Setup */}
        <div className="w-full md:w-7/12 p-6 flex flex-col justify-between space-y-5 overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-base text-foreground">
                  {selectedProvider.name} Key
                </h3>
                {keysState[selectedProvider.id] && (
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
                    Connected ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {selectedProvider.tag}
              </p>
            </div>

            <button
              onClick={onClose}
              className="h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-foreground">API Key:</label>
                <a
                  href={selectedProvider.getKeyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline text-[11px] font-mono inline-flex items-center gap-1"
                >
                  Get Free Key <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <input
                type="password"
                placeholder={
                  selectedProvider.id === "gemini"
                    ? "AIzaSy..."
                    : selectedProvider.id === "groq"
                    ? "gsk_..."
                    : selectedProvider.id === "openrouter"
                    ? "sk-or-v1-..."
                    : "Paste API Key..."
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* Saved Key Status */}
            {keysState[selectedProvider.id] && (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-2 border border-border text-xs">
                <span className="text-muted-foreground">
                  Active Key: <strong className="text-foreground font-mono">••••••••{keysState[selectedProvider.id].slice(-4)}</strong>
                </span>
                <button
                  onClick={handleRemoveCurrent}
                  className="text-destructive hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            )}

            {/* Models included under this key */}
            <div className="p-3 rounded-xl border border-border bg-surface-2/30 space-y-1.5 text-xs">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                Available models with this key:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProvider.models.map((m) => (
                  <span
                    key={m.id}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface border border-border/80 text-foreground/90"
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border bg-surface text-muted-foreground hover:text-foreground text-xs font-medium transition"
            >
              Close
            </button>
            <button
              onClick={handleSaveCurrent}
              disabled={!inputVal.trim()}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 disabled:opacity-50 transition inline-flex items-center gap-1.5 shadow-glow"
            >
              {saveSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Saved!
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" /> Save {selectedProvider.name} Key
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


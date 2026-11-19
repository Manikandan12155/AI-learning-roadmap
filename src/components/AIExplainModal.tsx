import React, { useState, useEffect } from "react";
import { KeyRound, Sparkles, X, ExternalLink, Bot, Check, AlertCircle, Loader2 } from "lucide-react";

interface AIExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKeySettings?: () => void;
  topicContext: {
    levelNumber: number;
    levelName: string;
    sectionName: string;
    topicName: string;
  } | null;
}

export function AIExplainModal({
  isOpen,
  onClose,
  onOpenKeySettings,
  topicContext,
}: AIExplainModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
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
  }, [isOpen]);

  const handleSaveKey = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) return;
    try {
      localStorage.setItem("gemini_user_api_key", trimmed);
      setSavedKey(trimmed);
      setIsEditingKey(false);
      setError(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearKey = () => {
    try {
      localStorage.removeItem("gemini_user_api_key");
      setSavedKey(null);
      setApiKey("");
      setIsEditingKey(true);
      setExplanation("");
    } catch (e) {
      console.error(e);
    }
  };

  const generateExplanation = async (activeKey: string) => {
    if (!topicContext) return;
    setLoading(true);
    setError(null);
    setExplanation("");

    const prompt = `You are a world-class Principal AI & Machine Learning Engineer and Senior Mentor.
Explain the topic "${topicContext.topicName}" for a learner following an advanced AI engineering roadmap.

Context:
- Level: L${topicContext.levelNumber.toString().padStart(2, "0")} (${topicContext.levelName})
- Section: ${topicContext.sectionName}
- Topic: ${topicContext.topicName}

Structure your response cleanly using Markdown:
### 1. Intuition & What It Actually Is
Explain simply with a high-impact real-world analogy. Avoid dry textbook jargon.

### 2. Why It Matters in AI / ML Engineering
Explain specifically how modern AI systems, neural networks, or ML pipelines use this.

### 3. Practical Implementation & Code Snippet
Provide a concise, production-grade Python or relevant code snippet demonstrating core usage.

### 4. System Pitfalls & Architecture Tips
What breaks in production? Common mistakes or scaling bottlenecks.

### 5. Quick Self-Assessment (Interview Question)
1 challenging interview question with a 1-sentence golden answer.`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to generate explanation. Please verify your Gemini API key.");
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("No explanation returned from Gemini.");
      }
      setExplanation(text);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && topicContext && savedKey && !isEditingKey) {
      generateExplanation(savedKey);
    }
  }, [isOpen, topicContext]);

  if (!isOpen || !topicContext) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface/60">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary-glow font-semibold">
                  AI Study Tutor · Gemini 2.0 Flash
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted-foreground font-mono">
                  L{topicContext.levelNumber.toString().padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-display text-lg font-semibold text-foreground truncate max-w-md">
                {topicContext.topicName}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* API Key Banner / Input */}
          {!savedKey ? (
            <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 space-y-4">
              <div className="flex items-start gap-3">
                <KeyRound className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-foreground">
                    Gemini API Key Required (100% Free)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Please provide your Google Gemini API key to view AI explanations. You can paste it here or use the key icon in the top header to unlock instant AI tutoring!
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none focus:border-primary font-mono"
                />
                <button
                  onClick={() => {
                    handleSaveKey();
                    if (apiKey.trim()) generateExplanation(apiKey.trim());
                  }}
                  disabled={!apiKey.trim()}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Save &amp; Explain
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50 text-muted-foreground">
                <span className="text-[11px]">Stored locally in your browser.</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  Get Free Gemini API Key (1-click) <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3.5 py-2 rounded-lg border border-border/60 bg-surface/40 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Active Key:</span>
                <span className="font-mono text-foreground">
                  ••••••••{savedKey.slice(-4)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateExplanation(savedKey)}
                  disabled={loading}
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  Regenerate
                </button>
                {onOpenKeySettings && (
                  <>
                    <span className="text-border">|</span>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenKeySettings();
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Manage in Header
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="font-mono text-xs animate-pulse">
                Generating comprehensive AI engineering breakdown...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs space-y-2 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">Error explaining topic</div>
                <div className="mt-0.5 opacity-90">{error}</div>
                <div className="mt-2">
                  <button
                    onClick={() => setIsEditingKey(true)}
                    className="underline font-mono text-[11px]"
                  >
                    Check or change API key
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Markdown Content Display */}
          {!loading && explanation && (
            <div className="prose prose-invert max-w-none text-foreground text-sm leading-relaxed space-y-4 font-sans selection:bg-primary/20">
              {explanation.split("\n\n").map((block, idx) => {
                if (block.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="font-display text-base font-semibold text-primary-glow border-b border-border/50 pb-1 mt-6 first:mt-0 flex items-center gap-2"
                    >
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                if (block.startsWith("```")) {
                  const cleaned = block.replace(/```[a-z]*\n?/g, "").trim();
                  return (
                    <pre
                      key={idx}
                      className="p-4 rounded-xl bg-surface border border-border font-mono text-xs overflow-x-auto text-emerald-300 leading-normal"
                    >
                      <code>{cleaned}</code>
                    </pre>
                  );
                }
                return (
                  <p key={idx} className="text-foreground/90 whitespace-pre-line text-xs sm:text-sm">
                    {block}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border bg-surface/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>Powered by Gemini 2.0 Flash (Free API)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md border border-border bg-surface text-foreground hover:bg-surface-2 transition text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { KeyRound, Sparkles, X, ExternalLink, Bot, AlertCircle, Loader2, ChevronDown, RotateCcw } from "lucide-react";

interface AIExplainPanelProps {
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

// 2026 Active Gemini Models
const AVAILABLE_MODELS = [
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro (Preview)", tag: "Recommended / Latest" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", tag: "Fast" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", tag: "Lite" },
];

export function AIExplainPanel({
  isOpen,
  onClose,
  onOpenKeySettings,
  topicContext,
}: AIExplainPanelProps) {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.1-pro-preview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("gemini_user_api_key");
      if (storedKey) {
        setSavedKey(storedKey);
        setApiKey(storedKey);
      } else {
        setSavedKey(null);
        setApiKey("");
      }

      const storedModel = localStorage.getItem("gemini_selected_model");
      // migrate if old models were saved in user's browser
      if (
        !storedModel ||
        storedModel.includes("1.5") ||
        storedModel.includes("2.0") ||
        storedModel === "gemini-2.5-pro"
      ) {
        setSelectedModel("gemini-3.1-pro-preview");
        localStorage.setItem("gemini_selected_model", "gemini-3.1-pro-preview");
      } else {
        setSelectedModel(storedModel);
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
      setError(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    try {
      localStorage.setItem("gemini_selected_model", modelId);
    } catch (e) {
      console.error(e);
    }
    if (savedKey) {
      generateExplanation(savedKey, modelId);
    }
  };

  const fetchAvailableModels = async (key: string): Promise<string[]> => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
      );
      if (!res.ok) return [];
      const data = await res.json();
      if (Array.isArray(data?.models)) {
        return data.models
          .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
          .map((m: any) => m.name.replace("models/", ""));
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  const generateExplanation = async (activeKey: string, modelToUse = selectedModel) => {
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

    // Query active models directly from Google if possible
    let serverModels = await fetchAvailableModels(activeKey);
    let candidateModels = [modelToUse];

    if (serverModels.length > 0) {
      // Prioritize active models supported by the key
      candidateModels = [
        ...new Set([
          modelToUse,
          ...serverModels.filter(m => m.includes("3.1") || m.includes("2.5")),
          ...serverModels,
        ])
      ];
    } else {
      // Hardcoded fallback list in order of 2026 Google API availability
      candidateModels = [
        ...new Set([
          modelToUse,
          "gemini-3.1-pro-preview",
          "gemini-2.5-flash",
          "gemini-2.5-flash-lite",
        ])
      ];
    }

    let lastError = "";
    for (const curModel of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${curModel}:generateContent?key=${activeKey}`,
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
          lastError = data?.error?.message || `Error calling ${curModel}`;
          if (
            lastError.includes("no longer available") ||
            lastError.includes("not found") ||
            lastError.includes("deprecated") ||
            lastError.includes("not supported")
          ) {
            continue;
          }
          throw new Error(lastError);
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error("No explanation returned from Gemini.");
        }
        if (curModel !== selectedModel) {
          setSelectedModel(curModel);
          localStorage.setItem("gemini_selected_model", curModel);
        }
        setExplanation(text);
        setLoading(false);
        return;
      } catch (err: any) {
        lastError = err?.message || "An unexpected error occurred.";
      }
    }

    setError(lastError);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && topicContext && savedKey) {
      generateExplanation(savedKey, selectedModel);
    }
  }, [isOpen, topicContext]);

  if (!isOpen || !topicContext) return null;

  return (
    <aside className="w-full lg:w-[460px] xl:w-[500px] shrink-0 h-[calc(100vh-5rem)] sticky top-16 rounded-2xl border border-border/80 bg-card shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-surface/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow shrink-0">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-primary-glow font-semibold">
                AI Tutor Breakdown
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-surface-2 border border-border text-muted-foreground font-mono">
                L{topicContext.levelNumber.toString().padStart(2, "0")}
              </span>
            </div>
            <h2 className="font-display text-sm font-semibold text-foreground truncate">
              {topicContext.topicName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {savedKey && (
            <button
              onClick={() => generateExplanation(savedKey, selectedModel)}
              disabled={loading}
              title="Regenerate explanation"
              className="h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition disabled:opacity-40"
            >
              <RotateCcw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            </button>
          )}
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
            title="Close panel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Panel Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* If Key NOT set */}
        {!savedKey && (
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
            <div className="flex items-start gap-2.5">
              <KeyRound className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h3 className="font-semibold text-xs text-foreground">
                  Gemini API Key Required (Free)
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Top header-la irukura key icon or inga API key paste panni AI tutoring unlock pannunga.
                </p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs text-foreground focus:outline-none focus:border-primary font-mono"
              />
              <button
                onClick={() => {
                  handleSaveKey();
                  if (apiKey.trim()) generateExplanation(apiKey.trim(), selectedModel);
                }}
                disabled={!apiKey.trim()}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Save
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-border/50 text-muted-foreground">
              <span>Saved locally</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1 font-mono"
              >
                Get Free Key (1-click) <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
            <p className="font-mono text-xs animate-pulse text-center">
              Generating breakdown with {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs space-y-2 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-xs">Error explaining topic</div>
              <div className="opacity-90 text-[11px] leading-relaxed mt-0.5">{error}</div>
              <div className="mt-2 flex items-center gap-2">
                {savedKey && (
                  <button
                    onClick={() => generateExplanation(savedKey, "gemini-3.1-pro-preview")}
                    className="underline text-[10px] text-foreground font-medium"
                  >
                    Switch to Gemini 3.1 Pro (Preview)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Explanation Content */}
        {!loading && explanation && (
          <div className="text-foreground text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
            {explanation.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-display text-sm font-semibold text-primary-glow border-b border-border/50 pb-1 mt-4 first:mt-0"
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
                    className="p-3 rounded-lg bg-surface border border-border font-mono text-[11px] overflow-x-auto text-emerald-300 leading-normal"
                  >
                    <code>{cleaned}</code>
                  </pre>
                );
              }
              return (
                <p key={idx} className="text-foreground/90 whitespace-pre-line text-xs sm:text-xs leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer with Model Selector */}
      <div className="px-3.5 py-2.5 border-t border-border bg-surface/70 backdrop-blur-md flex items-center justify-between gap-2">
        {/* Model dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">Model:</span>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="appearance-none bg-surface-2 border border-border rounded-lg pl-2.5 pr-7 py-1 text-[11px] font-mono text-foreground focus:outline-none focus:border-primary cursor-pointer hover:border-border-strong transition"
            >
              {AVAILABLE_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-surface text-foreground">
                  {m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-2.5 py-1 rounded-md border border-border bg-surface text-foreground hover:bg-surface-2 transition text-[11px] font-mono"
        >
          Close panel
        </button>
      </div>
    </aside>
  );
}

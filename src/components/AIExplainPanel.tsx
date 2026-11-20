import React, { useState, useEffect, useRef } from "react";
import {
  KeyRound,
  Sparkles,
  X,
  ExternalLink,
  Bot,
  AlertCircle,
  Loader2,
  ChevronDown,
  RotateCcw,
  Maximize2,
  Minimize2,
  BookOpen,
  HelpCircle,
  Layers,
  Network,
  Headphones,
  Compass,
  MessageSquare,
  Send,
  Youtube,
  Globe,
  Github,
  FileText,
} from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { QuizView, type QuizQuestion } from "./notebook/QuizView";
import { FlashcardsView, type FlashcardItem } from "./notebook/FlashcardsView";
import { MindMapView } from "./notebook/MindMapView";
import { AudioOverviewView } from "./notebook/AudioOverviewView";
import { AI_PROVIDERS, type AIProviderConfig } from "@/data/aiProviders";
import { requestAICompletion } from "@/utils/aiClient";
import { getCuratedResourcesForTopic, type CuratedResource } from "@/data/curatedResources";

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

type StudioTab = "overview" | "resources" | "chat" | "quiz" | "flashcards" | "mindmap" | "audio";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function AIExplainPanel({
  isOpen,
  onClose,
  onOpenKeySettings,
  topicContext,
}: AIExplainPanelProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>("gemini");
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.1-pro-preview");
  const [activeTab, setActiveTab] = useState<StudioTab>("overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active key
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Tab Data Cache
  const [explanation, setExplanation] = useState<string>("");
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [flashcardsData, setFlashcardsData] = useState<FlashcardItem[]>([]);
  const [mindmapData, setMindmapData] = useState<string>("");
  const [audioScriptData, setAudioScriptData] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [doubtInput, setDoubtInput] = useState<string>("");
  const [isAnsweringDoubt, setIsAnsweringDoubt] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const currentProvider: AIProviderConfig =
    AI_PROVIDERS.find((p) => p.id === selectedProviderId) || AI_PROVIDERS[0];

  const checkAndLoadKeys = () => {
    // Find first available key or restore last used
    const savedProv = localStorage.getItem("scg_selected_provider") || "gemini";
    const prov = AI_PROVIDERS.find((p) => p.id === savedProv) || AI_PROVIDERS[0];
    const key = localStorage.getItem(prov.keyStorageKey);

    if (key) {
      setSelectedProviderId(prov.id);
      setActiveKey(key);
      const savedM = localStorage.getItem(`scg_model_${prov.id}`) || prov.defaultModel;
      setSelectedModel(savedM);
    } else {
      // Find any provider with a key
      const anyWithKey = AI_PROVIDERS.find((p) => !!localStorage.getItem(p.keyStorageKey));
      if (anyWithKey) {
        setSelectedProviderId(anyWithKey.id);
        setActiveKey(localStorage.getItem(anyWithKey.keyStorageKey));
        const savedM = localStorage.getItem(`scg_model_${anyWithKey.id}`) || anyWithKey.defaultModel;
        setSelectedModel(savedM);
      } else {
        setSelectedProviderId("gemini");
        setActiveKey(null);
        setSelectedModel(AI_PROVIDERS[0].defaultModel);
      }
    }
  };

  useEffect(() => {
    checkAndLoadKeys();
  }, [isOpen]);

  // Clear data on topic switch
  useEffect(() => {
    setExplanation("");
    setQuizData([]);
    setFlashcardsData([]);
    setMindmapData("");
    setAudioScriptData("");
    setChatMessages([]);
    setDoubtInput("");
    setActiveTab("overview");
  }, [topicContext?.topicName]);

  const handleSendDoubt = async () => {
    if (!doubtInput.trim() || !topicContext) return;
    if (!activeKey) {
      if (onOpenKeySettings) onOpenKeySettings();
      return;
    }

    const userQ = doubtInput.trim();
    setDoubtInput("");
    const updatedMsgs: ChatMessage[] = [...chatMessages, { role: "user", content: userQ }];
    setChatMessages(updatedMsgs);
    setIsAnsweringDoubt(true);

    const prompt = `Context: Topic "${topicContext.topicName}" (Level: L${topicContext.levelNumber} - ${topicContext.levelName}, Section: ${topicContext.sectionName}).
You are an expert AI & ML Tutor. A student has asked this specific doubt:
"${userQ}"

Provide a crisp, intuitive, and practical explanation. If applicable, give a tiny code example or analogy. Keep it engaging, direct, and under 250 words.`;

    try {
      const reply = await requestAICompletion({
        providerId: selectedProviderId,
        apiKey: activeKey,
        model: selectedModel,
        prompt,
      });
      setChatMessages([...updatedMsgs, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setChatMessages([...updatedMsgs, { role: "assistant", content: `⚠️ Error answering doubt: ${e.message || "Failed to reach AI provider"}` }]);
    } finally {
      setIsAnsweringDoubt(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const handleProviderChange = (provId: string) => {
    setSelectedProviderId(provId);
    try {
      localStorage.setItem("scg_selected_provider", provId);
    } catch (e) {
      console.error(e);
    }
    const prov = AI_PROVIDERS.find((p) => p.id === provId) || AI_PROVIDERS[0];
    const key = localStorage.getItem(prov.keyStorageKey);
    setActiveKey(key);
    const m = localStorage.getItem(`scg_model_${provId}`) || prov.defaultModel;
    setSelectedModel(m);

    if (key) {
      fetchFeature(key, provId, m, activeTab);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    try {
      localStorage.setItem(`scg_model_${selectedProviderId}`, modelId);
    } catch (e) {
      console.error(e);
    }
    if (activeKey) {
      fetchFeature(activeKey, selectedProviderId, modelId, activeTab);
    }
  };

  const fetchFeature = async (
    key: string,
    provId: string,
    modelId: string,
    targetTab: StudioTab
  ) => {
    if (!topicContext) return;
    setLoading(true);
    setError(null);

    const contextPrefix = `Context: Level L${topicContext.levelNumber.toString().padStart(2, "0")} (${topicContext.levelName}), Section: ${topicContext.sectionName}, Topic: ${topicContext.topicName}.\n`;

    try {
      if (targetTab === "overview") {
        const prompt = `${contextPrefix} You are a Principal AI Engineer. Explain "${topicContext.topicName}" for a learner.
Structure cleanly with Markdown:
### 1. Intuition & What It Actually Is
High-impact real-world analogy.
### 2. Why It Matters in AI / ML Engineering
Modern system usage & architecture relevance.
### 3. Practical Code Snippet
Concise Python or config code snippet.
### 4. System Pitfalls & Bottlenecks
What breaks in production.
### 5. Interview Assessment
1 challenging interview question with a 1-sentence golden answer.`;
        const res = await requestAICompletion({
          providerId: provId,
          apiKey: key,
          model: modelId,
          prompt,
        });
        setExplanation(res);
      } else if (targetTab === "quiz") {
        const prompt = `${contextPrefix} Generate a 4-question challenging multiple-choice quiz about "${topicContext.topicName}" for an AI engineer.
Return ONLY valid JSON matching this exact typescript interface without markdown code block:
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Why this is correct."
  }
]`;
        const res = await requestAICompletion({
          providerId: provId,
          apiKey: key,
          model: modelId,
          prompt,
        });
        const cleaned = res.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);
        setQuizData(parsed);
      } else if (targetTab === "flashcards") {
        const prompt = `${contextPrefix} Generate 5 high-yield flashcards for memorizing key concepts, trade-offs, and formulas for "${topicContext.topicName}".
Return ONLY valid JSON matching this exact array format without markdown code block:
[
  {
    "front": "Front question / core concept",
    "back": "Back answer / golden rule takeaway"
  }
]`;
        const res = await requestAICompletion({
          providerId: provId,
          apiKey: key,
          model: modelId,
          prompt,
        });
        const cleaned = res.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);
        setFlashcardsData(parsed);
      } else if (targetTab === "mindmap") {
        const prompt = `${contextPrefix} Generate a clean Mermaid.js diagram representing the architecture flow and components of "${topicContext.topicName}".
Use valid flowchart TD syntax.
Output ONLY the mermaid code inside a \`\`\`mermaid code block.`;
        const res = await requestAICompletion({
          providerId: provId,
          apiKey: key,
          model: modelId,
          prompt,
        });
        setMindmapData(res);
      } else if (targetTab === "audio") {
        const prompt = `${contextPrefix} Create an engaging 2-speaker podcast dialogue between two AI engineers (Alex and Sam) breaking down "${topicContext.topicName}".
Alex asks intuitive, practical questions and Sam explains with sharp analogies and production war-stories.
Format each line strictly as:
Host 1: ...
Host 2: ...`;
        const res = await requestAICompletion({
          providerId: provId,
          apiKey: key,
          model: modelId,
          prompt,
        });
        setAudioScriptData(res);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: StudioTab) => {
    setActiveTab(tab);
    if (!activeKey) return;

    if (tab === "overview" && !explanation) fetchFeature(activeKey, selectedProviderId, selectedModel, "overview");
    if (tab === "quiz" && quizData.length === 0) fetchFeature(activeKey, selectedProviderId, selectedModel, "quiz");
    if (tab === "flashcards" && flashcardsData.length === 0) fetchFeature(activeKey, selectedProviderId, selectedModel, "flashcards");
    if (tab === "mindmap" && !mindmapData) fetchFeature(activeKey, selectedProviderId, selectedModel, "mindmap");
    if (tab === "audio" && !audioScriptData) fetchFeature(activeKey, selectedProviderId, selectedModel, "audio");
  };

  useEffect(() => {
    if (isOpen && topicContext && activeKey && !explanation) {
      fetchFeature(activeKey, selectedProviderId, selectedModel, "overview");
    }
  }, [isOpen, topicContext, activeKey]);

  if (!isOpen || !topicContext) return null;

  return (
    <aside
      className={`w-full shrink-0 h-[calc(100vh-5rem)] sticky top-16 rounded-2xl border border-border/80 bg-card shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-30 ${
        isExpanded ? "lg:w-[680px] xl:w-[780px]" : "lg:w-[460px] xl:w-[500px]"
      }`}
    >
      {/* Header */}
      <div className="px-4 pt-3.5 pb-2 border-b border-border bg-surface/70 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow shrink-0">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-primary-glow font-semibold">
                  AI Study Studio
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
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse panel width" : "Expand panel width"}
              className="h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition hidden sm:grid"
            >
              {isExpanded ? (
                <Minimize2 className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>

            {activeKey && (
              <button
                onClick={() => fetchFeature(activeKey, selectedProviderId, selectedModel, activeTab)}
                disabled={loading}
                title="Regenerate this view"
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

        {/* NotebookLM Style Feature Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => handleTabChange("overview")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" /> Overview
          </button>
          <button
            onClick={() => handleTabChange("resources")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "resources"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <Compass className="h-3.5 w-3.5" /> Curated Hub
          </button>
          <button
            onClick={() => handleTabChange("chat")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "chat"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" /> Ask Doubt
          </button>
          <button
            onClick={() => handleTabChange("quiz")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "quiz"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" /> Quiz
          </button>
          <button
            onClick={() => handleTabChange("flashcards")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "flashcards"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Flashcards
          </button>
          <button
            onClick={() => handleTabChange("mindmap")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "mindmap"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <Network className="h-3.5 w-3.5" /> Mind Map
          </button>
          <button
            onClick={() => handleTabChange("audio")}
            className={`px-3 py-1.5 rounded-lg border font-medium inline-flex items-center gap-1.5 transition shrink-0 ${
              activeTab === "audio"
                ? "bg-primary text-primary-foreground border-primary shadow-glow font-semibold"
                : "bg-surface-2/60 border-border text-muted-foreground hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <Headphones className="h-3.5 w-3.5" /> Audio Overview
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* If Key NOT set */}
        {!activeKey && (
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
            <div className="flex items-start gap-2.5">
              <KeyRound className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h3 className="font-semibold text-xs text-foreground">
                  Free AI Key Required
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Unlock Quiz, Flashcards, Mind Map &amp; Audio using any free AI key (Google Gemini, Groq, OpenRouter, Cerebras, or Together AI).
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenKeySettings}
                className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow hover:opacity-95 transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" /> Configure Free AI Keys
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
            <p className="font-mono text-xs animate-pulse text-center">
              Generating {activeTab.toUpperCase()} with {currentProvider.name} ({selectedModel})...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs space-y-2 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-xs">Error generating feature</div>
              <div className="opacity-90 text-[11px] leading-relaxed mt-0.5">{error}</div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={onOpenKeySettings}
                  className="underline text-[10px] text-foreground font-medium"
                >
                  Switch Provider or Check Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Tab View */}
        {!loading && (
          <div>
            {activeTab === "overview" && explanation && (
              <MarkdownRenderer content={explanation} />
            )}

            {/* CURATED HUB (YouTube, Wikipedia, GitHub, ArXiv) */}
            {activeTab === "resources" && topicContext && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 text-xs text-muted-foreground flex items-center justify-between">
                  <span>High-yield learning sources curated for <strong>{topicContext.topicName}</strong></span>
                  <Compass className="h-4 w-4 text-primary shrink-0" />
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {getCuratedResourcesForTopic(topicContext.topicName).map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-3.5 rounded-xl border border-border bg-surface-2/60 hover:bg-surface hover:border-primary/50 transition-all flex items-start gap-3 shadow-xs"
                    >
                      <div className="h-9 w-9 rounded-lg bg-surface border border-border/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                        {res.type === "youtube" && <Youtube className="h-5 w-5 text-rose-500" />}
                        {res.type === "wikipedia" && <Globe className="h-5 w-5 text-blue-400" />}
                        {res.type === "github" && <Github className="h-5 w-5 text-emerald-400" />}
                        {res.type === "paper" && <FileText className="h-5 w-5 text-amber-400" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                            {res.channelOrSource}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition" />
                        </div>
                        <h4 className="text-xs font-semibold text-foreground mt-0.5 group-hover:text-primary transition">
                          {res.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                          {res.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* INTERACTIVE DOUBT CHAT */}
            {activeTab === "chat" && topicContext && (
              <div className="flex flex-col h-[520px]">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {chatMessages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-muted-foreground">
                      <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/30 grid place-items-center text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-foreground">
                          Ask Any Doubt about {topicContext.topicName}
                        </h4>
                        <p className="text-[11px] max-w-xs leading-relaxed">
                          Stuck on an algorithm, formula, or Python implementation? Ask below for an instant breakdown!
                        </p>
                      </div>
                      <div className="pt-2 flex flex-wrap gap-1.5 justify-center">
                        <button
                          onClick={() => setDoubtInput(`Why do we use ${topicContext.topicName} instead of alternatives?`)}
                          className="text-[10px] px-2.5 py-1 rounded-full border border-border bg-surface hover:border-primary/40 text-foreground transition"
                        >
                          Why use this?
                        </button>
                        <button
                          onClick={() => setDoubtInput(`Show me a real-world interview question on ${topicContext.topicName}.`)}
                          className="text-[10px] px-2.5 py-1 rounded-full border border-border bg-surface hover:border-primary/40 text-foreground transition"
                        >
                          Interview question?
                        </button>
                      </div>
                    </div>
                  )}

                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground font-medium rounded-br-none"
                            : "bg-surface-2 border border-border text-foreground rounded-bl-none shadow-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <MarkdownRenderer content={msg.content} />
                        ) : (
                          <span>{msg.content}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAnsweringDoubt && (
                    <div className="flex justify-start">
                      <div className="bg-surface-2 border border-border rounded-2xl rounded-bl-none px-3.5 py-2 text-xs flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                        <span>AI Tutor is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Doubt Input Box */}
                <div className="pt-3 border-t border-border mt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendDoubt();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={doubtInput}
                      onChange={(e) => setDoubtInput(e.target.value)}
                      placeholder={`Type doubt about ${topicContext.topicName}...`}
                      className="flex-1 h-9 px-3.5 rounded-xl bg-surface border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                    <button
                      type="submit"
                      disabled={isAnsweringDoubt || !doubtInput.trim()}
                      className="h-9 w-9 rounded-xl bg-primary text-primary-foreground grid place-items-center hover:opacity-90 disabled:opacity-50 transition shadow-glow shrink-0"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "quiz" && quizData.length > 0 && (
              <QuizView
                questions={quizData}
                onReset={() => activeKey && fetchFeature(activeKey, selectedProviderId, selectedModel, "quiz")}
              />
            )}

            {activeTab === "flashcards" && flashcardsData.length > 0 && (
              <FlashcardsView cards={flashcardsData} />
            )}

            {activeTab === "mindmap" && mindmapData && (
              <MindMapView chart={mindmapData} />
            )}

            {activeTab === "audio" && audioScriptData && (
              <AudioOverviewView script={audioScriptData} />
            )}
          </div>
        )}
      </div>

      {/* Footer with Provider & Model Selector */}
      <div className="px-3.5 py-2.5 border-t border-border bg-surface/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Provider selector */}
          <div className="relative">
            <select
              value={selectedProviderId}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="appearance-none bg-surface-2 border border-border rounded-lg pl-2 pr-6 py-1 text-[11px] font-mono text-primary-glow font-semibold focus:outline-none focus:border-primary cursor-pointer hover:border-border-strong transition"
            >
              {AI_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id} className="bg-surface text-foreground font-sans">
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-muted-foreground absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Model selector */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="appearance-none bg-surface-2 border border-border rounded-lg pl-2 pr-6 py-1 text-[11px] font-mono text-foreground focus:outline-none focus:border-primary cursor-pointer hover:border-border-strong transition max-w-[160px] truncate"
            >
              {currentProvider.models.map((m) => (
                <option key={m.id} value={m.id} className="bg-surface text-foreground font-sans">
                  {m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-muted-foreground absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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

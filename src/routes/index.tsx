import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Rocket,
  Code2,
  Database,
  Sigma,
  Brain,
  Network,
  Languages,
  Sparkles,
  Bot,
  Layers,
  Cloud,
  Telescope,
  Trophy,
  Flag,
  ChevronDown,
  Check,
  Zap,
  RotateCcw,
  Search,
  Flame,
  Target,
  BookOpen,
  Copy,
  KeyRound,
  Sun,
  Moon,
  Lock,
} from "lucide-react";
import { ROADMAP, TOTAL_TOPICS, type Level } from "@/data/roadmap";
import { AIExplainPanel } from "@/components/AIExplainPanel";
import { AIKeysModal } from "@/components/AIKeysModal";
import { AboutModal } from "@/components/AboutModal";
import { AuthModal } from "@/components/AuthModal";
import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";
import { AI_PROVIDERS } from "@/data/aiProviders";
import { AIRouterPipelines } from "@/components/AIRouterPipelines";
import heroImg from "@/assets/hero-neural.jpg";
import iconFoundation from "@/assets/icon-foundation.png";
import iconML from "@/assets/icon-ml.png";
import iconAgent from "@/assets/icon-agent.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Canvas Grow — The Complete AI Engineering Roadmap" },
      {
        name: "description",
        content:
          "Smart Canvas Grow: A guided, level-by-level AI & ML learning platform. 300+ topics from Python basics to autonomous agents, RAG 2.0, LLMOps and enterprise AI system design.",
      },
      { property: "og:title", content: "Smart Canvas Grow — The Complete AI Engineering Roadmap" },
      {
        property: "og:description",
        content: "Track your journey from foundation to expert AI engineer across 14 industry-grade levels.",
      },
    ],
  }),
  component: HomePage,
});

const ICONS = {
  rocket: Rocket,
  code: Code2,
  database: Database,
  sigma: Sigma,
  brain: Brain,
  network: Network,
  languages: Languages,
  sparkles: Sparkles,
  bot: Bot,
  layers: Layers,
  cloud: Cloud,
  telescope: Telescope,
  trophy: Trophy,
  flag: Flag,
  book: BookOpen,
} as const;

type Filter = "all" | "pending" | "done" | "new" | "abbrev";

const keyFor = (lIdx: number, section: string, topic: string) => `${lIdx}||${section}||${topic}`;

function HomePage() {
  const [state, setState] = useState<Record<string, boolean>>({});
  const [openLevels, setOpenLevels] = useState<Record<number, boolean>>({ 0: true });
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load user session on mount (Supabase Auth or Demo session)
  useEffect(() => {
    const syncUser = async () => {
      if (isSupabaseConfigured) {
        try {
          const { data } = await supabase.auth.getUser();
          if (data?.user) {
            setCurrentUser(data.user);
            return;
          }
        } catch (e) {
          console.error("Auth fetch error:", e);
        }
      }
      // Demo fallback check
      try {
        const demo = localStorage.getItem("scg_demo_user");
        if (demo) setCurrentUser(JSON.parse(demo));
      } catch (e) {
        console.error(e);
      }
    };

    syncUser();

    if (isSupabaseConfigured) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user ?? null);
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("scg_demo_user");
    setCurrentUser(null);
  };

  useEffect(() => {
    try {
      const storedTheme = (localStorage.getItem("scg_theme") as "dark" | "light") || "dark";
      setTheme(storedTheme);
      if (storedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("scg_theme", next);
      if (next === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [aiModalContext, setAiModalContext] = useState<{
    levelNumber: number;
    levelName: string;
    sectionName: string;
    topicName: string;
  } | null>(null);

  const [activeProviderName, setActiveProviderName] = useState<string | null>(null);

  const checkApiKey = () => {
    try {
      const anyWithKey = AI_PROVIDERS.find((p) => !!localStorage.getItem(p.keyStorageKey));
      if (anyWithKey) {
        setHasApiKey(true);
        setActiveProviderName(anyWithKey.name);
      } else {
        setHasApiKey(false);
        setActiveProviderName(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkApiKey();
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("neura_roadmap_v1");
      if (raw) setState(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("neura_roadmap_v1", JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [state]);

  const done = useMemo(() => Object.values(state).filter(Boolean).length, [state]);
  const pct = Math.round((done / TOTAL_TOPICS) * 100);

  const completedLevels = useMemo(
    () =>
      ROADMAP.filter((lvl, i) => {
        const total = lvl.sections.reduce((a, s) => a + s.topics.length, 0);
        const d = lvl.sections
          .flatMap((s) => s.topics.map((tp) => keyFor(i, s.name, tp.name)))
          .filter((k) => state[k]).length;
        return total > 0 && d === total;
      }).length,
    [state],
  );

  function toggleTopic(k: string) {
    setState((prev) => ({ ...prev, [k]: !prev[k] }));
  }
  function reset() {
    if (confirm("Reset all progress? Idhu undo aagadhu.")) setState({});
  }
  function markLevelDone(lIdx: number) {
    setState((prev) => {
      const next = { ...prev };
      ROADMAP[lIdx].sections.forEach((s) =>
        s.topics.forEach((tp) => {
          next[keyFor(lIdx, s.name, tp.name)] = true;
        }),
      );
      return next;
    });
  }

  return (
    <div className="min-h-screen">
      <Header
        pct={pct}
        hasApiKey={hasApiKey}
        activeProviderName={activeProviderName}
        theme={theme}
        currentUser={currentUser}
        onToggleTheme={toggleTheme}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenAuthModal={() => {
          setAuthReason("Sign in with Google to sync your roadmap progress and unlock full AI study features.");
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />
      <Hero
        done={done}
        pct={pct}
        completedLevels={completedLevels}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />
      <Showcase />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-32">
        <Controls
          filter={filter}
          setFilter={setFilter}
          query={query}
          setQuery={setQuery}
          onReset={reset}
        />

        <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Roadmap Accordion List */}
          <ol className="flex-1 w-full min-w-0 space-y-4">
            {ROADMAP.filter((lvl) => {
              if (filter === "abbrev") return lvl.short === "Technical Abbreviations";
              return true;
            }).map((lvl, lIdx) => {
              const isLocked = !currentUser && lIdx > 1; // Level 0 & Level 1 are free preview. Level 2+ are locked without login.
              return (
                <LevelCard
                  key={lIdx}
                  lvl={lvl}
                  lIdx={lIdx}
                  state={state}
                  isLocked={isLocked}
                  open={filter === "abbrev" ? true : !!openLevels[lIdx]}
                  setOpen={(v) => {
                    if (isLocked) {
                      setAuthReason(`Sign in with Google to unlock Level ${lIdx.toString().padStart(2, "0")}: ${lvl.short} and advanced topics.`);
                      setIsAuthModalOpen(true);
                      return;
                    }
                    setOpenLevels((p) => ({ ...p, [lIdx]: v }));
                  }}
                  onToggle={(k) => {
                    if (isLocked) {
                      setAuthReason(`Sign in with Google to mark progress in Level ${lIdx.toString().padStart(2, "0")}: ${lvl.short}.`);
                      setIsAuthModalOpen(true);
                      return;
                    }
                    toggleTopic(k);
                  }}
                  onMarkAll={() => {
                    if (isLocked) {
                      setAuthReason("Sign in with Google to track roadmap completion.");
                      setIsAuthModalOpen(true);
                      return;
                    }
                    markLevelDone(lIdx);
                  }}
                  onAskAi={(topicName, sectionName) => {
                    if (!currentUser) {
                      setAuthReason("Sign in with Google to access the interactive AI Study Studio.");
                      setIsAuthModalOpen(true);
                      return;
                    }
                    setAiModalContext({
                      levelNumber: lIdx,
                      levelName: lvl.short,
                      sectionName,
                      topicName,
                    });
                  }}
                  filter={filter}
                  query={query.trim().toLowerCase()}
                />
              );
            })}
          </ol>

          {/* Side AI Explain Panel */}
          {aiModalContext && (
            <AIExplainPanel
              isOpen={!!aiModalContext}
              onClose={() => setAiModalContext(null)}
              onOpenKeySettings={() => setIsKeyModalOpen(true)}
              topicContext={aiModalContext}
            />
          )}
        </div>
      </main>

      <AIKeysModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeysUpdated={checkApiKey}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        reason={authReason}
        onSuccess={() => {
          const demo = localStorage.getItem("scg_demo_user");
          if (demo) setCurrentUser(JSON.parse(demo));
        }}
      />

      <Footer />
    </div>
  );
}

function Header({
  pct,
  hasApiKey,
  activeProviderName,
  theme,
  onToggleTheme,
  onOpenKeyModal,
  onOpenAboutModal,
  currentUser,
  onOpenAuthModal,
  onSignOut,
}: {
  pct: number;
  hasApiKey: boolean;
  activeProviderName: string | null;
  theme: "dark" | "light";
  currentUser: any;
  onToggleTheme: () => void;
  onOpenKeyModal: () => void;
  onOpenAboutModal: () => void;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
}) {
  const userDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "User";

  const userAvatar = currentUser?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
            <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">Smart Canvas Grow</span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-mono ml-2">
            / ai-ml-roadmap
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="h-8 w-8 rounded-full border border-border bg-surface hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition-all shadow-sm"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber" />
            ) : (
              <Moon className="h-4 w-4 text-primary" />
            )}
          </button>

          {/* About Creator Button */}
          <button
            onClick={onOpenAboutModal}
            className="h-8 px-3 rounded-full text-xs font-mono inline-flex items-center gap-1.5 border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            title="About Creator"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>About</span>
          </button>

          {/* Multi-AI Provider Key Button in Header */}
          <button
            onClick={onOpenKeyModal}
            className={`h-8 px-3 rounded-full text-xs font-mono inline-flex items-center gap-1.5 border transition-all ${
              hasApiKey
                ? "bg-primary/10 border-primary/40 text-primary-glow hover:bg-primary/20"
                : "bg-surface-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
            title="Configure Free AI Keys (Gemini, Groq, OpenRouter, Cerebras, Together)"
          >
            <KeyRound className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">
              {hasApiKey ? `${activeProviderName || "AI"}: Active` : "Free AI Keys"}
            </span>
            <span className="sm:hidden">
              {hasApiKey ? "AI ✓" : "AI"}
            </span>
          </button>

          {/* Google Sign In / Profile Avatar */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1">
              <div
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full border border-border bg-surface/80 hover:bg-surface-2 transition group"
                title={`Signed in as ${userDisplayName} (${currentUser?.email || ""})`}
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userDisplayName}
                    className="w-6 h-6 rounded-full object-cover border border-primary/40"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 text-primary-glow text-[10px] font-bold grid place-items-center uppercase">
                    {userDisplayName.slice(0, 1)}
                  </div>
                )}
                <span className="hidden md:inline text-xs font-medium text-foreground max-w-[90px] truncate">
                  {userDisplayName}
                </span>
                <button
                  onClick={onSignOut}
                  className="text-[11px] text-muted-foreground hover:text-rose-400 transition ml-0.5"
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="h-8 px-3 rounded-full text-xs font-medium inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-primary text-black font-semibold hover:opacity-95 shadow-[0_0_12px_rgba(52,199,89,0.35)] transition"
              title="Sign in with Google"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}

          {/* Battery Style Progress Indicator */}
          <div className="flex items-center gap-2 bg-surface-2/60 border border-border px-2.5 py-1 rounded-lg">
            <span className="font-mono text-xs text-foreground font-medium tabular-nums">
              {pct}%
            </span>
            {/* Battery Body */}
            <div className="relative flex items-center">
              <div className="w-8 h-4 rounded-[4px] border border-border-strong/80 p-[1.5px] flex items-center bg-black/40">
                <div
                  className="h-full rounded-[2px] bg-gradient-to-r from-emerald-500 to-primary transition-all duration-500 shadow-[0_0_8px_rgba(52,199,89,0.4)]"
                  style={{ width: `${Math.max(pct, 4)}%` }}
                />
              </div>
              {/* Battery Terminal Tip */}
              <div className="w-[2px] h-2 bg-border-strong/80 rounded-r-[1px] ml-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({
  done,
  pct,
  completedLevels,
  onOpenAboutModal,
}: {
  done: number;
  pct: number;
  completedLevels: number;
  onOpenAboutModal: () => void;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading, Description & Stats */}
          <div className="lg:col-span-7 text-left space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_15px_-3px_oklch(0.72_0.16_160/0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-primary-glow">
                Expert Edition · 14 Levels · {TOTAL_TOPICS}+ Topics
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm">
              The complete <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AI &amp; ML</span> roadmap.
              <span className="block mt-1 font-normal text-muted-foreground/90 text-2xl sm:text-3xl leading-snug">
                From zero to shipping production agents.
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-sans max-w-xl">
              A guided journey across Python, classical ML, deep learning, LLMs, RAG,
              autonomous agents, and enterprise AI systems. Track every topic with built-in AI Study Studio.
            </p>

            {/* Curator link button */}
            <div className="flex items-center gap-2 pt-1">
              <span className="font-mono text-xs text-muted-foreground">Curated by</span>
              <button
                onClick={onOpenAboutModal}
                className="text-primary-glow font-medium text-xs bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full border border-primary/30 transition-all inline-flex items-center gap-1.5 group"
              >
                <span>Manikandan</span>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary transition">
                  (View Profile →)
                </span>
              </button>
            </div>

            {/* Quick Stat Highlights */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              <Stat label="Total topics" value={TOTAL_TOPICS} icon={<Target className="h-4 w-4" />} />
              <Stat label="Completed" value={done} icon={<Check className="h-4 w-4" />} accent />
              <Stat
                label="Levels cleared"
                value={`${completedLevels}/15`}
                icon={<Trophy className="h-4 w-4" />}
              />
              <Stat label="Progress" value={`${pct}%`} icon={<Flame className="h-4 w-4" />} accent />
            </div>
          </div>

          {/* Right Column: 9Router Style Interactive AI Hub Pipeline Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <AIRouterPipelines />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 glass ${accent ? "border-primary/40 shadow-glow" : ""}`}>
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        {icon}
        <span className="font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className={`mt-2 font-display text-2xl font-semibold ${accent ? "text-gradient" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function Showcase() {
  const items = [
    {
      img: iconFoundation,
      title: "Strong foundation",
      body: "OS, terminal, Git, Python — built like a real engineer.",
    },
    {
      img: iconML,
      title: "Deep ML intuition",
      body: "From regression and forests to transformers and attention.",
    },
    {
      img: iconAgent,
      title: "Production agents",
      body: "RAG, MCP, multi-agent orchestration, observability, scale.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 -mt-4 pb-10">
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-5 shadow-card hover:border-primary/40 transition-colors group"
          >
            <div className="h-20 w-20 -mt-1 mb-3 grid place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border group-hover:shadow-glow transition-shadow">
              <img
                src={it.img}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Controls({
  filter,
  setFilter,
  query,
  setQuery,
  onReset,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  query: string;
  setQuery: (q: string) => void;
  onReset: () => void;
}) {
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "done", label: "Done" },
    { id: "new", label: "New" },
    { id: "abbrev", label: "Abbreviations" },
  ];
  return (
    <div
      id="roadmap"
      className="sticky top-14 z-30 -mx-5 px-5 py-3 bg-background/85 backdrop-blur-md border-b border-border"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full h-9 pl-9 pr-3 rounded-full bg-surface border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`h-9 px-3.5 rounded-full text-xs font-medium border transition ${
                filter === f.id
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-border-strong"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={onReset}
          className="ml-auto h-9 px-3.5 rounded-full text-xs font-medium border border-border bg-surface text-muted-foreground hover:text-destructive hover:border-destructive/50 transition inline-flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}

function LevelCard({
  lvl,
  lIdx,
  state,
  open,
  setOpen,
  onToggle,
  onMarkAll,
  onAskAi,
  filter,
  query,
  isLocked = false,
}: {
  lvl: Level;
  lIdx: number;
  state: Record<string, boolean>;
  open: boolean;
  setOpen: (b: boolean) => void;
  onToggle: (k: string) => void;
  onMarkAll: () => void;
  onAskAi: (topicName: string, sectionName: string) => void;
  filter: Filter;
  query: string;
  isLocked?: boolean;
}) {
  const Icon = ICONS[lvl.icon];
  const totals = useMemo(() => {
    const all = lvl.sections.flatMap((s) => s.topics.map((tp) => keyFor(lIdx, s.name, tp.name)));
    return { total: all.length, done: all.filter((k) => state[k]).length };
  }, [lvl, lIdx, state]);
  const pct = totals.total ? Math.round((totals.done / totals.total) * 100) : 0;
  const hasNew = lvl.sections.some((s) => s.topics.some((tp) => tp.isNew));
  const status = totals.done === 0 ? "empty" : totals.done === totals.total ? "done" : "progress";
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (
    e: React.MouseEvent,
    topicName: string,
    sectionName: string,
    key: string,
  ) => {
    e.stopPropagation();
    const prompt = `Explain "${topicName}" in detail specifically in the context of Artificial Intelligence, Machine Learning, and Modern System Engineering.

Roadmap Context:
- Level: L${lIdx.toString().padStart(2, "0")} - ${lvl.short}
- Section: ${sectionName}
- Topic: ${topicName}

Please cover:
1. Core intuition & fundamentals (why it matters for AI/ML).
2. How AI systems, models, or data pipelines utilize this under the hood.
3. Real-world AI engineering use-case or code snippet/architecture example.
4. Key interview concepts or common pitfalls when deploying production AI systems.`;

    navigator.clipboard.writeText(prompt);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 1500);
  };

  return (
    <li className="rounded-2xl border border-border bg-card shadow-card overflow-hidden transition-all hover:border-border-strong">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
      >
        <div
          className={`relative h-12 w-12 shrink-0 rounded-xl grid place-items-center border ${
            status === "done"
              ? "bg-gradient-to-br from-primary/30 to-primary/10 border-primary/50 shadow-glow"
              : status === "progress"
                ? "bg-gradient-to-br from-primary/15 to-accent/10 border-primary/30"
                : "bg-surface-2 border-border"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${status === "empty" ? "text-muted-foreground" : "text-primary"}`}
            strokeWidth={2}
          />
          {status === "done" && (
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary grid place-items-center">
              <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              L{lIdx.toString().padStart(2, "0")}
            </span>
            <h2 className="font-display text-base sm:text-lg font-semibold truncate">
              {lvl.short}
            </h2>
            {hasNew && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber/15 text-amber border border-amber/30">
                updated
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">{lvl.tagline}</p>
          <div className="mt-2.5 flex items-center gap-3">
            <div className="h-1 flex-1 max-w-[200px] rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {totals.done}/{totals.total}
            </span>
          </div>
        </div>

        {isLocked ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2 border border-border text-muted-foreground shrink-0 text-xs font-mono">
            <Lock className="h-3.5 w-3.5 text-amber" />
            <span className="hidden sm:inline text-amber text-[11px] font-sans">Locked</span>
          </div>
        ) : (
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {open && (
        <div className="border-t border-border px-4 sm:px-5 py-5 space-y-5 bg-surface/40">
          {lvl.sections.map((section) => {
            const filtered = section.topics.filter((tp) => {
              const k = keyFor(lIdx, section.name, tp.name);
              const isDone = !!state[k];
              if (filter === "done" && !isDone) return false;
              if (filter === "pending" && isDone) return false;
              if (filter === "new" && !tp.isNew) return false;
              if (query && !tp.name.toLowerCase().includes(query)) return false;
              return true;
            });
            if (!filtered.length) return null;
            return (
              <div key={section.name}>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-2.5">
                  {section.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {filtered.map((tp) => {
                    const k = keyFor(lIdx, section.name, tp.name);
                    const isDone = !!state[k];
                    const isCopied = copiedKey === k;
                    return (
                      <button
                        key={k}
                        onClick={() => onToggle(k)}
                        className={`group inline-flex items-center gap-1.5 text-xs sm:text-[13px] pl-3 pr-2 py-1.5 rounded-full border transition-all ${
                          isDone
                            ? "bg-primary/15 border-primary/50 text-primary-glow shadow-[0_0_0_1px_oklch(0.72_0.16_160/0.2)]"
                            : tp.isNew
                              ? "bg-amber/10 border-amber/40 text-amber hover:bg-amber/20"
                              : "bg-surface-2 border-border text-foreground/85 hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition ${
                            isDone ? "bg-primary" : tp.isNew ? "bg-amber" : "bg-muted-foreground/40"
                          }`}
                        />
                        <span>{tp.name}</span>
                        {isDone && <Check className="h-3 w-3 ml-0.5 text-primary" strokeWidth={3} />}
                        <span
                          role="button"
                          tabIndex={0}
                          title="Explain with AI Tutor (Gemini)"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAskAi(tp.name, section.name);
                          }}
                          className="ml-1 p-1 rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Sparkles className="h-3 w-3 text-primary-glow" />
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          title="Copy AI study prompt to clipboard"
                          onClick={(e) => handleCopy(e, tp.name, section.name, k)}
                          className={`p-1 rounded-full hover:bg-white/10 active:scale-90 transition-all text-muted-foreground hover:text-foreground ${
                            isCopied ? "text-primary opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {isCopied ? (
                            <Check className="h-3 w-3 text-primary animate-in fade-in zoom-in" strokeWidth={2.5} />
                          ) : (
                            <Copy className="h-3 w-3" strokeWidth={2} />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onMarkAll}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition inline-flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5" /> Mark level complete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center">
            <Zap className="h-3 w-3 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-foreground">Smart Canvas Grow</span>
          <span>· built for serious AI engineers</span>
        </div>
        <span className="font-mono">Created by Manikandan · progress saved locally · v1</span>
      </div>
    </footer>
  );
}

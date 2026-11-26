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
  Settings,
  Award,
  Calendar,
  FlaskConical,
  Youtube,
  Globe,
  Cpu,
  ShieldAlert,
  MessageSquare,
} from "lucide-react";
import { ROADMAP, TOTAL_TOPICS, type Level } from "@/data/roadmap";
import { getLabForTopic } from "@/data/labExperiments";
import { AIExplainPanel } from "@/components/AIExplainPanel";
import { AIKeysModal } from "@/components/AIKeysModal";
import { AboutModal } from "@/components/AboutModal";
import { AuthModal } from "@/components/AuthModal";
import { SettingsModal } from "@/components/SettingsModal";
import { AILabModal } from "@/components/AILabModal";
import { ContentProtection } from "@/components/ContentProtection";
// import { LaunchCountdownModal } from "@/components/LaunchCountdownModal";
import { CertificateModal } from "@/components/CertificateModal";
import { BattlePassJourney } from "@/components/BattlePassJourney";
import { StudyScheduleModal } from "@/components/StudyScheduleModal";
import { LeaderboardModal } from "@/components/LeaderboardModal";
import { LegalModal, type LegalDocType } from "@/components/LegalModal";
import { FeedbackModal } from "@/components/FeedbackModal";
import {
  GoogleCalendarIcon,
  CertificateDiplomaIcon,
  LeaderboardTrophyIcon,
  SettingsGearIcon,
  AboutSparkleIcon,
} from "@/components/RealtimeNavIcons";
import {
  Icon3DLeaderboard,
  Icon3DCalendar,
  Icon3DCertificate,
  Icon3DAbout,
  Icon3DSettings,
  Icon3DAILab,
} from "@/components/Icons3D";
import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";
import { syncUserProgressToCloud, loadUserProgressFromCloud } from "@/utils/progressSync";
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

type Filter = "all" | "pending" | "done" | "new" | "lab" | "abbrev";

const keyFor = (lIdx: number, section: string, topic: string) => `${lIdx}||${section}||${topic}`;

function HomePage() {
  const [state, setState] = useState<Record<string, boolean>>({});
  const [openLevels, setOpenLevels] = useState<Record<number, boolean>>({ 0: true });
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAILabModalOpen, setIsAILabModalOpen] = useState(false);
  const [activeLabTopic, setActiveLabTopic] = useState<string | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>("terms");
  const [journeyTrack, setJourneyTrack] = useState<boolean>(true);
  const [authReason, setAuthReason] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load journey track setting from localStorage (default: true)
  useEffect(() => {
    try {
      const storedTrack = localStorage.getItem("scg_journey_track");
      if (storedTrack !== null) {
        setJourneyTrack(storedTrack === "true");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleJourneyTrack = () => {
    setJourneyTrack((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("scg_journey_track", String(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Load user session on mount (Supabase Auth or Demo session)
  useEffect(() => {
    const syncUser = async () => {
      if (isSupabaseConfigured) {
        try {
          const { data } = await supabase.auth.getUser();
          if (data?.user) {
            setCurrentUser(data.user);
            // Auto-load and merge cloud progress for authenticated user
            const cloudProgress = await loadUserProgressFromCloud(data.user.id);
            if (cloudProgress) {
              setState((prev) => ({ ...prev, ...cloudProgress }));
            }
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
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          const cloudProgress = await loadUserProgressFromCloud(user.id);
          if (cloudProgress) {
            setState((prev) => ({ ...prev, ...cloudProgress }));
          }
        }
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

      // Auto-sync to Supabase Cloud whenever user toggles any topic
      if (currentUser?.id && isSupabaseConfigured) {
        const doneCount = Object.values(state).filter(Boolean).length;
        let tier = 0;
        if (doneCount >= 583) tier = 4;
        else if (doneCount >= 264) tier = 3;
        else if (doneCount >= 163) tier = 2;
        else if (doneCount >= 61) tier = 1;

        syncUserProgressToCloud(
          currentUser.id,
          {
            completedTopicsCount: doneCount,
            unlockedTier: tier,
            progressData: state,
          },
          {
            email: currentUser.email,
            full_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name,
            avatar_url: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture,
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [state, currentUser]);

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
      <ContentProtection currentUser={currentUser} />
      <Header
        pct={pct}
        hasApiKey={hasApiKey}
        activeProviderName={activeProviderName}
        theme={theme}
        currentUser={currentUser}
        onToggleTheme={toggleTheme}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenAILabModal={() => {
          setActiveLabTopic(null);
          setIsAILabModalOpen(true);
        }}
        onOpenAuthModal={() => {
          setAuthReason("Sign in with Google to sync your roadmap progress and unlock full AI study features.");
          setIsAuthModalOpen(true);
        }}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
        onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        onOpenLeaderboardModal={() => setIsLeaderboardModalOpen(true)}
        onSignOut={handleSignOut}
      />
      <Hero
        done={done}
        pct={pct}
        completedLevels={completedLevels}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />
      <BenefitsMarquee />
      <Showcase />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-32">
        {/* Clash of Clans Style Interactive Battle Pass Journey Bar */}
        <BattlePassJourney
          completedTopicsCount={done}
          totalTopicsCount={TOTAL_TOPICS}
          onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
        />

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
              if (filter === "lab") {
                return lvl.sections.some((s) => s.topics.some((tp) => !!getLabForTopic(tp.name)));
              }
              return true;
            }).map((lvl, lIdx) => {
              const isLocked = !currentUser && lIdx > 1; // Level 0 & Level 1 are free preview. Level 2+ are locked without login.

              // Journey Track Prerequisite Logic:
              // If journeyTrack is enabled, level N requires level N-1 to be completed
              let isPrereqLocked = false;
              let prereqLevelName = "";
              if (journeyTrack && lIdx > 0 && lvl.short !== "Technical Abbreviations") {
                const prevLvl = ROADMAP[lIdx - 1];
                if (prevLvl) {
                  const prevTotal = prevLvl.sections.reduce((acc, s) => acc + s.topics.length, 0);
                  const prevDone = prevLvl.sections
                    .flatMap((s) => s.topics.map((tp) => keyFor(lIdx - 1, s.name, tp.name)))
                    .filter((k) => state[k]).length;
                  if (prevDone < prevTotal) {
                    isPrereqLocked = true;
                    prereqLevelName = `L${(lIdx - 1).toString().padStart(2, "0")}: ${prevLvl.short}`;
                  }
                }
              }

              return (
                <LevelCard
                  key={lIdx}
                  lvl={lvl}
                  lIdx={lIdx}
                  state={state}
                  isLocked={isLocked}
                  isPrereqLocked={isPrereqLocked}
                  prereqLevelName={prereqLevelName}
                  open={filter === "abbrev" || filter === "lab" ? true : !!openLevels[lIdx]}
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
                  onOpenLab={(topicName) => {
                    setActiveLabTopic(topicName);
                    setIsAILabModalOpen(true);
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

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentUser={currentUser}
        journeyTrack={journeyTrack}
        onToggleJourneyTrack={toggleJourneyTrack}
        onOpenKeysModal={() => setIsKeyModalOpen(true)}
        hasApiKey={hasApiKey}
        activeProviderName={activeProviderName}
        onOpenAuthModal={() => {
          setAuthReason("Sign in with Google to sync your roadmap progress and unlock full AI study features.");
          setIsAuthModalOpen(true);
        }}
        onOpenAILabModal={() => setIsAILabModalOpen(true)}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={toggleTheme}
        completedTopicsCount={done}
        totalTopicsCount={TOTAL_TOPICS}
      />

      <AILabModal
        isOpen={isAILabModalOpen}
        onClose={() => {
          setIsAILabModalOpen(false);
          setActiveLabTopic(null);
        }}
        initialTopicName={activeLabTopic}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        currentUser={currentUser}
        doneCount={done}
        totalCount={TOTAL_TOPICS}
        completedLevels={completedLevels}
      />

      <StudyScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        currentUserId={currentUser?.id}
      />

      <LegalModal
        isOpen={isLegalModalOpen}
        initialDoc={legalDocType}
        onClose={() => setIsLegalModalOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        currentUser={currentUser}
      />

      {/* MOBILE BOTTOM NAVIGATION BAR (Icon-Only Clean 3D App Bar - 4 Essential Items) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-2xl border-t border-white/10 px-4 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-around gap-4 max-w-xs mx-auto">
          {/* 1. Leaderboard (3D Trophy) */}
          <button
            onClick={() => setIsLeaderboardModalOpen(true)}
            className="p-1.5 rounded-2xl hover:bg-white/5 active:scale-90 transition transform"
            title="Leaderboard Ranks"
          >
            <Icon3DLeaderboard className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(234,179,8,0.35)]" />
          </button>

          {/* 2. Daily Calendar Slot (3D Calendar) */}
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="p-1.5 rounded-2xl hover:bg-white/5 active:scale-90 transition transform"
            title="Google Calendar Daily Slot"
          >
            <Icon3DCalendar className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(59,130,246,0.35)]" />
          </button>

          {/* 3. Certificate (Center Highlight 3D Gold Medal) */}
          <button
            onClick={() => setIsCertificateModalOpen(true)}
            className="p-2 -my-2 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-90 transition transform"
            title="Verifiable Certificates"
          >
            <Icon3DCertificate className="w-9 h-9" />
          </button>

          {/* 4. Settings Hub (3D Chrome Gear) */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-1.5 rounded-2xl hover:bg-white/5 active:scale-90 transition transform relative"
            title="Settings & AI Keys"
          >
            <Icon3DSettings className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(14,165,233,0.35)]" />
            {hasApiKey && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-black" />
            )}
          </button>
        </div>
      </nav>

      <Footer
        onOpenLegal={(type) => {
          setLegalDocType(type);
          setIsLegalModalOpen(true);
        }}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
      />
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
  onOpenAILabModal,
  currentUser,
  onOpenAuthModal,
  onOpenSettingsModal,
  onOpenCertificateModal,
  onOpenScheduleModal,
  onOpenLeaderboardModal,
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
  onOpenAILabModal: () => void;
  onOpenAuthModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenCertificateModal: () => void;
  onOpenScheduleModal: () => void;
  onOpenLeaderboardModal: () => void;
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
      <div className="mx-auto max-w-7xl px-3 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Colorful Logo Icon + SCG (Mobile) / Full Name (Desktop) */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 via-primary to-cyan-500 grid place-items-center shadow-[0_0_15px_rgba(52,199,89,0.5)] border border-white/20 shrink-0">
            <Zap className="h-4 w-4 text-black stroke-[2.5]" />
          </div>
          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground">
            <span className="sm:hidden">SCG</span>
            <span className="hidden sm:inline">Smart Canvas Grow</span>
          </span>
          <span className="hidden md:inline text-xs text-muted-foreground font-mono ml-1">
            / ai-ml-roadmap
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* About Creator Button */}
          <button
            onClick={onOpenAboutModal}
            className="h-8 w-8 rounded-full border border-border bg-surface hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-sm"
            title="About Creator"
          >
            <Icon3DAbout className="h-5 w-5" />
          </button>

          {/* Light / Dark Mode Toggle (Desktop & Mobile Topbar) */}
          <button
            onClick={onToggleTheme}
            className="h-8 w-8 rounded-full border border-border bg-surface hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition-all shadow-sm"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-primary" />
            )}
          </button>

          {/* Desktop Only Buttons (Real 3D Icon Only with Tooltip) */}
          <div className="hidden md:flex items-center gap-2">
            {/* AI Lab Terminal Launcher Button */}
            <button
              onClick={onOpenAILabModal}
              className="h-8 w-8 rounded-full grid place-items-center border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary-glow transition-all shadow-[0_0_12px_rgba(52,199,89,0.25)]"
              title="Launch AI & GPU Experimentation Lab"
            >
              <Icon3DAILab className="h-5 w-5" />
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboardModal}
              className="h-8 w-8 rounded-full grid place-items-center border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)]"
              title="View Global AI Learners Leaderboard"
            >
              <Icon3DLeaderboard className="h-5 w-5" />
            </button>

            {/* Schedule Daily Learning Button */}
            <button
              onClick={onOpenScheduleModal}
              className="h-8 w-8 rounded-full grid place-items-center border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-all shadow-[0_0_10px_rgba(66,133,244,0.2)]"
              title="Add 30-min Daily AI Study Slot to Google Calendar"
            >
              <Icon3DCalendar className="h-5 w-5" />
            </button>

            {/* Certificate Button */}
            <button
              onClick={onOpenCertificateModal}
              className="h-8 w-8 rounded-full grid place-items-center border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              title="View Verifiable Certificate for Naukri, LinkedIn & Indeed"
            >
              <Icon3DCertificate className="h-5 w-5" />
            </button>

            {/* Settings & Profile Hub Button */}
            <button
              onClick={onOpenSettingsModal}
              className={`h-8 w-8 rounded-full relative grid place-items-center border transition-all ${
                hasApiKey
                  ? "bg-primary/10 border-primary/40 text-primary-glow hover:bg-primary/20 shadow-sm"
                  : "bg-surface-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              title="Settings (Profile, Journey Track, AI Keys)"
            >
              <Icon3DSettings className="h-5 w-5" />
              {hasApiKey && <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />}
            </button>
          </div>

          {/* Google Sign In / Profile Avatar (ALWAYS ON TOPBAR FOR ALL SCREEN SIZES) */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 pl-0.5">
              <button
                onClick={onOpenSettingsModal}
                className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-border bg-surface/80 hover:bg-surface-2 transition group"
                title={`Signed in as ${userDisplayName} — Open Settings`}
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
                <span className="hidden md:inline text-xs font-medium text-foreground max-w-[85px] truncate">
                  {userDisplayName}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="h-8 w-8 rounded-full border border-border/80 bg-surface hover:bg-surface-2 grid place-items-center text-foreground font-semibold hover:border-primary/50 shadow-sm transition active:scale-95"
              title="Sign in with Google"
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
            </button>
          )}

          {/* Integrated Battery Indicator with Percentage INSIDE Battery */}
          <div
            className="relative flex items-center"
            title={`${pct}% roadmap completed`}
          >
            <div className="relative w-12 sm:w-14 h-6 rounded-[6px] border border-emerald-500/50 p-[1.5px] flex items-center bg-black/60 shadow-[0_0_8px_rgba(52,199,89,0.2)] overflow-hidden">
              {/* Fill Bar */}
              <div
                className="h-full rounded-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-primary transition-all duration-500 opacity-60"
                style={{ width: `${Math.max(pct, 5)}%` }}
              />
              {/* Text INSIDE Battery Body */}
              <span className="absolute inset-0 grid place-items-center font-mono text-[10px] font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] tabular-nums pointer-events-none">
                {pct}%
              </span>
            </div>
            {/* Battery Terminal Tip */}
            <div className="w-[2.5px] h-3 bg-emerald-500/70 rounded-r-[1.5px] ml-[1px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

const PLATFORM_BENEFITS = [
  "14-Level Autonomous AI & Systems Roadmap",
  "AI Study Studio: Overview, Quiz, Flashcards & Mindmaps",
  "Live Browser Python & AI-Lab Execution",
  "Direct YouTube + Wikipedia + AI Tutor per Topic",
  "Cloud Progress Sync & Verified Certificates",
  "100% Free & Built for Production Engineers",
];

function BenefitsMarquee() {
  const items = [...PLATFORM_BENEFITS, ...PLATFORM_BENEFITS];
  return (
    <div className="relative w-full overflow-hidden border-y border-border/60 bg-surface/60 backdrop-blur-md py-2.5 select-none">
      <div className="animate-marquee flex items-center gap-6">
        {items.map((benefit, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-background/70 border border-border/70 text-xs font-mono text-foreground/90 whitespace-nowrap shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
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
      badge: "Levels 00-01",
      topics: "61 Topics",
    },
    {
      img: iconML,
      title: "Deep ML intuition",
      body: "From regression and forests to transformers and attention.",
      badge: "Levels 02-05",
      topics: "102 Topics",
    },
    {
      img: iconAgent,
      title: "Production agents",
      body: "RAG, MCP, multi-agent orchestration, observability, scale.",
      badge: "Levels 06-14",
      topics: "420 Topics",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-5 -mt-4 pb-10">
      <div className="grid sm:grid-cols-3 gap-3.5 sm:gap-4">
        {items.map((it, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-4 sm:p-5 shadow-card hover:border-primary/40 transition-all group flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0"
          >
            {/* 3D Icon Box */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 sm:-mt-1 sm:mb-3 grid place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 group-hover:shadow-glow group-hover:scale-105 transition-all">
              <img
                src={it.img}
                alt=""
                width={64}
                height={64}
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                loading="lazy"
              />
            </div>

            {/* Content filling the empty space */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary-glow border border-primary/25 font-bold uppercase">
                  {it.badge}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground font-semibold">
                  {it.topics}
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-foreground leading-snug">
                {it.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {it.body}
              </p>
            </div>
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
  const filters: { id: Filter; label: string; icon?: React.ReactNode }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "done", label: "Done" },
    { id: "lab", label: "🧪 AI Lab" },
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
  onOpenLab,
  filter,
  query,
  isLocked = false,
  isPrereqLocked = false,
  prereqLevelName,
}: {
  lvl: Level;
  lIdx: number;
  state: Record<string, boolean>;
  open: boolean;
  setOpen: (b: boolean) => void;
  onToggle: (k: string) => void;
  onMarkAll: () => void;
  onAskAi: (topicName: string, sectionName: string) => void;
  onOpenLab?: (topicName: string) => void;
  filter: Filter;
  query: string;
  isLocked?: boolean;
  isPrereqLocked?: boolean;
  prereqLevelName?: string;
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
        ) : isPrereqLocked ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2/80 border border-border/80 text-muted-foreground shrink-0 text-xs font-mono">
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline text-[11px] font-sans text-muted-foreground">Prerequisite Needed</span>
          </div>
        ) : (
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {open && (
        <div className="relative border-t border-border px-4 sm:px-5 py-5 space-y-5 bg-surface/40">
          {/* Journey Track Blur Overlay when previous level not completed */}
          {isPrereqLocked && (
            <div className="absolute inset-0 z-20 backdrop-blur-[6px] bg-background/60 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
              <div className="max-w-md p-5 rounded-2xl border border-border bg-card/95 shadow-2xl space-y-3">
                <div className="h-10 w-10 mx-auto rounded-full bg-primary/10 border border-primary/30 grid place-items-center text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-foreground text-base">
                  Prerequisite Level Required
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Journey Track mode is ON. Complete all topics in{" "}
                  <span className="font-semibold text-primary-glow">{prereqLevelName || "previous level"}</span>{" "}
                  to unlock this stage, or switch off Journey Track in Settings.
                </p>
                <div className="pt-1 flex items-center justify-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2 px-2.5 py-1 rounded-full border border-border">
                    Journey Track: Active
                  </span>
                </div>
              </div>
            </div>
          )}
          {lvl.sections.map((section) => {
            const filtered = section.topics.filter((tp) => {
              const k = keyFor(lIdx, section.name, tp.name);
              const isDone = !!state[k];
              if (filter === "done" && !isDone) return false;
              if (filter === "pending" && isDone) return false;
              if (filter === "new" && !tp.isNew) return false;
              if (filter === "lab" && !getLabForTopic(tp.name)) return false;
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
                    const matchedLab = getLabForTopic(tp.name);
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
                        
                        {/* 🧪 Run in AI-LAB Trigger Button (Appears only on coding/hands-on topics!) */}
                        {matchedLab && onOpenLab && (
                          <span
                            role="button"
                            tabIndex={0}
                            title={`Run "${matchedLab.title}" in AI-LAB`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLab(tp.name);
                            }}
                            className="ml-1 p-1 rounded-full bg-amber/15 hover:bg-amber/30 text-amber transition-all shadow-xs"
                          >
                            <FlaskConical className="h-3 w-3" />
                          </span>
                        )}

                        {/* 📺 Direct YouTube Tutorial Search */}
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(tp.name + " AI ML tutorial")}`}
                          target="_blank"
                          rel="noreferrer"
                          title={`Watch top video tutorial on "${tp.name}"`}
                          onClick={(e) => e.stopPropagation()}
                          className="ml-0.5 p-1 rounded-full hover:bg-rose-500/20 text-muted-foreground hover:text-rose-400 transition-all opacity-80 hover:opacity-100"
                        >
                          <Youtube className="h-3 w-3" />
                        </a>

                        {/* 🌐 Wikipedia Theory Reference */}
                        <a
                          href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(tp.name.replace(/\s+/g, "_"))}`}
                          target="_blank"
                          rel="noreferrer"
                          title={`Read Wikipedia article on "${tp.name}"`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-full hover:bg-blue-500/20 text-muted-foreground hover:text-blue-400 transition-all opacity-80 hover:opacity-100"
                        >
                          <Globe className="h-3 w-3" />
                        </a>

                        <span
                          role="button"
                          tabIndex={0}
                          title="Explain with AI Tutor & Ask Doubts"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAskAi(tp.name, section.name);
                          }}
                          className="p-1 rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all opacity-80 hover:opacity-100"
                        >
                          <Sparkles className="h-3 w-3 text-primary-glow" />
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          title="Copy AI study prompt to clipboard"
                          onClick={(e) => handleCopy(e, tp.name, section.name, k)}
                          className={`p-1 rounded-full hover:bg-white/10 active:scale-90 transition-all text-muted-foreground hover:text-foreground ${
                            isCopied ? "text-primary opacity-100" : "opacity-80 hover:opacity-100"
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

function Footer({
  onOpenLegal,
  onOpenAbout,
  onOpenFeedback,
}: {
  onOpenLegal: (type: LegalDocType) => void;
  onOpenAbout: () => void;
  onOpenFeedback: () => void;
}) {
  return (
    <footer className="border-t border-border bg-surface/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Top Tier: Brand & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 via-primary to-cyan-500 grid place-items-center shadow-[0_0_12px_rgba(52,199,89,0.4)] border border-white/20">
                <Zap className="h-4 w-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-display font-bold text-base text-foreground tracking-tight">
                Smart Canvas Grow
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The premier autonomous 14-level AI engineering &amp; systems architecture roadmap. Built for real engineering mastery.
            </p>
            <div className="pt-1">
              <span className="font-mono text-[10px] text-primary-glow bg-primary/10 border border-primary/25 px-2.5 py-1 rounded-full">
                Curated by Manikandan
              </span>
            </div>
          </div>

          {/* Col 2: Engineering Ecosystem */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold">
              Ecosystem &amp; Labs
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => onOpenLegal("safety")}
                  className="hover:text-primary transition flex items-center gap-1.5"
                >
                  <Cpu className="h-3.5 w-3.5 text-primary" /> Colab GPU Cloud Tunnel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("safety")}
                  className="hover:text-primary transition flex items-center gap-1.5"
                >
                  <KeyRound className="h-3.5 w-3.5 text-amber" /> BYOK Multi-LLM Studio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-primary transition flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Creator Vision &amp; Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold">
              Legal &amp; Support
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => onOpenLegal("terms")}
                  className="hover:text-foreground transition"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("privacy")}
                  className="hover:text-foreground transition"
                >
                  Privacy Policy (Zero Data Selling)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("restrictions")}
                  className="hover:text-amber transition font-medium"
                >
                  Platform Restrictions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="text-primary hover:text-primary-glow font-medium transition flex items-center gap-1.5 pt-0.5"
                >
                  <MessageSquare className="h-3 w-3" /> Share Feedback / Report Bug
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: User Safety Notice Banner */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" /> Important Safety Notice
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Your API keys and Cloudflare tunnels run client-side. Never execute untrusted scripts or share private Colab tokens publicly.
            </p>
            <button
              onClick={() => onOpenLegal("safety")}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-2 transition"
            >
              Read full user safety &amp; GPU guidelines →
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Local Storage notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© 2026 Smart Canvas Grow. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Status: Operational (Local + Cloud Sync)</span>
            <span>•</span>
            <span>v2.4 Production Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

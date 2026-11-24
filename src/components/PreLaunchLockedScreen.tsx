import React, { useState, useEffect, useRef } from "react";
import { Zap, Volume2, Sparkles, CheckCircle2, Smartphone, RotateCcw, FastForward } from "lucide-react";
import { AuthModal } from "./AuthModal";

// Target Release: December 1, 2026 00:00:00 (Local Time)
export const TARGET_RELEASE_TIMESTAMP = new Date(2026, 11, 1, 0, 0, 0).getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

export function calculateTimeLeft(): TimeLeft {
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

// Seamless Video Playlist
const TRAILER_VIDEOS = [
  "./gemini_generated_video_dc0d945f.mp4",
  "./gemini_generated_video_fb4f728d.mp4",
];

interface PreLaunchLockedScreenProps {
  onDevBypass?: () => void;
}

export function PreLaunchLockedScreen({ onDevBypass }: PreLaunchLockedScreenProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [bypassTapCount, setBypassTapCount] = useState<number>(0);
  const bypassTimerRef = useRef<any>(null);

  const handleSecretTap = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBypassTapCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        if (onDevBypass) {
          onDevBypass();
        } else {
          try {
            localStorage.setItem("scg_dev_unlocked", "true");
            window.location.reload();
          } catch {}
        }
        return 0;
      }
      return next;
    });

    if (bypassTimerRef.current) {
      clearTimeout(bypassTimerRef.current);
    }
    bypassTimerRef.current = setTimeout(() => {
      setBypassTapCount(0);
    }, 2500);
  };

  // Stages:
  // "idle"      -> Waiting for user to click to turn on audio & start
  // "countdown" -> 5-Second 3D Space Countdown (5 -> 4 -> 3 -> 2 -> 1)
  // "presents"  -> Staggered Cinematic Reveal: Heading 1st -> Name -> Presents -> 3s hold -> fade-out
  // "video"     -> Video 1 plays, crossfades to Video 2 (0.75x)
  // "finalCard" -> Once both videos finish -> Center big countdown box with Google pre-login reveals!
  const [teaserStage, setTeaserStage] = useState<"idle" | "countdown" | "presents" | "video" | "finalCard">("idle");
  const [countNumber, setCountNumber] = useState<number>(5);

  // Staggered reveal states
  const [stepHeadingVisible, setStepHeadingVisible] = useState<boolean>(false);
  const [stepNameVisible, setStepNameVisible] = useState<boolean>(false);
  const [stepPresentsVisible, setStepPresentsVisible] = useState<boolean>(false);
  const [presentsFadeOut, setPresentsFadeOut] = useState<boolean>(false);

  // Master Single-Player State:
  // currentTrack: 0 = Video A (dc0d945f, 1.0x), 1 = Video B (fb4f728d, 0.75x)
  const [currentTrack, setCurrentTrack] = useState<0 | 1>(0);
  const [isVideoBuffering, setIsVideoBuffering] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Audio prompt soft fade-out state
  const [promptFadeOut, setPromptFadeOut] = useState<boolean>(false);

  // Auth Modal & User state for Final Pre-login card
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(() => {
    try {
      const demo = localStorage.getItem("scg_demo_user");
      return demo ? JSON.parse(demo) : null;
    } catch {
      return null;
    }
  });

  const masterVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoPreloadRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Audio Initializer & Trigger Full Experience Start (with Browser Fullscreen Activation)
  const startCinematicExperience = () => {
    // 1. Activate Native Browser Fullscreen on user gesture
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if ((docEl as any).webkitRequestFullscreen) {
        (docEl as any).webkitRequestFullscreen();
      } else if ((docEl as any).msRequestFullscreen) {
        (docEl as any).msRequestFullscreen();
      }
    } catch {}

    // 2. Initialize and resume audio context
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } catch {}

    setPromptFadeOut(true);

    setTimeout(() => {
      setTeaserStage("countdown");
    }, 600);
  };

  // Hollywood Audio Synthesizer
  const playCinematicSound = (type: "countdown_tension_tick" | "boom" | "nolan_swell" | "celestial_reveal" | "quantum_pulse_tick" | "doomsday_clock_tick") => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      if (type === "doomsday_clock_tick") {
        // =========================================================================
        // AVENGERS: DOOMSDAY CLOCK LIVESTREAM (Loud, Punchy Mechanical Clock Tick)
        // High-presence metallic ping + crisp mechanical clack + deep resonant bass
        // =========================================================================
        
        // 1. Crisp Metallic Ping & Anvil Harmonics (1200Hz - 2400Hz resonant bell/gear strike)
        const pingOsc = ctx.createOscillator();
        const pingGain = ctx.createGain();
        const pingFilter = ctx.createBiquadFilter();
        pingOsc.type = "sine";
        pingOsc.frequency.setValueAtTime(1760, now); // A6 high pitch
        pingOsc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

        pingFilter.type = "bandpass";
        pingFilter.frequency.setValueAtTime(1600, now);
        pingFilter.Q.setValueAtTime(4.0, now);

        pingGain.gain.setValueAtTime(0.85, now);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        pingOsc.connect(pingFilter);
        pingFilter.connect(pingGain);
        pingGain.connect(ctx.destination);
        pingOsc.start(now);
        pingOsc.stop(now + 0.16);

        // 2. Heavy Mechanical Gear Clack / Ratchet Transient (Sharp square/sawtooth crunch)
        const clackOsc = ctx.createOscillator();
        const clackGain = ctx.createGain();
        const clackFilter = ctx.createBiquadFilter();
        clackOsc.type = "sawtooth";
        clackOsc.frequency.setValueAtTime(950, now);
        clackOsc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

        clackFilter.type = "lowpass";
        clackFilter.frequency.setValueAtTime(2200, now);
        clackFilter.frequency.exponentialRampToValueAtTime(400, now + 0.05);

        clackGain.gain.setValueAtTime(0.75, now);
        clackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

        clackOsc.connect(clackFilter);
        clackFilter.connect(clackGain);
        clackGain.connect(ctx.destination);
        clackOsc.start(now);
        clackOsc.stop(now + 0.07);

        // 3. Deep Doom Sub-Bass Heartbeat Thud (Heavy punch 85Hz -> 28Hz)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(85, now);
        subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.25);

        subGain.gain.setValueAtTime(0.9, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.3);

      } else if (type === "countdown_tension_tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.08);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "quantum_pulse_tick") {
        // High-tech holographic quantum pulse tick for final countdown display
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now); // A5 high digital chirp
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === "boom") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(24, now + 0.9);

        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.92);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.95);
      } else if (type === "nolan_swell") {
        const chordFreqs = [55, 110, 165, 220, 330];
        chordFreqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
          osc.frequency.setValueAtTime(freq * 0.98, now);
          osc.frequency.exponentialRampToValueAtTime(freq, now + 1.0);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(150, now);
          filter.frequency.exponentialRampToValueAtTime(3400, now + 2.2);
          filter.frequency.exponentialRampToValueAtTime(80, now + 4.8);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.4 / chordFreqs.length, now + 1.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 4.9);
        });
      } else if (type === "celestial_reveal") {
        // Grand Final Reveal Harmony: Deep warm sub pad + shimmering celestial bells
        const baseChord = [65.41, 130.81, 196.0, 261.63, 392.0, 523.25]; // C Major epic harmony
        baseChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(250, now);
          filter.frequency.exponentialRampToValueAtTime(4000, now + 1.8);
          filter.frequency.exponentialRampToValueAtTime(800, now + 7.5);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.5 / baseChord.length, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 8.0);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 8.2);
        });
      }
    } catch {}
  };

  // Live Launch Time Left Ticker (with Avengers Doomsday tension clock tick on final screen)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Avengers Doomsday Dedicated Clock Ticker for finalCard
  useEffect(() => {
    if (teaserStage !== "finalCard") return;

    // Play immediate first beat on arrival
    playCinematicSound("doomsday_clock_tick");

    // Continuous 1-second pulse like Marvel livestream
    const tickInterval = setInterval(() => {
      playCinematicSound("doomsday_clock_tick");
    }, 1000);

    return () => clearInterval(tickInterval);
  }, [teaserStage]);

  // 5-Second Countdown BGM Loop + Tension Beats (5 -> 4 -> 3 -> 2 -> 1)
  useEffect(() => {
    if (teaserStage === "countdown") {
      playCinematicSound("boom");
      playCinematicSound("countdown_tension_tick");

      const mid1 = setTimeout(() => {
        playCinematicSound("countdown_tension_tick");
      }, 500);

      const stepTimer = setInterval(() => {
        setCountNumber((prev) => {
          if (prev > 1) {
            playCinematicSound("boom");
            playCinematicSound("countdown_tension_tick");
            setTimeout(() => playCinematicSound("countdown_tension_tick"), 500);
            return prev - 1;
          }
          clearInterval(stepTimer);
          setTeaserStage("presents");
          return 1;
        });
      }, 1000);

      return () => {
        clearInterval(stepTimer);
        clearTimeout(mid1);
      };
    }

    if (teaserStage === "presents") {
      setStepHeadingVisible(false);
      setStepNameVisible(false);
      setStepPresentsVisible(false);
      setPresentsFadeOut(false);
      playCinematicSound("nolan_swell");

      const t1 = setTimeout(() => {
        setStepHeadingVisible(true);
      }, 200);

      const t2 = setTimeout(() => {
        setStepNameVisible(true);
      }, 1200);

      const t3 = setTimeout(() => {
        setStepPresentsVisible(true);
      }, 2200);

      // Hold for 3s
      const t4 = setTimeout(() => {
        setPresentsFadeOut(true);
      }, 5200);

      const t5 = setTimeout(() => {
        setTeaserStage("video");
      }, 6700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [teaserStage]);

  // Master Single Video Playback Management
  // Video 1 (dc0d945f) -> 1.0x
  // Video 2 (fb4f728d) -> 0.75x
  const applySpeedForTrack = (track: 0 | 1) => {
    if (masterVideoRef.current) {
      masterVideoRef.current.playbackRate = track === 0 ? 1.0 : 0.75;
    }
  };

  const handleMasterVideoEnded = () => {
    if (currentTrack === 0) {
      // Transition immediately to Video 2 at 0.75x
      setCurrentTrack(1);
    } else {
      // Both videos finished -> reveal Final Card immediately while still in Fullscreen
      playCinematicSound("celestial_reveal");
      setTeaserStage("finalCard");

      // Hold Fullscreen for 5 seconds after Final Card launches, then smoothly exit
      setTimeout(() => {
        try {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitFullscreenElement) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).msFullscreenElement) {
            (document as any).msExitFullscreen();
          }
        } catch {}
      }, 5000);
    }
  };

  // Synchronize playback whenever teaserStage or currentTrack changes
  useEffect(() => {
    if (teaserStage === "video") {
      const vid = masterVideoRef.current;
      if (vid) {
        setIsVideoBuffering(false);
        vid.playbackRate = currentTrack === 0 ? 1.0 : 0.75;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If autoplay policy intervened, retry muted or wait for user interaction
          });
        }
      }
    }
  }, [teaserStage, currentTrack]);

  // Skip Teaser to Final Card handler for returning users
  const handleSkipToFinalCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      if (masterVideoRef.current) {
        masterVideoRef.current.pause();
      }
    } catch {}

    playCinematicSound("celestial_reveal");
    setTeaserStage("finalCard");

    // Exit fullscreen if active after 5s or smoothly
    setTimeout(() => {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitFullscreenElement) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msFullscreenElement) {
          (document as any).msExitFullscreen();
        }
      } catch {}
    }, 2000);
  };

  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "AI Engineer";

  const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white select-none">
      {/* ========================================================================= */}
      {/* 0. MOBILE PORTRAIT ROTATE PHONE OVERLAY (Active during video trailer only)  */}
      {/* ========================================================================= */}
      {teaserStage === "video" && (
        <div className="fixed inset-0 z-[100] md:hidden portrait:flex landscape:hidden flex-col items-center justify-center p-6 bg-black/95 backdrop-blur-2xl text-center select-none animate-in fade-in duration-300">
          <div className="absolute w-72 h-72 rounded-full bg-emerald-500/15 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-xs">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 grid place-items-center text-black shadow-[0_0_40px_rgba(52,199,89,0.7)]">
                <Smartphone className="h-10 w-10 animate-bounce" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-black border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-sm animate-spin">
                <RotateCcw className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-widest">
                Cinematic Landscape Mode
              </div>
              <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
                Please Rotate Your Phone
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                For the best theater widescreen trailer experience, rotate your device to <strong className="text-emerald-400">Landscape Mode</strong>.
              </p>
            </div>

            {/* Direct Skip option even from rotate screen */}
            <button
              onClick={handleSkipToFinalCard}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-neutral-300 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <FastForward className="h-3.5 w-3.5 text-emerald-400" />
              <span>Skip Trailer to Launch Card</span>
            </button>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* 1. CINEMA REAL VIDEO DIRECT LAYER (Single-Player Zero-Lag Architecture)   */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          teaserStage === "video" || teaserStage === "finalCard" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Single Master Video Element: eliminates decode conflict & race conditions */}
        <video
          ref={masterVideoRef}
          key={`track-${currentTrack}`}
          src={TRAILER_VIDEOS[currentTrack]}
          preload="auto"
          playsInline
          muted={false}
          onLoadedMetadata={() => applySpeedForTrack(currentTrack)}
          onCanPlay={() => {
            setIsVideoReady(true);
            setIsVideoBuffering(false);
          }}
          onWaiting={() => setIsVideoBuffering(true)}
          onPlaying={() => setIsVideoBuffering(false)}
          onEnded={handleMasterVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hidden Preloader for Track 2 while Track 1 is playing */}
        {currentTrack === 0 && (
          <video
            ref={nextVideoPreloadRef}
            src={TRAILER_VIDEOS[1]}
            preload="auto"
            muted
            playsInline
            className="hidden"
          />
        )}

        {/* Subtle cinematic loading spinner when video is buffering */}
        {isVideoBuffering && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm transition-opacity duration-300">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin shadow-[0_0_20px_rgba(52,199,89,0.5)]" />
              <span className="text-xs font-mono tracking-widest text-emerald-300 uppercase animate-pulse">
                Buffering High-Def Stream...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 2. INITIAL CENTER CALLOUT (Soft Fade-Out on Click)             */}
      {/* ============================================================== */}
      {teaserStage === "idle" && (
        <div
          className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-700 ease-in-out ${
            promptFadeOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none animate-pulse" />

          <div className="relative z-10 flex flex-col items-center space-y-5 text-center px-6">
            <div 
              onClick={handleSecretTap}
              className="h-16 w-16 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 grid place-items-center text-black shadow-[0_0_35px_rgba(52,199,89,0.7)] animate-bounce cursor-pointer active:scale-90 transition-transform"
              title="Cinematic AI Experience"
            >
              <Sparkles className="h-8 w-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Cinematic AI Launch Experience
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-sans">
                Turn on immersive sound to launch the official movie teaser trailer
              </p>
            </div>

            <button
              onClick={startCinematicExperience}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-black font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_50px_rgba(52,199,89,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
            >
              <span className="absolute -inset-1 rounded-2xl border-2 border-emerald-400 animate-ping pointer-events-none opacity-75" />
              <Volume2 className="h-5 w-5 stroke-[2.5] text-black shrink-0" />
              <span>Turn ON Audio &amp; Start Experience 🔊</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. 5-SECOND 3D DEEP SPACE COUNTDOWN (5 -> 4 -> 3 -> 2 -> 1)   */}
      {/* ============================================================== */}
      {teaserStage === "countdown" && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#010402] overflow-hidden animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-[#010402] to-black" />
          <div className="absolute w-[650px] h-[650px] rounded-full bg-emerald-500/15 blur-[160px] animate-pulse pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <span
              key={countNumber}
              className="text-9xl sm:text-[16rem] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-300 to-teal-500 drop-shadow-[0_0_80px_rgba(52,199,89,0.9)] animate-in zoom-in-75 duration-700"
            >
              {countNumber}
            </span>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. STAGGERED CINEMATIC REVEAL (Heading 1st -> Name -> Presents)      */}
      {/* ==================================================================== */}
      {teaserStage === "presents" && (
        <div
          className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-black overflow-hidden transition-all duration-[1400ms] ease-in-out ${
            presentsFadeOut
              ? "opacity-0 scale-110 filter blur-sm pointer-events-none"
              : "opacity-100 scale-100 filter blur-0"
          }`}
        >
          <div className="absolute inset-0 bg-radial-vignette from-transparent via-black/40 to-black pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-emerald-500/25 blur-[140px] rounded-full pointer-events-none animate-pulse" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

          <div className="relative z-10 text-center space-y-6 px-6 max-w-5xl flex flex-col items-center justify-center">
            <p
              className={`text-[11px] sm:text-xs font-mono font-medium tracking-[0.6em] text-emerald-400 uppercase drop-shadow-[0_0_15px_rgba(52,199,89,0.8)] indent-[0.6em] transition-all duration-1000 ease-out ${
                stepHeadingVisible
                  ? "opacity-100 translate-y-0 filter blur-0"
                  : "opacity-0 -translate-y-4 filter blur-sm"
              }`}
            >
              A VISIONARY ARCHITECTURE
            </p>

            <h2
              onClick={handleSecretTap}
              className={`text-4xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-[0.25em] indent-[0.25em] text-white drop-shadow-[0_0_60px_rgba(52,199,89,0.7)] text-center w-full transition-all duration-1000 ease-out cursor-pointer active:scale-95 ${
                stepNameVisible
                  ? "opacity-100 scale-100 filter blur-0"
                  : "opacity-0 scale-95 filter blur-sm"
              }`}
            >
              MANIKANDAN
            </h2>

            <div
              className={`flex items-center justify-center gap-4 w-full transition-all duration-1000 ease-out ${
                stepPresentsVisible
                  ? "opacity-100 translate-y-0 filter blur-0"
                  : "opacity-0 translate-y-4 filter blur-sm"
              }`}
            >
              <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-emerald-400 shadow-[0_0_10px_#34C759]" />
              <span className="text-sm sm:text-xl font-mono uppercase tracking-[0.6em] indent-[0.6em] text-neutral-200 font-semibold drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
                PRESENTS
              </span>
              <span className="w-12 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-emerald-400 shadow-[0_0_10px_#34C759]" />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================= */}
      {/* 5. FINAL CENTER BIG COUNTDOWN CARD WITH GOOGLE PRE-LOGIN (After 2 Videos Done) */}
      {/* ============================================================================= */}
      {teaserStage === "finalCard" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl select-none animate-in fade-in zoom-in-95 duration-1000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Main Glass Card */}
          <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/35 bg-[#070d0a]/95 backdrop-blur-3xl shadow-[0_0_80px_rgba(52,199,89,0.3)] p-6 sm:p-8 text-center space-y-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34C759]" />

            {/* Header Icon */}
            <div className="flex flex-col items-center space-y-3">
              <div 
                onClick={handleSecretTap}
                className="relative cursor-pointer active:scale-90 transition-transform"
                title="AI Architecture"
              >
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 grid place-items-center text-black shadow-[0_0_30px_rgba(52,199,89,0.6)] animate-pulse">
                  <Zap className="h-9 w-9 sm:h-11 sm:w-11 stroke-[2.5]" />
                </div>
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
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
                  Days
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
                  Hours
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(52,199,89,0.5)]">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 font-bold">
                  Mins
                </span>
              </div>

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
              {user ? (
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
                <div className="space-y-2">
                  <p className="text-xs text-neutral-300 font-medium">
                    Pre-register your account to reserve your spot &amp; cloud study sync:
                  </p>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="w-full h-11 px-4 rounded-xl font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 bg-white text-black hover:bg-neutral-100 transition-all font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] cursor-pointer"
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

            <div className="pt-1 flex items-center justify-center text-[11px] font-mono text-neutral-400">
              <span>Target Launch: December 01, 2026 00:00:00</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CORNER COUNTDOWN PILL (Bottom-Left) & SKIP TRAILER BUTTON (Bottom-Right) */}
      {/* ========================================================================= */}
      {teaserStage !== "finalCard" && (
        <>
          {/* Bottom Left: Official Launch Countdown Pill */}
          <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3.5 p-3.5 px-4 rounded-2xl border border-emerald-500/40 bg-[#070d0a]/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(52,199,89,0.3)] select-none">
            <div 
              onClick={handleSecretTap}
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 grid place-items-center text-black shadow-[0_0_15px_rgba(52,199,89,0.6)] shrink-0 cursor-pointer active:scale-90 transition-transform"
              title="Official Launch"
            >
              <Zap className="h-5 w-5 stroke-[2.5]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Official Launch In
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-sm sm:text-base font-black text-white tabular-nums tracking-tight mt-0.5">
                <span className="text-emerald-400">{String(timeLeft.days).padStart(2, "0")}d</span>
                <span className="text-neutral-500">:</span>
                <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
                <span className="text-neutral-500">:</span>
                <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
                <span className="text-neutral-500">:</span>
                <span className="text-teal-300">{String(timeLeft.seconds).padStart(2, "0")}s</span>
              </div>
            </div>
          </div>

          {/* Bottom Right: Direct Skip to Launch Button for Returning Viewers */}
          <button
            onClick={handleSkipToFinalCard}
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3.5 rounded-2xl border border-emerald-500/40 bg-[#070d0a]/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(52,199,89,0.3)] hover:border-emerald-400 hover:bg-[#0c1611] text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Already Watched?
              </span>
              <span className="text-xs sm:text-sm font-display font-bold">
                Skip to Pre-Launch ➔
              </span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 group-hover:bg-emerald-500/25 grid place-items-center text-emerald-300 shrink-0">
              <FastForward className="h-4 w-4" />
            </div>
          </button>
        </>
      )}

      {/* Auth Modal for Google Pre-login */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        reason="Pre-login with Google to secure early access & cloud sync for the Dec 1, 2026 launch."
        onSuccess={() => {
          try {
            const demo = localStorage.getItem("scg_demo_user");
            if (demo) setUser(JSON.parse(demo));
          } catch {}
        }}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";

export function AudioOverviewView({ script }: { script: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean script of speaker tags like Host 1: for clean reading
    const textToRead = script.replace(/Host [12]:/g, "");
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Audio Player Card */}
      <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 text-primary grid place-items-center">
            <Volume2 className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-xs text-foreground">
              Deep Dive Audio Podcast
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">
              2 AI Hosts discussing intuition &amp; pitfalls
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="h-9 px-3.5 rounded-full bg-primary text-primary-foreground font-medium text-xs flex items-center gap-1.5 shadow-glow"
            >
              <Pause className="h-3.5 w-3.5" /> Pause
            </button>
          ) : (
            <button
              onClick={handleSpeak}
              className="h-9 px-3.5 rounded-full bg-primary text-primary-foreground font-medium text-xs flex items-center gap-1.5 shadow-glow hover:opacity-95"
            >
              <Play className="h-3.5 w-3.5 fill-current" /> {isPaused ? "Resume" : "Listen"}
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="h-9 w-9 rounded-full border border-border bg-surface grid place-items-center text-muted-foreground hover:text-foreground"
              title="Stop"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Podcast Dialogue Script */}
      <div className="p-4 rounded-xl border border-border bg-surface-2/40 space-y-3 max-h-[380px] overflow-y-auto">
        <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
          Podcast Dialogue Script
        </div>
        <div className="space-y-2.5 text-xs text-foreground/90 leading-relaxed font-sans">
          {script.split("\n\n").map((line, idx) => {
            if (line.startsWith("Host 1:") || line.startsWith("Host A:")) {
              return (
                <div key={idx} className="p-2.5 rounded-lg bg-surface border border-border/60">
                  <span className="font-mono font-semibold text-primary text-[11px] block mb-1">
                    Host 1 (Alex):
                  </span>
                  <span>{line.replace(/^Host [1A]:\s*/, "")}</span>
                </div>
              );
            }
            if (line.startsWith("Host 2:") || line.startsWith("Host B:")) {
              return (
                <div key={idx} className="p-2.5 rounded-lg bg-surface-2 border border-border/60">
                  <span className="font-mono font-semibold text-accent text-[11px] block mb-1">
                    Host 2 (Sam):
                  </span>
                  <span>{line.replace(/^Host [2B]:\s*/, "")}</span>
                </div>
              );
            }
            return (
              <p key={idx} className="text-muted-foreground text-[11px] italic">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}


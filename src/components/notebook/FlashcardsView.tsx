import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Lightbulb } from "lucide-react";

export interface FlashcardItem {
  front: string;
  back: string;
  category?: string;
}

export function FlashcardsView({ cards }: { cards: FlashcardItem[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground text-xs font-mono">
        No flashcards available. Try regenerating.
      </div>
    );
  }

  const card = cards[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="space-y-5">
      {/* Header index info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>
          Card {currentIdx + 1} of {cards.length}
        </span>
        <button
          onClick={() => {
            setIsFlipped(false);
            setCurrentIdx(0);
          }}
          className="hover:text-foreground inline-flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-64 sm:h-72 w-full cursor-pointer select-none rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 flex flex-col justify-between shadow-card hover:border-primary/40 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
            {isFlipped ? "Answer / Key Insight" : "Concept Question"}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono group-hover:text-foreground transition">
            Click anywhere to {isFlipped ? "flip back" : "reveal answer"}
          </span>
        </div>

        <div className="my-auto text-center px-4">
          {!isFlipped ? (
            <h3 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug">
              {card.front}
            </h3>
          ) : (
            <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans text-left space-y-2 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-1.5 text-primary-glow font-semibold font-mono text-xs">
                <Lightbulb className="h-4 w-4" />
                <span>Core Takeaway:</span>
              </div>
              <p>{card.back}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground font-mono">
          <span>Tap to flip</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="px-3.5 py-2 rounded-xl border border-border bg-surface hover:bg-surface-2 text-xs font-medium text-foreground inline-flex items-center gap-1 transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Previous
        </button>
        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIdx(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIdx ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="px-3.5 py-2 rounded-xl border border-border bg-surface hover:bg-surface-2 text-xs font-medium text-foreground inline-flex items-center gap-1 transition"
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}


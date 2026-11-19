import React, { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Award } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function QuizView({
  questions,
  onReset,
}: {
  questions: QuizQuestion[];
  onReset: () => void;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground text-xs font-mono">
        No quiz questions generated. Try regenerating.
      </div>
    );
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className="space-y-6">
      {/* Quiz Progress & Actions */}
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface-2/60 text-xs">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">
            {showResults
              ? `Score: ${score} / ${questions.length} (${Math.round((score / questions.length) * 100)}%)`
              : `Answered: ${answeredCount} of ${questions.length}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!showResults && answeredCount === questions.length ? (
            <button
              onClick={() => setShowResults(true)}
              className="px-3 py-1 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-glow hover:opacity-95 transition"
            >
              Check Answers
            </button>
          ) : showResults ? (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setShowResults(false);
              }}
              className="px-3 py-1 rounded-lg border border-border bg-surface text-foreground hover:bg-surface-2 text-xs inline-flex items-center gap-1 transition"
            >
              <RotateCcw className="h-3 w-3" /> Retry Quiz
            </button>
          ) : (
            <span className="text-[11px] text-muted-foreground font-mono">
              Complete all to view score
            </span>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-5">
        {questions.map((q, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={qIdx}
              className="p-4 rounded-xl border border-border bg-card/90 space-y-3 shadow-sm"
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20 shrink-0">
                  Q{qIdx + 1}
                </span>
                <p className="font-medium text-xs sm:text-sm text-foreground leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    "border-border bg-surface-2/40 text-foreground/85 hover:border-primary/40 hover:bg-surface-2";

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        "border-emerald-500/80 bg-emerald-500/15 text-emerald-300 font-medium";
                    } else if (userChoice === optIdx && !isCorrect) {
                      btnStyle =
                        "border-destructive/80 bg-destructive/15 text-destructive font-medium";
                    } else {
                      btnStyle = "border-border/40 bg-surface/20 opacity-50 text-muted-foreground";
                    }
                  } else if (userChoice === optIdx) {
                    btnStyle =
                      "border-primary bg-primary/15 text-primary-glow font-medium shadow-[0_0_10px_rgba(52,199,89,0.2)]";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && userChoice === optIdx && !isCorrect && (
                        <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after checking */}
              {showResults && (
                <div className="p-3 rounded-lg bg-surface border border-border text-[11px] text-muted-foreground leading-relaxed mt-2 space-y-1 animate-in fade-in">
                  <div className="font-semibold text-foreground">Explanation:</div>
                  <div>{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


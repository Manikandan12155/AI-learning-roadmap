import React, { useState } from "react";
import { MessageSquarePlus, X, Send, CheckCircle2, Bug, Lightbulb, Sparkles, AlertCircle } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: any;
}

export function FeedbackModal({ isOpen, onClose, currentUser }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<"bug" | "idea" | "general">("idea");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    // Persist feedback locally and log
    try {
      const existing = JSON.parse(localStorage.getItem("scg_user_feedback") || "[]");
      existing.push({
        id: Date.now(),
        type: feedbackType,
        message: message.trim(),
        email: email.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem("scg_user_feedback", JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage("");
        onClose();
      }, 1800);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card/95 shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center text-primary">
              <MessageSquarePlus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">
                Help Us Improve Smart Canvas Grow
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Found a bug or have a suggestion? Share with Manikandan!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <h4 className="font-display font-semibold text-foreground text-sm">Thank You for Your Feedback!</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Your note has been recorded. We continuously optimize the AI learning experience based on your input.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Feedback Type Toggle */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFeedbackType("idea")}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                  feedbackType === "idea"
                    ? "bg-primary/15 border-primary text-primary-glow font-semibold"
                    : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Lightbulb className="h-4 w-4 text-amber" />
                <span>Feature Idea</span>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackType("bug")}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                  feedbackType === "bug"
                    ? "bg-rose-500/15 border-rose-500/50 text-rose-300 font-semibold"
                    : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bug className="h-4 w-4 text-rose-400" />
                <span>Report Bug</span>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackType("general")}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                  feedbackType === "general"
                    ? "bg-primary/15 border-primary text-primary-glow font-semibold"
                    : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Appreciation</span>
              </button>
            </div>

            {/* Message Area */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-muted-foreground">Your Thoughts / Details</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  feedbackType === "bug"
                    ? "Describe the issue or error you encountered..."
                    : feedbackType === "idea"
                    ? "What feature or topic would make your AI study better?"
                    : "Share your experience with the platform..."
                }
                rows={4}
                required
                className="w-full p-3 rounded-xl bg-surface border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
              />
            </div>

            {/* Email (Optional) */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-muted-foreground">Your Email (Optional, for response)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-9 px-3 rounded-xl bg-surface border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 shadow-glow hover:opacity-95 transition disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{loading ? "Submitting..." : "Send Feedback"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


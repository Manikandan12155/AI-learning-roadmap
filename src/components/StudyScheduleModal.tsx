import React, { useState } from "react";
import { X, Calendar, Clock, Check, Bell, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";

interface StudyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextTopicName?: string;
}

export function StudyScheduleModal({
  isOpen,
  onClose,
  nextTopicName = "AI Foundations & PyTorch",
}: StudyScheduleModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>("07:30");
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [recurrence, setRecurrence] = useState<"DAILY" | "WEEKDAYS" | "ONCE">("DAILY");
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleAddToGoogleCalendar = () => {
    // Generate dates based on selectedTime today or tomorrow
    const now = new Date();
    const [hours, minutes] = selectedTime.split(":").map(Number);

    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);

    // If time has already passed today, set to tomorrow
    if (startTime.getTime() <= now.getTime()) {
      startTime.setDate(startTime.getDate() + 1);
    }

    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    // Format for Google Calendar (YYYYMMDDTHHmmssZ in UTC)
    const formatGCalDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const title = encodeURIComponent(`🧠 AI Study Slot: ${nextTopicName} (Smart Canvas Grow)`);
    const details = encodeURIComponent(
      `Daily 30-minute focused AI engineering sprint.\n\nKeep your streak alive on Smart Canvas Grow:\nhttps://consistency-ai-learn.vercel.app/\n\nFocus Topic: ${nextTopicName}`
    );
    const location = encodeURIComponent("https://consistency-ai-learn.vercel.app/");
    const dates = `${formatGCalDate(startTime)}/${formatGCalDate(endTime)}`;

    let recurrenceRule = "";
    if (recurrence === "DAILY") {
      recurrenceRule = "&recur=RRULE:FREQ=DAILY";
    } else if (recurrence === "WEEKDAYS") {
      recurrenceRule = "&recur=RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR";
    }

    // Direct Google Calendar Add Event URL (Zero friction, 100% safe, no invasive scopes needed)
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}${recurrenceRule}`;

    window.open(gcalUrl, "_blank", "noopener,noreferrer");
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-md rounded-2xl border border-amber-500/40 bg-card shadow-2xl p-6 sm:p-7 space-y-6 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-7 w-7 rounded-full border border-border hover:bg-surface-2 grid place-items-center text-muted-foreground hover:text-foreground transition"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
            <Calendar className="h-3.5 w-3.5" /> Consistency Habit Engine
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Schedule Daily AI Learning
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Top 1% AI Engineers study 30 mins consistently every day. Add a recurring study slot to your Google Calendar.
          </p>
        </div>

        {/* Schedule Preferences Form */}
        <div className="space-y-4 p-4 rounded-xl border border-border bg-surface-2/40 text-xs">
          {/* Preferred Time */}
          <div className="space-y-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-semibold">
              <Clock className="h-3.5 w-3.5 text-amber-400" /> Daily Study Time
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Morning", time: "07:30" },
                { label: "Lunch", time: "13:00" },
                { label: "Evening", time: "19:30" },
                { label: "Night", time: "22:00" },
              ].map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`py-2 px-1 rounded-lg border text-center transition font-mono ${
                    selectedTime === slot.time
                      ? "border-amber-500 bg-amber-500/15 text-amber-300 font-bold shadow-sm"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                  }`}
                >
                  <span className="block text-[10px] text-neutral-400">{slot.label}</span>
                  <span className="text-xs">{slot.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recurrence Option */}
          <div className="space-y-1.5 pt-1">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-semibold">
              <Bell className="h-3.5 w-3.5 text-amber-400" /> Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "DAILY", label: "Every Day" },
                { id: "WEEKDAYS", label: "Mon - Fri" },
                { id: "ONCE", label: "Just Once" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRecurrence(opt.id as any)}
                  className={`py-1.5 rounded-lg border text-xs font-medium transition ${
                    recurrence === opt.id
                      ? "border-amber-500 bg-amber-500/15 text-amber-300 font-bold"
                      : "border-border/60 bg-surface/50 text-muted-foreground hover:border-border"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy & Safe Scope Guarantee */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-left">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Safe Data Guarantee:</strong> Opens directly via Google Calendar Template. We never request permission to read your existing calendar events or private schedule.
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-2">
          <button
            onClick={handleAddToGoogleCalendar}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 active:scale-95"
          >
            {added ? (
              <>
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Opened in Google Calendar!</span>
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 text-black" />
                <span>Add 30-Min Slot to Google Calendar</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

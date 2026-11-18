import { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  BookOpen,
  Sparkles,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Tag,
} from "lucide-react";
import {
  TECHNICAL_ABBREVIATIONS,
  CATEGORIES,
  type Abbreviation,
  type CategoryFilter,
} from "@/data/abbreviations";

interface AbbreviationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AbbreviationsModal({ isOpen, onClose }: AbbreviationsModalProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<CategoryFilter>("All");
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  // Esc key to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TECHNICAL_ABBREVIATIONS.filter((item) => {
      const matchCat = selectedCat === "All" || item.category === selectedCat;
      const matchSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.expansion.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.keyContext && item.keyContext.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, selectedCat]);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedTerm(text);
    setTimeout(() => setCopiedTerm(null), 1800);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop with real optical blur & glass */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Glass Dialog */}
      <div className="relative z-10 flex flex-col w-full max-w-4xl max-h-[90vh] bg-surface/90 border border-border/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-surface/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 border border-primary/30 flex items-center justify-center shadow-glow">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Technical Abbreviations &amp; Glossary
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {filteredList.length} terms
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                AI, Machine Learning, Deep Learning, MLOps &amp; Systems Quick Cheatsheet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            title="Close (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 border-b border-border/40 space-y-3 bg-surface/30">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search abbreviation, full form, or concept (e.g. RAG, LoRA, CUDA, vLLM)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/60 border border-border/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground transition-all"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground bg-muted/60 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  selectedCat === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-surface/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredList.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">
                No abbreviations found matching &ldquo;<span className="text-foreground">{search}</span>&rdquo;
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCat("All");
                }}
                className="mt-3 text-xs text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.term}
                className="group relative p-4 rounded-xl border border-border/60 bg-surface/40 hover:bg-surface/80 hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-base font-bold text-primary group-hover:text-primary-glow transition-colors">
                      {item.term}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      — {item.expansion}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40">
                      {item.category}
                    </span>
                    <button
                      onClick={() => copyToClipboard(`${item.term}: ${item.expansion}`)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground rounded transition-opacity"
                      title="Copy abbreviation"
                    >
                      {copiedTerm === `${item.term}: ${item.expansion}` ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                  {item.definition}
                </p>

                {item.keyContext && (
                  <div className="mt-2.5 pt-2 border-t border-border/30 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground/80 font-medium">Industry Context:</strong>{" "}
                      {item.keyContext}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-2.5 bg-surface/80 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between">
          <span className="font-mono">Tip: Press ESC to exit anytime</span>
          <span className="font-mono text-primary/80">Smart Canvas Grow · Engineering Glossary</span>
        </div>
      </div>
    </div>
  );
}


import React from "react";

// Parses markdown bold (**text**), code (`code`), lists, headers and links
export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  // Split into lines or paragraphs
  const rawBlocks = content.split("\n\n");

  return (
    <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-foreground/90">
      {rawBlocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Code block
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const lang = lines[0].replace("```", "").trim();
          const code = lines.slice(1, lines[lines.length - 1].startsWith("```") ? -1 : undefined).join("\n");
          return (
            <div key={bIdx} className="rounded-xl border border-border bg-[#0d1414] overflow-hidden my-3 shadow-sm">
              {lang && (
                <div className="px-3.5 py-1.5 bg-surface-2 border-b border-border text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {lang}
                </div>
              )}
              <pre className="p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto leading-normal">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Section Headings (### or 1. Intuition etc)
        if (trimmed.startsWith("### ") || trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
          const headingText = trimmed.replace(/^#{1,3}\s+/, "");
          return (
            <h3
              key={bIdx}
              className="font-display text-sm sm:text-base font-semibold text-primary-glow border-b border-border/60 pb-1.5 mt-5 first:mt-0 flex items-center gap-2"
            >
              {renderInline(headingText)}
            </h3>
          );
        }

        // Horizontal Rule
        if (trimmed === "---" || trimmed === "***") {
          return <hr key={bIdx} className="border-border/60 my-3" />;
        }

        // Bullet lists
        if (trimmed.split("\n").some((l) => l.trim().startsWith("* ") || l.trim().startsWith("- "))) {
          const lines = trimmed.split("\n");
          return (
            <ul key={bIdx} className="space-y-1.5 pl-4 list-disc marker:text-primary">
              {lines.map((l, lIdx) => {
                const cleaned = l.replace(/^[\*\-]\s+/, "");
                return (
                  <li key={lIdx} className="leading-relaxed">
                    {renderInline(cleaned)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered list items
        if (/^\d+\.\s/.test(trimmed)) {
          const lines = trimmed.split("\n");
          return (
            <ol key={bIdx} className="space-y-2">
              {lines.map((l, lIdx) => {
                const match = l.match(/^(\d+\.)\s+(.*)/);
                if (match) {
                  return (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="font-mono text-primary font-semibold text-xs shrink-0 mt-0.5">
                        {match[1]}
                      </span>
                      <div className="flex-1 leading-relaxed">
                        {renderInline(match[2])}
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={lIdx} className="leading-relaxed">
                    {renderInline(l)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Regular paragraph
        return (
          <p key={bIdx} className="leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Renders bold (**text**), inline code (`code`), and italics (*text*)
function renderInline(text: string): React.ReactNode {
  // Regex to split by **bold** or `code`
  const parts = text.split(/(\*\*[^*]+?\*\*|`[^`]+?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-foreground text-primary-glow">
          {boldContent}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface border border-border text-emerald-300"
        >
          {codeContent}
        </code>
      );
    }
    return part;
  });
}


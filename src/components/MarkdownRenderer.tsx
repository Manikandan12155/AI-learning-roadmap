import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div className="text-xs sm:text-[13px] leading-relaxed text-foreground/90 break-words font-sans space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-base font-semibold text-primary-glow border-b border-border/60 pb-1.5 mt-5 first:mt-1">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-sm sm:text-base font-semibold text-primary-glow border-b border-border/60 pb-1.5 mt-5 first:mt-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-sm font-semibold text-primary-glow border-b border-border/60 pb-1.5 mt-4 first:mt-1">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-display text-xs font-semibold text-primary-glow mt-3">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed my-2 text-foreground/90 whitespace-normal">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 pl-4 list-disc marker:text-primary my-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 pl-4 list-decimal marker:text-primary font-medium my-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-foreground/90">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground text-primary-glow">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/80">
              {children}
            </em>
          ),
          code: ({ className, children, ...props }: any) => {
            const isInline = !className && typeof children === "string" && !children.includes("\n");
            if (isInline) {
              return (
                <code
                  className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface border border-border text-emerald-300 break-all"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className="font-mono text-xs text-emerald-300" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <div className="rounded-xl border border-border bg-[#0d1414] overflow-hidden my-3 shadow-sm">
              <pre className="p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto leading-normal">
                {children}
              </pre>
            </div>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 border border-border rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-2 border-b border-border text-foreground font-semibold">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 border-b border-border font-mono text-[11px] text-muted-foreground uppercase">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-b border-border/50 text-foreground/90">
              {children}
            </td>
          ),
          hr: () => <hr className="border-border/60 my-4" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/40 pl-3 my-2 text-muted-foreground italic bg-primary/5 py-1 rounded-r">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

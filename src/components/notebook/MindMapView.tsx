import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

export function MindMapView({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#34C759",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#34C759",
        lineColor: "#66bb6a",
        secondaryColor: "#1e293b",
        tertiaryColor: "#0f172a",
        background: "transparent",
      },
      fontFamily: "Inter, sans-serif",
      securityLevel: "loose",
    });

    if (containerRef.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      containerRef.current.innerHTML = "";
      
      // Clean chart text if wrapped in ```mermaid
      let cleaned = chart.replace(/```mermaid\n?/g, "").replace(/```\n?/g, "").trim();
      if (!cleaned.startsWith("graph") && !cleaned.startsWith("mindmap") && !cleaned.startsWith("flowchart")) {
        cleaned = `graph TD\n${cleaned}`;
      }

      mermaid
        .render(id, cleaned)
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.error("Mermaid error:", err);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<pre class="text-xs text-muted-foreground p-4 font-mono">${cleaned}</pre>`;
          }
        });
    }
  }, [chart]);

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl border border-border bg-[#0d1414] overflow-x-auto min-h-[300px] flex items-center justify-center">
        <div ref={containerRef} className="w-full flex justify-center text-xs" />
      </div>
      <p className="text-[10px] text-muted-foreground font-mono text-center">
        Interactive AI Architecture Flow generated from topic concepts
      </p>
    </div>
  );
}


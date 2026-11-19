import React, { useEffect, useState } from "react";
import { ShieldAlert, Lock } from "lucide-react";

interface ContentProtectionProps {
  currentUser?: any;
}

export function ContentProtection({ currentUser }: ContentProtectionProps) {
  const [isObscured, setIsObscured] = useState(false);
  const [devToolsDetected, setDevToolsDetected] = useState(false);

  useEffect(() => {
    // 1. Console Sanitization & Warning Banner
    try {
      console.clear();
      console.log(
        "%c🛑 RESTRICTED AI ARCHITECTURE",
        "color: #ff3333; font-size: 26px; font-weight: bold; -webkit-text-stroke: 1px black;"
      );
      console.log(
        "%cWarning: Inspecting, modifying memory, or scraping curriculum data violates Smart Canvas Grow Terms of Service. Automated tamper detection is active.",
        "color: #f59e0b; font-size: 13px; font-weight: 600;"
      );

      // Disable console methods in production to prevent script injection
      if (typeof window !== "undefined") {
        const noop = () => {};
        window.console.warn = noop;
        window.console.info = noop;
        window.console.table = noop;
      }
    } catch (e) {
      // Ignore
    }

    // 2. Comprehensive Keyboard & Inspect Shortcuts Blocking
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;

      // PrintScreen key
      if (e.key === "PrintScreen") {
        setIsObscured(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Protected Curriculum Content — Smart Canvas Grow");
        }
        setTimeout(() => setIsObscured(false), 2000);
      }

      // Block F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        setDevToolsDetected(true);
        return false;
      }

      // Block Ctrl + Shift + I (Inspect)
      // Block Ctrl + Shift + J (Console)
      // Block Ctrl + Shift + C (Element picker)
      if (isCtrlOrMeta && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        e.stopPropagation();
        setDevToolsDetected(true);
        return false;
      }

      // Block Ctrl + U (View Source)
      if (isCtrlOrMeta && key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl + S (Save Page)
      if (isCtrlOrMeta && key === "s") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl + P (Print Page)
      if (isCtrlOrMeta && key === "p") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Right-Click Context Menu Blocking (Except in input/textarea)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 4. Active DevTools Detection Trap (Outer vs Inner Window Metric)
    let devToolsCheckInterval: any = null;
    let debuggerInterval: any = null;

    const checkDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;

      if (widthDiff || heightDiff) {
        setDevToolsDetected(true);
      } else {
        // Automatically unlock screen when user closes devtools
        setDevToolsDetected(false);
      }
    };

    // Run active check every 600ms
    devToolsCheckInterval = setInterval(checkDevTools, 600);

    // 5. INFINITE DEBUGGER TRAP: Freezes the DevTools Console so user CANNOT type anything!
    // Whenever DevTools is open, this debugger pauses JavaScript execution on every step.
    const runDebuggerTrap = () => {
      function trap() {
        try {
          (function () {
            // Function constructor prevents optimizer from stripping debugger
            (function () {
              return true;
            })
              .constructor("debugger")
              .call("action");
          })();
        } catch (err) {}
      }
      debuggerInterval = setInterval(trap, 300);
    };

    runDebuggerTrap();

    // 6. Obscure screen when window loses focus (e.g. Snipping tool opened)
    const handleBlur = () => {
      setIsObscured(true);
    };

    const handleFocus = () => {
      setIsObscured(false);
      checkDevTools();
    };

    // 7. Anti-Drag Shield for Images
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("dragstart", handleDragStart, true);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("dragstart", handleDragStart, true);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      if (devToolsCheckInterval) clearInterval(devToolsCheckInterval);
      if (debuggerInterval) clearInterval(debuggerInterval);
    };
  }, []);

  return (
    <>
      {/* DevTools Tamper Lockout Modal (Zero Buttons - Auto Unlocks Only When DevTools Closes) */}
      {devToolsDetected && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-200">
          <div className="relative max-w-md rounded-3xl border-2 border-red-500/40 bg-[#0c0808] p-7 sm:p-9 shadow-[0_0_50px_rgba(239,68,68,0.3)] space-y-5 text-center">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 grid place-items-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <ShieldAlert className="h-8 w-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-400 px-3 py-0.5 rounded-full bg-red-500/10 border border-red-500/30">
                Security Sandbox Active
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                Developer Tools Restricted
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                Inspecting elements, accessing browser devtools, or attempting memory injections is restricted on this platform to preserve curriculum integrity.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-neutral-400 font-mono text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <Lock className="h-3.5 w-3.5 text-amber-400" />
                <span>Screen Locked</span>
              </div>
              <p className="text-neutral-400">
                Close your Developer Tools / Inspect window to automatically resume learning.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Blackout Obscure Shield on Window Blur / Snipping Attempt */}
      {isObscured && !devToolsDetected && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-100">
          <div className="space-y-3 max-w-sm">
            <div className="h-12 w-12 mx-auto rounded-full bg-neutral-900 border border-neutral-700 grid place-items-center text-primary">
              <Lock className="h-5 w-5 text-amber-400" />
            </div>
            <h4 className="font-display font-bold text-white text-lg">
              Screen Protected
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Screen capture and background window inspection are restricted. Click back to resume reading.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

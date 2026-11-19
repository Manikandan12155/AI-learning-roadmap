import React, { useEffect, useState } from "react";

interface ContentProtectionProps {
  currentUser?: any;
}

export function ContentProtection({ currentUser }: ContentProtectionProps) {
  const [isObscured, setIsObscured] = useState(false);

  useEffect(() => {
    // 1. Intercept PrintScreen and Screen Snipping Key Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === "PrintScreen") {
        setIsObscured(true);
        // Clear clipboard if possible
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Protected content — Smart Canvas Grow");
        }
        setTimeout(() => setIsObscured(false), 2000);
      }

      // Ctrl + P (Print page)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + S (Save webpage)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + Shift + I or F12 (Inspect Element)
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === "i" || e.key.toLowerCase() === "j"))
      ) {
        // Prevent dev tools shortcut inspect
        e.preventDefault();
      }
    };

    // 2. Prevent right-click context menu (Save image as, inspect, etc.)
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only inside input/textarea fields
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
    };

    // 3. Obscure screen when window loses focus (e.g. Snipping tool opened)
    const handleBlur = () => {
      setIsObscured(true);
    };

    const handleFocus = () => {
      setIsObscured(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <>
      {/* Blackout Obscure Shield on Window Blur / Snipping Attempt */}
      {isObscured && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-100">
          <div className="space-y-3 max-w-sm">
            <div className="h-12 w-12 mx-auto rounded-full bg-neutral-900 border border-neutral-700 grid place-items-center text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
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


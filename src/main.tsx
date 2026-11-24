import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { PreLaunchLockedScreen, TARGET_RELEASE_TIMESTAMP } from "./components/PreLaunchLockedScreen";
import "./styles.css";

function RootApp() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    // Developer Secret Bypass Check (URL param '?dev=manikandan' or localStorage)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("dev") === "manikandan" || urlParams.get("override") === "true") {
        try {
          localStorage.setItem("scg_dev_unlocked", "true");
        } catch {}
        return true;
      }
      try {
        if (localStorage.getItem("scg_dev_unlocked") === "true") {
          return true;
        }
      } catch {}
    }
    return Date.now() >= TARGET_RELEASE_TIMESTAMP;
  });

  const handleDevBypass = () => {
    try {
      localStorage.setItem("scg_dev_unlocked", "true");
    } catch {}
    setIsUnlocked(true);
  };

  useEffect(() => {
    if (isUnlocked) return;

    const timer = setInterval(() => {
      if (Date.now() >= TARGET_RELEASE_TIMESTAMP) {
        setIsUnlocked(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isUnlocked]);

  // Before Dec 1, 2026 -> Strict Locked Countdown Screen ONLY. No router or page is rendered.
  if (!isUnlocked) {
    return <PreLaunchLockedScreen onDevBypass={handleDevBypass} />;
  }

  // On & after Dec 1, 2026 -> Official Full App Router unlocks automatically!
  const router = getRouter();
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);

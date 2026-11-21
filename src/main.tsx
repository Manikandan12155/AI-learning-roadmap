import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { PreLaunchLockedScreen, TARGET_RELEASE_TIMESTAMP } from "./components/PreLaunchLockedScreen";
import "./styles.css";

function RootApp() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return Date.now() >= TARGET_RELEASE_TIMESTAMP;
  });

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
    return <PreLaunchLockedScreen />;
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

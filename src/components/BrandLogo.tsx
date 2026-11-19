import React from "react";

export function BrandLogo({ id, className = "h-4 w-4" }: { id: string; className?: string }) {
  switch (id) {
    case "gemini":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
            fill="url(#geminiGrad)"
          />
          <defs>
            <linearGradient id="geminiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E82EE" />
              <stop offset="0.5" stopColor="#9B72CB" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "openai":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M22.28 9.37a5.99 5.99 0 0 0-.52-4.88 6.06 6.06 0 0 0-6.52-2.82A6 6 0 0 0 4.98 3.8a6.04 6.04 0 0 0-2.7 6.6 6 6 0 0 0 .52 4.88 6.06 6.06 0 0 0 6.52 2.82 6 6 0 0 0 10.28-2.13 6.04 6.04 0 0 0 2.68-6.6zM12 14.86a2.86 2.86 0 1 1 2.86-2.86A2.86 2.86 0 0 1 12 14.86z" />
        </svg>
      );

    case "claude":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M13.8 3.2c-.3-.8-1.3-.8-1.6 0L8.5 12.8c-.3.7.2 1.4 1 1.4h6.9c.7 0 1.2-.8 1-1.4L13.8 3.2zM4.5 15.5c-.7.5-.7 1.5 0 2l5.5 3.7c.6.4 1.4.1 1.6-.6l1.2-3.8c.2-.7-.4-1.3-1.1-1.3H5.7c-.5 0-.9.2-1.2.6zM19.5 15.5c.7.5.7 1.5 0 2l-5.5 3.7c-.6.4-1.4.1-1.6-.6l-1.2-3.8c-.2-.7.4-1.3 1.1-1.3h6c.5 0 .9.2 1.2.6z" />
        </svg>
      );

    case "groq":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );

    case "deepseek":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 3C6.5 3 2 6.5 2 11c0 2.6 1.6 4.9 4 6.3V21l3.5-1.9c.8.2 1.7.3 2.5.3 5.5 0 10-3.5 10-8s-4.5-8.1-10-8.4zm-1 11c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm4 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
        </svg>
      );

    case "openrouter":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      );

    case "cerebras":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm0 4.2l5 2.8-5 2.8-5-2.8 5-2.8zm-6 4.7l5 2.8v5.6l-5-2.8v-5.6zm7 8.4v-5.6l5-2.8v5.6l-5 2.8z" />
        </svg>
      );

    case "together":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}


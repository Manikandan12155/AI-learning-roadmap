import React from "react";

export function BrandLogo({ id, className = "h-4 w-4" }: { id: string; className?: string }) {
  switch (id) {
    case "gemini":
      // Official Google Gemini Sparkle Star Logo
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24Z"
            fill="url(#geminiGradientActual)"
          />
          <defs>
            <linearGradient id="geminiGradientActual" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E3" />
              <stop offset="0.33" stopColor="#5486EE" />
              <stop offset="0.66" stopColor="#9B72CB" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "openai":
      // Official OpenAI Knot Logo (Standard exact vectors)
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3428 7.897a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3427 7.897zm16.5986 3.8558L13.1038 8.3843l2.0153-1.1638a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4022-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2312V6.8988a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.145-2.039l2.548-1.4674 2.548 1.4674v2.9348l-2.548 1.4674-2.548-1.4674z" />
        </svg>
      );

    case "claude":
      // Official Anthropic Claude Asterisk Logo
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M13.606 2.385c-.328-.887-1.584-.887-1.912 0l-2.06 5.568a1.025 1.025 0 0 1-.649.649l-5.568 2.06c-.887.328-.887 1.584 0 1.912l5.568 2.06c.298.11.539.351.649.649l2.06 5.568c.328.887 1.584.887 1.912 0l2.06-5.568a1.025 1.025 0 0 1 .649-.649l5.568-2.06c.887-.328.887-1.584 0-1.912l-5.568-2.06a1.025 1.025 0 0 1-.649-.649l-2.06-5.568z" />
        </svg>
      );

    case "groq":
      // Official Groq Geometric G / Orange Lightning Icon
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-3h-2v3H9l3-5.5V13h2v-3h2l-3 6.5z" />
          <path d="M13.5 6L7 13h5l-1.5 6L17 11h-5l1.5-5z" fill="#ffffff" />
        </svg>
      );

    case "deepseek":
      // Official DeepSeek Blue Whale Shape
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M18.8 8.4C17.6 6.3 15 5 12 5 7.6 5 4 8.6 4 13c0 2.2.9 4.2 2.4 5.6l-1.8 1.8c-.4.4-.1 1.1.5 1.1h5.8c.3 0 .5-.1.7-.3l2.8-2.8c2.4-.6 4.3-2.1 5.2-4.2 1.1-2.4.7-4.6-.8-5.8zm-7.3 5.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
        </svg>
      );

    case "openrouter":
      // Official OpenRouter Cross Routing icon
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5" />
          <path d="M4 20L21 3" />
          <path d="M21 16v5h-5" />
          <path d="M15 15l6 6" />
          <path d="M4 4l5 5" />
        </svg>
      );

    case "cerebras":
      // Official Cerebras Hexagonal Wafer Chip
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.8L18.4 8 12 11.6 5.6 8 12 4.8zM5 9.8l6 3.4v6.8L5 16.6V9.8zm8 10.2v-6.8l6-3.4v6.8l-6 3.4z" />
        </svg>
      );

    case "together":
      // Official Together AI Interlocking Rings / Heart Shape
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

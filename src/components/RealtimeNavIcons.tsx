import React from "react";

/**
 * High-definition, multi-color realistic SVG logos for all main navigation actions:
 * - Google Calendar
 * - Golden Certificate / Diploma Shield
 * - Leaderboard Crown & Trophy
 * - Settings Gear (Multi-tone Apple / Metal style)
 * - About / Sparkles Creator Orb
 */

export function GoogleCalendarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Blue calendar base */}
      <rect x="3" y="4" width="18" height="17" rx="3.5" fill="#4285F4" />
      {/* Top red header stripe */}
      <path d="M3 7.5C3 5.567 4.567 4 6.5 4H17.5C19.433 4 21 5.567 21 7.5V8.5H3V7.5Z" fill="#EA4335" />
      {/* White center date pad */}
      <rect x="5.5" y="11" width="13" height="7.5" rx="1.5" fill="#FFFFFF" />
      {/* Number "31" or mini calendar grid lines */}
      <rect x="7.5" y="13" width="2" height="3.5" rx="0.5" fill="#1A73E8" />
      <rect x="11" y="13" width="2" height="3.5" rx="0.5" fill="#1A73E8" />
      <rect x="14.5" y="13" width="2" height="3.5" rx="0.5" fill="#1A73E8" />
      {/* Spiral binds */}
      <rect x="7" y="2.5" width="2" height="3" rx="1" fill="#34A853" />
      <rect x="15" y="2.5" width="2" height="3" rx="1" fill="#FBBC05" />
    </svg>
  );
}

export function CertificateDiplomaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="shieldBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      {/* Hanging Ribbons */}
      <path d="M9 16L7 22L12 19.5L17 22L15 16" fill="#DC2626" />
      <path d="M10 16L8.5 21L12 19L15.5 21L14 16" fill="#EF4444" />
      {/* Gold Medal Outer Crest */}
      <circle cx="12" cy="11" r="8" fill="url(#goldRibbon)" stroke="#B45309" strokeWidth="0.8" />
      {/* Inner Rich Shield */}
      <circle cx="12" cy="11" r="5.8" fill="url(#shieldBg)" stroke="#FDE047" strokeWidth="0.8" />
      {/* Certified Star / Check */}
      <path
        d="M12 7.8L13 9.8L15.2 10.1L13.6 11.6L14 13.8L12 12.7L10 13.8L10.4 11.6L8.8 10.1L11 9.8L12 7.8Z"
        fill="#FDE047"
      />
    </svg>
  );
}

export function LeaderboardTrophyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="trophyGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="pedestalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      {/* Handles */}
      <path
        d="M5.5 7C4.1 7 3 8.1 3 9.5C3 11.7 4.8 13.5 7 13.5H7.5V11.5H7C5.9 11.5 5 10.6 5 9.5C5 8.9 5.4 8.5 6 8.5H7V7H5.5ZM18.5 7C19.9 7 21 8.1 21 9.5C21 11.7 19.2 13.5 17 13.5H16.5V11.5H17C18.1 11.5 19 10.6 19 9.5C19 8.9 18.6 8.5 18 8.5H17V7H18.5Z"
        fill="#CA8A04"
      />
      {/* Cup Body */}
      <path
        d="M6.5 4H17.5V9.5C17.5 12.5 15 15 12 15C9 15 6.5 12.5 6.5 9.5V4Z"
        fill="url(#trophyGold)"
        stroke="#A16207"
        strokeWidth="0.5"
      />
      {/* Star on Cup */}
      <polygon points="12,6.5 12.8,8.2 14.5,8.4 13.2,9.6 13.6,11.3 12,10.4 10.4,11.3 10.8,9.6 9.5,8.4 11.2,8.2" fill="#FEF08A" />
      {/* Stem */}
      <path d="M10.5 15H13.5V17.5H10.5V15Z" fill="#CA8A04" />
      {/* Base / Pedestal */}
      <path d="M7.5 17.5H16.5L17.5 21H6.5L7.5 17.5Z" fill="url(#pedestalGrad)" stroke="#475569" strokeWidth="0.5" />
      <rect x="9" y="19" width="6" height="1.2" rx="0.6" fill="#FDE047" />
    </svg>
  );
}

export function SettingsGearIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gearSilver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="cyanCenter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Outer 8-tooth gear */}
      <path
        d="M10.3 2.5H13.7L14.3 4.8C14.8 5 15.3 5.3 15.8 5.6L17.9 4.6L20.3 7L19.3 9.1C19.6 9.6 19.9 10.1 20.1 10.6L22.4 11.2V14.6L20.1 15.2C19.9 15.7 19.6 16.2 19.3 16.7L20.3 18.8L17.9 21.2L15.8 20.2C15.3 20.5 14.8 20.8 14.3 21L13.7 23.3H10.3L9.7 21C9.2 20.8 8.7 20.5 8.2 20.2L6.1 21.2L3.7 18.8L4.7 16.7C4.4 16.2 4.1 15.7 3.9 15.2L1.6 14.6V11.2L3.9 10.6C4.1 10.1 4.4 9.6 4.7 9.1L3.7 7L6.1 4.6L8.2 5.6C8.7 5.3 9.2 5 9.7 4.8L10.3 2.5Z"
        fill="url(#gearSilver)"
        stroke="#475569"
        strokeWidth="0.6"
      />
      {/* Inner Ring */}
      <circle cx="12" cy="12.9" r="4.5" fill="#0F172A" stroke="#0EA5E9" strokeWidth="1" />
      {/* Core AI Accent Pip */}
      <circle cx="12" cy="12.9" r="2.2" fill="url(#cyanCenter)" />
    </svg>
  );
}

export function AboutSparkleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <linearGradient id="pinkSparkle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
      </defs>
      {/* Primary 4-pointed Star */}
      <path
        d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
        fill="url(#purpleGlow)"
        stroke="#E9D5FF"
        strokeWidth="0.6"
      />
      {/* Secondary Companion Sparkle */}
      <path
        d="M19 2C19 4 20.5 5.5 22.5 5.5C20.5 5.5 19 7 19 9C19 7 17.5 5.5 15.5 5.5C17.5 5.5 19 4 19 2Z"
        fill="url(#pinkSparkle)"
      />
      {/* Center Core Bright Spark */}
      <circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}


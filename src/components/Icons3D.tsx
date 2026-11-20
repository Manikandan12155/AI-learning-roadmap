import React from "react";

/**
 * 3D Photorealistic / Glossy Neumorphic Navigation Icons
 * - 3D Trophy / Crown (Leaderboard)
 * - 3D Calendar with depth, bevels & page curl (Daily Slot)
 * - 3D Golden Medal with ribbon & gemstone (Certificate)
 * - 3D Sparkle / AI Crystal Diamond (About)
 * - 3D Mechanical Chrome Gear with cyan neon center (Settings)
 */

export function Icon3DLeaderboard({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="trophyCup3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </radialGradient>
        <linearGradient id="handle3D" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#713F12" />
        </linearGradient>
        <linearGradient id="base3D" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <filter id="glow3DGold" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#F59E0B" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Handles with depth */}
      <path
        d="M8 10C5 10 4 12 4 14.5C4 18 7.5 20.5 10.5 20.5H11.5V17.5H10.5C8.5 17.5 6.5 16 6.5 14.5C6.5 13 7.5 12.2 9 12.2H11V10H8ZM28 10C31 10 32 12 32 14.5C32 18 28.5 20.5 25.5 20.5H24.5V17.5H25.5C27.5 17.5 29.5 16 29.5 14.5C29.5 13 28.5 12.2 27 12.2H25V10H28Z"
        fill="url(#handle3D)"
      />

      {/* 3D Trophy Cup */}
      <path
        d="M10 6C10 5.4 10.4 5 11 5H25C25.6 5 26 5.4 26 6V15C26 19.4 22.4 23 18 23C13.6 23 10 19.4 10 15V6Z"
        fill="url(#trophyCup3D)"
        filter="url(#glow3DGold)"
      />

      {/* 3D Shiny Reflection Curve */}
      <path
        d="M12 7C12 7 13 13 14 16C15 19 16 20.5 18 21.5C14 21 11.5 18 11.5 14V7H12Z"
        fill="#FFFFFF"
        opacity="0.45"
      />

      {/* Center 3D Star Badge */}
      <polygon
        points="18,10 19.3,12.8 22.3,13.2 20.1,15.3 20.6,18.3 18,16.8 15.4,18.3 15.9,15.3 13.7,13.2 16.7,12.8"
        fill="#FFFBEB"
      />

      {/* Stem */}
      <rect x="16" y="23" width="4" height="4" rx="1" fill="url(#handle3D)" />

      {/* 3D Pedestal Base */}
      <path d="M12 27H24L26 31H10L12 27Z" fill="url(#base3D)" stroke="#64748B" strokeWidth="0.5" />
      {/* Golden Plaque */}
      <rect x="14" y="28.5" width="8" height="1.8" rx="0.9" fill="#FDE047" />
    </svg>
  );
}

export function Icon3DCalendar({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="calBody3D" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="85%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <linearGradient id="calRedTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="calWhitePad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <filter id="shadowCal" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#1E40AF" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Main 3D Card Base */}
      <rect
        x="5"
        y="6"
        width="26"
        height="25"
        rx="5"
        fill="url(#calBody3D)"
        filter="url(#shadowCal)"
        stroke="#93C5FD"
        strokeWidth="0.6"
      />

      {/* Red Top Binding Header */}
      <path
        d="M5 11C5 8.2 7.2 6 10 6H26C28.8 6 31 8.2 31 11V13H5V11Z"
        fill="url(#calRedTop)"
      />

      {/* 3D Ring Binders */}
      <rect x="10" y="3.5" width="3" height="5" rx="1.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="23" y="3.5" width="3" height="5" rx="1.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />

      {/* White Date Pad Sheet */}
      <rect x="8.5" y="15.5" width="19" height="13" rx="3" fill="url(#calWhitePad)" />

      {/* Dynamic Date Number "30" with soft 3D gradient */}
      <text
        x="18"
        y="25.5"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="800"
        fontFamily="sans-serif"
        fill="#1E3A8A"
      >
        30
      </text>

      {/* Min Min label */}
      <text
        x="18"
        y="18.5"
        textAnchor="middle"
        fontSize="3.8"
        fontWeight="bold"
        fontFamily="sans-serif"
        fill="#EF4444"
      >
        MIN
      </text>
    </svg>
  );
}

export function Icon3DCertificate({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="certGold3D" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
        <linearGradient id="ribbonRed3D" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#F59E0B" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Hanging Ribbons */}
      <path d="M13 22L10 32L18 28.5L26 32L23 22" fill="url(#ribbonRed3D)" />
      <path d="M14.5 22L12 30L18 27.5L24 30L21.5 22" fill="#B91C1C" opacity="0.6" />

      {/* 3D Outer Gold Medallion with bevel */}
      <circle cx="18" cy="15" r="12" fill="url(#certGold3D)" filter="url(#goldGlow)" stroke="#92400E" strokeWidth="0.8" />

      {/* Beveled Ring */}
      <circle cx="18" cy="15" r="9.5" fill="#0F172A" stroke="#FDE047" strokeWidth="1" />

      {/* Inner Emerald / AI Diamond Shield */}
      <polygon
        points="18,9 22.5,13.5 18,21 13.5,13.5"
        fill="#34D399"
        stroke="#A7F3D0"
        strokeWidth="0.7"
      />
      {/* Facet Light */}
      <polygon points="18,9 22.5,13.5 18,14.5" fill="#A7F3D0" opacity="0.6" />
    </svg>
  );
}

export function Icon3DAbout({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="crystal3D" cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#F5D0FE" />
          <stop offset="35%" stopColor="#C084FC" />
          <stop offset="70%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#581C87" />
        </radialGradient>
        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#A855F7" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Main 4-Point 3D Starburst */}
      <path
        d="M18 3C18 11.3 24.7 18 33 18C24.7 18 18 24.7 18 33C18 24.7 11.3 18 3 18C11.3 18 18 11.3 18 3Z"
        fill="url(#crystal3D)"
        filter="url(#purpleGlow)"
        stroke="#E9D5FF"
        strokeWidth="0.8"
      />

      {/* Top-Right Mini Floating 3D Sparkle */}
      <path
        d="M28 4C28 7 30 9 33 9C30 9 28 11 28 14C28 11 26 9 23 9C26 9 28 7 28 4Z"
        fill="#F472B6"
      />

      {/* Pure White Central Core Highlight */}
      <circle cx="18" cy="18" r="3" fill="#FFFFFF" />
      <circle cx="16.5" cy="16.5" r="1.2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

export function Icon3DSettings({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="chrome3D" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="30%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <radialGradient id="neonCyanCore" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="45%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#083344" />
        </radialGradient>
        <filter id="gearShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* 3D Chrome Gear Body */}
      <path
        d="M15.5 3.5H20.5L21.4 7C22.2 7.3 23 7.7 23.8 8.2L27 6.8L30.5 10.3L29.1 13.5C29.6 14.3 30 15.1 30.3 15.9L33.8 16.8V21.8L30.3 22.7C30 23.5 29.6 24.3 29.1 25.1L30.5 28.3L27 31.8L23.8 30.4C23 30.9 22.2 31.3 21.4 31.6L20.5 35.1H15.5L14.6 31.6C13.8 31.3 13 30.9 12.2 30.4L9 31.8L5.5 28.3L6.9 25.1C6.4 24.3 6 23.5 5.7 22.7L2.2 21.8V16.8L5.7 15.9C6 15.1 6.4 14.3 6.9 13.5L5.5 10.3L9 6.8L12.2 8.2C13 7.7 13.8 7.3 14.6 7L15.5 3.5Z"
        fill="url(#chrome3D)"
        filter="url(#gearShadow)"
        stroke="#475569"
        strokeWidth="0.8"
      />

      {/* Deep Center Hole */}
      <circle cx="18" cy="19.3" r="6.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.2" />

      {/* Glowing Neon Cyan Core */}
      <circle cx="18" cy="19.3" r="3.2" fill="url(#neonCyanCore)" />
      <circle cx="16.8" cy="18" r="1.1" fill="#FFFFFF" opacity="0.75" />
    </svg>
  );
}


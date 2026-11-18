import { useEffect, useRef, useState } from "react";

export function InteractiveAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetAngle, setTargetAngle] = useState(0);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height * 0.42;

      const deltaX = e.clientX - headCenterX;
      const deltaY = e.clientY - headCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Clamp pupil distance (subtle, realistic eye tracking)
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 45, 4.5);
      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      setPupilOffset({ x: px, y: py });

      // Smooth head tilt towards cursor (-12deg to 12deg)
      const headTilt = Math.max(-12, Math.min(12, (deltaX / (window.innerWidth / 2)) * 12));
      setTargetAngle(headTilt);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Natural random blink interval
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 4200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none pointer-events-none w-full max-w-[340px] sm:max-w-[420px]"
    >
      {/* Soft Ambient Neural Glow Behind (No Box, Pure Depth) */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/25 via-emerald-500/20 to-accent/20 blur-3xl opacity-60 -z-10 animate-pulse" />

      {/* Floating 2D Tech Avatar */}
      <div
        className="w-full flex justify-center transition-transform duration-300 ease-out drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
        style={{
          transform: `rotate(${targetAngle}deg)`,
          transformOrigin: "70% 85%",
        }}
      >
        <svg
          viewBox="0 0 320 340"
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-visible"
        >
          <defs>
            {/* Skin Tone Gradient */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3c299" />
              <stop offset="60%" stopColor="#e2aa7d" />
              <stop offset="100%" stopColor="#c98a58" />
            </linearGradient>

            {/* Hair & Beard Dark Glossy Gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1822" />
              <stop offset="50%" stopColor="#120e17" />
              <stop offset="100%" stopColor="#08060b" />
            </linearGradient>

            {/* Suit Navy / Dark Charcoal Gradient */}
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16192b" />
              <stop offset="50%" stopColor="#0f111e" />
              <stop offset="100%" stopColor="#080911" />
            </linearGradient>

            {/* Cyberpunk Glasses Frame */}
            <linearGradient id="glassFrame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Glasses Lens Tint */}
            <linearGradient id="glassLens" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* ===== BODY / SUIT ===== */}
          {/* Shoulders / Suit Jacket */}
          <path
            d="M 50 340 C 60 250, 110 230, 160 230 C 210 230, 260 250, 270 340 Z"
            fill="url(#suitGrad)"
          />

          {/* White Shirt Collar */}
          <polygon points="135,230 160,280 185,230" fill="#ffffff" />
          <polygon points="120,230 145,260 135,230" fill="#e2e8f0" />
          <polygon points="200,230 175,260 185,230" fill="#e2e8f0" />

          {/* Black Tie */}
          <polygon points="152,246 168,246 164,340 156,340" fill="#0b0b12" />
          <polygon points="150,244 170,244 165,262 155,262" fill="#181824" />

          {/* Suit Lapels */}
          <path
            d="M 95 240 L 140 310 L 125 340 L 60 340 Z"
            fill="#1e2238"
            opacity="0.9"
          />
          <path
            d="M 225 240 L 180 310 L 195 340 L 260 340 Z"
            fill="#1e2238"
            opacity="0.9"
          />

          {/* ===== NECK ===== */}
          <rect x="142" y="190" width="36" height="48" rx="8" fill="url(#skinGrad)" />
          {/* Neck Shadow under chin */}
          <path d="M 142 190 Q 160 206 178 190 L 178 206 Q 160 216 142 206 Z" fill="#9c633a" opacity="0.4" />

          {/* ===== HEAD & FACE ===== */}
          {/* Head Base */}
          <path
            d="M 105 110 C 105 50, 215 50, 215 110 C 215 170, 195 205, 160 205 C 125 205, 105 170, 105 110 Z"
            fill="url(#skinGrad)"
          />

          {/* Ears */}
          <ellipse cx="102" cy="128" rx="8" ry="14" fill="url(#skinGrad)" />
          <ellipse cx="102" cy="128" rx="5" ry="9" fill="#c98a58" />
          <ellipse cx="218" cy="128" rx="8" ry="14" fill="url(#skinGrad)" />
          <ellipse cx="218" cy="128" rx="5" ry="9" fill="#c98a58" />

          {/* ===== HAIR ===== */}
          {/* Full Stylized Modern Pompadour / Fade */}
          <path
            d="M 98 108 C 96 65, 115 32, 160 28 C 205 32, 224 65, 222 108 C 218 85, 205 60, 160 58 C 115 60, 102 85, 98 108 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M 104 95 C 108 52, 140 34, 166 34 C 196 34, 218 52, 216 95 C 205 68, 185 54, 160 54 C 135 54, 115 68, 104 95 Z"
            fill="#2c2434"
          />

          {/* ===== BEARD & MUSTACHE (Exact match to profile) ===== */}
          {/* Jawline & Chin Full Neat Beard */}
          <path
            d="M 106 132 C 106 175, 130 208, 160 208 C 190 208, 214 175, 214 132 C 208 168, 185 194, 160 194 C 135 194, 112 168, 106 132 Z"
            fill="url(#hairGrad)"
          />
          {/* Mustache */}
          <path
            d="M 140 162 Q 160 156 180 162 Q 160 172 140 162 Z"
            fill="url(#hairGrad)"
          />
          {/* Soul patch under lip */}
          <polygon points="157,174 163,174 160,182" fill="url(#hairGrad)" />

          {/* Nose */}
          <path
            d="M 158 122 L 155 148 L 165 148"
            stroke="#aa6e42"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyebrows */}
          <path d="M 120 108 Q 135 104 146 110" stroke="url(#hairGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 174 110 Q 185 104 200 108" stroke="url(#hairGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* ===== EYES (INTERACTIVE TRACKING) ===== */}
          {/* Left Eye */}
          <g transform="translate(133, 118)">
            {isBlinking ? (
              <path d="M -9 0 Q 0 4 9 0" stroke="#100b16" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <ellipse cx="0" cy="0" rx="9" ry="5.5" fill="#ffffff" />
                {/* Iris & Pupil tracking cursor */}
                <circle
                  cx={pupilOffset.x}
                  cy={pupilOffset.y}
                  r="4.2"
                  fill="#241408"
                  className="transition-all duration-75"
                />
                <circle
                  cx={pupilOffset.x}
                  cy={pupilOffset.y}
                  r="2"
                  fill="#000000"
                />
                {/* Light reflection shine */}
                <circle cx={pupilOffset.x - 1.2} cy={pupilOffset.y - 1.2} r="1.2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Right Eye */}
          <g transform="translate(187, 118)">
            {isBlinking ? (
              <path d="M -9 0 Q 0 4 9 0" stroke="#100b16" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <ellipse cx="0" cy="0" rx="9" ry="5.5" fill="#ffffff" />
                {/* Iris & Pupil tracking cursor */}
                <circle
                  cx={pupilOffset.x}
                  cy={pupilOffset.y}
                  r="4.2"
                  fill="#241408"
                  className="transition-all duration-75"
                />
                <circle
                  cx={pupilOffset.x}
                  cy={pupilOffset.y}
                  r="2"
                  fill="#000000"
                />
                {/* Light reflection shine */}
                <circle cx={pupilOffset.x - 1.2} cy={pupilOffset.y - 1.2} r="1.2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* ===== SLEEK TECH / GLASSES ACCENT ===== */}
          {/* Left Lens */}
          <rect
            x="120"
            y="108"
            width="28"
            height="20"
            rx="5"
            fill="url(#glassLens)"
            stroke="url(#glassFrame)"
            strokeWidth="1.8"
          />
          {/* Right Lens */}
          <rect
            x="172"
            y="108"
            width="28"
            height="20"
            rx="5"
            fill="url(#glassLens)"
            stroke="url(#glassFrame)"
            strokeWidth="1.8"
          />
          {/* Bridge */}
          <path d="M 148 116 Q 160 112 172 116" stroke="url(#glassFrame)" strokeWidth="1.8" fill="none" />

          {/* ===== HUD / AI TECH DATA FLOATING BADGE ===== */}
          <g transform="translate(160, 315)">
            <rect
              x="-65"
              y="-12"
              width="130"
              height="24"
              rx="12"
              fill="#0b0e1b"
              stroke="#10b981"
              strokeWidth="1"
              opacity="0.9"
            />
            <circle cx="-48" cy="0" r="3.5" fill="#10b981" className="animate-ping" />
            <circle cx="-48" cy="0" r="3" fill="#10b981" />
            <text
              x="8"
              y="4"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="600"
              letterSpacing="0.05em"
            >
              MANIKANDAN · AI
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

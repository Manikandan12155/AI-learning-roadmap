import { useEffect, useRef, useState } from "react";

export function InteractiveKitten() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetAngle, setTargetAngle] = useState(0);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [pawLift, setPawLift] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - catCenterX;
      const deltaY = e.clientY - catCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Clamp pupil distance
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 30, 9);
      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      setPupilOffset({ x: px, y: py });

      // Rotate head smoothly toward mouse (-14 deg to 14 deg)
      const headTurn = Math.max(-14, Math.min(14, (deltaX / (window.innerWidth / 2)) * 14));
      setTargetAngle(headTurn);

      // Cute paw tracking if mouse gets very close
      if (Math.abs(deltaX) > 100 && deltaY < 100) {
        setPawLift(deltaX > 0 ? "right" : "left");
      } else {
        setPawLift(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Natural random blink interval
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3600);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="relative group select-none flex flex-col items-center">
      {/* Ambient Radial Glow Behind Kitten */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/25 to-pink-500/20 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

      {/* Floating Card Container */}
      <div
        ref={containerRef}
        className="relative z-10 p-4 sm:p-6 rounded-3xl bg-surface/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-primary/40 flex flex-col items-center"
      >
        <div
          className="transition-transform duration-300 ease-out flex flex-col items-center justify-end"
          style={{
            transform: `rotate(${targetAngle}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          {/* SVG GitHub Copilot Kitten */}
          <svg
            viewBox="0 0 160 120"
            className="w-48 h-36 sm:w-60 sm:h-44 md:w-72 md:h-52 drop-shadow-2xl overflow-visible"
          >
            <defs>
              {/* Body Gradient */}
              <linearGradient id="kittenBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1838" />
                <stop offset="45%" stopColor="#2c2250" />
                <stop offset="100%" stopColor="#432f7a" />
              </linearGradient>

              {/* Face highlight Gradient */}
              <linearGradient id="kittenFace" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5b8c9" />
                <stop offset="60%" stopColor="#f39db8" />
                <stop offset="100%" stopColor="#e57a9f" />
              </linearGradient>

              {/* Eye Outer Glow Gradient */}
              <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>

              {/* Ear Inner Pink */}
              <linearGradient id="earPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb3c6" />
                <stop offset="100%" stopColor="#f77fbe" />
              </linearGradient>
            </defs>

            {/* Left Ear Outer */}
            <polygon points="26,45 10,6 52,24" fill="#1e1838" />
            {/* Left Ear Inner */}
            <polygon points="26,38 16,14 46,24" fill="url(#earPink)" />

            {/* Right Ear Outer */}
            <polygon points="134,45 150,6 108,24" fill="#1e1838" />
            {/* Right Ear Inner */}
            <polygon points="134,38 144,14 114,24" fill="url(#earPink)" />

            {/* Head Shape */}
            <path
              d="M 22 55 C 20 28, 140 28, 138 55 C 140 85, 128 108, 80 108 C 32 108, 20 85, 22 55 Z"
              fill="url(#kittenBody)"
            />

            {/* Face Cream / Blush Area */}
            <path
              d="M 32 58 C 30 42, 130 42, 128 58 C 130 82, 118 98, 80 98 C 42 98, 30 82, 32 58 Z"
              fill="url(#kittenFace)"
            />

            {/* Cute Cheeks blush */}
            <ellipse cx="44" cy="74" rx="9" ry="4.5" fill="#ff4d79" opacity="0.45" />
            <ellipse cx="116" cy="74" rx="9" ry="4.5" fill="#ff4d79" opacity="0.45" />

            {/* Left Eye */}
            <g transform="translate(56, 62)">
              {isBlinking ? (
                <path d="M -15 0 Q 0 9 15 0" stroke="#181328" strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : (
                <>
                  <circle cx="0" cy="0" r="15" fill="#131024" />
                  <circle cx="0" cy="0" r="13" fill="url(#eyeGlow)" />
                  <circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="8"
                    fill="#0d0a1a"
                    className="transition-all duration-75"
                  />
                  <circle cx={pupilOffset.x - 3.5} cy={pupilOffset.y - 3.5} r="3.2" fill="#ffffff" />
                  <circle cx={pupilOffset.x + 3.5} cy={pupilOffset.y + 3} r="1.6" fill="#ffffff" />
                </>
              )}
            </g>

            {/* Right Eye */}
            <g transform="translate(104, 62)">
              {isBlinking ? (
                <path d="M -15 0 Q 0 9 15 0" stroke="#181328" strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : (
                <>
                  <circle cx="0" cy="0" r="15" fill="#131024" />
                  <circle cx="0" cy="0" r="13" fill="url(#eyeGlow)" />
                  <circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="8"
                    fill="#0d0a1a"
                    className="transition-all duration-75"
                  />
                  <circle cx={pupilOffset.x - 3.5} cy={pupilOffset.y - 3.5} r="3.2" fill="#ffffff" />
                  <circle cx={pupilOffset.x + 3.5} cy={pupilOffset.y + 3} r="1.6" fill="#ffffff" />
                </>
              )}
            </g>

            {/* Tiny Nose */}
            <path d="M 76 71 L 84 71 L 80 75.5 Z" fill="#80264b" />

            {/* Kitten Mouth :3 */}
            <path
              d="M 73 76 Q 80 82 80 76 Q 80 82 87 76"
              stroke="#47142a"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Paws on the edge */}
            {/* Left Paw */}
            <g
              className="transition-transform duration-200"
              style={{
                transform: pawLift === "left" ? "translateY(-8px)" : "translateY(0px)",
              }}
            >
              <ellipse cx="46" cy="106" rx="15" ry="9" fill="#201a3c" />
              <ellipse cx="46" cy="104" rx="13" ry="7" fill="#f5b8c9" />
              <circle cx="40" cy="103" r="2.5" fill="#e57a9f" />
              <circle cx="46" cy="100.5" r="2.8" fill="#e57a9f" />
              <circle cx="52" cy="103" r="2.5" fill="#e57a9f" />
            </g>

            {/* Right Paw */}
            <g
              className="transition-transform duration-200"
              style={{
                transform: pawLift === "right" ? "translateY(-8px)" : "translateY(0px)",
              }}
            >
              <ellipse cx="114" cy="106" rx="15" ry="9" fill="#201a3c" />
              <ellipse cx="114" cy="104" rx="13" ry="7" fill="#f5b8c9" />
              <circle cx="108" cy="103" r="2.5" fill="#e57a9f" />
              <circle cx="114" cy="100.5" r="2.8" fill="#e57a9f" />
              <circle cx="120" cy="103" r="2.5" fill="#e57a9f" />
            </g>
          </svg>
        </div>

        {/* Status Badge below Kitten */}
        <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-background/60 border border-white/5 font-mono text-[11px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Tracking your learning cursor</span>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

export function InteractiveKitten() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0, rotate: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - catCenterX;
      const deltaY = e.clientY - catCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Smooth eye tracking distance
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 25, 9);
      const ex = Math.cos(angle) * dist;
      const ey = Math.sin(angle) * dist;
      setEyeOffset({ x: ex, y: ey });

      // Natural 3D head rotation tracking mouse
      const rotZ = Math.max(-14, Math.min(14, (deltaX / (window.innerWidth / 2)) * 14));
      const rotX = Math.max(-10, Math.min(10, -(deltaY / (window.innerHeight / 2)) * 10));
      const rotY = Math.max(-16, Math.min(16, (deltaX / (window.innerWidth / 2)) * 16));
      setHeadTilt({ x: rotX, y: rotY, rotate: rotZ });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Natural random blink interval
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none pointer-events-auto py-2"
    >
      {/* Soft Ambient Radial Glow Behind Kitten (No harsh border/box) */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/20 via-accent/25 to-pink-500/20 blur-3xl opacity-60 pointer-events-none" />

      {/* Floating Interactive Kitten */}
      <div
        className="relative z-10 transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `perspective(600px) rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg) rotateZ(${headTilt.rotate}deg)`,
          transformOrigin: "center bottom",
        }}
      >
        <svg
          viewBox="0 0 180 150"
          className="w-64 h-52 sm:w-80 sm:h-64 md:w-96 md:h-76 drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] overflow-visible"
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

          {/* Left Ear */}
          <polygon points="32,60 14,14 65,36" fill="#1e1838" />
          <polygon points="33,52 21,24 57,36" fill="url(#earPink)" />

          {/* Right Ear */}
          <polygon points="148,60 166,14 115,36" fill="#1e1838" />
          <polygon points="147,52 159,24 123,36" fill="url(#earPink)" />

          {/* Kitten Head Shape */}
          <path
            d="M 28 72 C 25 38, 155 38, 152 72 C 155 110, 140 138, 90 138 C 40 138, 25 110, 28 72 Z"
            fill="url(#kittenBody)"
          />

          {/* Face Cream / Blush Area */}
          <path
            d="M 38 74 C 36 54, 144 54, 142 74 C 144 105, 130 125, 90 125 C 50 125, 36 105, 38 74 Z"
            fill="url(#kittenFace)"
          />

          {/* Cute Cheeks blush */}
          <ellipse cx="50" cy="94" rx="10" ry="5" fill="#ff4d79" opacity="0.45" />
          <ellipse cx="130" cy="94" rx="10" ry="5" fill="#ff4d79" opacity="0.45" />

          {/* LEFT EYE */}
          <g transform="translate(64, 80)">
            {isBlinking ? (
              <path d="M -16 0 Q 0 10 16 0" stroke="#181328" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            ) : (
              <>
                <circle cx="0" cy="0" r="16" fill="#131024" />
                <circle cx="0" cy="0" r="14" fill="url(#eyeGlow)" />
                <circle
                  cx={eyeOffset.x}
                  cy={eyeOffset.y}
                  r="8.5"
                  fill="#0d0a1a"
                  className="transition-all duration-75"
                />
                <circle cx={eyeOffset.x - 3.5} cy={eyeOffset.y - 3.5} r="3.5" fill="#ffffff" />
                <circle cx={eyeOffset.x + 3.5} cy={eyeOffset.y + 3} r="1.8" fill="#ffffff" />
              </>
            )}
          </g>

          {/* RIGHT EYE */}
          <g transform="translate(116, 80)">
            {isBlinking ? (
              <path d="M -16 0 Q 0 10 16 0" stroke="#181328" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            ) : (
              <>
                <circle cx="0" cy="0" r="16" fill="#131024" />
                <circle cx="0" cy="0" r="14" fill="url(#eyeGlow)" />
                <circle
                  cx={eyeOffset.x}
                  cy={eyeOffset.y}
                  r="8.5"
                  fill="#0d0a1a"
                  className="transition-all duration-75"
                />
                <circle cx={eyeOffset.x - 3.5} cy={eyeOffset.y - 3.5} r="3.5" fill="#ffffff" />
                <circle cx={eyeOffset.x + 3.5} cy={eyeOffset.y + 3} r="1.8" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Tiny Nose */}
          <path d="M 86 91 L 94 91 L 90 96 Z" fill="#80264b" />

          {/* Kitten Mouth :3 */}
          <path
            d="M 83 97 Q 90 103 90 97 Q 90 103 97 97"
            stroke="#47142a"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Floating Cute Paws */}
          <ellipse cx="56" cy="136" rx="14" ry="8" fill="#201a3c" />
          <ellipse cx="56" cy="134" rx="12" ry="6" fill="#f5b8c9" />
          <circle cx="51" cy="133" r="2.2" fill="#e57a9f" />
          <circle cx="56" cy="131" r="2.5" fill="#e57a9f" />
          <circle cx="61" cy="133" r="2.2" fill="#e57a9f" />

          <ellipse cx="124" cy="136" rx="14" ry="8" fill="#201a3c" />
          <ellipse cx="124" cy="134" rx="12" ry="6" fill="#f5b8c9" />
          <circle cx="119" cy="133" r="2.2" fill="#e57a9f" />
          <circle cx="124" cy="131" r="2.5" fill="#e57a9f" />
          <circle cx="129" cy="133" r="2.2" fill="#e57a9f" />
        </svg>
      </div>
    </div>
  );
}

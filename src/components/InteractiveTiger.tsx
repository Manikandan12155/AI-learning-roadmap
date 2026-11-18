import { useEffect, useRef, useState } from "react";

export function InteractiveTiger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0, rotate: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const tigerCenterX = rect.left + rect.width / 2;
      const tigerCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - tigerCenterX;
      const deltaY = e.clientY - tigerCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Smooth eye & pupil tracking distance
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 25, 9);
      const ex = Math.cos(angle) * dist;
      const ey = Math.sin(angle) * dist;
      setEyeOffset({ x: ex, y: ey });

      // Natural 3D head rotation following cursor
      const rotZ = Math.max(-14, Math.min(14, (deltaX / (window.innerWidth / 2)) * 14));
      const rotX = Math.max(-10, Math.min(10, -(deltaY / (window.innerHeight / 2)) * 10));
      const rotY = Math.max(-18, Math.min(18, (deltaX / (window.innerWidth / 2)) * 18));
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
      {/* Warm Golden/Cyan Ambient Radial Glow */}
      <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/25 to-emerald-400/20 blur-3xl opacity-60 pointer-events-none" />

      {/* Floating Interactive 3D Baby Tiger */}
      <div
        className="relative z-10 transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `perspective(600px) rotateX(${headTilt.x}deg) rotateY(${headTilt.y}deg) rotateZ(${headTilt.rotate}deg)`,
          transformOrigin: "center bottom",
        }}
      >
        <svg
          viewBox="0 0 200 170"
          className="w-72 h-60 sm:w-88 sm:h-72 md:w-[400px] md:h-[320px] drop-shadow-[0_30px_55px_rgba(0,0,0,0.7)] overflow-visible"
        >
          <defs>
            {/* 3D Fur Shading Gradient - Golden Vibrant Orange */}
            <radialGradient id="tigerBody3D" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffb347" />
              <stop offset="45%" stopColor="#ff8c00" />
              <stop offset="85%" stopColor="#e65100" />
              <stop offset="100%" stopColor="#b33900" />
            </radialGradient>

            {/* Ear Inner Pink */}
            <linearGradient id="tigerEarPink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffb6c1" />
              <stop offset="100%" stopColor="#f48fb1" />
            </linearGradient>

            {/* Tiger Face Muzzle Cream Gradient */}
            <linearGradient id="muzzleCream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#fff3e0" />
              <stop offset="100%" stopColor="#ffe0b2" />
            </linearGradient>

            {/* Big Expressive Anime 3D Eyes */}
            <radialGradient id="tigerEyeRing" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="40%" stopColor="#34d399" />
              <stop offset="85%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </radialGradient>

            {/* Nose 3D Gradient */}
            <linearGradient id="tigerNose" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>

          {/* LEFT EAR (Round Cute Tiger Ear) */}
          <g>
            <circle cx="44" cy="46" r="24" fill="#d84315" />
            <circle cx="44" cy="46" r="21" fill="url(#tigerBody3D)" />
            {/* White ear border tip */}
            <path d="M 28 32 Q 44 26 58 35" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Ear Inner Pink */}
            <circle cx="46" cy="48" r="13" fill="url(#tigerEarPink)" />
            {/* Ear black marking */}
            <path d="M 28 44 Q 38 46 42 54" stroke="#212121" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          {/* RIGHT EAR */}
          <g>
            <circle cx="156" cy="46" r="24" fill="#d84315" />
            <circle cx="156" cy="46" r="21" fill="url(#tigerBody3D)" />
            {/* White ear border tip */}
            <path d="M 172 32 Q 156 26 142 35" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Ear Inner Pink */}
            <circle cx="154" cy="48" r="13" fill="url(#tigerEarPink)" />
            {/* Ear black marking */}
            <path d="M 172 44 Q 162 46 158 54" stroke="#212121" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          {/* MAIN 3D TIGER HEAD */}
          <ellipse cx="100" cy="94" rx="68" ry="56" fill="url(#tigerBody3D)" />

          {/* Cheek Tufts (Cute fluffy fur cheeks) */}
          <path d="M 33 90 Q 18 96 26 106 Q 16 112 30 118 Q 42 122 50 118" fill="url(#tigerBody3D)" />
          <path d="M 167 90 Q 182 96 174 106 Q 184 112 170 118 Q 158 122 150 118" fill="url(#tigerBody3D)" />

          {/* ICONIC TIGER STRIPES (Bold, Stylish & Symmetrical) */}
          {/* Forehead Center Stripes (The King/Wang 王 marking) */}
          <g fill="#212121">
            {/* Top stripe */}
            <path d="M 94 48 L 106 48 L 100 58 Z" />
            {/* Horizontal bar 1 */}
            <path d="M 86 58 Q 100 55 114 58 Q 100 60 86 58 Z" />
            {/* Center vertical bar */}
            <path d="M 97 58 L 103 58 L 102 70 L 98 70 Z" />
            {/* Horizontal bar 2 */}
            <path d="M 88 68 Q 100 65 112 68 Q 100 70 88 68 Z" />

            {/* Left Forehead Stripes */}
            <path d="M 58 58 Q 72 65 78 72 Q 70 70 56 64 Z" />
            <path d="M 46 72 Q 62 76 68 83 Q 58 82 44 76 Z" />

            {/* Right Forehead Stripes */}
            <path d="M 142 58 Q 128 65 122 72 Q 130 70 144 64 Z" />
            <path d="M 154 72 Q 138 76 132 83 Q 142 82 156 76 Z" />

            {/* Cheek Stripes */}
            <path d="M 36 94 Q 48 97 54 100 Q 46 102 34 98 Z" />
            <path d="M 38 106 Q 50 108 55 110 Q 48 113 36 110 Z" />
            <path d="M 164 94 Q 152 97 146 100 Q 154 102 166 98 Z" />
            <path d="M 162 106 Q 150 108 145 110 Q 152 113 164 110 Z" />
          </g>

          {/* CUTE WHITE MUZZLE / CHIN AREA */}
          <path
            d="M 64 98 C 62 82, 138 82, 136 98 C 138 126, 124 142, 100 142 C 76 142, 62 126, 64 98 Z"
            fill="url(#muzzleCream)"
          />

          {/* Cute Rosy Cheeks */}
          <ellipse cx="60" cy="108" rx="10" ry="5.5" fill="#f43f5e" opacity="0.38" />
          <ellipse cx="140" cy="108" rx="10" ry="5.5" fill="#f43f5e" opacity="0.38" />

          {/* LEFT 3D EMERALD EYE (Tracks Mouse) */}
          <g transform="translate(73, 90)">
            {isBlinking ? (
              <path d="M -16 0 Q 0 11 16 0" stroke="#1c1917" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            ) : (
              <>
                {/* Sclera & Shadow */}
                <circle cx="0" cy="0" r="17" fill="#0f172a" />
                <circle cx="0" cy="0" r="15" fill="url(#tigerEyeRing)" />
                {/* Eye reflection / depth ring */}
                <circle cx="0" cy="0" r="12" fill="none" stroke="#6ee7b7" strokeWidth="1.2" opacity="0.6" />
                {/* Pupil Tracking Mouse */}
                <circle
                  cx={eyeOffset.x}
                  cy={eyeOffset.y}
                  r="8.5"
                  fill="#09090b"
                  className="transition-all duration-75"
                />
                {/* 3D Glass Highlights */}
                <circle cx={eyeOffset.x - 3.8} cy={eyeOffset.y - 3.8} r="3.8" fill="#ffffff" />
                <circle cx={eyeOffset.x + 3.8} cy={eyeOffset.y + 3.2} r="1.8" fill="#ffffff" />
              </>
            )}
          </g>

          {/* RIGHT 3D EMERALD EYE (Tracks Mouse) */}
          <g transform="translate(127, 90)">
            {isBlinking ? (
              <path d="M -16 0 Q 0 11 16 0" stroke="#1c1917" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            ) : (
              <>
                {/* Sclera & Shadow */}
                <circle cx="0" cy="0" r="17" fill="#0f172a" />
                <circle cx="0" cy="0" r="15" fill="url(#tigerEyeRing)" />
                {/* Eye reflection / depth ring */}
                <circle cx="0" cy="0" r="12" fill="none" stroke="#6ee7b7" strokeWidth="1.2" opacity="0.6" />
                {/* Pupil Tracking Mouse */}
                <circle
                  cx={eyeOffset.x}
                  cy={eyeOffset.y}
                  r="8.5"
                  fill="#09090b"
                  className="transition-all duration-75"
                />
                {/* 3D Glass Highlights */}
                <circle cx={eyeOffset.x - 3.8} cy={eyeOffset.y - 3.8} r="3.8" fill="#ffffff" />
                <circle cx={eyeOffset.x + 3.8} cy={eyeOffset.y + 3.2} r="1.8" fill="#ffffff" />
              </>
            )}
          </g>

          {/* CUTE 3D NOSE */}
          <path
            d="M 93 103 Q 100 101 107 103 Q 100 112 93 103 Z"
            fill="url(#tigerNose)"
          />
          <ellipse cx="100" cy="103.5" rx="3.5" ry="1.5" fill="#ffffff" opacity="0.6" />

          {/* TIGER MOUTH :3 */}
          <path
            d="M 91 110 Q 100 116 100 110 Q 100 116 109 110"
            stroke="#431407"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Cute Whiskers */}
          <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
            <line x1="56" y1="112" x2="32" y2="108" />
            <line x1="56" y1="117" x2="34" y2="119" />
            <line x1="144" y1="112" x2="168" y2="108" />
            <line x1="144" y1="117" x2="166" y2="119" />
          </g>

          {/* FLOATING 3D TIGER PAWS */}
          {/* Left Paw */}
          <g>
            <ellipse cx="64" cy="144" rx="17" ry="11" fill="#e65100" />
            <ellipse cx="64" cy="142" rx="15" ry="9" fill="#ffb74d" />
            <ellipse cx="64" cy="142" rx="12" ry="7" fill="#fff3e0" />
            {/* Paw Beans Pink */}
            <circle cx="58" cy="141" r="2.8" fill="#f472b6" />
            <circle cx="64" cy="138" r="3.2" fill="#f472b6" />
            <circle cx="70" cy="141" r="2.8" fill="#f472b6" />
          </g>

          {/* Right Paw */}
          <g>
            <ellipse cx="136" cy="144" rx="17" ry="11" fill="#e65100" />
            <ellipse cx="136" cy="142" rx="15" ry="9" fill="#ffb74d" />
            <ellipse cx="136" cy="142" rx="12" ry="7" fill="#fff3e0" />
            {/* Paw Beans Pink */}
            <circle cx="130" cy="141" r="2.8" fill="#f472b6" />
            <circle cx="136" cy="138" r="3.2" fill="#f472b6" />
            <circle cx="142" cy="141" r="2.8" fill="#f472b6" />
          </g>
        </svg>
      </div>
    </div>
  );
}

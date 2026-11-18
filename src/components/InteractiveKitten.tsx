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
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 35, 7);
      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      setPupilOffset({ x: px, y: py });

      // Rotate head slightly toward mouse (-12 deg to 12 deg)
      const headTurn = Math.max(-12, Math.min(12, (deltaX / (window.innerWidth / 2)) * 12));
      setTargetAngle(headTurn);

      // Cute paw tracking if mouse gets very close to left or right
      if (Math.abs(deltaX) > 80 && deltaY < 80) {
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
    }, 3800);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-end select-none pointer-events-auto transition-transform duration-300 ease-out"
      style={{
        transform: `rotate(${targetAngle}deg)`,
        transformOrigin: "bottom center",
      }}
    >
      {/* SVG GitHub Copilot Kitten */}
      <svg
        viewBox="0 0 160 120"
        className="w-32 h-24 sm:w-40 sm:h-28 drop-shadow-2xl overflow-visible"
      >
        <defs>
          {/* Body Gradient - Deep GitHub Indigo / Purple */}
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

        {/* Ears */}
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
        <ellipse cx="44" cy="74" rx="8" ry="4" fill="#ff4d79" opacity="0.45" />
        <ellipse cx="116" cy="74" rx="8" ry="4" fill="#ff4d79" opacity="0.45" />

        {/* Left Eye */}
        <g transform="translate(56, 62)">
          {isBlinking ? (
            <path d="M -14 0 Q 0 8 14 0" stroke="#181328" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          ) : (
            <>
              {/* Sclera / Big round anime eye */}
              <circle cx="0" cy="0" r="14" fill="#131024" />
              {/* Eye Color Ring */}
              <circle cx="0" cy="0" r="12" fill="url(#eyeGlow)" />
              {/* Pupil tracking mouse */}
              <circle
                cx={pupilOffset.x}
                cy={pupilOffset.y}
                r="7.5"
                fill="#0d0a1a"
                className="transition-all duration-75"
              />
              {/* Highlights */}
              <circle cx={pupilOffset.x - 3} cy={pupilOffset.y - 3} r="3" fill="#ffffff" />
              <circle cx={pupilOffset.x + 3} cy={pupilOffset.y + 2.5} r="1.5" fill="#ffffff" />
            </>
          )}
        </g>

        {/* Right Eye */}
        <g transform="translate(104, 62)">
          {isBlinking ? (
            <path d="M -14 0 Q 0 8 14 0" stroke="#181328" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          ) : (
            <>
              {/* Sclera */}
              <circle cx="0" cy="0" r="14" fill="#131024" />
              {/* Eye Color Ring */}
              <circle cx="0" cy="0" r="12" fill="url(#eyeGlow)" />
              {/* Pupil tracking mouse */}
              <circle
                cx={pupilOffset.x}
                cy={pupilOffset.y}
                r="7.5"
                fill="#0d0a1a"
                className="transition-all duration-75"
              />
              {/* Highlights */}
              <circle cx={pupilOffset.x - 3} cy={pupilOffset.y - 3} r="3" fill="#ffffff" />
              <circle cx={pupilOffset.x + 3} cy={pupilOffset.y + 2.5} r="1.5" fill="#ffffff" />
            </>
          )}
        </g>

        {/* Tiny Cute Nose */}
        <path d="M 77 71 L 83 71 L 80 75 Z" fill="#80264b" />

        {/* Kitten Mouth :3 */}
        <path
          d="M 74 76 Q 80 81 80 76 Q 80 81 86 76"
          stroke="#47142a"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Paws on the edge */}
        {/* Left Paw */}
        <g
          className="transition-transform duration-200"
          style={{
            transform: pawLift === "left" ? "translateY(-6px)" : "translateY(0px)",
          }}
        >
          <ellipse cx="46" cy="106" rx="14" ry="9" fill="#201a3c" />
          <ellipse cx="46" cy="104" rx="12" ry="7" fill="#f5b8c9" />
          {/* Paw beans */}
          <circle cx="41" cy="103" r="2.2" fill="#e57a9f" />
          <circle cx="46" cy="101" r="2.5" fill="#e57a9f" />
          <circle cx="51" cy="103" r="2.2" fill="#e57a9f" />
        </g>

        {/* Right Paw */}
        <g
          className="transition-transform duration-200"
          style={{
            transform: pawLift === "right" ? "translateY(-6px)" : "translateY(0px)",
          }}
        >
          <ellipse cx="114" cy="106" rx="14" ry="9" fill="#201a3c" />
          <ellipse cx="114" cy="104" rx="12" ry="7" fill="#f5b8c9" />
          {/* Paw beans */}
          <circle cx="109" cy="103" r="2.2" fill="#e57a9f" />
          <circle cx="114" cy="101" r="2.5" fill="#e57a9f" />
          <circle cx="119" cy="103" r="2.2" fill="#e57a9f" />
        </g>
      </svg>
    </div>
  );
}

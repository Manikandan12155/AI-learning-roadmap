import { useEffect, useRef, useState } from "react";
import tigerImg from "@/assets/tiger-cropped.png";

export function InteractiveTiger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Scaled coordinates based on 444x362 natural tiger size
      // Left eye center roughly at 40% width, 52% height
      // Right eye center roughly at 62% width, 58% height
      const leftEyeCenterX = rect.left + rect.width * 0.40;
      const leftEyeCenterY = rect.top + rect.height * 0.52;

      const rightEyeCenterX = rect.left + rect.width * 0.62;
      const rightEyeCenterY = rect.top + rect.height * 0.58;

      // Left eye vector
      const dlX = e.clientX - leftEyeCenterX;
      const dlY = e.clientY - leftEyeCenterY;
      const angleL = Math.atan2(dlY, dlX);
      const distL = Math.min(Math.hypot(dlX, dlY) / 28, 8.5);

      setLeftPupil({
        x: Math.cos(angleL) * distL,
        y: Math.sin(angleL) * distL,
      });

      // Right eye vector
      const drX = e.clientX - rightEyeCenterX;
      const drY = e.clientY - rightEyeCenterY;
      const angleR = Math.atan2(drY, drX);
      const distR = Math.min(Math.hypot(drX, drY) / 28, 9.5);

      setRightPupil({
        x: Math.cos(angleR) * distR,
        y: Math.sin(angleR) * distR,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Occasional realistic cat blink
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);

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
      {/* Soft Ambient Radial Glow Behind Tiger */}
      <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-500/20 to-emerald-400/20 blur-3xl opacity-60 pointer-events-none" />

      {/* Main Container - Exact aspect ratio 444:362 */}
      <div className="relative w-72 h-[235px] sm:w-88 sm:h-[287px] md:w-[400px] md:h-[326px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]">
        {/* Base Tiger Image */}
        <img
          src={tigerImg}
          alt="Cute 3D Tiger"
          className="w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Dynamic Eye Overlays (Body doesn't move, only eyes track mouse!) */}
        {/* LEFT EYE OVERLAY */}
        <div
          className="absolute rounded-full overflow-hidden transition-opacity duration-150"
          style={{
            left: "32.5%",
            top: "42.5%",
            width: "16.5%",
            height: "21.5%",
            transform: "rotate(-10deg)",
            opacity: isBlinking ? 0 : 1,
          }}
        >
          {/* Emerald Sclera / Base */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] shadow-inner flex items-center justify-center">
            {/* Pupil Tracking Mouse */}
            <div
              className="absolute w-[56%] h-[56%] rounded-full bg-[#0a0a0f] flex items-center justify-center transition-transform duration-75 ease-out shadow-md"
              style={{
                transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
              }}
            >
              {/* Primary Glint / Highlight */}
              <div className="absolute top-[18%] left-[20%] w-[38%] h-[38%] rounded-full bg-white opacity-95" />
              {/* Secondary Tiny Sparkle */}
              <div className="absolute bottom-[20%] right-[22%] w-[20%] h-[20%] rounded-full bg-white opacity-85" />
            </div>
            {/* Lens Reflection Overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT EYE OVERLAY */}
        <div
          className="absolute rounded-full overflow-hidden transition-opacity duration-150"
          style={{
            left: "54.2%",
            top: "47.5%",
            width: "18.5%",
            height: "23.5%",
            transform: "rotate(-12deg)",
            opacity: isBlinking ? 0 : 1,
          }}
        >
          {/* Emerald Sclera / Base */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] shadow-inner flex items-center justify-center">
            {/* Pupil Tracking Mouse */}
            <div
              className="absolute w-[56%] h-[56%] rounded-full bg-[#0a0a0f] flex items-center justify-center transition-transform duration-75 ease-out shadow-md"
              style={{
                transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
              }}
            >
              {/* Primary Glint / Highlight */}
              <div className="absolute top-[18%] left-[20%] w-[38%] h-[38%] rounded-full bg-white opacity-95" />
              {/* Secondary Tiny Sparkle */}
              <div className="absolute bottom-[20%] right-[22%] w-[20%] h-[20%] rounded-full bg-white opacity-85" />
            </div>
            {/* Lens Reflection Overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Eyelid Blink Overlay (Smooth Blink) */}
        {isBlinking && (
          <>
            <div
              className="absolute bg-[#e65100] rounded-full"
              style={{
                left: "32%",
                top: "51%",
                width: "17%",
                height: "5px",
                transform: "rotate(-10deg)",
              }}
            />
            <div
              className="absolute bg-[#e65100] rounded-full"
              style={{
                left: "54%",
                top: "57%",
                width: "19%",
                height: "5px",
                transform: "rotate(-12deg)",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

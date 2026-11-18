import { useEffect, useRef, useState } from "react";
import avatarImg from "@/assets/manikandan-avatar.png";

export function InteractiveAvatar() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // 3D Parallax tilt (-14 deg to 14 deg)
      setRotate({
        x: Math.max(-14, Math.min(14, -deltaY * 14)),
        y: Math.max(-14, Math.min(14, deltaX * 14)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center justify-center select-none w-full max-w-[340px] sm:max-w-[420px]"
    >
      {/* High-Tech Radial Neural Aura (No Box Border, Pure Floating Feel) */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/30 via-emerald-500/25 to-accent/20 blur-3xl opacity-70 -z-10 animate-pulse pointer-events-none" />

      {/* Floating 3D Interactive Perspective Wrapper */}
      <div
        className="w-full flex flex-col items-center justify-center transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <img
          src={avatarImg}
          alt="Manikandan - AI Systems Engineer"
          className="w-64 sm:w-80 md:w-96 object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] filter brightness-105 contrast-105"
        />

        {/* Minimalist Floating Futuristic Badge */}
        <div className="mt-2 flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface/70 backdrop-blur-md border border-white/10 font-mono text-[11px] text-muted-foreground shadow-lg">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-foreground font-semibold tracking-wide">MANIKANDAN</span>
          <span className="text-xs text-primary font-bold">/</span>
          <span>CREATOR</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";

export function NeuralNetworkVideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // AI Neural Nodes structure
    interface NeuralNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
      color: string;
      tier: number; // 0: input, 1: hidden, 2: output
    }

    interface SynapseSignal {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
    }

    let nodes: NeuralNode[] = [];
    let signals: SynapseSignal[] = [];

    const NEON_PALETTE = ["#34C759", "#10B981", "#06B6D4", "#38BDF8", "#6366F1"];

    const initNodes = () => {
      nodes = [];
      signals = [];
      const count = Math.min(Math.floor((width * height) / 11000), 120);

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          radius: Math.random() * 2.5 + 1.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          color: NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)],
          tier: Math.floor(Math.random() * 3),
        });
      }
    };

    initNodes();

    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const maxLinkDist = 135;

    const render = () => {
      // Create a fluid cinematic motion-blur trail
      ctx.fillStyle = "rgba(4, 9, 7, 0.28)";
      ctx.fillRect(0, 0, width, height);

      // Randomly spawn active electrical neural synaptic signals
      if (Math.random() < 0.22 && nodes.length > 5) {
        const fromIndex = Math.floor(Math.random() * nodes.length);
        // Find a nearby node
        for (let j = 0; j < nodes.length; j++) {
          if (fromIndex === j) continue;
          const dx = nodes[fromIndex].x - nodes[j].x;
          const dy = nodes[fromIndex].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxLinkDist) {
            signals.push({
              fromIndex,
              toIndex: j,
              progress: 0,
              speed: 0.018 + Math.random() * 0.025,
              color: nodes[fromIndex].color,
            });
            break;
          }
        }
      }

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;

        // Draw glowing halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}20`;
        ctx.fill();

        // Draw core node
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Draw Synaptic Wire Connections (Plexus Network)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * 0.35;
            ctx.strokeStyle = `rgba(52, 199, 89, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Interactive Mouse Synaptic Pull
        if (mouseX !== null && mouseY !== null) {
          const dxM = nodes[i].x - mouseX;
          const dyM = nodes[i].y - mouseY;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 160) {
            const alphaM = (1 - distM / 160) * 0.65;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alphaM})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      // 3. Update and draw electric pulses traversing across axons
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const from = nodes[sig.fromIndex];
        const to = nodes[sig.toIndex];
        if (!from || !to) continue;

        const currentX = from.x + (to.x - from.x) * sig.progress;
        const currentY = from.y + (to.y - from.y) * sig.progress;

        // Draw flying electrical energy spark
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = sig.color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
}


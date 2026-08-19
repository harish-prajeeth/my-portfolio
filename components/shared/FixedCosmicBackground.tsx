"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasSpike?: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

const STAR_COLORS = [
  "rgba(248, 250, 252, ", // Pure Starlight White
  "rgba(16, 185, 129, ",  // Emerald Glow
  "rgba(212, 175, 55, ",  // Cyber Gold
  "rgba(56, 189, 248, ",  // Celestial Cyan
];

export default function FixedCosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -600, y: -600 });
  const mouseRef = useRef({
    x: -500,
    y: -500,
    targetX: -500,
    targetY: -500,
    speed: 0,
    lastX: 0,
    lastY: 0,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High DPI scaling capped at 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Create multi-layer starfield
    const starCount = Math.floor(Math.min(width, 1920) * 0.14);
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const z = Math.random() * 1.3 + 0.3; // depth factor
      const colorTemplate =
        STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      stars.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        z,
        size: (Math.random() * 1.7 + 0.5) * z,
        baseAlpha: Math.random() * 0.6 + 0.35,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colorTemplate,
        hasSpike: Math.random() < 0.14,
      });
    }

    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();

    const sparkles: Particle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      stars.forEach((s) => {
        if (s.x > width) {
          s.x = Math.random() * width;
          s.originX = s.x;
        }
        if (s.y > height) {
          s.y = Math.random() * height;
          s.originY = s.y;
        }
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Calculate velocity for responsive light bloom & sparkle particles
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      mouseRef.current.speed = Math.hypot(dx, dy);
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;

      // Add gentle stardust particle when moving
      if (mouseRef.current.speed > 2.5 && sparkles.length < 50) {
        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 24,
          y: e.clientY + (Math.random() - 0.5) * 24,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.35,
          size: Math.random() * 2.2 + 0.6,
          alpha: 0.85,
          maxLife: 35 + Math.random() * 20,
          life: 0,
          color:
            Math.random() > 0.45
              ? "rgba(16, 185, 129, "
              : "rgba(212, 175, 55, ",
        });
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.isHovering = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp for 3D parallax inertia
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const parallaxX = (mouseRef.current.x - width / 2) * 0.04;
      const parallaxY = (mouseRef.current.y - height / 2) * 0.04;

      const now = Date.now();

      // Spawn shooting star every 3.5 - 7 seconds
      if (now - lastShootingStarTime > 3500 + Math.random() * 3500) {
        lastShootingStarTime = now;
        shootingStars.push({
          x: Math.random() * width * 0.85 + width * 0.05,
          y: Math.random() * (height * 0.45),
          length: Math.random() * 110 + 70,
          speed: Math.random() * 12 + 14,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.35,
          alpha: 1,
          life: 0,
          maxLife: 42,
          color: Math.random() > 0.5 ? "#10B981" : "#D4AF37",
        });
      }

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const connectionDistance = 135;

      // Render Stars with Magnetic Interaction & 3D Depth
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;

        // Base 3D Parallax offset
        let targetRenderX =
          ((star.originX - parallaxX * star.z) % width + width) % width;
        let targetRenderY =
          ((star.originY - parallaxY * star.z) % height + height) % height;

        // Subtle interactive magnetic pull towards mouse cursor
        if (mouseRef.current.isHovering) {
          const mdx = mouseX - targetRenderX;
          const mdy = mouseY - targetRenderY;
          const distToMouse = Math.hypot(mdx, mdy);
          if (distToMouse < 180 && distToMouse > 0) {
            const pullForce = (1 - distToMouse / 180) * 12 * star.z;
            targetRenderX += (mdx / distToMouse) * pullForce;
            targetRenderY += (mdy / distToMouse) * pullForce;
          }
        }

        star.x += (targetRenderX - star.x) * 0.1;
        star.y += (targetRenderY - star.y) * 0.1;

        const renderedX = star.x;
        const renderedY = star.y;

        // Dynamic Twinkle
        const twinkle = Math.sin(star.twinklePhase) * 0.35 + 0.65;
        let currentAlpha = star.baseAlpha * twinkle;

        // Cursor proximity illumination & constellation line
        const distToMouse = Math.hypot(renderedX - mouseX, renderedY - mouseY);
        if (mouseRef.current.isHovering && distToMouse < connectionDistance) {
          const proximityRatio = 1 - distToMouse / connectionDistance;
          currentAlpha = Math.min(1, currentAlpha + proximityRatio * 0.7);

          // Draw radiant constellation vector beam to cursor
          ctx.beginPath();
          ctx.moveTo(renderedX, renderedY);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(16, 185, 129, ${proximityRatio * 0.3})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Draw connections between neighboring stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(renderedX - s2.x, renderedY - s2.y);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.14 * (star.z + s2.z) * 0.5;
            ctx.beginPath();
            ctx.moveTo(renderedX, renderedY);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        // Star Core Glow
        ctx.beginPath();
        ctx.arc(renderedX, renderedY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.shadowColor = star.color.includes("16, 185, 129")
          ? "#10B981"
          : star.color.includes("212, 175, 55")
          ? "#D4AF37"
          : "#FFFFFF";
        ctx.shadowBlur = star.size > 1.2 ? 7 : 2.5;
        ctx.fill();

        // 4-Point Diffraction Spike Flare for prominent stars
        if (star.hasSpike && currentAlpha > 0.55) {
          const flareLen = star.size * 4.2 * twinkle;
          ctx.beginPath();
          ctx.moveTo(renderedX - flareLen, renderedY);
          ctx.lineTo(renderedX + flareLen, renderedY);
          ctx.moveTo(renderedX, renderedY - flareLen);
          ctx.lineTo(renderedX, renderedY + flareLen);
          ctx.strokeStyle = `${star.color}${currentAlpha * 0.5})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;

      // Update and Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const progress = ss.life / ss.maxLife;
        const currentAlpha =
          progress < 0.2
            ? progress / 0.2
            : 1 - (progress - 0.2) / 0.8;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(
          0,
          ss.color === "#10B981"
            ? "rgba(16, 185, 129, 0.95)"
            : "rgba(212, 175, 55, 0.95)"
        );
        grad.addColorStop(
          0.3,
          ss.color === "#10B981"
            ? "rgba(16, 185, 129, 0.45)"
            : "rgba(212, 175, 55, 0.45)"
        );
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Glowing Star Head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      // Update and Draw Mouse Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        const alpha = (1 - progress) * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife) {
          sparkles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Interactive Dual-Ring Follower Spotlight */}
      <div
        className="absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 transition-transform duration-100 ease-out blur-[140px]"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(212, 175, 55, 0.22) 40%, rgba(6, 182, 212, 0.1) 65%, transparent 85%)",
        }}
      />

      {/* Floating Ambient Aurora Light Orb 1 - Emerald Pulse */}
      <div className="animate-pulse-glow absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full bg-emerald/15 blur-[160px]" />

      {/* Floating Ambient Aurora Light Orb 2 - Cyber Gold Pulse */}
      <div
        className="animate-pulse-glow absolute top-1/3 -right-40 h-[700px] w-[700px] rounded-full bg-gold/14 blur-[180px]"
        style={{ animationDelay: "2.5s" }}
      />

      {/* Floating Ambient Aurora Light Orb 3 - Celestial Cyan Glow */}
      <div
        className="animate-pulse-glow absolute bottom-10 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan/12 blur-[170px]"
        style={{ animationDelay: "4.5s" }}
      />

      {/* Full-Page Interactive Fixed Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />

      {/* Cosmic Stardust Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(5, 13, 8, 0.65) 100%)",
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

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
  const spotlightRef = useRef<HTMLDivElement>(null);
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

    // Optimized DPR scaling (capped at 1.5 for buttery 60-120fps)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Optimized star count for maximum smoothness
    const starCount = Math.floor(Math.min(width, 1600) * 0.08);
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const z = Math.random() * 1.2 + 0.3;
      const colorTemplate =
        STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      stars.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        z,
        size: (Math.random() * 1.4 + 0.6) * z,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colorTemplate,
        hasSpike: Math.random() < 0.1,
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
        if (s.originX > width) s.originX = Math.random() * width;
        if (s.originY > height) s.originY = Math.random() * height;
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;

      // Calculate velocity
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      mouseRef.current.speed = Math.hypot(dx, dy);
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;

      // Add gentle stardust particle only on noticeable movement
      if (mouseRef.current.speed > 5 && sparkles.length < 20) {
        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0 - 0.2,
          size: Math.random() * 1.6 + 0.5,
          alpha: 0.7,
          maxLife: 24 + Math.random() * 12,
          life: 0,
          color:
            Math.random() > 0.5
              ? "rgba(16, 185, 129, "
              : "rgba(212, 175, 55, ",
        });
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.isHovering = false;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

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

      // Smooth mouse lerp
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Update spotlight position via direct DOM transform (zero React re-renders!)
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const parallaxX = (mouseX - width / 2) * 0.025;
      const parallaxY = (mouseY - height / 2) * 0.025;

      const now = Date.now();

      // Spawn shooting star every 5 - 8 seconds
      if (now - lastShootingStarTime > 5000 + Math.random() * 3000) {
        lastShootingStarTime = now;
        shootingStars.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * (height * 0.35),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 12,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          alpha: 1,
          life: 0,
          maxLife: 35,
          color: Math.random() > 0.5 ? "#10B981" : "#D4AF37",
        });
      }

      const connectionDistance = 110;

      // Render Stars (Fast batch drawing with zero shadowBlur)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;

        // Base 3D Parallax offset
        let targetRenderX =
          ((star.originX - parallaxX * star.z) % width + width) % width;
        let targetRenderY =
          ((star.originY - parallaxY * star.z) % height + height) % height;

        // Magnetic attraction near cursor
        if (mouseRef.current.isHovering) {
          const mdx = mouseX - targetRenderX;
          const mdy = mouseY - targetRenderY;
          const distToMouse = Math.hypot(mdx, mdy);
          if (distToMouse < 140 && distToMouse > 0) {
            const pullForce = (1 - distToMouse / 140) * 8 * star.z;
            targetRenderX += (mdx / distToMouse) * pullForce;
            targetRenderY += (mdy / distToMouse) * pullForce;
          }
        }

        star.x += (targetRenderX - star.x) * 0.12;
        star.y += (targetRenderY - star.y) * 0.12;

        const renderedX = star.x;
        const renderedY = star.y;

        // Dynamic Twinkle
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        let currentAlpha = star.baseAlpha * twinkle;

        // Cursor proximity constellation line
        const distToMouse = Math.hypot(renderedX - mouseX, renderedY - mouseY);
        if (mouseRef.current.isHovering && distToMouse < connectionDistance) {
          const proximityRatio = 1 - distToMouse / connectionDistance;
          currentAlpha = Math.min(1, currentAlpha + proximityRatio * 0.5);

          ctx.beginPath();
          ctx.moveTo(renderedX, renderedY);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(16, 185, 129, ${proximityRatio * 0.2})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        // Star Outer Soft Halo
        ctx.beginPath();
        ctx.arc(renderedX, renderedY, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha * 0.25})`;
        ctx.fill();

        // Star Core
        ctx.beginPath();
        ctx.arc(renderedX, renderedY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.fill();

        // 4-Point Diffraction Flare for prominent stars
        if (star.hasSpike && currentAlpha > 0.6) {
          const flareLen = star.size * 3.5 * twinkle;
          ctx.beginPath();
          ctx.moveTo(renderedX - flareLen, renderedY);
          ctx.lineTo(renderedX + flareLen, renderedY);
          ctx.moveTo(renderedX, renderedY - flareLen);
          ctx.lineTo(renderedX, renderedY + flareLen);
          ctx.strokeStyle = `${star.color}${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Update and Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const progress = ss.life / ss.maxLife;
        const currentAlpha =
          progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(
          0,
          ss.color === "#10B981"
            ? `rgba(16, 185, 129, ${currentAlpha * 0.9})`
            : `rgba(212, 175, 55, ${currentAlpha * 0.9})`
        );
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

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
        const alpha = (1 - progress) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.3), 0, Math.PI * 2);
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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden contain-strict">
      {/* Dynamic GPU-Accelerated Cursor Follower Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute -top-[300px] -left-[300px] h-[600px] w-[600px] rounded-full opacity-25 blur-[120px] will-change-transform pointer-events-none"
        style={{
          transform: "translate3d(-500px, -500px, 0)",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(212, 175, 55, 0.18) 45%, transparent 75%)",
        }}
      />

      {/* Floating Ambient Aurora Light Orbs (Optimized GPU layer) */}
      <div className="animate-pulse-glow absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald/12 blur-[130px] will-change-transform" />
      <div
        className="animate-pulse-glow absolute top-1/3 -right-32 h-[550px] w-[550px] rounded-full bg-gold/10 blur-[140px] will-change-transform"
        style={{ animationDelay: "2.5s" }}
      />
      <div
        className="animate-pulse-glow absolute bottom-10 left-1/4 h-[450px] w-[450px] rounded-full bg-cyan/10 blur-[130px] will-change-transform"
        style={{ animationDelay: "4.5s" }}
      />

      {/* Full-Page Fixed Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none will-change-transform"
      />
    </div>
  );
}

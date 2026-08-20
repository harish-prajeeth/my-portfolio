"use client";

import { useEffect, useRef } from "react";

interface MicroStar {
  originX: number;
  originY: number;
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

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
  spikeSize?: number;
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
  isComet?: boolean;
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

interface CosmicWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. LAYER OF 650 - 900+ LITTLE GLITTERING MICRO WHITE STARS
    const microStarCount = Math.floor(Math.min(width, 1920) * 0.55);
    const microStars: MicroStar[] = [];
    for (let i = 0; i < microStarCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const z = Math.random() * 0.8 + 0.15;
      microStars.push({
        originX: rx,
        originY: ry,
        x: rx,
        y: ry,
        z,
        size: Math.random() * 0.7 + 0.25, // Tiny little white stars
        baseAlpha: Math.random() * 0.65 + 0.25,
        twinkleSpeed: Math.random() * 0.05 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // 2. LAYER OF 220+ MIDGROUND & BEACON STARS
    const mainStarCount = Math.floor(Math.min(width, 1920) * 0.16);
    const stars: Star[] = [];
    for (let i = 0; i < mainStarCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const z = Math.random() * 1.3 + 0.3;
      const isProminent = Math.random() < 0.16;
      const size = isProminent
        ? (Math.random() * 1.4 + 1.2) * z
        : (Math.random() * 0.8 + 0.6) * z;

      stars.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        z,
        size,
        baseAlpha: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color:
          Math.random() > 0.15
            ? "rgba(255, 255, 255, "
            : Math.random() > 0.5
            ? "rgba(16, 185, 129, "
            : "rgba(212, 175, 55, ",
        hasSpike: isProminent,
        spikeSize: Math.random() * 4.5 + 3.5,
      });
    }

    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();
    const sparkles: Particle[] = [];
    const cosmicWaves: CosmicWave[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      microStars.forEach((s) => {
        if (s.originX > width) s.originX = Math.random() * width;
        if (s.originY > height) s.originY = Math.random() * height;
      });
      stars.forEach((s) => {
        if (s.originX > width) s.originX = Math.random() * width;
        if (s.originY > height) s.originY = Math.random() * height;
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;

      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      mouseRef.current.speed = Math.hypot(dx, dy);
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;

      // Emit luminous ripple wave on brisk movement
      if (mouseRef.current.speed > 12 && cosmicWaves.length < 5) {
        cosmicWaves.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10,
          maxRadius: 180 + Math.random() * 60,
          alpha: 0.35,
          color: Math.random() > 0.5 ? "rgba(16, 185, 129, " : "rgba(255, 255, 255, ",
        });
      }

      // Add radiant stardust particle trail on movement
      if (mouseRef.current.speed > 2.5 && sparkles.length < 45) {
        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 22,
          y: e.clientY + (Math.random() - 0.5) * 22,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.4,
          size: Math.random() * 1.8 + 0.6,
          alpha: 0.9,
          maxLife: 28 + Math.random() * 18,
          life: 0,
          color:
            Math.random() > 0.35
              ? "rgba(255, 255, 255, "
              : Math.random() > 0.5
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

    let lastTime = performance.now();
    let globalWaveTime = 0;

    const render = (currentTime: number) => {
      if (!isTabActive) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      globalWaveTime += delta;

      ctx.clearRect(0, 0, width, height);

      const mouseDampFactor = 1 - Math.exp(-8 * delta);
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * mouseDampFactor;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * mouseDampFactor;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const parallaxX = (mouseX - width / 2) * 0.035;
      const parallaxY = (mouseY - height / 2) * 0.035;

      const now = Date.now();

      if (now - lastShootingStarTime > 2600 + Math.random() * 2400) {
        lastShootingStarTime = now;
        const isComet = Math.random() < 0.35;
        shootingStars.push({
          x: Math.random() * width * 0.9 + width * 0.05,
          y: Math.random() * (height * 0.45),
          length: isComet ? Math.random() * 160 + 90 : Math.random() * 90 + 50,
          speed: isComet ? Math.random() * 14 + 16 : Math.random() * 10 + 12,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.35,
          alpha: 1,
          life: 0,
          maxLife: isComet ? 42 : 32,
          color: Math.random() > 0.3 ? "#FFFFFF" : Math.random() > 0.5 ? "#10B981" : "#D4AF37",
          isComet,
        });
      }

      const starDampFactor = 1 - Math.exp(-10 * delta);

      for (let i = 0; i < microStars.length; i++) {
        const ms = microStars[i];
        ms.twinklePhase += ms.twinkleSpeed * (delta * 60);

        const targetX = ((ms.originX - parallaxX * ms.z) % width + width) % width;
        const targetY = ((ms.originY - parallaxY * ms.z) % height + height) % height;

        ms.x += (targetX - ms.x) * starDampFactor;
        ms.y += (targetY - ms.y) * starDampFactor;

        const twinkle = Math.sin(ms.twinklePhase) * 0.4 + 0.6;
        const alpha = ms.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(ms.x, ms.y, ms.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      for (let i = cosmicWaves.length - 1; i >= 0; i--) {
        const wave = cosmicWaves[i];
        wave.radius += delta * 140;
        const progress = wave.radius / wave.maxRadius;
        const currentAlpha = wave.alpha * (1 - progress);

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${wave.color}${currentAlpha})`;
        ctx.lineWidth = 1.2 * (1 - progress);
        ctx.stroke();

        if (wave.radius >= wave.maxRadius) {
          cosmicWaves.splice(i, 1);
        }
      }

      const connectionDistance = 135;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed * (delta * 60);

        let targetRenderX = ((star.originX - parallaxX * star.z) % width + width) % width;
        let targetRenderY = ((star.originY - parallaxY * star.z) % height + height) % height;

        if (mouseRef.current.isHovering) {
          const mdx = mouseX - targetRenderX;
          const mdy = mouseY - targetRenderY;
          const distToMouse = Math.hypot(mdx, mdy);
          if (distToMouse < 160 && distToMouse > 0) {
            const pullForce = (1 - distToMouse / 160) * 11 * star.z;
            targetRenderX += (mdx / distToMouse) * pullForce;
            targetRenderY += (mdy / distToMouse) * pullForce;
          }
        }

        star.x += (targetRenderX - star.x) * starDampFactor;
        star.y += (targetRenderY - star.y) * starDampFactor;

        const renderedX = star.x;
        const renderedY = star.y;

        const twinkle = Math.sin(star.twinklePhase) * 0.35 + 0.65;
        let currentAlpha = Math.min(1, star.baseAlpha * twinkle);

        const distToMouse = Math.hypot(renderedX - mouseX, renderedY - mouseY);
        if (mouseRef.current.isHovering && distToMouse < connectionDistance) {
          const proximityRatio = 1 - distToMouse / connectionDistance;
          currentAlpha = Math.min(1, currentAlpha + proximityRatio * 0.65);

          ctx.beginPath();
          ctx.moveTo(renderedX, renderedY);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${proximityRatio * 0.28})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        if (star.size > 0.8) {
          ctx.beginPath();
          ctx.arc(renderedX, renderedY, star.size * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${currentAlpha * 0.25})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(renderedX, renderedY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.fill();

        if (star.hasSpike && currentAlpha > 0.45) {
          const flareLen = (star.spikeSize || 4) * twinkle;
          ctx.beginPath();
          ctx.moveTo(renderedX - flareLen, renderedY);
          ctx.lineTo(renderedX + flareLen, renderedY);
          ctx.moveTo(renderedX, renderedY - flareLen);
          ctx.lineTo(renderedX, renderedY + flareLen);
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const progress = ss.life / ss.maxLife;
        const currentAlpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`);
        grad.addColorStop(0.2, ss.color === "#10B981" ? `rgba(16, 185, 129, ${currentAlpha * 0.85})` : `rgba(212, 175, 55, ${currentAlpha * 0.85})`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.isComet ? 2.2 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.isComet ? 2.4 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        const alpha = (1 - progress) * 0.75;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife) {
          sparkles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

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
      {/* Dynamic GPU-Accelerated Cursor Follower Spotlight & Radiant Starlight Aura */}
      <div
        ref={spotlightRef}
        className="absolute -top-[350px] -left-[350px] h-[700px] w-[700px] rounded-full opacity-35 blur-[130px] will-change-transform pointer-events-none"
        style={{
          transform: "translate3d(-500px, -500px, 0)",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(16, 185, 129, 0.45) 30%, rgba(212, 175, 55, 0.2) 55%, transparent 75%)",
        }}
      />

      {/* Floating Ambient Aurora Light Waves (Orbital Flow & Luminous Multi-Spectrum) */}
      <div className="animate-aurora-1 absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full bg-emerald/16 blur-[140px] will-change-transform" />
      <div
        className="animate-aurora-2 absolute top-1/4 -right-40 h-[700px] w-[700px] rounded-full bg-gold/14 blur-[150px] will-change-transform"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="animate-aurora-1 absolute top-2/3 left-1/6 h-[600px] w-[600px] rounded-full bg-cyan/14 blur-[140px] will-change-transform"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="animate-aurora-2 absolute top-1/2 right-1/4 h-[550px] w-[550px] rounded-full bg-emerald/10 blur-[130px] will-change-transform"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="animate-pulse-glow absolute -bottom-20 right-1/4 h-[550px] w-[550px] rounded-full bg-white/8 blur-[130px] will-change-transform"
        style={{ animationDelay: "2s" }}
      />

      {/* Luminous Diagonal Cosmic Light Rays */}
      <div className="animate-light-ray pointer-events-none absolute -top-1/2 left-1/4 h-[200%] w-[380px] bg-gradient-to-r from-transparent via-emerald/6 to-transparent blur-[85px]" />
      <div
        className="animate-light-ray pointer-events-none absolute -top-1/2 right-1/4 h-[200%] w-[320px] bg-gradient-to-r from-transparent via-gold/5 to-transparent blur-[85px]"
        style={{ animationDelay: "4s", transform: "rotate(30deg)" }}
      />

      {/* Full-Page Fixed Starfield Canvas (Micro White Stars & Constellation Beams) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none will-change-transform"
      />
    </div>
  );
}

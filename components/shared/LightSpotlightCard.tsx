"use client";

import React, { useRef, useEffect } from "react";

interface LightSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  tiltEffect?: boolean;
  onClick?: () => void;
}

export default function LightSpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.22)",
  tiltEffect = true,
  onClick,
}: LightSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    targetRotX: 0,
    targetRotY: 0,
    targetY: 0,
    currentRotX: 0,
    currentRotY: 0,
    currentY: 0,
    targetGlowOpacity: 0,
    currentGlowOpacity: 0,
    glowX: 0,
    glowY: 0,
    targetGlowX: 0,
    targetGlowY: 0,
    isHovered: false,
  });

  useEffect(() => {
    let animId: number;

    const update = () => {
      const s = stateRef.current;
      const card = cardRef.current;
      const glow = glowRef.current;

      // Smooth dampening factor
      const factor = s.isHovered ? 0.15 : 0.08;

      s.currentRotX += (s.targetRotX - s.currentRotX) * factor;
      s.currentRotY += (s.targetRotY - s.currentRotY) * factor;
      s.currentY += (s.targetY - s.currentY) * factor;
      s.currentGlowOpacity += (s.targetGlowOpacity - s.currentGlowOpacity) * 0.15;
      s.glowX += (s.targetGlowX - s.glowX) * 0.2;
      s.glowY += (s.targetGlowY - s.glowY) * 0.2;

      if (card && tiltEffect) {
        card.style.transform = `perspective(1000px) rotateX(${s.currentRotX.toFixed(2)}deg) rotateY(${s.currentRotY.toFixed(2)}deg) translateY(${s.currentY.toFixed(2)}px)`;
      }

      if (glow) {
        glow.style.opacity = s.currentGlowOpacity.toFixed(3);
        glow.style.background = `radial-gradient(450px circle at ${s.glowX.toFixed(1)}px ${s.glowY.toFixed(1)}px, ${spotlightColor}, transparent 60%)`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [spotlightColor, tiltEffect]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const s = stateRef.current;
    s.isHovered = true;
    s.targetGlowOpacity = 1;
    s.targetGlowX = x;
    s.targetGlowY = y;

    if (tiltEffect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      s.targetRotX = ((y - centerY) / centerY) * -4.5;
      s.targetRotY = ((x - centerX) / centerX) * 4.5;
      s.targetY = -3;
    }
  };

  const handleMouseLeave = () => {
    const s = stateRef.current;
    s.isHovered = false;
    s.targetRotX = 0;
    s.targetRotY = 0;
    s.targetY = 0;
    s.targetGlowOpacity = 0;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`card relative overflow-hidden will-change-transform ${className}`}
    >
      {/* High-Performance Direct GPU Spotlight Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 rounded-[inherit] will-change-transform"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

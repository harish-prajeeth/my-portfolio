"use client";

import React, { useRef, MouseEvent } from "react";

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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(450px circle at ${x}px ${y}px, ${spotlightColor}, transparent 55%)`;
    }

    if (tiltEffect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rX = ((y - centerY) / centerY) * -4;
      const rY = ((x - centerX) / centerX) * 4;
      cardRef.current.style.transform = `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-2px)`;
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
    if (cardRef.current && tiltEffect) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
      }}
      className={`card relative overflow-hidden will-change-transform ${className}`}
    >
      {/* High-Performance Direct GPU Spotlight Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-[inherit]"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

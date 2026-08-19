"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });

    if (tiltEffect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rX = ((y - centerY) / centerY) * -5;
      const rY = ((x - centerX) / centerX) * 5;
      setRotateX(rX);
      setRotateY(rY);
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`card relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Light Spotlight Background Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Light Border Glow Beam */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(212, 175, 55, 0.4), transparent 40%)`,
          maskImage: "linear-gradient(#black, #black) content-box, linear-gradient(#black, #black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

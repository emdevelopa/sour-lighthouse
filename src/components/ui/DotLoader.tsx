"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface DotLoaderProps {
  mode?: "wave" | "pulse" | "orbit" | "idle";
  size?: "small" | "medium" | "large";
  className?: string;
  dotClassName?: string;
}

export default function DotLoader({
  mode = "wave",
  size = "medium",
  className = "",
  dotClassName = "",
}: DotLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  const dotSize =
    size === "small"
      ? "w-2.5 h-2.5"
      : size === "large"
      ? "w-10 h-10"
      : "w-4 h-4";

  const gapSize =
    size === "small" ? "gap-2" : size === "large" ? "gap-5" : "gap-3";

  useEffect(() => {
    const dots = dotsRef.current.filter(Boolean);
    if (!dots.length) return;

    gsap.killTweensOf(dots);

    if (mode === "wave") {
      const travel = size === "small" ? -8 : size === "large" ? -24 : -14;
      gsap.to(dots, {
        y: travel,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: {
          each: 0.12,
          repeat: -1,
          yoyo: true,
        },
      });
    } else if (mode === "pulse") {
      gsap.to(dots, {
        scale: 1.5,
        opacity: 0.4,
        duration: 0.7,
        ease: "sine.inOut",
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
      });
    } else if (mode === "orbit") {
      gsap.to(dots, {
        rotate: 360,
        scale: 1.2,
        duration: 1.1,
        ease: "power2.inOut",
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
      });
    } else {
      gsap.to(dots, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    return () => {
      gsap.killTweensOf(dots);
    };
  }, [mode, size]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center ${gapSize} ${className}`}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className={`${dotSize} rounded-full bg-neutral-900 dark:bg-neutral-100 transition-opacity ${dotClassName}`}
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const [activeMode, setActiveMode] = useState<"wave" | "pulse" | "orbit" | "idle">("wave");

  useGSAP(
    () => {
      // Clear previous animations on dots
      gsap.killTweensOf(dotsRef.current);

      if (activeMode === "wave") {
        gsap.to(dotsRef.current, {
          y: -24,
          duration: 0.6,
          ease: "power1.inOut",
          stagger: {
            each: 0.15,
            repeat: -1,
            yoyo: true,
          },
        });
      } else if (activeMode === "pulse") {
        gsap.to(dotsRef.current, {
          scale: 1.6,
          opacity: 0.5,
          duration: 0.8,
          ease: "sine.inOut",
          stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true,
          },
        });
      } else if (activeMode === "orbit") {
        gsap.to(dotsRef.current, {
          rotate: 360,
          scale: 1.25,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true,
          },
        });
      } else {
        // idle / reset
        gsap.to(dotsRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef, dependencies: [activeMode] }
  );

  const handleDotClick = (index: number) => {
    const el = dotsRef.current[index];
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 0.6, rotate: -45 },
      { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1.2, 0.4)" }
    );
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const factor = (i + 1) * 0.04;
      gsap.to(dot, {
        x: mouseX * factor,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    dotsRef.current.forEach((dot) => {
      if (!dot) return;
      gsap.to(dot, {
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white text-black dark:bg-[#0a0a0a] dark:text-white select-none overflow-hidden"
    >
      {/* Centered Dots matching the requested graphic */}
      <div className="flex items-center justify-center gap-7 py-20 px-8 cursor-pointer">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el;
            }}
            onClick={() => handleDotClick(i)}
            className="w-14 h-14 rounded-full bg-black dark:bg-white transition-shadow hover:shadow-xl hover:scale-105 active:scale-95"
            style={{ willChange: "transform, opacity" }}
            aria-label={`Dot ${i + 1}`}
          />
        ))}
      </div>

      {/* Subtle interactive controls with Grotesk typography */}
      <div className="absolute bottom-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md px-3 py-1.5 text-xs tracking-wider uppercase">
          {(["wave", "pulse", "orbit", "idle"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1 rounded-full transition-all duration-200 font-medium ${
                activeMode === mode
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

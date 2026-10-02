"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  verdict?: "good" | "moderate" | "attention";
  sparkline?: number[];
  className?: string;
}

export default function MetricCard({
  title,
  value,
  unit,
  subtitle,
  verdict,
  sparkline,
  className = "",
}: MetricCardProps) {
  const verdictColor =
    verdict === "good"
      ? "text-neutral-900 dark:text-neutral-100"
      : verdict === "moderate"
      ? "text-amber-600 dark:text-amber-400"
      : verdict === "attention"
      ? "text-rose-600 dark:text-rose-400"
      : "text-neutral-900 dark:text-neutral-100";

  return (
    <div
      className={`flex flex-col justify-between p-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/60 transition-colors ${className}`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-light uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {title}
        </span>
      </div>

      <div className="my-6 flex items-baseline gap-1">
        <span className={`text-5xl font-light tracking-tight ${verdictColor}`}>
          {value}
        </span>
        {unit && (
          <span className="text-lg font-light text-neutral-400 dark:text-neutral-500">
            {unit}
          </span>
        )}
      </div>

      {sparkline && sparkline.length > 1 && (
        <div className="w-full h-8 mb-4">
          <svg
            viewBox="0 0 100 24"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-400 dark:text-neutral-600"
              points={sparkline
                .map((val, idx) => {
                  const x = (idx / (sparkline.length - 1)) * 100;
                  const y = 24 - (val / 100) * 20;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
        </div>
      )}

      {subtitle && (
        <span className="text-xs font-light text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </span>
      )}
    </div>
  );
}

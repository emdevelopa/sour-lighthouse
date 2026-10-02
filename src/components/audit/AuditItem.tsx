"use client";

import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { AuditItem as AuditItemType } from "@/lib/auditor";

interface AuditItemProps {
  item: AuditItemType;
}

export default function AuditItem({ item }: AuditItemProps) {
  const [expanded, setExpanded] = useState(false);

  const verdictLabel =
    item.verdict === "good"
      ? "Good"
      : item.verdict === "moderate"
      ? "Needs improvement"
      : "Requires attention";

  const verdictTextColor =
    item.verdict === "good"
      ? "text-neutral-500 dark:text-neutral-400"
      : item.verdict === "moderate"
      ? "text-amber-600 dark:text-amber-400"
      : "text-rose-600 dark:text-rose-400";

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 transition-colors">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
      >
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-base font-normal text-neutral-900 dark:text-neutral-100">
            {item.title}
          </span>
          <span className={`text-xs font-light ${verdictTextColor}`}>
            {verdictLabel}
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400 dark:text-neutral-500">
          {item.metricValue && (
            <span className="text-xs font-light text-neutral-600 dark:text-neutral-300">
              {item.metricValue}
            </span>
          )}
          {expanded ? (
            <IconChevronUp size={16} stroke={1.5} />
          ) : (
            <IconChevronDown size={16} stroke={1.5} />
          )}
        </div>
      </button>

      <div className="mt-3">
        <p className="text-sm font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {item.summary}
        </p>

        {expanded && item.recommendation && (
          <div className="mt-4 p-4 rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50">
            <span className="block text-xs font-light uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              How to improve
            </span>
            <p className="text-xs font-light text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {item.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

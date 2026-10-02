"use client";

import React from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export default function CustomSelect({
  label,
  value,
  options,
  onChange,
  className = "",
}: CustomSelectProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-xs font-light uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {label}
        </span>
      )}
      <div className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full px-5 py-3.5 pr-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-light text-sm focus:bg-neutral-200/70 dark:focus:bg-neutral-800/70 transition-colors focus:outline-none cursor-pointer"
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 text-neutral-400 dark:text-neutral-500">
          <IconChevronDown size={16} stroke={1.5} />
        </div>
      </div>
    </div>
  );
}

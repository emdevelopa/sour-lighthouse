"use client";

import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export default function CustomInput({
  label,
  helperText,
  className = "",
  ...props
}: CustomInputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-xs font-light uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {label}
        </label>
      )}
      <input
        className={`w-full px-6 py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 font-light text-base focus:bg-neutral-200/70 dark:focus:bg-neutral-800/70 transition-colors focus:outline-none ${className}`}
        {...props}
      />
      {helperText && (
        <span className="text-xs font-light text-neutral-400 dark:text-neutral-500">
          {helperText}
        </span>
      )}
    </div>
  );
}

"use client";

import React from "react";

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, active = false, onClick, className = "" }: ChipProps) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-pill text-xs font-sans font-medium transition-colors duration-150 select-none";
  const state = active
    ? "bg-sage-soft text-sage-dark"
    : "bg-cream-200 text-ink-muted";
  const interactive = onClick ? "cursor-pointer hover:opacity-80 active:opacity-60" : "";

  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`${base} ${state} ${interactive} ${className}`}
    >
      {label}
    </span>
  );
}

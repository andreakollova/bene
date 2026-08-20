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
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-medium tracking-wide transition-colors duration-150 select-none";
  const state = active
    ? "bg-black text-white"
    : "border border-black/20 text-black bg-transparent";
  const interactive = onClick ? "cursor-pointer hover:opacity-70 active:opacity-50" : "";

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

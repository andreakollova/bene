import React from "react";

interface ProgressBarProps {
  progress: number; // 0–100
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`h-1.5 w-full rounded-full bg-gray-200 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-black transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

"use client";

import React from "react";

interface StreakDotsProps {
  completedDays: boolean[];
  currentDay?: number;
  onToggle?: (day: number) => void;
  className?: string;
}

const LABELS = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

export function StreakDots({
  completedDays,
  currentDay,
  onToggle,
  className = "",
}: StreakDotsProps) {
  return (
    <div className={`grid grid-cols-7 gap-1 w-full ${className}`}>
      {LABELS.map((label, i) => {
        const completed = completedDays[i] === true;
        const isCurrent = currentDay === i;

        return (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => onToggle?.(i)}
              className={`w-full aspect-square rounded-full flex items-center justify-center transition-all duration-200 ${
                completed
                  ? "bg-black"
                  : isCurrent
                  ? "border-2 border-black bg-white"
                  : "border border-gray-200 bg-white active:bg-gray-100"
              }`}
            >
              {completed && (
                <svg width="14" height="10" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span
              className={`text-[10px] font-sans uppercase tracking-widest ${
                completed ? "text-black font-semibold" : isCurrent ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

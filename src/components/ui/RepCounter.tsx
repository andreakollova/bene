import React from "react";

interface RepCounterProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export function RepCounter({ current, total, label = "opakovania", className = "" }: RepCounterProps) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="flex items-end gap-1">
        <span className="font-serif text-6xl leading-none text-ink font-semibold">
          {current}
        </span>
        <span className="font-serif text-3xl leading-none text-ink-faint mb-1">
          /{total}
        </span>
      </div>
      {label && (
        <span className="font-sans text-sm text-ink-muted">{label}</span>
      )}
    </div>
  );
}

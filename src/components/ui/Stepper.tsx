"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  label,
  className = "",
}: StepperProps) {
  const decrement = () => {
    const next = value - step;
    if (min === undefined || next >= min) onChange(next);
  };

  const increment = () => {
    const next = value + step;
    if (max === undefined || next <= max) onChange(next);
  };

  const canDecrement = min === undefined || value - step >= min;
  const canIncrement = max === undefined || value + step <= max;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <span className="font-sans text-xs text-ink-muted">{label}</span>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          disabled={!canDecrement}
          aria-label="Znížiť"
          className="w-10 h-10 rounded-btn border border-cream-200 bg-cream-100 flex items-center justify-center
            text-ink-muted hover:bg-cream-200 active:opacity-60 disabled:opacity-30 transition-all duration-150"
        >
          <Minus size={16} />
        </button>

        <span className="font-serif text-2xl text-ink font-semibold w-10 text-center leading-none">
          {value}
        </span>

        <button
          onClick={increment}
          disabled={!canIncrement}
          aria-label="Zvýšiť"
          className="w-10 h-10 rounded-btn border border-cream-200 bg-cream-100 flex items-center justify-center
            text-ink-muted hover:bg-cream-200 active:opacity-60 disabled:opacity-30 transition-all duration-150"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

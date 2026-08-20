import React from "react";
import { Check, ChevronRight } from "lucide-react";

interface ExerciseRowProps {
  name: string;
  sets: number;
  reps: number;
  completed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ExerciseRow({
  name,
  sets,
  reps,
  completed = false,
  onClick,
  className = "",
}: ExerciseRowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-card bg-cream-100 border border-cream-200
        hover:opacity-90 active:opacity-75 transition-opacity duration-150 text-left ${className}`}
    >
      {/* Completion indicator */}
      <div
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors duration-200
          ${completed ? "bg-sage border-sage" : "bg-transparent border-cream-200"}`}
      >
        {completed && <Check size={14} className="text-white" strokeWidth={2.5} />}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`font-serif text-base leading-snug ${completed ? "text-ink-faint line-through" : "text-ink"}`}>
          {name}
        </p>
        <p className="font-sans text-xs text-ink-muted mt-0.5">
          {sets} série × {reps} opakovaní
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight size={16} className="text-ink-faint flex-shrink-0" />
    </button>
  );
}

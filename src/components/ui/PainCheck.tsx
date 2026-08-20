"use client";

import React from "react";

type PainLevel = "ok" | "pulling" | "pain";

interface PainCheckProps {
  onSelect?: (level: PainLevel) => void;
  selected?: PainLevel;
  className?: string;
}

const OPTIONS: {
  id: PainLevel;
  label: string;
  sublabel: string;
  bg: string;
  border: string;
  emoji: string;
}[] = [
  {
    id: "ok",
    label: "V pohode",
    sublabel: "Bez bolesti",
    bg: "bg-sage-soft",
    border: "border-sage",
    emoji: "✓",
  },
  {
    id: "pulling",
    label: "Ťahá to",
    sublabel: "Mierny diskomfort",
    bg: "bg-amber/10",
    border: "border-amber",
    emoji: "~",
  },
  {
    id: "pain",
    label: "Bolí to",
    sublabel: "Výrazná bolesť",
    bg: "bg-clay/10",
    border: "border-clay",
    emoji: "!",
  },
];

const ICON_COLORS: Record<PainLevel, string> = {
  ok: "text-sage-dark",
  pulling: "text-amber",
  pain: "text-clay",
};

export function PainCheck({ onSelect, selected, className = "" }: PainCheckProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="font-sans text-sm text-ink-muted text-center">Ako sa cítiš počas cvičenia?</p>
      <div className="flex gap-3">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect?.(opt.id)}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-card border-2 transition-all duration-150
                ${opt.bg}
                ${isSelected ? opt.border + " shadow-sm" : "border-transparent opacity-70 hover:opacity-90"}
              `}
            >
              <span className={`text-2xl font-bold font-serif ${ICON_COLORS[opt.id]}`}>
                {opt.emoji}
              </span>
              <span className="font-sans text-sm font-semibold text-ink">{opt.label}</span>
              <span className="font-sans text-xs text-ink-muted text-center leading-tight">
                {opt.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

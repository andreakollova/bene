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
  iconColor: string;
}[] = [
  {
    id: "ok",
    label: "V pohode",
    sublabel: "Bez bolesti",
    bg: "bg-green-50",
    border: "border-green-500",
    emoji: "✓",
    iconColor: "text-green-600",
  },
  {
    id: "pulling",
    label: "Ťahá to",
    sublabel: "Mierny diskomfort",
    bg: "bg-amber-50",
    border: "border-amber-400",
    emoji: "~",
    iconColor: "text-amber-500",
  },
  {
    id: "pain",
    label: "Bolí to",
    sublabel: "Výrazná bolesť",
    bg: "bg-red-50",
    border: "border-red-400",
    emoji: "!",
    iconColor: "text-red-500",
  },
];

export function PainCheck({ onSelect, selected, className = "" }: PainCheckProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="font-sans text-sm text-gray-400 text-center uppercase tracking-widest">Ako sa cítiš počas cvičenia?</p>
      <div className="flex gap-3">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect?.(opt.id)}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-[20px] border-2 transition-all duration-150
                ${opt.bg}
                ${isSelected ? opt.border + " shadow-sm" : "border-transparent opacity-70 hover:opacity-90"}
              `}
            >
              <span className={`text-2xl font-bold font-serif ${opt.iconColor}`}>
                {opt.emoji}
              </span>
              <span className="font-sans text-sm font-semibold text-black">{opt.label}</span>
              <span className="font-sans text-xs text-gray-400 text-center leading-tight">
                {opt.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

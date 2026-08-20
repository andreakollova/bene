import React from "react";

interface StreakDotsProps {
  completedDays: number[]; // indices 0–6 that are completed
  currentDay?: number;     // index of today (0–6)
  labels?: string[];       // optional day labels, e.g. ["Po","Ut",...]
  className?: string;
}

const DEFAULT_LABELS = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

export function StreakDots({
  completedDays,
  currentDay,
  labels = DEFAULT_LABELS,
  className = "",
}: StreakDotsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: 7 }, (_, i) => {
        const completed = completedDays.includes(i);
        const isCurrent = currentDay === i;

        let dotClass =
          "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200";

        if (completed) {
          dotClass += " bg-sage";
        } else {
          dotClass += " bg-transparent border border-cream-200";
        }

        if (isCurrent) {
          dotClass += " ring-2 ring-sage ring-offset-1 ring-offset-cream-50";
        }

        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={dotClass}>
              {completed && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {labels[i] && (
              <span className="text-[10px] font-sans text-ink-faint">{labels[i]}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

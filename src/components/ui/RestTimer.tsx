"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProgressRing } from "./ProgressRing";
import { Button } from "./Button";

interface RestTimerProps {
  initialSeconds?: number;
  onFinished?: () => void;
  className?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RestTimer({
  initialSeconds = 60,
  onFinished,
  className = "",
}: RestTimerProps) {
  const [total, setTotal] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progress = total > 0 ? ((total - remaining) / total) * 100 : 100;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onFinished?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total, onFinished]);

  const handleAdd15 = () => {
    setTotal((t) => t + 15);
    setRemaining((r) => r + 15);
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} size={140} strokeWidth={8} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-4xl text-ink font-semibold leading-none">
            {formatTime(remaining)}
          </span>
          <span className="font-sans text-xs text-ink-muted mt-1">oddych</span>
        </div>
      </div>
      <Button variant="ghost" onClick={handleAdd15}>
        Pridať 15 s
      </Button>
    </div>
  );
}

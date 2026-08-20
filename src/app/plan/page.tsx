"use client";

import Link from "next/link";
import { Lock, Play, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { Card, ProgressBar, Chip } from "@/components/ui";

export default function PlanPage() {
  const hydrated = useHydrated();
  const plan = useStore((s) => s.currentPlan);
  const currentWeekIndex = useStore((s) => s.currentWeekIndex);
  const completedSessions = useStore((s) => s.completedSessions);

  if (!hydrated) return null;

  if (!plan) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="font-medium text-ink-muted">Žiadny aktívny plán</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8 space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">
          {plan.name}
        </h1>
        <p className="text-ink-muted mt-1">{plan.description}</p>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-ink-muted">
            Týždeň {currentWeekIndex + 1} z {plan.totalWeeks}
          </span>
          <span className="text-sm font-semibold text-sage">
            {Math.round((currentWeekIndex / plan.totalWeeks) * 100)}%
          </span>
        </div>
        <ProgressBar progress={currentWeekIndex / plan.totalWeeks} />
      </div>

      {plan.weeks.map((week, weekIdx) => {
        const isLocked = weekIdx > currentWeekIndex + 1;
        const isCurrent = weekIdx === currentWeekIndex;

        return (
          <div key={weekIdx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2
                  className={`font-serif text-xl font-medium ${
                    isLocked ? "text-ink-faint" : "text-ink"
                  }`}
                >
                  Týždeň {week.weekNumber}
                </h2>
                {isCurrent && <Chip label="Aktuálny" active />}
              </div>
              {isLocked && (
                <Lock className="text-ink-faint" size={16} strokeWidth={1.75} />
              )}
            </div>
            <p className={`text-sm ${isLocked ? "text-ink-faint" : "text-ink-muted"}`}>
              {week.title}
            </p>

            <div className="space-y-2">
              {week.days.map((day) => {
                const done = completedSessions.includes(day.id);
                return (
                  <Card
                    key={day.id}
                    className={`p-4 ${isLocked ? "opacity-50" : ""}`}
                  >
                    {isLocked ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-ink-faint">{day.title}</p>
                          <p className="text-sm text-ink-faint mt-0.5">
                            {day.exercises.length} cvikov · ~{day.exercises.length * 3} min
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/session/${day.id}`}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className={`font-medium ${done ? "text-sage" : "text-ink"}`}>
                            {day.title}
                          </p>
                          <p className="text-sm text-ink-muted mt-0.5">
                            {day.exercises.length} cvikov · ~{day.exercises.length * 3} min
                          </p>
                        </div>
                        {done ? (
                          <span className="bg-sage-soft text-sage text-xs font-semibold px-3 py-1 rounded-pill">
                            Hotovo
                          </span>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-sage-soft flex items-center justify-center">
                            <Play className="text-sage" size={16} fill="#7C9070" />
                          </div>
                        )}
                      </Link>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

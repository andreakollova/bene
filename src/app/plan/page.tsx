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
        <p className="font-medium text-gray-400">Žiadny aktívny plán</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8 space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-black">
          {plan.name}
        </h1>
        <p className="text-gray-400 mt-1">{plan.description}</p>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            Týždeň {currentWeekIndex + 1} z {plan.totalWeeks}
          </span>
          <span className="text-[10px] font-semibold text-black uppercase tracking-widest">
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
                    isLocked ? "text-gray-300" : "text-black"
                  }`}
                >
                  Týždeň {week.weekNumber}
                </h2>
                {isCurrent && <Chip label="Aktuálny" active />}
              </div>
              {isLocked && (
                <Lock className="text-gray-300" size={16} strokeWidth={1.75} />
              )}
            </div>
            <p className={`text-sm ${isLocked ? "text-gray-300" : "text-gray-400"}`}>
              {week.title}
            </p>

            <div className="space-y-2">
              {week.days.map((day) => {
                const done = completedSessions.includes(day.id);
                return (
                  <Card
                    key={day.id}
                    className={`p-4 ${isLocked ? "opacity-40" : ""}`}
                  >
                    {isLocked ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-300">{day.title}</p>
                          <p className="text-sm text-gray-300 mt-0.5">
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
                          <p className={`font-medium ${done ? "text-black" : "text-black"}`}>
                            {day.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            {day.exercises.length} cvikov · ~{day.exercises.length * 3} min
                          </p>
                        </div>
                        {done ? (
                          <span className="bg-black text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                            Hotovo
                          </span>
                        ) : (
                          <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center">
                            <Play className="text-black" size={14} fill="#111111" />
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

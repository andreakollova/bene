"use client";

import Link from "next/link";
import { Lock, Play, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { Card, ProgressBar, Chip } from "@/components/ui";
import { SEED_VIDEO_SESSIONS } from "@/data/seedData";

export default function PlanPage() {
  const hydrated = useHydrated();
  const plan = useStore((s) => s.currentPlan);
  const currentWeekIndex = useStore((s) => s.currentWeekIndex);
  const currentDayIndex = useStore((s) => s.currentDayIndex);
  const completedSessions = useStore((s) => s.completedSessions);

  if (!hydrated) return null;

  if (!plan) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="font-medium text-gray-400">Žiadny aktívny plán</p>
      </div>
    );
  }

  const totalDays = plan.weeks.reduce((s, w) => s + w.days.length, 0);
  const completedCount = completedSessions.length;
  const progress = totalDays > 0 ? completedCount / totalDays : 0;

  return (
    <div className="w-full px-6 py-8 space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-black">Plán</h1>
        <p className="text-sm text-gray-400 mt-1">{plan.name}</p>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            {completedCount} z {totalDays}
          </span>
          <span className="text-[10px] font-semibold text-black uppercase tracking-widest">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {plan.weeks.map((week, weekIdx) => {
        const isLocked = weekIdx > currentWeekIndex + 1;
        const isCurrent = weekIdx === currentWeekIndex;

        return (
          <div key={weekIdx} className="space-y-2">
            <div className="flex items-center gap-2">
              <h2
                className={`font-serif text-lg font-medium ${
                  isLocked ? "text-gray-300" : "text-black"
                }`}
              >
                Týždeň {week.weekNumber}
              </h2>
              {isCurrent && <Chip label="Aktuálny" active />}
              {isLocked && (
                <Lock className="text-gray-300" size={14} strokeWidth={1.75} />
              )}
            </div>

            <div className="space-y-2">
              {week.days.map((day, dayIdx) => {
                const done = completedSessions.includes(day.id);
                const isTodaySession = isCurrent && dayIdx === currentDayIndex;
                const vs = day.videoSessionId
                  ? SEED_VIDEO_SESSIONS.find((v) => v.id === day.videoSessionId)
                  : null;

                return (
                  <Card
                    key={day.id}
                    className={`p-4 ${isLocked ? "opacity-30" : ""}`}
                  >
                    {isLocked ? (
                      <div>
                        <p className="text-sm text-gray-300">
                          {vs ? vs.title : day.title}
                        </p>
                        <p className="text-xs text-gray-300 mt-0.5">
                          + {day.exercises.length} cvikov
                        </p>
                      </div>
                    ) : (
                      <Link
                        href={`/session/${day.id}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          {/* Program video */}
                          {vs && (
                            <p className="font-medium text-black text-sm">
                              {vs.title}
                            </p>
                          )}
                          {/* Trainer exercises */}
                          <p className="text-xs text-gray-400 mt-0.5">
                            + {day.exercises.length} cvikov od trénera
                          </p>
                        </div>
                        {done ? (
                          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                            <Check size={14} className="text-white" strokeWidth={2} />
                          </div>
                        ) : isTodaySession ? (
                          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                            <Play size={12} className="text-white ml-0.5" fill="white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                            <Play size={12} className="text-gray-400 ml-0.5" fill="#999" />
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

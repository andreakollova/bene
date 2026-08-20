"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Play, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { Card, ProgressBar } from "@/components/ui";
import { SEED_VIDEO_SESSIONS } from "@/data/seedData";

export default function PlanPage() {
  const hydrated = useHydrated();
  const plan = useStore((s) => s.currentPlan);
  const completedSessions = useStore((s) => s.completedSessions);

  const allDays = useMemo(() => {
    if (!plan) return [];
    return plan.weeks.flatMap((w) => w.days);
  }, [plan]);

  if (!hydrated) return null;

  if (!plan) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="font-medium text-gray-400">Žiadny aktívny plán</p>
      </div>
    );
  }

  const totalDays = allDays.length;
  const completedCount = allDays.filter((d) => completedSessions.includes(d.id)).length;
  const progress = totalDays > 0 ? completedCount / totalDays : 0;

  return (
    <div className="w-full px-6 py-8 space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-black">Plán</h1>
        <p className="text-sm text-gray-400 mt-1">
          {completedCount} z {totalDays} tréningov
        </p>
      </div>

      <ProgressBar progress={progress} />

      <div className="space-y-2">
        {allDays.map((day, i) => {
          const done = completedSessions.includes(day.id);
          const vs = day.videoSessionId
            ? SEED_VIDEO_SESSIONS.find((v) => v.id === day.videoSessionId)
            : null;

          return (
            <Link key={day.id} href={`/session/${day.id}`}>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                        Session {String(i + 1).padStart(2, "0")}
                      </span>
                      {done && (
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                          · hotovo
                        </span>
                      )}
                    </div>
                    {vs && (
                      <p className="font-medium text-black text-sm mt-1">
                        {vs.title}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">
                      + {day.exercises.length} cvikov od trénera
                    </p>
                  </div>
                  {done ? (
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                      <Check size={14} className="text-white" strokeWidth={2} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                      <Play size={12} className="text-gray-400 ml-0.5" fill="#999" />
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

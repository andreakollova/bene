"use client";

import { Flame, Calendar, Award, Sprout, Dumbbell, Trophy } from "lucide-react";
import { BeneCelebrate, BeneOk } from "@/components/mascot";
import { Card, ProgressRing, ProgressBar } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";

const milestones = [
  { id: "first_week", label: "Prvý týždeň", threshold: 4, Icon: Sprout },
  { id: "ten_sessions", label: "10 cvičení", threshold: 10, Icon: Dumbbell },
  { id: "thirty_days", label: "30 dní v sérii", threshold: 30, Icon: Flame },
  { id: "plan_done", label: "Plán dokončený", threshold: 16, Icon: Trophy },
];

export default function PokrokPage() {
  const hydrated = useHydrated();
  const streak = useStore((s) => s.streak);
  const completedSessions = useStore((s) => s.completedSessions);
  const painLogs = useStore((s) => s.painLogs);
  const plan = useStore((s) => s.currentPlan);
  const currentWeekIndex = useStore((s) => s.currentWeekIndex);

  if (!hydrated) return null;

  const total = completedSessions.length;
  const planProgress = plan ? total / (plan.totalWeeks * 4) : 0;

  const today = new Date();
  const calendarDays = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (27 - i));
    return {
      day: d.getDate(),
      completed: completedSessions.some((s) => s.includes(d.toISOString().split("T")[0])),
    };
  });

  const recent = painLogs.slice(-10);
  const painCounts = {
    ok: recent.filter((p) => p.level === "ok").length,
    tight: recent.filter((p) => p.level === "tight").length,
    pain: recent.filter((p) => p.level === "pain").length,
  };

  return (
    <div className="w-full px-6 py-8 space-y-8">
      <h1 className="font-serif text-2xl font-semibold text-black">Pokrok</h1>

      {/* Streak + Bene */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-serif text-5xl font-semibold text-black leading-none">
            {streak}
          </p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
            {streak === 1 ? "deň v sérii" : "dní v sérii"}
          </p>
        </div>
        {streak >= 5 ? <BeneCelebrate size={72} /> : <BeneOk size={72} />}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 flex flex-col items-center gap-1">
          <Flame className="text-black" size={18} strokeWidth={1.5} />
          <span className="font-serif text-lg font-semibold text-black">{total}</span>
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">cvičení</span>
        </Card>
        <Card className="p-3 flex flex-col items-center gap-1">
          <span className="font-serif text-lg font-semibold text-black">
            {Math.round(planProgress * 100)}%
          </span>
          <ProgressBar progress={planProgress} />
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">plán</span>
        </Card>
        <Card className="p-3 flex flex-col items-center gap-1">
          <Calendar className="text-black" size={18} strokeWidth={1.5} />
          <span className="font-serif text-lg font-semibold text-black">
            {currentWeekIndex + 1}
          </span>
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">týždeň</span>
        </Card>
      </div>

      {/* Calendar heat */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 mb-4 tracking-widest uppercase">
          Posledné 4 týždne
        </p>
        <div className="grid grid-cols-7 gap-1">
          {["Po", "Ut", "St", "Št", "Pi", "So", "Ne"].map((d) => (
            <span key={d} className="text-center text-[10px] text-gray-300 pb-1 uppercase tracking-widest">
              {d}
            </span>
          ))}
          {calendarDays.map((d, i) => (
            <div
              key={i}
              className={`aspect-square rounded-input flex items-center justify-center text-xs ${
                d.completed
                  ? "bg-black text-white font-semibold"
                  : "bg-gray-100 text-gray-300"
              }`}
            >
              {d.day}
            </div>
          ))}
        </div>
      </div>

      {/* Pain trend */}
      {recent.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-gray-400 mb-4 tracking-widest uppercase">
            Pocity pri cvičení
          </p>
          <div className="space-y-3">
            {[
              { label: "V pohode", count: painCounts.ok, color: "bg-green-500" },
              { label: "Ťahá to", count: painCounts.tight, color: "bg-amber-400" },
              { label: "Bolí to", count: painCounts.pain, color: "bg-red-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{
                    width: `${Math.max(20, (item.count / Math.max(1, recent.length)) * 200)}px`,
                  }}
                />
                <span className="text-sm text-gray-400">
                  {item.label} ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 mb-4 tracking-widest uppercase">
          Míľniky
        </p>
        <div className="space-y-0 divide-y divide-gray-200">
          {milestones.map((m) => {
            const earned =
              m.id === "thirty_days" ? streak >= m.threshold : total >= m.threshold;
            return (
              <div key={m.id} className="flex items-center gap-3 py-4">
                <m.Icon
                  size={20}
                  strokeWidth={1.5}
                  className={earned ? "text-black" : "text-gray-300"}
                />
                <span
                  className={`flex-1 font-medium ${
                    earned ? "text-black" : "text-gray-300"
                  }`}
                >
                  {m.label}
                </span>
                {earned && (
                  <Award className="text-black" size={18} strokeWidth={1.5} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

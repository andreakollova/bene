"use client";

import { Flame, Calendar, Award, Sprout, Dumbbell, Trophy } from "lucide-react";
import { BeneCelebrate, BeneOk } from "@/components/mascot";
import { Card, ProgressRing } from "@/components/ui";
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
      <h1 className="font-serif text-2xl font-semibold text-ink">Pokrok</h1>

      {/* Streak */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-[56px] font-semibold text-ink leading-none">
              {streak}
            </p>
            <p className="text-ink-muted mt-1">
              {streak === 1 ? "deň v sérii" : "dní v sérii"}
            </p>
          </div>
          {streak >= 5 ? <BeneCelebrate size={80} /> : <BeneOk size={80} />}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 flex flex-col items-center gap-2">
          <Flame className="text-sage" size={20} strokeWidth={1.75} />
          <span className="font-serif text-xl font-medium text-ink">{total}</span>
          <span className="text-sm text-ink-muted">cvičení</span>
        </Card>
        <Card className="p-4 flex flex-col items-center gap-2">
          <ProgressRing progress={planProgress} size={40} strokeWidth={3} />
          <span className="font-serif text-xl font-medium text-ink">
            {Math.round(planProgress * 100)}%
          </span>
          <span className="text-sm text-ink-muted">plán</span>
        </Card>
        <Card className="p-4 flex flex-col items-center gap-2">
          <Calendar className="text-sage" size={20} strokeWidth={1.75} />
          <span className="font-serif text-xl font-medium text-ink">
            {plan?.weeks[0]?.weekNumber || 0}
          </span>
          <span className="text-sm text-ink-muted">týždeň</span>
        </Card>
      </div>

      {/* Calendar heat */}
      <div>
        <p className="text-xs font-semibold text-ink-muted mb-3 tracking-wide uppercase">
          Posledné 4 týždne
        </p>
        <div className="grid grid-cols-7 gap-1">
          {["Po", "Ut", "St", "Št", "Pi", "So", "Ne"].map((d) => (
            <span key={d} className="text-center text-xs text-ink-faint pb-1">
              {d}
            </span>
          ))}
          {calendarDays.map((d, i) => (
            <div
              key={i}
              className={`aspect-square rounded-input flex items-center justify-center text-xs ${
                d.completed
                  ? "bg-sage-soft text-sage font-semibold"
                  : "bg-cream-100 text-ink-faint"
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
          <p className="text-xs font-semibold text-ink-muted mb-3 tracking-wide uppercase">
            Pocity pri cvičení
          </p>
          <div className="space-y-2">
            {[
              { label: "V pohode", count: painCounts.ok, color: "bg-sage" },
              { label: "Ťahá to", count: painCounts.tight, color: "bg-amber" },
              { label: "Bolí to", count: painCounts.pain, color: "bg-clay" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{
                    width: `${Math.max(20, (item.count / Math.max(1, recent.length)) * 200)}px`,
                  }}
                />
                <span className="text-sm text-ink-muted">
                  {item.label} ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      <div>
        <p className="text-xs font-semibold text-ink-muted mb-3 tracking-wide uppercase">
          Míľniky
        </p>
        <div className="space-y-0 divide-y divide-cream-200">
          {milestones.map((m) => {
            const earned =
              m.id === "thirty_days" ? streak >= m.threshold : total >= m.threshold;
            return (
              <div key={m.id} className="flex items-center gap-3 py-3">
                <m.Icon
                  size={20}
                  strokeWidth={1.75}
                  className={earned ? "text-sage" : "text-ink-faint"}
                />
                <span
                  className={`flex-1 font-medium ${
                    earned ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  {m.label}
                </span>
                {earned && (
                  <Award className="text-sage" size={18} strokeWidth={1.75} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

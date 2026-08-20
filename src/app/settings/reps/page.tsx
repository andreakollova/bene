"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Minus, TrendingUp } from "lucide-react";
import { Card, Chip } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { EXERCISE_LIBRARY } from "@/data/seedData";

export default function RepSettingsPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const repSettings = useStore((s) => s.repSettings);
  const updateRepSettings = useStore((s) => s.updateRepSettings);
  const currentWeekIndex = useStore((s) => s.currentWeekIndex);

  if (!hydrated) return null;

  return (
    <div className="w-full px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <ArrowLeft className="text-ink" size={22} strokeWidth={1.75} />
        </button>
        <h1 className="font-serif text-xl font-medium text-ink">Opakovania</h1>
      </div>

      <div className="flex items-start gap-3 bg-sage-soft rounded-card p-4">
        <TrendingUp className="text-sage shrink-0 mt-0.5" size={20} strokeWidth={1.75} />
        <p className="text-sage-dark">
          Každý týždeň sa automaticky pridá nastavený počet opakovaní.
          Aktuálne si v týždni {currentWeekIndex + 1}.
        </p>
      </div>

      <div>
        <h2 className="font-serif text-xl font-medium text-ink">
          Nastavenia cvikov
        </h2>
        <p className="text-ink-muted mt-1">
          Nastav predvolené opakovania alebo sekundy pre každý cvik.
        </p>
      </div>

      <div className="space-y-3">
        {EXERCISE_LIBRARY.map((exercise) => {
          const s = repSettings[exercise.id] || {
            defaultReps:
              typeof exercise.reps === "number"
                ? exercise.reps
                : parseInt(String(exercise.reps)) || 30,
            defaultSets: exercise.sets,
            isTimed: typeof exercise.reps === "string",
            weeklyIncrement: typeof exercise.reps === "string" ? 5 : 2,
          };

          const currentReps = s.defaultReps + s.weeklyIncrement * currentWeekIndex;
          const update = (patch: Partial<typeof s>) =>
            updateRepSettings(exercise.id, { ...s, ...patch });

          return (
            <Card key={exercise.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-ink flex-1 mr-2 truncate">
                  {exercise.name}
                </span>
                <Chip
                  label={s.isTimed ? "Sekundy" : "Opakovania"}
                  active
                  onClick={() => update({ isTimed: !s.isTimed })}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Sets */}
                <div>
                  <p className="text-xs text-ink-muted mb-1">Série</p>
                  <div className="flex items-center bg-cream-200 rounded-input overflow-hidden">
                    <button
                      className="w-8 h-9 flex items-center justify-center"
                      onClick={() =>
                        update({ defaultSets: Math.max(1, s.defaultSets - 1) })
                      }
                    >
                      <Minus className="text-ink-muted" size={14} />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium text-ink">
                      {s.defaultSets}
                    </span>
                    <button
                      className="w-8 h-9 flex items-center justify-center"
                      onClick={() =>
                        update({ defaultSets: s.defaultSets + 1 })
                      }
                    >
                      <Plus className="text-ink-muted" size={14} />
                    </button>
                  </div>
                </div>

                {/* Reps */}
                <div>
                  <p className="text-xs text-ink-muted mb-1">
                    {s.isTimed ? "Sekúnd" : "Opak."}
                  </p>
                  <div className="flex items-center bg-cream-200 rounded-input overflow-hidden">
                    <button
                      className="w-8 h-9 flex items-center justify-center"
                      onClick={() =>
                        update({
                          defaultReps: Math.max(
                            1,
                            s.defaultReps - (s.isTimed ? 5 : 1)
                          ),
                        })
                      }
                    >
                      <Minus className="text-ink-muted" size={14} />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium text-ink">
                      {s.defaultReps}
                    </span>
                    <button
                      className="w-8 h-9 flex items-center justify-center"
                      onClick={() =>
                        update({
                          defaultReps:
                            s.defaultReps + (s.isTimed ? 5 : 1),
                        })
                      }
                    >
                      <Plus className="text-ink-muted" size={14} />
                    </button>
                  </div>
                </div>

                {/* Weekly increment */}
                <div>
                  <p className="text-xs text-ink-muted mb-1">+/týždeň</p>
                  <div className="flex items-center bg-cream-200 rounded-input overflow-hidden">
                    <button
                      className="w-8 h-9 flex items-center justify-center"
                      onClick={() =>
                        update({
                          weeklyIncrement: Math.max(
                            0,
                            s.weeklyIncrement - 1
                          ),
                        })
                      }
                    >
                      <Minus className="text-ink-muted" size={14} />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium text-ink">
                      {s.weeklyIncrement}
                    </span>
                    <button
                      className="w-8 h-9 flex items-center justify-center"
                      onClick={() =>
                        update({
                          weeklyIncrement: s.weeklyIncrement + 1,
                        })
                      }
                    >
                      <Plus className="text-ink-muted" size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-sm text-sage mt-3">
                Tento týždeň: {s.defaultSets}x{currentReps}
                {s.isTimed ? "s" : ""}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Minus,
  X,
  GripVertical,
  Play,
  Dumbbell,
} from "lucide-react";
import { BeneStretch } from "@/components/mascot";
import { Card, Button, Chip, Stepper } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { EXERCISE_LIBRARY } from "@/data/seedData";
import type { Exercise } from "@/data/seedData";

interface WorkoutExercise extends Exercise {
  customSets?: number;
  customReps?: number | string;
}

const categories = [
  { key: null, label: "Všetko" },
  { key: "chrbat", label: "Chrbát" },
  { key: "koleno", label: "Koleno" },
  { key: "rameno", label: "Rameno" },
  { key: "clenok", label: "Členok" },
  { key: "ine", label: "Mobilita" },
];

export default function BuilderPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const saveCustomWorkout = useStore((s) => s.saveCustomWorkout);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [showLib, setShowLib] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  if (!hydrated) return null;

  const filtered = filter
    ? EXERCISE_LIBRARY.filter((e) => e.bodyPart === filter)
    : EXERCISE_LIBRARY;

  const addExercise = (ex: Exercise) => {
    setExercises((p) => [
      ...p,
      { ...ex, customSets: ex.sets, customReps: ex.reps },
    ]);
    setShowLib(false);
  };

  const remove = (i: number) =>
    setExercises((p) => p.filter((_, idx) => idx !== i));

  const updateSets = (i: number, d: number) =>
    setExercises((p) =>
      p.map((e, idx) =>
        idx === i
          ? { ...e, customSets: Math.max(1, (e.customSets || e.sets) + d) }
          : e
      )
    );

  const updateReps = (i: number, d: number) =>
    setExercises((p) =>
      p.map((e, idx) => {
        if (idx !== i) return e;
        const cur =
          typeof e.customReps === "number"
            ? e.customReps
            : parseInt(String(e.customReps)) || 10;
        return { ...e, customReps: Math.max(1, cur + d) };
      })
    );

  const startWorkout = () => {
    if (exercises.length === 0) return;
    const workout = {
      id: `custom_${Date.now()}`,
      dayNumber: 0,
      title: "Vlastný tréning",
      exercises: exercises.map((e) => ({
        ...e,
        sets: e.customSets || e.sets,
        reps: e.customReps || e.reps,
      })),
    };
    saveCustomWorkout(workout);
    router.push(`/session/${workout.id}`);
  };

  const totalMin = Math.round(
    exercises.reduce((s, e) => s + (e.customSets || e.sets) * 1.5, 0)
  );

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <X className="text-ink-muted" size={22} strokeWidth={1.75} />
        </button>
        <h1 className="font-serif text-xl font-medium text-ink">
          Zostav tréning
        </h1>
        <div className="w-11" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-xl mx-auto w-full space-y-4">
        {exercises.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-10">
            <BeneStretch size={120} />
            <p className="font-serif text-xl font-medium text-ink">
              Poskladaj si tréning
            </p>
            <p className="text-ink-muted text-center">
              Vyber cviky z knižnice a nastav opakovania
            </p>
          </div>
        )}

        {exercises.map((ex, i) => (
          <Card key={`${ex.id}_${i}`} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <GripVertical className="text-ink-faint" size={18} />
              <span className="flex-1 font-medium text-ink">{ex.name}</span>
              <button onClick={() => remove(i)}>
                <X className="text-clay" size={16} strokeWidth={2} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-ink-muted mb-1">Série</p>
                <div className="flex items-center bg-cream-200 rounded-input overflow-hidden">
                  <button
                    className="w-10 h-10 flex items-center justify-center"
                    onClick={() => updateSets(i, -1)}
                  >
                    <Minus className="text-ink-muted" size={16} />
                  </button>
                  <span className="flex-1 text-center font-medium text-ink">
                    {ex.customSets || ex.sets}
                  </span>
                  <button
                    className="w-10 h-10 flex items-center justify-center"
                    onClick={() => updateSets(i, 1)}
                  >
                    <Plus className="text-ink-muted" size={16} />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-ink-muted mb-1">
                  {typeof ex.customReps === "string" &&
                  String(ex.customReps).includes("s")
                    ? "Sekúnd"
                    : "Opakovaní"}
                </p>
                <div className="flex items-center bg-cream-200 rounded-input overflow-hidden">
                  <button
                    className="w-10 h-10 flex items-center justify-center"
                    onClick={() => updateReps(i, -1)}
                  >
                    <Minus className="text-ink-muted" size={16} />
                  </button>
                  <span className="flex-1 text-center font-medium text-ink">
                    {ex.customReps || ex.reps}
                  </span>
                  <button
                    className="w-10 h-10 flex items-center justify-center"
                    onClick={() => updateReps(i, 1)}
                  >
                    <Plus className="text-ink-muted" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <button
          onClick={() => setShowLib(true)}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-sage rounded-btn text-sage font-medium hover:bg-sage-soft transition-colors"
        >
          <Plus size={20} strokeWidth={1.75} />
          Pridať cvik
        </button>

        {showLib && (
          <div className="mt-6">
            <h3 className="font-serif text-xl font-medium text-ink mb-3">
              Knižnica cvikov
            </h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
              {categories.map((c) => (
                <Chip
                  key={c.key || "all"}
                  label={c.label}
                  active={filter === c.key}
                  onClick={() => setFilter(c.key)}
                />
              ))}
            </div>
            <div className="divide-y divide-cream-200">
              {filtered.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => addExercise(ex)}
                  className="w-full flex items-center gap-3 py-3 text-left hover:bg-cream-100 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-sage-soft flex items-center justify-center shrink-0">
                    <Dumbbell
                      className="text-sage"
                      size={18}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink truncate">{ex.name}</p>
                    <p className="text-sm text-ink-muted">
                      {ex.sets}x{ex.reps} · {ex.bodyPart}
                    </p>
                  </div>
                  <Plus className="text-ink-faint shrink-0" size={18} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      {exercises.length > 0 && (
        <div className="border-t border-cream-200 bg-cream-50 px-6 py-4">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            <div>
              <p className="font-medium text-ink">
                {exercises.length} cvikov
              </p>
              <p className="text-sm text-ink-muted">~{totalMin} min</p>
            </div>
            <button
              onClick={startWorkout}
              className="inline-flex items-center gap-2 bg-sage text-white px-6 py-3 rounded-btn font-semibold hover:bg-sage-dark transition-colors"
            >
              <Play size={18} fill="white" />
              Začať tréning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

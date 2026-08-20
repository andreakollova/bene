"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { X, SkipForward } from "lucide-react";
import { BeneExercise, BeneRest, BeneConcerned } from "@/components/mascot";
import {
  ProgressBar,
  RepCounter,
  RestTimer,
  PainCheck,
  Button,
} from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";

type Phase = "exercise" | "rest" | "pain_check";

export default function SessionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const hydrated = useHydrated();
  const plan = useStore((s) => s.currentPlan);
  const customWorkouts = useStore((s) => s.customWorkouts);
  const logPain = useStore((s) => s.logPain);
  const completeSession = useStore((s) => s.completeSession);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<Phase>("exercise");
  const [restSeconds, setRestSeconds] = useState(30);

  if (!hydrated) return null;

  const dayPlan =
    plan?.weeks.flatMap((w) => w.days).find((d) => d.id === id) ||
    customWorkouts.find((w) => w.id === id);

  const exercises = dayPlan?.exercises || [];
  const ex = exercises[exerciseIndex];
  const total = exercises.length;
  const progress = total > 0 ? (exerciseIndex + 1) / total : 0;

  const moveNext = useCallback(() => {
    if (exerciseIndex < total - 1) {
      setExerciseIndex((p) => p + 1);
      setCurrentSet(1);
      setPhase("exercise");
    } else {
      if (id) completeSession(id);
      router.replace("/session/complete");
    }
  }, [exerciseIndex, total, completeSession, router, id]);

  const handleSetDone = useCallback(() => {
    if (!ex) return;
    if (currentSet < ex.sets) {
      setRestSeconds(ex.restSeconds);
      setPhase("rest");
    } else if (ex.painFlag) {
      setPhase("pain_check");
    } else {
      moveNext();
    }
  }, [ex, currentSet, moveNext]);

  const handleRestDone = useCallback(() => {
    setCurrentSet((p) => p + 1);
    setPhase("exercise");
  }, []);

  const handlePain = useCallback(
    (level: "ok" | "pulling" | "pain") => {
      if (ex) {
        const mapped = level === "pulling" ? "tight" : level;
        logPain({ date: new Date().toISOString().split("T")[0], exerciseId: ex.id, level: mapped as "ok" | "tight" | "pain" });
      }
      moveNext();
    },
    [ex, logPain, moveNext]
  );

  if (!dayPlan || !ex) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-cream-50">
        <p className="font-medium text-ink-muted">Cvičenie nenájdené</p>
        <Button onClick={() => router.back()} variant="ghost">
          Späť
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <X className="text-ink-muted" size={22} strokeWidth={1.75} />
        </button>
        <div className="flex-1">
          <ProgressBar progress={progress} />
        </div>
        <span className="text-sm font-semibold text-ink-muted min-w-[32px] text-right">
          {exerciseIndex + 1}/{total}
        </span>
      </div>

      {phase === "exercise" && (
        <div className="flex-1 flex flex-col px-6 max-w-xl mx-auto w-full">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {ex.name}
          </h2>
          <p className="text-ink-muted mt-1">{ex.description}</p>

          <div className="flex-1 flex items-center justify-center bg-cream-100 rounded-card my-6">
            <BeneExercise size={160} />
          </div>

          <div className="text-center mb-6">
            <RepCounter
              current={currentSet}
              total={ex.sets}
            />
            <p className="text-sm text-ink-muted mt-2">
              Séria {currentSet} z {ex.sets} · {ex.reps} {typeof ex.reps === "string" ? "" : "opakovaní"}
            </p>
          </div>

          <div className="space-y-3 pb-8">
            <Button onClick={handleSetDone} fullWidth>
              Hotovo
            </Button>
            <button
              onClick={moveNext}
              className="w-full flex items-center justify-center gap-2 py-2 text-ink-muted hover:text-ink transition-colors"
            >
              <SkipForward size={18} strokeWidth={1.75} />
              <span>Preskočiť cvik</span>
            </button>
          </div>
        </div>
      )}

      {phase === "rest" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <BeneRest size={140} />
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Oddych
          </h2>
          <RestTimer
            initialSeconds={restSeconds}
            onFinished={handleRestDone}
          />
          <Button onClick={handleRestDone} variant="ghost">
            Preskočiť oddych
          </Button>
        </div>
      )}

      {phase === "pain_check" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 max-w-md mx-auto w-full">
          <BeneConcerned size={120} />
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Ako to cítiš?
          </h2>
          <p className="text-ink-muted text-center">
            Ak bolesť pretrváva, porozprávaj sa so svojím fyzioterapeutom.
          </p>
          <PainCheck onSelect={handlePain} />
        </div>
      )}
    </div>
  );
}

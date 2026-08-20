"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
import { SEED_VIDEO_SESSIONS } from "@/data/seedData";

type Phase = "breathe" | "foam_roller" | "video" | "exercise" | "rest" | "pain_check";

const FOAM_ROLLER_SECONDS = 300;
const BREATHE_MESSAGES = [
  "Dnes nemusíš vidieť výsledok. Stačí vedieť, že každých pár minút, ktoré venuješ svojmu telu, je malý dar pre tvoje budúce ja.",
  "Nemusíš dnes urobiť veľa. Stačí urobiť niečo malé, za čo ti tvoje budúce ja raz potichu poďakuje.",
  "Dnes svojmu telu venuj pár minút pozornosti. Nosí ťa všade, kam chceš ísť — zaslúži si, aby si sa oň pekne starala.",
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

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
  const [phase, setPhase] = useState<Phase>("breathe");
  const [breathCount, setBreatheCount] = useState(5);
  const [restSeconds, setRestSeconds] = useState(30);

  const [foamSeconds, setFoamSeconds] = useState(FOAM_ROLLER_SECONDS);
  const foamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const dayPlan = plan?.weeks.flatMap((w) => w.days).find((d) => d.id === id)
    || customWorkouts.find((w) => w.id === id);
  const exercises = dayPlan?.exercises || [];
  const ex = exercises[exerciseIndex] || null;
  const total = exercises.length;
  const progress = total > 0 ? (exerciseIndex + 1) / total : 0;
  const videoSession = dayPlan?.videoSessionId
    ? SEED_VIDEO_SESSIONS.find((v) => v.id === dayPlan.videoSessionId) ?? null
    : null;

  const goToExercises = useCallback(() => {
    setPhase("exercise");
  }, []);

  const goToVideoOrExercises = useCallback(() => {
    if (videoSession) {
      setPhase("video");
    } else {
      setPhase("exercise");
    }
  }, [videoSession]);

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

  useEffect(() => {
    if (phase !== "foam_roller") {
      if (foamIntervalRef.current) {
        clearInterval(foamIntervalRef.current);
        foamIntervalRef.current = null;
      }
      return;
    }

    foamIntervalRef.current = setInterval(() => {
      setFoamSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(foamIntervalRef.current!);
          foamIntervalRef.current = null;
          setTimeout(() => {
            setPhase(videoSession ? "video" : "exercise");
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (foamIntervalRef.current) {
        clearInterval(foamIntervalRef.current);
        foamIntervalRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!hydrated || !dayPlan) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-white">
        <p className="font-medium text-gray-400">Cvičenie nenájdené</p>
        <Button onClick={() => router.back()} variant="ghost">
          Späť
        </Button>
      </div>
    );
  }

  // --- BREATHE PHASE ---
  if (phase === "breathe") {
    const msg = BREATHE_MESSAGES[Math.floor(Math.random() * BREATHE_MESSAGES.length)];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ backgroundColor: "#7C9070" }}>
        <style>{`
          @keyframes benePulse {
            0%, 100% { transform: scale(0.6); opacity: 0.3; }
            50% { transform: scale(1); opacity: 0.15; }
          }
        `}</style>

        <div className="flex flex-col items-center gap-10 max-w-xs text-center">
          {/* Pulsing circle */}
          <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
            {/* Outer pulse ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 180, height: 180,
                border: "1px solid rgba(255,255,255,0.3)",
                animation: "benePulse 6s ease-in-out infinite",
              }}
            />
            {/* Inner pulse ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 140, height: 140,
                backgroundColor: "rgba(255,255,255,0.1)",
                animation: "benePulse 6s ease-in-out infinite 0.5s",
              }}
            />
            {/* Center dot */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                animation: "breathing 6s ease-in-out infinite",
              }}
            />
          </div>

          <p className="text-white/60 text-[10px] uppercase tracking-widest">
            Priprav sa · dýchaj
          </p>

          <p className="font-serif text-lg text-white leading-relaxed">
            {msg}
          </p>

          <button
            onClick={() => setPhase("foam_roller")}
            className="w-full py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Pokračovať
          </button>
        </div>
      </div>
    );
  }

  // --- FOAM ROLLER PHASE ---
  if (phase === "foam_roller") {
    const pct = foamSeconds / FOAM_ROLLER_SECONDS;
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - pct);

    return (
      <div className="min-h-screen flex flex-col items-center justify-between bg-white">
        {/* Top bar */}
        <div className="w-full flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 flex items-center justify-center"
          >
            <X className="text-gray-400" size={22} strokeWidth={1.75} />
          </button>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Príprava</span>
          <div className="w-11" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 w-full max-w-sm">
          <h1 className="font-serif text-3xl font-semibold text-black text-center">
            Foam roller
          </h1>

          {/* Circular timer */}
          <div className="relative flex items-center justify-center" style={{ width: 144, height: 144 }}>
            <svg width="144" height="144" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
              <circle
                cx="72"
                cy="72"
                r={radius}
                fill="none"
                stroke="#E8E8E8"
                strokeWidth="2"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                fill="none"
                stroke="#111111"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.5s linear" }}
              />
            </svg>
            <span className="font-serif text-3xl font-semibold text-black" style={{ lineHeight: 1 }}>
              {formatTime(foamSeconds)}
            </span>
          </div>

          <BeneRest size={140} />

          <p className="text-gray-400 text-center text-sm leading-relaxed">
            Prejdi foam rollerom cez svaly, ktoré budeš dnes cvičiť. Pomaly, 30–60 sekúnd na každú oblasť.
          </p>
        </div>

        <div className="w-full px-6 pb-10">
          <button
            onClick={goToVideoOrExercises}
            className="w-full py-3 flex items-center justify-center gap-2 text-gray-400 hover:text-black transition-colors"
          >
            <SkipForward size={18} strokeWidth={1.75} />
            <span>Preskočiť</span>
          </button>
        </div>
      </div>
    );
  }

  // --- VIDEO PHASE ---
  if (phase === "video" && videoSession) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 flex items-center justify-center"
          >
            <X className="text-gray-400" size={22} strokeWidth={1.75} />
          </button>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Video</span>
          <div className="w-11" />
        </div>

        <div className="flex-1 flex flex-col px-6 gap-6 max-w-xl mx-auto w-full pb-8">
          <h2 className="font-serif text-2xl font-semibold text-black">
            {videoSession.title}
          </h2>

          <div className="rounded-[20px] overflow-hidden bg-black">
            <video
              src={videoSession.videoUrl}
              autoPlay
              controls
              playsInline
              style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "contain" }}
            />
          </div>

          {videoSession.description && (
            <p className="text-gray-400 text-sm leading-relaxed">
              {videoSession.description}
            </p>
          )}

          <div className="mt-auto pt-4">
            <button
              onClick={goToExercises}
              className="w-full py-3 rounded-full font-semibold text-[15px] bg-black text-white transition-opacity hover:opacity-80"
            >
              Ďalej
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guard for exercise phases
  if (!ex) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-white">
        <p className="font-medium text-gray-400">Cvičenie nenájdené</p>
        <Button onClick={() => router.back()} variant="ghost">
          Späť
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <X className="text-gray-400" size={22} strokeWidth={1.75} />
        </button>
        <div className="flex-1">
          <ProgressBar progress={progress} />
        </div>
        <span className="text-[10px] font-semibold text-gray-400 min-w-[32px] text-right uppercase tracking-widest">
          {exerciseIndex + 1}/{total}
        </span>
      </div>

      {phase === "exercise" && (
        <div className="flex-1 flex flex-col px-6 max-w-xl mx-auto w-full">
          <h2 className="font-serif text-2xl font-semibold text-black">
            {ex.name}
          </h2>
          <p className="text-gray-400 mt-1">{ex.description}</p>

          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-[20px] my-6">
            <BeneExercise size={160} />
          </div>

          <div className="text-center mb-6">
            <RepCounter
              current={currentSet}
              total={ex.sets}
            />
            <p className="text-sm text-gray-400 mt-2">
              Séria {currentSet} z {ex.sets} · {ex.reps} {typeof ex.reps === "string" ? "" : "opakovaní"}
            </p>
          </div>

          <div className="space-y-3 pb-8">
            <Button onClick={handleSetDone} fullWidth>
              Hotovo
            </Button>
            <button
              onClick={moveNext}
              className="w-full flex items-center justify-center gap-2 py-2 text-gray-400 hover:text-black transition-colors"
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
          <h2 className="font-serif text-2xl font-semibold text-black">
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
          <h2 className="font-serif text-2xl font-semibold text-black">
            Ako to cítiš?
          </h2>
          <p className="text-gray-400 text-center">
            Ak bolesť pretrváva, porozprávaj sa so svojím fyzioterapeutom.
          </p>
          <PainCheck onSelect={handlePain} />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Volume2, VolumeX, Repeat, Clock, Music } from "lucide-react";
import {
  SEED_VIDEO_SESSIONS,
  SEED_STRETCHES,
  SEED_TRAINER_REELS,
  EXERCISE_LIBRARY,
} from "@/data/seedData";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui";
import { BeneIdle, BeneOk, BeneCelebrate, BeneStretch } from "@/components/mascot";

const BENE_QUOTES = [
  { Mascot: BeneOk, text: "Super forma, len tak ďalej!" },
  { Mascot: BeneCelebrate, text: "Každé opakovanie sa počíta." },
  { Mascot: BeneIdle, text: "Dýchaj, sústreď sa na pohyb." },
  { Mascot: BeneStretch, text: "Tvoje telo ti poďakuje." },
  { Mascot: BeneOk, text: "Konzistentnosť je kľúč." },
  { Mascot: BeneCelebrate, text: "Si silnejšia ako včera!" },
  { Mascot: BeneIdle, text: "Pomaly a kontrolovane." },
  { Mascot: BeneStretch, text: "Rehabilitácia je tréning techniky." },
];

export default function VideoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [looping, setLooping] = useState(true);
  const repSettings = useStore((s) => s.repSettings);
  const currentWeekIndex = useStore((s) => s.currentWeekIndex);

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentSerie, setCurrentSerie] = useState(1);
  const [isRest, setIsRest] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const id = params?.id;

  const video =
    SEED_VIDEO_SESSIONS.find((v) => v.id === id) ||
    SEED_STRETCHES.find((v) => v.id === id) ||
    SEED_TRAINER_REELS.find((v) => v.id === id);

  const exercise = EXERCISE_LIBRARY.find(
    (e) => e.name === video?.title
  );

  if (!video) {
    return (
      <div className="w-full px-6 py-6 bg-white min-h-screen">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Spat</span>
        </button>
        <p className="font-serif text-xl text-black">Video nenájdené</p>
      </div>
    );
  }

  const isPortrait = video.orientation === "portrait";
  const isTrainerReel = video.type === "trainer_exercise";
  const isYouTube = video.videoUrl.includes("youtube.com");

  const settings = exercise
    ? repSettings[exercise.id] ?? {
        defaultReps:
          typeof exercise.reps === "number"
            ? exercise.reps
            : parseInt(String(exercise.reps)) || 30,
        defaultSets: exercise.sets,
        isTimed: typeof exercise.reps === "string",
        weeklyIncrement: typeof exercise.reps === "string" ? 5 : 2,
      }
    : null;

  const currentReps = settings
    ? settings.defaultReps + settings.weeklyIncrement * currentWeekIndex
    : null;

  const totalSets = settings?.defaultSets ?? 3;
  const exerciseDuration = currentReps ?? 30;
  const restDuration = 30;

  const startTimer = useCallback(() => {
    setTimerSeconds(exerciseDuration);
    setTimerRunning(true);
    setIsRest(false);
  }, [exerciseDuration]);

  const stopTimer = useCallback(() => {
    setTimerRunning(false);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setCurrentSerie(1);
    setIsRest(false);
    setTimerSeconds(exerciseDuration);
  }, [stopTimer, exerciseDuration]);

  useEffect(() => {
    if (!timerRunning) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          if (isRest) {
            setIsRest(false);
            setCurrentSerie((s) => s + 1);
            return exerciseDuration;
          } else if (currentSerie < totalSets) {
            setIsRest(true);
            return restDuration;
          } else {
            setTimerRunning(false);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, isRest, currentSerie, totalSets, exerciseDuration, restDuration]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted(!muted);
  };

  const toggleLoop = () => {
    if (videoRef.current) {
      videoRef.current.loop = !looping;
    }
    setLooping(!looping);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <ArrowLeft className="text-black" size={22} strokeWidth={1.75} />
        </button>
        <h1 className="font-serif text-lg text-black font-semibold flex-1 truncate">
          {video.title}
        </h1>
      </div>

      {/* Video player */}
      {isYouTube ? (
        <div className="w-full aspect-video overflow-hidden mx-0">
          <iframe
            src={`${video.videoUrl}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>
      ) : (
        <div
          className={`overflow-hidden bg-black ${
            isPortrait ? "mx-6 rounded-[20px]" : "w-full"
          }`}
          style={isPortrait ? { maxHeight: "60vh" } : undefined}
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            controls
            autoPlay
            playsInline
            loop={looping}
            muted={muted}
            className={
              isPortrait
                ? "w-full h-full object-contain"
                : "w-full"
            }
            style={isPortrait ? { maxHeight: "60vh" } : undefined}
          />
        </div>
      )}

      {/* Controls */}
      <div className="px-6 py-6 space-y-5">
        {/* Sound controls */}
        <div className="flex gap-2">
          <button
            onClick={toggleMute}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-sm font-medium transition-colors ${
              !muted
                ? "border-black text-black"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <Volume2 size={16} strokeWidth={1.75} />
            Zvuk videa
          </button>
          <button
            onClick={() => { setMuted(true); if (videoRef.current) videoRef.current.muted = true; }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-sm font-medium transition-colors ${
              muted
                ? "border-black text-black"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <Music size={16} strokeWidth={1.75} />
            Vlastná hudba
          </button>
          <button
            onClick={toggleLoop}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border text-sm font-medium transition-colors ${
              looping
                ? "border-black text-black"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <Repeat size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Workout timer for trainer reels */}
        {isTrainerReel && settings && (
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-black">
                Séria {currentSerie} z {totalSets}
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
                isRest
                  ? "bg-amber-100 text-amber-600"
                  : timerRunning
                  ? "bg-gray-100 text-black"
                  : "bg-gray-100 text-gray-400"
              }`}>
                {isRest ? "Oddych" : timerRunning ? "Cvičenie" : currentSerie > totalSets ? "Hotovo!" : "Pripravená"}
              </span>
            </div>

            <div className="text-center py-5">
              <p className="font-serif text-5xl font-semibold text-black" style={{ fontVariantNumeric: "tabular-nums" }}>
                {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, "0")}
              </p>
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                {isRest ? "oddych" : `${exerciseDuration}s na sériu · ${restDuration}s oddych`}
              </p>
            </div>

            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-5">
              <div
                className="h-full rounded-full transition-all duration-1000 bg-black"
                style={{
                  width: `${((isRest ? restDuration : exerciseDuration) - timerSeconds) / (isRest ? restDuration : exerciseDuration) * 100}%`,
                }}
              />
            </div>

            <div className="flex gap-2">
              {!timerRunning && currentSerie <= totalSets ? (
                <button
                  onClick={startTimer}
                  className="flex-1 py-2.5 rounded-full font-semibold text-sm bg-black text-white transition-opacity hover:opacity-80"
                >
                  {currentSerie === 1 && !isRest ? "Štart" : "Pokračovať"}
                </button>
              ) : timerRunning ? (
                <button
                  onClick={stopTimer}
                  className="flex-1 py-2.5 rounded-full border border-gray-200 font-semibold text-sm text-gray-400"
                >
                  Pauza
                </button>
              ) : (
                <button
                  onClick={resetTimer}
                  className="flex-1 py-2.5 rounded-full border border-gray-200 font-semibold text-sm text-gray-400"
                >
                  Znova
                </button>
              )}
              {(timerRunning || currentSerie > 1) && currentSerie <= totalSets && (
                <button
                  onClick={resetTimer}
                  className="px-4 py-2.5 rounded-full border border-gray-200 text-sm text-gray-400"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {video.description && (
          <p className="text-sm text-gray-400 leading-relaxed">
            {video.description}
          </p>
        )}

        {/* Bene motivational quote */}
        {(() => {
          const idx = Math.abs((video.id.length * 7 + video.title.length) % BENE_QUOTES.length);
          const { Mascot, text } = BENE_QUOTES[idx];
          return (
            <div className="flex items-center gap-4 border border-gray-200 rounded-[20px] p-4 mt-2">
              <Mascot size={50} />
              <p className="text-sm text-gray-400 italic flex-1">{text}</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

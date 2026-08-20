"use client";

import { useState, useRef } from "react";
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

  const id = params?.id;

  const video =
    SEED_VIDEO_SESSIONS.find((v) => v.id === id) ||
    SEED_STRETCHES.find((v) => v.id === id) ||
    SEED_TRAINER_REELS.find((v) => v.id === id);

  // Find matching exercise for reps info
  const exercise = EXERCISE_LIBRARY.find(
    (e) => e.name === video?.title
  );

  if (!video) {
    return (
      <div className="w-full px-6 py-6 bg-cream-50 min-h-screen">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-ink-muted mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Spat</span>
        </button>
        <p className="font-serif text-xl text-ink">Video nenájdené</p>
      </div>
    );
  }

  const isPortrait = video.orientation === "portrait";
  const isTrainerReel = video.type === "trainer_exercise";

  // Get reps info
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
    <div className="w-full bg-cream-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <ArrowLeft className="text-ink" size={22} strokeWidth={1.75} />
        </button>
        <h1 className="font-serif text-lg text-ink font-semibold flex-1 truncate">
          {video.title}
        </h1>
      </div>

      {/* Video player */}
      <div
        className={`overflow-hidden bg-black ${
          isPortrait ? "mx-6 rounded-card" : "w-full"
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
          className={
            isPortrait
              ? "w-full h-full object-contain"
              : "w-full"
          }
          style={isPortrait ? { maxHeight: "60vh" } : undefined}
        />
      </div>

      {/* Controls */}
      <div className="px-6 py-4 space-y-4">
        {/* Sound controls */}
        <div className="flex gap-2">
          <button
            onClick={toggleMute}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-btn border text-sm font-medium transition-colors ${
              !muted
                ? "border-sage text-sage"
                : "border-cream-200 text-ink-muted"
            }`}
          >
            <Volume2 size={16} strokeWidth={1.75} />
            Zvuk videa
          </button>
          <button
            onClick={() => { setMuted(true); if (videoRef.current) videoRef.current.muted = true; }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-btn border text-sm font-medium transition-colors ${
              muted
                ? "border-sage text-sage"
                : "border-cream-200 text-ink-muted"
            }`}
          >
            <Music size={16} strokeWidth={1.75} />
            Vlastná hudba
          </button>
          <button
            onClick={toggleLoop}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-btn border text-sm font-medium transition-colors ${
              looping
                ? "border-sage text-sage"
                : "border-cream-200 text-ink-muted"
            }`}
          >
            <Repeat size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Reps info for trainer reels */}
        {isTrainerReel && settings && (
          <div className="bg-cream-100 border border-cream-200 rounded-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-sage" strokeWidth={1.75} />
              <span className="text-sm font-semibold text-ink">
                Koľko robiť
              </span>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="font-serif text-2xl font-semibold text-ink">
                  {settings.defaultSets}
                </p>
                <p className="text-xs text-ink-muted">série</p>
              </div>
              <div className="w-px bg-cream-200" />
              <div>
                <p className="font-serif text-2xl font-semibold text-ink">
                  {currentReps}{settings.isTimed ? "s" : ""}
                </p>
                <p className="text-xs text-ink-muted">
                  {settings.isTimed ? "sekúnd" : "opakovaní"}
                </p>
              </div>
              <div className="w-px bg-cream-200" />
              <div>
                <p className="font-serif text-2xl font-semibold text-ink">
                  30s
                </p>
                <p className="text-xs text-ink-muted">oddych</p>
              </div>
            </div>
            <p className="text-xs text-ink-faint mt-2">
              Týždeň {currentWeekIndex + 1} · +{settings.weeklyIncrement}/týždeň
            </p>
          </div>
        )}

        {/* Description */}
        {video.description && (
          <p className="text-sm text-ink-muted leading-relaxed">
            {video.description}
          </p>
        )}

        {/* Bene motivational quote */}
        {(() => {
          const idx = Math.abs((video.id.length * 7 + video.title.length) % BENE_QUOTES.length);
          const { Mascot, text } = BENE_QUOTES[idx];
          return (
            <div className="flex items-center gap-3 bg-cream-100 rounded-card p-3 mt-2">
              <Mascot size={50} />
              <p className="text-sm text-ink-muted italic flex-1">{text}</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

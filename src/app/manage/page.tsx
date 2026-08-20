"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Pencil,
  Check,
  Shuffle,
} from "lucide-react";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { SEED_TRAINER_REELS } from "@/data/seedData";
import type { VideoSession } from "@/data/seedData";

// ---------------------------------------------------------------------------
// Reel set definitions
// ---------------------------------------------------------------------------

interface ReelSet {
  id: string;
  label: string;
  reels: VideoSession[];
}

const REEL_SETS: ReelSet[] = [
  {
    id: "iam",
    label: "I AM Academy",
    reels: SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_iam_")),
  },
  {
    id: "sport_s1",
    label: "SportWell – Séria 1",
    reels: SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s1")),
  },
  {
    id: "sport_s2",
    label: "SportWell – Séria 2",
    reels: SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s2")),
  },
  {
    id: "sport_s3",
    label: "SportWell – Séria 3",
    reels: SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s3")),
  },
  {
    id: "sport_s4",
    label: "SportWell – Séria 4",
    reels: SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s4")),
  },
  {
    id: "sport_s5",
    label: "SportWell – Séria 5",
    reels: SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s5")),
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        checked ? "bg-sage" : "bg-cream-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function ExerciseRow({
  reel,
  included,
  customTitle,
  onToggle,
  onSaveTitle,
}: {
  reel: VideoSession;
  included: boolean;
  customTitle: string | undefined;
  onToggle: (included: boolean) => void;
  onSaveTitle: (title: string) => void;
}) {
  const displayTitle = customTitle ?? reel.title;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayTitle);

  function commitEdit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== reel.title) {
      onSaveTitle(trimmed);
    } else if (!trimmed) {
      // revert to original if empty
      setDraft(displayTitle);
    }
    setEditing(false);
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-cream-200 last:border-0">
      {/* Thumbnail */}
      {reel.coverUrl ? (
        <img
          src={reel.coverUrl}
          alt={displayTitle}
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-cream-200"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-cream-200 flex-shrink-0" />
      )}

      {/* Title area */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEdit();
                if (e.key === "Escape") {
                  setDraft(displayTitle);
                  setEditing(false);
                }
              }}
              className="flex-1 min-w-0 text-sm font-medium text-ink bg-cream-50 border border-sage rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sage"
            />
            <button
              type="button"
              onClick={commitEdit}
              className="text-sage flex-shrink-0"
              aria-label="Potvrdiť"
            >
              <Check size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-ink truncate">{displayTitle}</p>
            <button
              type="button"
              onClick={() => {
                setDraft(displayTitle);
                setEditing(true);
              }}
              className="text-ink-faint hover:text-ink-muted flex-shrink-0"
              aria-label="Upraviť názov"
            >
              <Pencil size={13} />
            </button>
          </div>
        )}
        {customTitle && customTitle !== reel.title && (
          <p className="text-[11px] text-ink-faint mt-0.5 truncate">
            Pôvodne: {reel.title}
          </p>
        )}
      </div>

      {/* Toggle */}
      <div className="flex-shrink-0">
        <Toggle checked={included} onChange={onToggle} />
      </div>
    </div>
  );
}

function ReelSetSection({
  reelSet,
  hiddenExercises,
  customVideoTitles,
  onToggleExercise,
  onSaveTitle,
}: {
  reelSet: ReelSet;
  hiddenExercises: string[];
  customVideoTitles: Record<string, string>;
  onToggleExercise: (id: string, included: boolean) => void;
  onSaveTitle: (id: string, title: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const includedCount = reelSet.reels.filter(
    (r) => !hiddenExercises.includes(r.id)
  ).length;

  return (
    <Card className="mb-3 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="text-left">
          <p className="font-medium text-ink">{reelSet.label}</p>
          <p className="text-sm text-ink-muted mt-0.5">
            {includedCount} / {reelSet.reels.length} cvičení
          </p>
        </div>
        {expanded ? (
          <ChevronDown className="text-ink-faint flex-shrink-0" size={18} />
        ) : (
          <ChevronRight className="text-ink-faint flex-shrink-0" size={18} />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-2">
          {reelSet.reels.map((reel) => (
            <ExerciseRow
              key={reel.id}
              reel={reel}
              included={!hiddenExercises.includes(reel.id)}
              customTitle={customVideoTitles[reel.id]}
              onToggle={(included) => onToggleExercise(reel.id, included)}
              onSaveTitle={(title) => onSaveTitle(reel.id, title)}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ManagePage() {
  const router = useRouter();
  const hydrated = useHydrated();

  const currentPlan = useStore((s) => s.currentPlan);
  const hiddenExercises = useStore((s) => s.hiddenExercises);
  const markedWeeks = useStore((s) => s.markedWeeks);
  const customVideoTitles = useStore((s) => s.customVideoTitles);

  const hideExercise = useStore((s) => s.hideExercise);
  const unhideExercise = useStore((s) => s.unhideExercise);
  const markWeekDone = useStore((s) => s.markWeekDone);
  const unmarkWeekDone = useStore((s) => s.unmarkWeekDone);
  const setVideoTitle = useStore((s) => s.setVideoTitle);
  const shuffleExercises = useStore((s) => s.shuffleExercises);

  const [shuffled, setShuffled] = useState(false);

  if (!hydrated) return null;

  function handleToggleExercise(id: string, included: boolean) {
    if (included) {
      unhideExercise(id);
    } else {
      hideExercise(id);
    }
  }

  function handleToggleWeek(weekNumber: number, done: boolean) {
    if (done) {
      markWeekDone(weekNumber);
    } else {
      unmarkWeekDone(weekNumber);
    }
  }

  function handleShuffle() {
    shuffleExercises();
    setShuffled(true);
    setTimeout(() => setShuffled(false), 2000);
  }

  const weeks = currentPlan?.weeks ?? [];

  return (
    <div className="w-full px-6 py-6 space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-ink-muted hover:text-ink transition-colors"
          aria-label="Späť"
        >
          <ArrowLeft size={22} strokeWidth={1.75} />
        </button>
        <h1 className="font-serif text-2xl font-semibold text-ink">
          Spravovať tréningy
        </h1>
      </div>

      {/* Section: Moje tréningy */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          MOJE TRÉNINGY
        </p>
        {REEL_SETS.map((set) => (
          <ReelSetSection
            key={set.id}
            reelSet={set}
            hiddenExercises={hiddenExercises}
            customVideoTitles={customVideoTitles}
            onToggleExercise={handleToggleExercise}
            onSaveTitle={setVideoTitle}
          />
        ))}
      </div>

      {/* Section: Týždne */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          TÝŽDNE
        </p>
        {weeks.length === 0 && (
          <Card className="p-4">
            <p className="text-sm text-ink-muted">Žiadny aktívny plán.</p>
          </Card>
        )}
        {weeks.map((week) => {
          const isDone = markedWeeks.includes(week.weekNumber);
          const exerciseCount = week.days.reduce(
            (sum, d) => sum + d.exercises.length,
            0
          );
          return (
            <Card key={week.weekNumber} className="mb-2">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-medium text-ink">
                    Týždeň {week.weekNumber}
                    {" "}
                    <span className="font-normal text-ink-muted">
                      — {week.title}
                    </span>
                  </p>
                  <p className="text-sm text-ink-muted mt-0.5">
                    {exerciseCount} cvičení · {week.days.length} tréningov
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isDone && (
                    <span className="text-[11px] font-semibold text-sage uppercase tracking-wide">
                      Hotovo
                    </span>
                  )}
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={(e) =>
                      handleToggleWeek(week.weekNumber, e.target.checked)
                    }
                    className="w-5 h-5 rounded accent-sage cursor-pointer"
                    aria-label={`Týždeň ${week.weekNumber} hotový`}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Section: Shuffle */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          SHUFFLE
        </p>
        <Card className="p-5">
          <p className="text-sm text-ink-muted mb-4">
            Náhodne zamiešaj poradie cvičení v každom tréningu plánu.
          </p>
          <Button
            onClick={handleShuffle}
            icon={<Shuffle size={16} />}
            disabled={!currentPlan}
            fullWidth
          >
            {shuffled ? "Zamiešané!" : "Zamiešať cvičenia"}
          </Button>
          {!currentPlan && (
            <p className="text-xs text-ink-faint mt-3 text-center">
              Najprv aktivuj plán v domovskej obrazovke.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Play,
  Check,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { BeneIdle, BeneCelebrate } from "@/components/mascot";
import {
  Card,
  ProgressBar,
  StreakDots,
  QuoteCard,
  VideoCard,
} from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";
import { quotes } from "@/data/quotes";
import {
  SEED_VIDEO_SESSIONS,
  SEED_STRETCHES,
  SEED_TRAINER_REELS,
} from "@/data/seedData";

export default function DomovPage() {
  const hydrated = useHydrated();
  const plan = useStore((s) => s.currentPlan);
  const streak = useStore((s) => s.streak);
  const completedSessions = useStore((s) => s.completedSessions);
  const currentWeekIndex = useStore((s) => s.currentWeekIndex);
  const currentDayIndex = useStore((s) => s.currentDayIndex);

  const currentWeek = plan?.weeks[currentWeekIndex];
  const currentDay = currentWeek?.days[currentDayIndex];
  const todayDone = currentDay
    ? completedSessions.includes(currentDay.id)
    : false;

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const dailyQuote = quotes[dayOfYear % quotes.length];

  const totalDays = plan ? plan.totalWeeks * 4 : 1;
  const completedCount = completedSessions.length;
  const planProgress = completedCount / totalDays;

  const weekProgress = useMemo(() => {
    if (!currentWeek) return Array(7).fill(false);
    const completed = currentWeek.days.map((d) =>
      completedSessions.includes(d.id)
    );
    while (completed.length < 7) completed.push(false);
    return completed;
  }, [currentWeek, completedSessions]);

  const today = new Date().getDay();
  const adjustedDay = today === 0 ? 6 : today - 1;

  const trainerSets = useMemo(() => {
    const iamReels = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_iam"));
    // Group sport reels by equipment type
    const sportS1 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s1"));
    const sportS2 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s2"));
    const sportS3 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s3"));
    const sportS4 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s4"));
    const sportS5 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s5"));

    const sets: { label: string; reels: typeof SEED_TRAINER_REELS }[] = [
      { label: "I AM Academy", reels: iamReels },
    ];
    if (sportS1.length) sets.push({ label: "Tréning s jednoručkami", reels: sportS1 });
    if (sportS2.length) sets.push({ label: "Tréning s kladkou", reels: sportS2 });
    if (sportS3.length) sets.push({ label: "Tréning na lavičke", reels: sportS3 });
    if (sportS4.length) sets.push({ label: "Tréning s fitloptou", reels: sportS4 });
    if (sportS5.length) sets.push({ label: "Tréning s expanderom", reels: sportS5 });
    return sets;
  }, []);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse font-serif text-xl text-ink-muted">Bene</div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-6 space-y-6">
      {/* ── Logo ── */}
      <div className="text-center pt-2 pb-1">
        <h1 className="font-serif text-2xl font-semibold text-ink tracking-tight">Bene</h1>
      </div>

      {/* ── Pokračovať v programe ── */}
      <section>
        {todayDone ? (
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <BeneCelebrate size={80} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Check size={18} strokeWidth={2} style={{ color: "#7C9070" }} />
                  <span className="font-serif text-lg font-semibold" style={{ color: "#7C9070" }}>
                    Hotovo na dnes
                  </span>
                </div>
                <p className="text-sm text-ink-muted">
                  Zajtra ťa čaká deň {currentWeekIndex * 4 + currentDayIndex + 2}
                </p>
              </div>
            </div>
          </Card>
        ) : currentDay ? (
          <Card className="p-5">
            <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-2">
              TÝŽDEŇ {currentWeekIndex + 1} · DEŇ {currentDayIndex + 1}
            </p>
            <h2 className="font-serif text-xl font-semibold text-ink">
              Pokračovať v programe
            </h2>
            {/* Program video name */}
            {(() => {
              const vs = currentDay.videoSessionId
                ? SEED_VIDEO_SESSIONS.find((v) => v.id === currentDay.videoSessionId)
                : null;
              // Determine trainer set type from exercises
              const exNames = currentDay.exercises.map((e) => e.name);
              const hasIAM = exNames.some((n) =>
                SEED_TRAINER_REELS.some((r) => r.id.startsWith("reel_iam") && r.title === n)
              );
              const trainerLabel = hasIAM ? "I AM Academy" : currentWeekIndex >= 2 ? "SportWell" : "Tréner";
              return (
                <div className="text-sm text-ink-muted mt-1 mb-4 space-y-1">
                  {vs && <p>Video: {vs.title}</p>}
                  <p>+ {currentDay.exercises.length} cviky ({trainerLabel})</p>
                </div>
              );
            })()}

            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
              <span>{completedCount} z {totalDays} cvičení</span>
              <span>{Math.round(planProgress * 100)}%</span>
            </div>
            <ProgressBar progress={planProgress} />

            <div className="flex items-end justify-between mt-5">
              <BeneIdle size={80} />
              <Link
                href={`/session/${currentDay.id}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-btn font-semibold text-[15px] transition-colors"
                style={{ backgroundColor: "#3D3929", color: "#FAF9F5" }}
              >
                <Play size={16} fill="#FAF9F5" color="#FAF9F5" />
                Začať
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-5 flex items-center gap-4">
            <BeneIdle size={70} />
            <p className="font-medium text-ink-muted">Dnes je voľný deň</p>
          </Card>
        )}
      </section>

      {/* ── Séria + Týždeň ── */}
      <div className="flex gap-3">
        <Card className="flex-1 p-4 text-center">
          <p className="font-serif text-2xl font-semibold text-ink">{streak}</p>
          <p className="text-xs text-ink-muted mt-0.5">
            {streak === 1 ? "deň v sérii" : "dní v sérii"}
          </p>
        </Card>
        <Card className="flex-1 p-4 text-center">
          <p className="font-serif text-2xl font-semibold text-ink">
            {currentWeekIndex + 1}/{plan?.totalWeeks || 4}
          </p>
          <p className="text-xs text-ink-muted mt-0.5">týždeň</p>
        </Card>
      </div>

      {/* ── Tento týždeň ── */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          TENTO TÝŽDEŇ
        </p>
        <StreakDots completedDays={weekProgress} currentDay={adjustedDay} />
      </div>

      {/* ── Citát ── */}
      <QuoteCard quote={dailyQuote} />

      {/* ── Videá programu ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-xl font-medium text-ink">
            Videá programu
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {SEED_VIDEO_SESSIONS.map((v) => (
            <Link key={v.id} href={`/video/${v.id}`}>
              <VideoCard
                title={v.title}
                duration={`${v.durationMinutes} min`}
                type={v.type === "strengthening" ? "Posilňovanie" : "Rutina"}
                coverSrc={v.coverUrl}
                orientation="landscape"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Strečing ── */}
      <section>
        <h2 className="font-serif text-xl font-medium text-ink mb-3">Strečing</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {SEED_STRETCHES.map((v) => (
            <Link key={v.id} href={`/video/${v.id}`}>
              <VideoCard
                title={v.title}
                duration={`${v.durationMinutes} min`}
                type="Strečing"
                coverSrc={v.coverUrl}
                orientation="landscape"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Tréningy od trénerov ── */}
      {trainerSets.map((set) => (
        <section key={set.label}>
          <h2 className="font-serif text-xl font-medium text-ink mb-3">
            {set.label}
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {set.reels.map((v) => (
              <Link key={v.id} href={`/video/${v.id}`}>
                <VideoCard
                  title={v.title}
                  duration={`${v.durationMinutes} min`}
                  type="Cvik"
                  coverSrc={v.coverUrl}
                  orientation="portrait"
                />
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="pb-8" />
    </div>
  );
}

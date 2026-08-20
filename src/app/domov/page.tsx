"use client";

import { useMemo, useState, useCallback } from "react";
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

  // Manual day toggles (for swimming, other training)
  const weekKey = `bene_manual_week_${currentWeekIndex}`;
  const [manualDays, setManualDays] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return Array(7).fill(false);
    try { return JSON.parse(localStorage.getItem(weekKey) || "[]") || Array(7).fill(false); }
    catch { return Array(7).fill(false); }
  });

  const toggleManualDay = useCallback((day: number) => {
    setManualDays((prev) => {
      const next = [...prev];
      while (next.length < 7) next.push(false);
      next[day] = !next[day];
      localStorage.setItem(weekKey, JSON.stringify(next));
      return next;
    });
  }, [weekKey]);

  const mergedWeekProgress = useMemo(() => {
    const merged = [...weekProgress];
    while (merged.length < 7) merged.push(false);
    for (let i = 0; i < 7; i++) {
      if (manualDays[i]) merged[i] = true;
    }
    return merged;
  }, [weekProgress, manualDays]);

  const trainerSets = useMemo(() => {
    const iamReels = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_iam"));
    const sportS1 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s1"));
    const sportS2 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s2"));
    const sportS3 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s3"));
    const sportS4 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s4"));
    const sportS5 = SEED_TRAINER_REELS.filter((r) => r.id.startsWith("reel_sport_s5"));

    const sets: { label: string; reels: typeof SEED_TRAINER_REELS }[] = [
      { label: "I AM Academy", reels: iamReels },
    ];
    if (sportS1.length) sets.push({ label: "SportWell Blackpink", reels: sportS1 });
    if (sportS2.length) sets.push({ label: "SportWell White", reels: sportS2 });
    if (sportS3.length) sets.push({ label: "SportWell All Black", reels: sportS3 });
    if (sportS4.length) sets.push({ label: "SportWell Pink", reels: sportS4 });
    if (sportS5.length) sets.push({ label: "SportWell Blue", reels: sportS5 });
    return sets;
  }, []);

  const equipmentCategories = useMemo(() => {
    const cats: Record<string, typeof SEED_TRAINER_REELS> = {
      "Vlastná váha": [],
      "S expanderom": [],
      "S činkami": [],
      "S fitloptou": [],
      "Na lavičke": [],
      "Pri stene": [],
      "S foam rollerom": [],
    };
    for (const r of SEED_TRAINER_REELS) {
      const t = r.title.toLowerCase();
      const d = r.description.toLowerCase();
      const text = t + " " + d;
      if (text.includes("expand") || text.includes("kladk")) cats["S expanderom"].push(r);
      else if (text.includes("čink") || text.includes("jednoruč") || text.includes("kettlebell")) cats["S činkami"].push(r);
      else if (text.includes("fitlopt") || text.includes("lopt")) cats["S fitloptou"].push(r);
      else if (text.includes("lavičk") || text.includes("prone")) cats["Na lavičke"].push(r);
      else if (text.includes("sten") || text.includes("wall")) cats["Pri stene"].push(r);
      else if (text.includes("foam") || text.includes("roller")) cats["S foam rollerom"].push(r);
      else cats["Vlastná váha"].push(r);
    }
    return Object.entries(cats)
      .filter(([, reels]) => reels.length > 0)
      .map(([label, reels]) => ({ label, reels }));
  }, []);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse font-serif text-xl text-gray-400">Bene</div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8 space-y-8">
      {/* ── Pokračovať v programe ── */}
      <section>
        {todayDone ? (
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <BeneCelebrate size={80} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Check size={18} strokeWidth={2} className="text-black" />
                  <span className="font-serif text-lg font-semibold text-black">
                    Hotovo na dnes
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Zajtra ťa čaká deň {currentWeekIndex * 4 + currentDayIndex + 2}
                </p>
              </div>
            </div>
          </Card>
        ) : currentDay ? (
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
                  TÝŽDEŇ {currentWeekIndex + 1} · DEŇ {currentDayIndex + 1}
                </p>
                <h2 className="font-serif text-xl font-semibold text-black">
                  Pokračovať v programe
                </h2>
              </div>
              <BeneIdle size={56} />
            </div>

            {/* Today's content */}
            {(() => {
              const vs = currentDay.videoSessionId
                ? SEED_VIDEO_SESSIONS.find((v) => v.id === currentDay.videoSessionId)
                : null;
              return (
                <div className="space-y-2 mb-5">
                  {vs && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span className="text-sm text-black">{vs.title}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="text-sm text-gray-400">
                      {currentDay.exercises.length} {currentDay.exercises.length < 5 ? "cviky" : "cvikov"} od trénera
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Progress */}
            <ProgressBar progress={planProgress} />
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
              {completedCount} z {totalDays} · {Math.round(planProgress * 100)}%
            </p>

            {/* CTA */}
            <Link
              href={`/session/${currentDay.id}`}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-[15px] bg-black text-white transition-opacity hover:opacity-80"
            >
              <Play size={16} fill="white" color="white" />
              Začať tréning
            </Link>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <BeneIdle size={70} />
              <div>
                <h2 className="font-serif text-lg font-semibold text-black">
                  Máš chuť si dnes zacvičiť?
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">Dnes nemáš naplánovaný tréning</p>
              </div>
            </div>
            <div className="flex gap-2">
              {plan && currentDay === undefined && plan.weeks[currentWeekIndex]?.days[0] && (
                <Link
                  href={`/session/${plan.weeks[currentWeekIndex].days[0].id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm bg-black text-white transition-opacity hover:opacity-80"
                >
                  <Play size={14} fill="white" color="white" />
                  Pokračovať
                </Link>
              )}
              <Link
                href="/builder"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm border border-black text-black transition-opacity hover:opacity-70"
              >
                Vybrať tréning
              </Link>
            </div>
          </Card>
        )}
      </section>

      {/* ── Séria ── */}
      <Card className="p-5 flex items-center justify-between">
        <div>
          <p className="font-serif text-3xl font-semibold text-black">{streak}</p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
            {streak === 1 ? "deň v sérii" : "dní v sérii"}
          </p>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          {completedCount} / {totalDays} sessions
        </p>
      </Card>

      {/* ── Tento týždeň ── */}
      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-4">
          TENTO TÝŽDEŇ
        </p>
        <StreakDots completedDays={mergedWeekProgress} currentDay={adjustedDay} onToggle={toggleManualDay} />
      </div>

      {/* ── Citát ── */}
      <QuoteCard quote={dailyQuote} />

      {/* ── Videá programu ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-medium text-black">
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
        <h2 className="font-serif text-xl font-medium text-black mb-4">Strečing</h2>
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
          <h2 className="font-serif text-xl font-medium text-black mb-4">
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

      {/* ── Podľa vybavenia ── */}
      <section>
        <h2 className="font-serif text-xl font-medium text-black mb-4">
          Podľa vybavenia
        </h2>
        <div className="space-y-3">
          {equipmentCategories.map((cat) => (
            <Link
              key={cat.label}
              href={`/cviky/${encodeURIComponent(cat.label)}`}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-[20px] p-3 active:bg-gray-100 transition-colors"
            >
              <div className="shrink-0">
                <p className="font-medium text-black text-sm">{cat.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">
                  {cat.reels.length} {cat.reels.length === 1 ? "cvik" : cat.reels.length < 5 ? "cviky" : "cvikov"}
                </p>
              </div>
              <div className="flex-1 flex gap-1.5 justify-end">
                {cat.reels.slice(0, 4).map((r, i) => (
                  <div key={i} className="w-12 h-12 rounded-[10px] overflow-hidden shrink-0">
                    {r.coverUrl ? (
                      <img src={r.coverUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pb-2" />
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { SEED_TRAINER_REELS } from "@/data/seedData";

function categorizeReels() {
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
    const text = (r.title + " " + r.description).toLowerCase();
    if (text.includes("expand") || text.includes("kladk")) cats["S expanderom"].push(r);
    else if (text.includes("čink") || text.includes("jednoruč") || text.includes("kettlebell")) cats["S činkami"].push(r);
    else if (text.includes("fitlopt") || text.includes("lopt")) cats["S fitloptou"].push(r);
    else if (text.includes("lavičk") || text.includes("prone")) cats["Na lavičke"].push(r);
    else if (text.includes("sten") || text.includes("wall")) cats["Pri stene"].push(r);
    else if (text.includes("foam") || text.includes("roller")) cats["S foam rollerom"].push(r);
    else cats["Vlastná váha"].push(r);
  }
  return cats;
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const hydrated = useHydrated();

  const cats = useMemo(() => categorizeReels(), []);
  const label = decodeURIComponent(category || "");
  const reels = cats[label] || [];

  if (!hydrated) return null;

  return (
    <div className="w-full px-6 py-8 space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <ArrowLeft className="text-black" size={22} strokeWidth={1.75} />
        </button>
        <div>
          <h1 className="font-serif text-xl font-semibold text-black">{label}</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
            {reels.length} {reels.length === 1 ? "cvik" : reels.length < 5 ? "cviky" : "cvikov"}
          </p>
        </div>
      </div>

      {reels.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">Žiadne cviky v tejto kategórii</p>
      ) : (
        <div className="space-y-3">
          {reels.map((v) => (
            <Link
              key={v.id}
              href={`/video/${v.id}`}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-[20px] p-3 active:bg-gray-100 transition-colors"
            >
              <div className="w-16 h-16 rounded-input overflow-hidden shrink-0">
                {v.coverUrl ? (
                  <img src={v.coverUrl} alt={v.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-black text-sm leading-tight">{v.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{v.description}</p>
              </div>
              <Play size={14} className="text-gray-300 shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

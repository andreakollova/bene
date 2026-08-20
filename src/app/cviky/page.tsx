"use client";

import { useMemo } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHydrated } from "@/hooks/useHydrated";
import { SEED_TRAINER_REELS } from "@/data/seedData";

export default function CvikyPage() {
  const router = useRouter();
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <div className="w-full px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center"
        >
          <ArrowLeft className="text-ink" size={22} strokeWidth={1.75} />
        </button>
        <h1 className="font-serif text-xl font-medium text-ink">
          Všetky cviky od trénerov
        </h1>
      </div>

      <div className="space-y-2">
        {SEED_TRAINER_REELS.map((v) => (
          <a
            key={v.id}
            href={v.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-cream-100 border border-cream-200 rounded-card p-3 active:bg-cream-200 transition-colors"
          >
            <div className="w-14 h-14 rounded-input overflow-hidden shrink-0">
              {v.coverUrl ? (
                <img
                  src={v.coverUrl}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cream-200" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-ink text-sm leading-tight truncate">
                {v.title}
              </p>
              <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">
                {v.description}
              </p>
            </div>
            <Play size={14} className="text-ink-faint shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}

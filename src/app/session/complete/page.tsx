"use client";

import Link from "next/link";
import { BeneCelebrate } from "@/components/mascot";
import { Button } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function SessionCompletePage() {
  const hydrated = useHydrated();
  const streak = useStore((s) => s.streak);
  const completedSessions = useStore((s) => s.completedSessions);

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Bene mascot — sage green stays */}
        <BeneCelebrate size={200} />

        <h1 className="font-serif text-4xl font-semibold text-black">
          Výborne!
        </h1>
        <p className="text-lg text-gray-400">Ďalšie cvičenie za tebou</p>

        <div className="flex items-center justify-center gap-12 mt-8">
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-black">
              {streak}
            </p>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
              {streak === 1 ? "deň v sérii" : "dní v sérii"}
            </p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-black">
              {completedSessions.length}
            </p>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">celkovo cvičení</p>
          </div>
        </div>

        <div className="pt-8">
          <Link href="/domov">
            <Button fullWidth>Späť domov</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function Home() {
  const router = useRouter();
  const hydrated = useHydrated();
  const onboardingComplete = useStore((s) => s.onboardingComplete);

  useEffect(() => {
    if (!hydrated) return;
    if (!onboardingComplete) {
      router.replace("/onboarding");
    } else {
      router.replace("/domov");
    }
  }, [hydrated, onboardingComplete, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-cream-50">
      <div className="animate-pulse font-serif text-2xl text-ink-muted">
        Bene
      </div>
    </div>
  );
}

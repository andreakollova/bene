"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const hideNavPaths = ["/onboarding", "/session", "/builder", "/video"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = hideNavPaths.some((p) => pathname.startsWith(p));

  return (
    <div className="flex justify-center min-h-screen bg-[#E8E6DC]">
      {/* Phone frame */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-cream-50 shadow-2xl">
        {/* Top logo bar */}
        {!hideNav && (
          <div className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
            <Link href="/domov" className="block text-center py-3">
              <span className="font-serif text-xl font-semibold text-ink tracking-tight">
                Bene
              </span>
            </Link>
          </div>
        )}
        <main className={`${hideNav ? "min-h-screen" : "pb-20"}`}>
          {children}
        </main>
        {!hideNav && <MobileNav />}
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const hideNavPaths = ["/onboarding", "/session", "/builder", "/video"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = hideNavPaths.some((p) => pathname.startsWith(p));

  return (
    <div className="flex justify-center min-h-screen bg-white">
      {/* Phone frame */}
      <div className="relative w-full max-w-[430px] min-h-screen border-x border-gray-200 bg-white">
        {/* Top logo bar */}
        {!hideNav && (
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <Link href="/domov" className="flex justify-center py-3">
              <img src="/benelogo.png" alt="Bene" className="h-8" />
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

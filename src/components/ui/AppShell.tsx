"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const hideNavPaths = ["/onboarding", "/session", "/builder", "/video"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = hideNavPaths.some((p) => pathname.startsWith(p));

  return (
    <div className="flex justify-center min-h-screen" style={{ backgroundColor: '#fefefe' }}>
      {/* Phone frame */}
      <div className="relative w-full max-w-[430px] min-h-screen shadow-2xl" style={{ backgroundColor: '#fefefe' }}>
        {/* Top logo bar */}
        {!hideNav && (
          <div className="sticky top-0 z-40 backdrop-blur-md border-b border-cream-200" style={{ backgroundColor: 'rgba(254,254,254,0.9)' }}>
            <Link href="/domov" className="flex justify-center py-2">
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

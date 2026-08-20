"use client";

import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

const hideNavPaths = ["/onboarding", "/session", "/builder"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = hideNavPaths.some((p) => pathname.startsWith(p));

  return (
    <div className="flex justify-center min-h-screen bg-[#E8E6DC]">
      {/* Phone frame */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-cream-50 shadow-2xl">
        <main className={`min-h-screen ${hideNav ? "" : "pb-20"}`}>
          {children}
        </main>
        {!hideNav && <MobileNav />}
      </div>
    </div>
  );
}

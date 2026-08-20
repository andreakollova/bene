"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const hideNavPaths = ["/onboarding", "/session", "/builder", "/video"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = hideNavPaths.some((p) => pathname.startsWith(p));

  if (hideNav) {
    return (
      <div className="flex justify-center min-h-screen bg-white">
        <div className="w-full max-w-[430px] min-h-screen bg-white">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-white">
      <div className="w-full max-w-[430px] flex flex-col h-dvh bg-white border-x border-gray-200">
        {/* Logo */}
        <div className="shrink-0 bg-white border-b border-gray-200">
          <Link href="/domov" className="flex justify-center py-3">
            <img src="/benelogo.png?v=3" alt="Bene" className="h-7" />
          </Link>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Nav - always at bottom, never moves */}
        <MobileNav />
      </div>
    </div>
  );
}

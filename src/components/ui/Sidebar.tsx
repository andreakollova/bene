"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  TrendingUp,
  Camera,
  User,
  Dumbbell,
  Settings,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/domov", label: "Domov", icon: Home },
  { href: "/plan", label: "Plán", icon: Calendar },
  { href: "/pokrok", label: "Pokrok", icon: TrendingUp },
  { href: "/fotky", label: "Fotky", icon: Camera },
  { href: "/profil", label: "Profil", icon: User },
  { href: "/builder", label: "Zostav tréning", icon: Dumbbell },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/domov" ? pathname === "/" || pathname === "/domov" : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-cream-50 border-r border-cream-200 py-6 px-4">
      {/* Logo */}
      <div className="px-2 mb-8">
        <span className="font-serif text-2xl text-ink font-semibold tracking-tight">Bene</span>
        <p className="font-sans text-xs text-ink-faint mt-0.5">Rehabilitácia</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-sans font-medium
                transition-colors duration-150
                ${active
                  ? "bg-sage-soft text-sage-dark"
                  : "text-ink-muted hover:bg-cream-100 hover:text-ink"
                }`}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom settings */}
      <div className="border-t border-cream-200 pt-4 mt-4">
        <Link
          href="/settings/reps"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-sans font-medium
            transition-colors duration-150
            ${pathname === "/settings/reps"
              ? "bg-sage-soft text-sage-dark"
              : "text-ink-muted hover:bg-cream-100 hover:text-ink"
            }`}
        >
          <Settings size={18} strokeWidth={1.75} />
          Nastavenia
        </Link>
      </div>
    </aside>
  );
}

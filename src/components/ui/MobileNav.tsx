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
} from "lucide-react";

const NAV_LINKS = [
  { href: "/plan", label: "Plán", icon: Calendar },
  { href: "/pokrok", label: "Pokrok", icon: TrendingUp },
  { href: "/domov", label: "Domov", icon: Home },
  { href: "/fotky", label: "Fotky", icon: Camera },
  { href: "/profil", label: "Profil", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/domov"
      ? pathname === "/" || pathname === "/domov"
      : pathname.startsWith(href);

  return (
    <nav className="sticky bottom-0 z-50 bg-cream-50/90 backdrop-blur-md border-t border-cream-200">
      <div className="flex items-center justify-around px-2 h-16 pb-1">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-btn transition-colors duration-150 ${
                active ? "text-sage" : "text-ink-faint"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2 : 1.75} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 h-14 pb-1 max-w-[430px] mx-auto">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-colors duration-150 ${
                active ? "text-black" : "text-gray-400"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[8px] font-medium uppercase tracking-widest">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

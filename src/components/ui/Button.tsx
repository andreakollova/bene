"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "ghost" | "text";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = "filled",
  disabled = false,
  fullWidth = false,
  icon,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-full font-sans text-sm font-medium tracking-wide transition-opacity duration-150 select-none";

  const variantClasses: Record<string, string> = {
    filled:
      "bg-black text-white active:opacity-75 disabled:opacity-30",
    ghost:
      "border border-black text-black bg-transparent hover:opacity-70 active:opacity-50 disabled:opacity-30",
    text:
      "text-black bg-transparent underline-offset-2 hover:underline active:opacity-50 disabled:opacity-30",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

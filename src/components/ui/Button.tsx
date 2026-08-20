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
    "inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-btn font-sans text-sm font-medium transition-opacity duration-150 select-none";

  const filledStyle =
    variant === "filled"
      ? { backgroundColor: "#3D3929", color: "#FAF9F5" }
      : undefined;

  const variantClasses: Record<string, string> = {
    filled: "active:opacity-75 disabled:opacity-40",
    ghost:
      "border border-sage text-sage bg-transparent hover:opacity-80 active:opacity-60 disabled:opacity-40",
    text: "text-sage bg-transparent hover:opacity-75 active:opacity-50 disabled:opacity-40",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      style={filledStyle}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

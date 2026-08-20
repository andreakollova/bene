import React from "react";

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, onClick, className = "" }: CardProps) {
  const base =
    "bg-cream-100 border border-cream-200 rounded-card p-4 transition-opacity duration-150";
  const clickable = onClick
    ? "cursor-pointer hover:opacity-90 active:opacity-75"
    : "";

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        className={`${base} ${clickable} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`${base} ${className}`}>{children}</div>
  );
}

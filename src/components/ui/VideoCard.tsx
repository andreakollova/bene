import React from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  duration: string;
  type?: string;
  coverSrc?: string;
  orientation?: "landscape" | "portrait";
  onClick?: () => void;
  className?: string;
}

export function VideoCard({
  title,
  duration,
  type,
  coverSrc,
  orientation = "landscape",
  onClick,
  className = "",
}: VideoCardProps) {
  const sizeClass =
    orientation === "portrait" ? "w-40 h-60" : "w-64 h-36";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`relative flex-shrink-0 rounded-[20px] overflow-hidden bg-gray-200 cursor-pointer
        group transition-opacity duration-150 hover:opacity-90 active:opacity-75 ${sizeClass} ${className}`}
    >
      {coverSrc && (
        <img
          src={coverSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />

      {/* Type badge top-left */}
      {type && (
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/80 text-white">
            {type}
          </span>
        </div>
      )}

      {/* Duration badge top-right */}
      <div className="absolute top-2 right-2">
        <span className="text-[10px] font-semibold text-white bg-black/80 px-2 py-0.5 rounded-full">
          {duration}
        </span>
      </div>

      {/* Title bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-sans text-sm text-white font-medium leading-snug line-clamp-2 drop-shadow-sm">
          {title}
        </p>
      </div>
    </div>
  );
}

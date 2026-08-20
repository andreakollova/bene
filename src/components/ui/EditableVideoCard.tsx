"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Clock } from "lucide-react";
import { useStore } from "@/store/useStore";

interface EditableVideoCardProps {
  videoId: string;
  defaultTitle: string;
  duration: string;
  type?: string;
  coverSrc?: string;
  orientation?: "landscape" | "portrait";
}

export function EditableVideoCard({
  videoId,
  defaultTitle,
  duration,
  type,
  coverSrc,
  orientation = "landscape",
}: EditableVideoCardProps) {
  const customTitles = useStore((s) => s.customVideoTitles);
  const setVideoTitle = useStore((s) => s.setVideoTitle);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const title = customTitles[videoId] || defaultTitle;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== defaultTitle) {
      setVideoTitle(videoId, trimmed);
    }
    setEditing(false);
  };

  const isPortrait = orientation === "portrait";

  return (
    <div
      className={`relative rounded-card overflow-hidden bg-cream-200 shrink-0 ${
        isPortrait ? "w-40 h-60" : "w-64 h-36"
      }`}
    >
      {coverSrc ? (
        <img
          src={coverSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-ink/40" />

      <div className="relative h-full flex flex-col justify-between p-3">
        <div className="flex items-start justify-between">
          {type && (
            <span className="bg-sage/85 text-white text-[11px] font-semibold px-2 py-0.5 rounded-chip">
              {type}
            </span>
          )}
          <button
            onClick={() => {
              setValue(title);
              setEditing(true);
            }}
            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Pencil size={12} className="text-white" />
          </button>
        </div>

        <div>
          {editing ? (
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full bg-white/90 text-ink text-sm font-medium px-2 py-1 rounded-chip outline-none"
            />
          ) : (
            <p className="text-white font-serif text-sm font-semibold leading-tight line-clamp-2">
              {title}
            </p>
          )}
          <div className="flex items-center gap-1 mt-1">
            <Clock size={11} className="text-white/80" strokeWidth={1.75} />
            <span className="text-white/80 text-xs">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

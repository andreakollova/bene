"use client";

import { useState, useRef } from "react";
import { Camera, Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Card } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function FotkyPage() {
  const hydrated = useHydrated();
  const progressPhotos = useStore((s) => s.progressPhotos);
  const addProgressPhoto = useStore((s) => s.addProgressPhoto);
  const removeProgressPhoto = useStore((s) => s.removeProgressPhoto);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!hydrated) return null;

  const sorted = [...progressPhotos].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addProgressPhoto({
        id: Date.now().toString(),
        uri: reader.result as string,
        date: new Date().toISOString(),
        note: "",
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("sk-SK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const canGoLeft = leftIndex > 0;
  const canGoRight = rightIndex < sorted.length - 1;

  return (
    <div className="w-full px-6 py-6 space-y-6">
      <h1 className="font-serif text-2xl font-semibold text-ink">
        Fotky pokroku
      </h1>

      {/* Add button */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {sorted.length < 2 ? (
        /* Not enough photos for comparison */
        <div className="space-y-4">
          {sorted.length === 1 && (
            <div className="text-center">
              <img
                src={sorted[0].uri}
                alt="Progress"
                className="w-full max-w-[200px] mx-auto aspect-[3/4] object-cover rounded-card"
              />
              <p className="text-sm text-ink-muted mt-2">
                {formatDate(sorted[0].date)}
              </p>
              <p className="text-sm text-ink-faint mt-1">
                Pridaj ďalšiu fotku na porovnanie
              </p>
            </div>
          )}

          {sorted.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Camera className="text-ink-faint" size={48} strokeWidth={1} />
              <p className="font-serif text-xl font-medium text-ink-muted">
                Sleduj svoj pokrok
              </p>
              <p className="text-ink-faint text-center text-sm">
                Pridaj fotky a porovnávaj ich vedľa seba
              </p>
            </div>
          )}

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-btn font-medium transition-colors"
            style={{ backgroundColor: "#3D3929", color: "#FAF9F5" }}
          >
            <Plus size={20} strokeWidth={1.75} />
            Pridať fotku
          </button>
        </div>
      ) : (
        /* Comparison view - always two photos side by side */
        <div className="space-y-4">
          {/* Photo pair */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left photo */}
            <div>
              <div className="relative rounded-card overflow-hidden border border-cream-200">
                <img
                  src={sorted[leftIndex]?.uri}
                  alt="Pred"
                  className="w-full aspect-[3/4] object-cover"
                />
                <button
                  onClick={() => {
                    if (confirm("Vymazať fotku?")) {
                      removeProgressPhoto(sorted[leftIndex].id);
                      if (leftIndex > 0) setLeftIndex(leftIndex - 1);
                    }
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/50 flex items-center justify-center"
                >
                  <Trash2 size={12} className="text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setLeftIndex(Math.max(0, leftIndex - 1))}
                  disabled={!canGoLeft}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-20"
                >
                  <ChevronLeft size={18} className="text-ink-muted" />
                </button>
                <p className="text-xs font-medium text-ink-muted text-center">
                  {sorted[leftIndex] && formatDate(sorted[leftIndex].date)}
                </p>
                <button
                  onClick={() =>
                    setLeftIndex(Math.min(rightIndex - 1, leftIndex + 1))
                  }
                  disabled={leftIndex >= rightIndex - 1}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-20"
                >
                  <ChevronRight size={18} className="text-ink-muted" />
                </button>
              </div>
            </div>

            {/* Right photo */}
            <div>
              <div className="relative rounded-card overflow-hidden border border-cream-200">
                <img
                  src={sorted[rightIndex]?.uri}
                  alt="Po"
                  className="w-full aspect-[3/4] object-cover"
                />
                <button
                  onClick={() => {
                    if (confirm("Vymazať fotku?")) {
                      removeProgressPhoto(sorted[rightIndex].id);
                      if (rightIndex >= sorted.length - 1)
                        setRightIndex(Math.max(1, sorted.length - 2));
                    }
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/50 flex items-center justify-center"
                >
                  <Trash2 size={12} className="text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() =>
                    setRightIndex(Math.max(leftIndex + 1, rightIndex - 1))
                  }
                  disabled={rightIndex <= leftIndex + 1}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-20"
                >
                  <ChevronLeft size={18} className="text-ink-muted" />
                </button>
                <p className="text-xs font-medium text-ink-muted text-center">
                  {sorted[rightIndex] && formatDate(sorted[rightIndex].date)}
                </p>
                <button
                  onClick={() =>
                    setRightIndex(
                      Math.min(sorted.length - 1, rightIndex + 1)
                    )
                  }
                  disabled={!canGoRight}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-20"
                >
                  <ChevronRight size={18} className="text-ink-muted" />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline dots */}
          <div className="flex items-center justify-center gap-1.5 py-2">
            {sorted.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i < rightIndex) setLeftIndex(i);
                  else setRightIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === leftIndex || i === rightIndex
                    ? "bg-sage"
                    : "bg-cream-200"
                }`}
              />
            ))}
          </div>

          {/* Add more */}
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 bg-cream-100 border border-cream-200 rounded-btn py-3 font-medium text-ink-muted active:bg-cream-200 transition-colors"
          >
            <Plus size={18} strokeWidth={1.75} />
            Pridať fotku
          </button>

          {/* Total count */}
          <p className="text-center text-xs text-ink-faint">
            {sorted.length} {sorted.length === 1 ? "fotka" : sorted.length < 5 ? "fotky" : "fotiek"}
          </p>
        </div>
      )}
    </div>
  );
}

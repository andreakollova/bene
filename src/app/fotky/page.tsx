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
    <div className="w-full px-6 py-8 space-y-6">
      <h1 className="font-serif text-2xl font-semibold text-black">
        Fotky pokroku
      </h1>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {sorted.length < 2 ? (
        <div className="space-y-6">
          {sorted.length === 1 && (
            <div className="text-center">
              <img
                src={sorted[0].uri}
                alt="Progress"
                className="w-full max-w-[200px] mx-auto aspect-[3/4] object-cover rounded-[20px]"
              />
              <p className="text-sm text-gray-400 mt-2">
                {formatDate(sorted[0].date)}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Pridaj ďalšiu fotku na porovnanie
              </p>
            </div>
          )}

          {sorted.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-16">
              <Camera className="text-gray-300" size={48} strokeWidth={1} />
              <p className="font-serif text-xl font-medium text-gray-400">
                Sleduj svoj pokrok
              </p>
              <p className="text-gray-300 text-center text-sm">
                Pridaj fotky a porovnávaj ich vedľa seba
              </p>
            </div>
          )}

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium bg-black text-white transition-opacity hover:opacity-80"
          >
            <Plus size={20} strokeWidth={1.75} />
            Pridať fotku
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Left photo */}
            <div>
              <div className="relative rounded-[20px] overflow-hidden border border-gray-200">
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
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center"
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
                  <ChevronLeft size={18} className="text-gray-400" />
                </button>
                <p className="text-xs font-medium text-gray-400 text-center">
                  {sorted[leftIndex] && formatDate(sorted[leftIndex].date)}
                </p>
                <button
                  onClick={() =>
                    setLeftIndex(Math.min(rightIndex - 1, leftIndex + 1))
                  }
                  disabled={leftIndex >= rightIndex - 1}
                  className="w-8 h-8 flex items-center justify-center disabled:opacity-20"
                >
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right photo */}
            <div>
              <div className="relative rounded-[20px] overflow-hidden border border-gray-200">
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
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center"
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
                  <ChevronLeft size={18} className="text-gray-400" />
                </button>
                <p className="text-xs font-medium text-gray-400 text-center">
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
                  <ChevronRight size={18} className="text-gray-400" />
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
                    ? "bg-black"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full py-3 font-medium text-gray-400 active:bg-gray-100 transition-colors"
          >
            <Plus size={18} strokeWidth={1.75} />
            Pridať fotku
          </button>

          <p className="text-center text-[10px] text-gray-300 uppercase tracking-widest">
            {sorted.length} {sorted.length === 1 ? "fotka" : sorted.length < 5 ? "fotky" : "fotiek"}
          </p>
        </div>
      )}
    </div>
  );
}

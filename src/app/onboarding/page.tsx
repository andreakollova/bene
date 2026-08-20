"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { BeneWave, BeneStretch } from "@/components/mascot";
import { Button } from "@/components/ui";

const dayLabels = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

export default function OnboardingPage() {
  const router = useRouter();
  const { setScheduleDays, setOnboardingComplete, initializePlan } = useStore();

  const [step, setStep] = useState(0);
  const [days, setDays] = useState<number[]>([0, 2]);

  const toggleDay = (d: number) =>
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  const handleFinish = () => {
    setScheduleDays(days);
    initializePlan();
    setOnboardingComplete(true);
    router.replace("/domov");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Welcome */}
        {step === 0 && (
          <div className="text-center space-y-10 animate-fade-in">
            <div className="flex justify-center">
              <BeneWave size={180} />
            </div>
            <div>
              <h1 className="font-serif text-[34px] font-semibold text-black leading-tight">
                Vitaj v Bene
              </h1>
              <p className="mt-4 text-gray-400 text-[17px] leading-relaxed">
                Tvoj sprievodca rehabilitáciou.
                <br />
                Krok za krokom, deň za dňom.
              </p>
            </div>
            <p className="text-gray-300 italic font-serif text-sm leading-relaxed px-4">
              Neber rehabilitáciu ako liečenie niečoho pokazeného,
              ale ako tréning techniky.
            </p>
            <Button onClick={() => setStep(1)} fullWidth>
              Poďme na to
            </Button>
          </div>
        )}

        {/* Schedule */}
        {step === 1 && (
          <div className="space-y-10 animate-fade-in">
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
                KROK 2 / 2
              </p>
              <h2 className="font-serif text-2xl font-semibold text-black">
                Kedy cvičíš?
              </h2>
              <p className="text-gray-400 mt-1">
                Vyber dni, kedy chceš cvičiť
              </p>
            </div>

            <div className="flex justify-between gap-2">
              {dayLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => toggleDay(i)}
                  className={`w-11 h-11 rounded-full text-sm font-semibold transition-colors ${
                    days.includes(i)
                      ? "bg-black text-white"
                      : "bg-white border border-gray-200 text-gray-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 py-8">
              <BeneStretch size={140} />
              <p className="text-gray-400 italic">
                Pripravený na nový začiatok
              </p>
            </div>

            <Button
              onClick={handleFinish}
              disabled={days.length === 0}
              fullWidth
            >
              Začať
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

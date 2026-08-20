"use client";

import Link from "next/link";
import {
  Bell,
  FileText,
  ChevronRight,
  Repeat,
} from "lucide-react";
import { BeneIdle } from "@/components/mascot";
import { Card } from "@/components/ui";
import { useStore } from "@/store/useStore";
import { useHydrated } from "@/hooks/useHydrated";

const dayNames = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

export default function ProfilPage() {
  const hydrated = useHydrated();
  const plan = useStore((s) => s.currentPlan);
  const streak = useStore((s) => s.streak);
  const completedSessions = useStore((s) => s.completedSessions);
  const reminderTime = useStore((s) => s.reminderTime);
  const scheduleDays = useStore((s) => s.scheduleDays);

  if (!hydrated) return null;

  const activeDays = scheduleDays.map((d) => dayNames[d]).join(", ");

  return (
    <div className="w-full px-6 py-8 space-y-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Profil</h1>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <BeneIdle size={60} />
          <div>
            <p className="font-serif text-xl font-medium text-ink">
              Tvoja rehabilitácia
            </p>
            <p className="text-sm text-ink-muted mt-0.5">
              {completedSessions.length} cvičení · {streak} dní v sérii
            </p>
          </div>
        </div>
      </Card>

      {/* Plan */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          AKTÍVNY PLÁN
        </p>
        <Card className="p-4">
          <p className="font-medium text-ink">{plan?.name || "Žiadny plán"}</p>
          {plan && (
            <p className="text-sm text-ink-muted mt-1">{plan.description}</p>
          )}
        </Card>
      </div>

      {/* Schedule */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          ROZVRH
        </p>
        <Card className="p-4 mb-2">
          <div className="flex justify-between">
            <span className="font-medium text-ink">Dni cvičenia</span>
            <span className="text-ink-muted">{activeDays}</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <span className="font-medium text-ink">Pripomienka</span>
            <span className="text-ink-muted">{reminderTime}</span>
          </div>
        </Card>
      </div>

      {/* Rep settings */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          OPAKOVANIA
        </p>
        <Link href="/settings/reps">
          <Card className="p-4 active:bg-cream-200 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Repeat className="text-ink-muted" size={20} strokeWidth={1.75} />
                <div>
                  <p className="font-medium text-ink">Nastavenia opakovaní</p>
                  <p className="text-sm text-ink-muted mt-0.5">
                    Série, opakovania, týždenné navyšovanie
                  </p>
                </div>
              </div>
              <ChevronRight className="text-ink-faint" size={18} />
            </div>
          </Card>
        </Link>
      </div>

      {/* Settings */}
      <div>
        <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-ink-faint mb-3">
          NASTAVENIA
        </p>
        <Card className="p-4 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-ink-muted" size={20} strokeWidth={1.75} />
              <span className="font-medium text-ink">Notifikácie</span>
            </div>
            <ChevronRight className="text-ink-faint" size={18} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-ink-muted" size={20} strokeWidth={1.75} />
              <span className="font-medium text-ink">Exportovať pokrok</span>
            </div>
            <ChevronRight className="text-ink-faint" size={18} />
          </div>
        </Card>
      </div>
    </div>
  );
}

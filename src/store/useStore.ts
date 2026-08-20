import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Plan, DayPlan, BodyPart } from '@/data/seedData';
import { SEED_PLAN } from '@/data/seedData';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProgressPhoto {
  id: string;
  uri: string;
  date: string;
  note: string;
}

export interface RepSettings {
  [exerciseId: string]: {
    defaultReps: number;
    defaultSets: number;
    isTimed: boolean;
    weeklyIncrement: number;
  };
}

export interface PainLog {
  date: string;
  exerciseId: string;
  level: 'ok' | 'tight' | 'pain';
}

// ---------------------------------------------------------------------------
// State & Actions Interface
// ---------------------------------------------------------------------------

interface AppState {
  // Onboarding
  onboardingComplete: boolean;
  selectedGoal: BodyPart | null;
  painLevel: number;
  hasPrescribedPlan: boolean;
  scheduleDays: number[];   // 0=Sunday … 6=Saturday
  reminderTime: string;     // "HH:MM"

  // Plan
  currentPlan: Plan | null;
  currentDayIndex: number;
  currentWeekIndex: number;

  // Progress
  completedSessions: string[];          // DayPlan ids
  streak: number;
  lastSessionDate: string | null;       // ISO date string "YYYY-MM-DD"
  painLogs: PainLog[];

  // Active session
  activeSessionId: string | null;       // DayPlan id currently in progress
  currentExerciseIndex: number;
  currentSet: number;

  // Photos
  progressPhotos: ProgressPhoto[];

  // Custom workouts
  customWorkouts: DayPlan[];

  // Rep settings
  repSettings: RepSettings;

  // Custom video titles
  customVideoTitles: Record<string, string>;

  // Settings
  darkMode: boolean;

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------

  // Onboarding
  setOnboardingComplete: (value: boolean) => void;
  setGoal: (goal: BodyPart) => void;
  setPainLevel: (level: number) => void;
  setHasPrescribedPlan: (value: boolean) => void;
  setScheduleDays: (days: number[]) => void;
  setReminderTime: (time: string) => void;

  // Plan
  initializePlan: () => void;
  setPlan: (plan: Plan) => void;

  // Session lifecycle
  startSession: (dayPlanId: string) => void;
  nextExercise: () => void;
  nextSet: () => void;
  completeSession: (dayPlanId: string) => void;
  cancelSession: () => void;

  // Pain
  logPain: (log: PainLog) => void;

  // Photos
  addProgressPhoto: (photo: ProgressPhoto) => void;
  removeProgressPhoto: (id: string) => void;

  // Custom workouts
  saveCustomWorkout: (workout: DayPlan) => void;
  deleteCustomWorkout: (id: string) => void;

  // Video titles
  setVideoTitle: (videoId: string, title: string) => void;

  // Rep settings
  updateRepSettings: (
    exerciseId: string,
    settings: Partial<RepSettings[string]>
  ) => void;

  // Settings
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;

  // Reset
  resetProgress: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function calculateStreak(
  prevStreak: number,
  lastSessionDate: string | null
): number {
  const today = todayISO();
  if (!lastSessionDate) return 1;
  if (lastSessionDate === today) return prevStreak; // already logged today

  const last = new Date(lastSessionDate);
  const now = new Date(today);
  const diffDays = Math.round(
    (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) return prevStreak + 1; // consecutive day
  return 1; // streak broken
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // -----------------------------------------------------------------------
      // Initial state
      // -----------------------------------------------------------------------
      onboardingComplete: false,
      selectedGoal: null,
      painLevel: 0,
      hasPrescribedPlan: false,
      scheduleDays: [1, 3, 5], // Mon, Wed, Fri by default
      reminderTime: '08:00',

      currentPlan: null,
      currentDayIndex: 0,
      currentWeekIndex: 0,

      completedSessions: [],
      streak: 0,
      lastSessionDate: null,
      painLogs: [],

      activeSessionId: null,
      currentExerciseIndex: 0,
      currentSet: 1,

      progressPhotos: [],

      customWorkouts: [],

      repSettings: {},

      customVideoTitles: {},

      darkMode: false,

      // -----------------------------------------------------------------------
      // Onboarding actions
      // -----------------------------------------------------------------------
      setOnboardingComplete: (value) => set({ onboardingComplete: value }),

      setGoal: (goal) => set({ selectedGoal: goal }),

      setPainLevel: (level) => set({ painLevel: level }),

      setHasPrescribedPlan: (value) => set({ hasPrescribedPlan: value }),

      setScheduleDays: (days) => set({ scheduleDays: days }),

      setReminderTime: (time) => set({ reminderTime: time }),

      // -----------------------------------------------------------------------
      // Plan actions
      // -----------------------------------------------------------------------
      initializePlan: () => {
        const { currentPlan } = get();
        if (!currentPlan) {
          set({ currentPlan: SEED_PLAN, currentDayIndex: 0, currentWeekIndex: 0 });
        }
      },

      setPlan: (plan) =>
        set({ currentPlan: plan, currentDayIndex: 0, currentWeekIndex: 0 }),

      // -----------------------------------------------------------------------
      // Session lifecycle
      // -----------------------------------------------------------------------
      startSession: (dayPlanId) =>
        set({
          activeSessionId: dayPlanId,
          currentExerciseIndex: 0,
          currentSet: 1,
        }),

      nextExercise: () =>
        set((state) => ({
          currentExerciseIndex: state.currentExerciseIndex + 1,
          currentSet: 1,
        })),

      nextSet: () =>
        set((state) => ({ currentSet: state.currentSet + 1 })),

      completeSession: (dayPlanId) => {
        const state = get();
        const today = todayISO();

        // Avoid double-counting the same session
        const alreadyCompleted = state.completedSessions.includes(dayPlanId);
        const newCompleted = alreadyCompleted
          ? state.completedSessions
          : [...state.completedSessions, dayPlanId];

        const newStreak = alreadyCompleted
          ? state.streak
          : calculateStreak(state.streak, state.lastSessionDate);

        // Advance week/day pointers
        let newDayIndex = state.currentDayIndex;
        let newWeekIndex = state.currentWeekIndex;

        if (!alreadyCompleted && state.currentPlan) {
          const week = state.currentPlan.weeks[newWeekIndex];
          if (week) {
            if (newDayIndex + 1 >= week.days.length) {
              // Move to next week
              newDayIndex = 0;
              newWeekIndex = Math.min(
                newWeekIndex + 1,
                state.currentPlan.weeks.length - 1
              );
            } else {
              newDayIndex = newDayIndex + 1;
            }
          }
        }

        set({
          completedSessions: newCompleted,
          streak: newStreak,
          lastSessionDate: alreadyCompleted ? state.lastSessionDate : today,
          activeSessionId: null,
          currentExerciseIndex: 0,
          currentSet: 1,
          currentDayIndex: newDayIndex,
          currentWeekIndex: newWeekIndex,
        });
      },

      cancelSession: () =>
        set({
          activeSessionId: null,
          currentExerciseIndex: 0,
          currentSet: 1,
        }),

      // -----------------------------------------------------------------------
      // Pain logging
      // -----------------------------------------------------------------------
      logPain: (log) =>
        set((state) => ({ painLogs: [...state.painLogs, log] })),

      // -----------------------------------------------------------------------
      // Progress photos
      // -----------------------------------------------------------------------
      addProgressPhoto: (photo) =>
        set((state) => ({
          progressPhotos: [photo, ...state.progressPhotos],
        })),

      removeProgressPhoto: (id) =>
        set((state) => ({
          progressPhotos: state.progressPhotos.filter((p) => p.id !== id),
        })),

      // -----------------------------------------------------------------------
      // Custom workouts
      // -----------------------------------------------------------------------
      saveCustomWorkout: (workout) =>
        set((state) => {
          const existing = state.customWorkouts.findIndex(
            (w) => w.id === workout.id
          );
          if (existing >= 0) {
            const updated = [...state.customWorkouts];
            updated[existing] = workout;
            return { customWorkouts: updated };
          }
          return { customWorkouts: [...state.customWorkouts, workout] };
        }),

      deleteCustomWorkout: (id) =>
        set((state) => ({
          customWorkouts: state.customWorkouts.filter((w) => w.id !== id),
        })),

      // -----------------------------------------------------------------------
      // Rep settings
      // -----------------------------------------------------------------------
      updateRepSettings: (exerciseId, settings) =>
        set((state) => {
          const existing = state.repSettings[exerciseId] ?? {
            defaultReps: 10,
            defaultSets: 3,
            isTimed: false,
            weeklyIncrement: 1,
          };
          return {
            repSettings: {
              ...state.repSettings,
              [exerciseId]: { ...existing, ...settings },
            },
          };
        }),

      // -----------------------------------------------------------------------
      // Video titles
      // -----------------------------------------------------------------------
      setVideoTitle: (videoId, title) =>
        set((state) => ({
          customVideoTitles: { ...state.customVideoTitles, [videoId]: title },
        })),

      // -----------------------------------------------------------------------
      // Settings
      // -----------------------------------------------------------------------
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setDarkMode: (value) => set({ darkMode: value }),

      // -----------------------------------------------------------------------
      // Reset
      // -----------------------------------------------------------------------
      resetProgress: () =>
        set({
          completedSessions: [],
          streak: 0,
          lastSessionDate: null,
          painLogs: [],
          currentDayIndex: 0,
          currentWeekIndex: 0,
          activeSessionId: null,
          currentExerciseIndex: 0,
          currentSet: 1,
          progressPhotos: [],
        }),
    }),
    {
      name: 'renu-app-storage',
      storage: createJSONStorage(() => localStorage),
      // Persist everything except transient session counters if desired.
      // Here we persist the full state for simplicity.
      partialize: (state) => ({
        onboardingComplete: state.onboardingComplete,
        selectedGoal: state.selectedGoal,
        painLevel: state.painLevel,
        hasPrescribedPlan: state.hasPrescribedPlan,
        scheduleDays: state.scheduleDays,
        reminderTime: state.reminderTime,
        currentPlan: state.currentPlan,
        currentDayIndex: state.currentDayIndex,
        currentWeekIndex: state.currentWeekIndex,
        completedSessions: state.completedSessions,
        streak: state.streak,
        lastSessionDate: state.lastSessionDate,
        painLogs: state.painLogs,
        progressPhotos: state.progressPhotos,
        customWorkouts: state.customWorkouts,
        repSettings: state.repSettings,
        customVideoTitles: state.customVideoTitles,
        darkMode: state.darkMode,
      }),
    }
  )
);

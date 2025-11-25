import { create } from "zustand";
import { persist } from "zustand/middleware";
import course from "../data/course.json";
import dayjs from "dayjs";
import { type ProgressStore } from "../types/store";

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      course,
      currentDay: 1,
      completedDays: [],
      quizzes: {},
      streak: 0,
      lastCompletedDate: null,

      saveQuizResult(dayId, score) {
        const existing = get().quizzes[dayId];

        const bestScore = existing?.bestScore;

        const newBestScore = bestScore >= score ? bestScore : score;

        const newQuizzes = {
          ...get().quizzes,
          [dayId]: {
            bestScore: newBestScore,
            passed: newBestScore >= 0.6,
          },
        };

        const { completedDays, lastCompletedDate, streak } = get();
        let newStreak = streak;
        let newLastCompletedDate = lastCompletedDate;
        let newCompletedDays = completedDays;
        const today = dayjs();
        const lastDate = dayjs(lastCompletedDate);
        const daysDiff = today.diff(lastDate, "day");

        if (score >= 0.6 && !existing?.passed) {
          if (!lastCompletedDate) {
            newStreak = 1;
          } else {
            if (daysDiff === 1) newStreak += 1;
            else if (daysDiff > 1) newStreak = 1;
          }
          newLastCompletedDate = today.toISOString();
          newCompletedDays = [...newCompletedDays, Number(dayId)];
        }

        set({
          quizzes: newQuizzes,
          completedDays: newCompletedDays,
          streak: newStreak,
          lastCompletedDate: newLastCompletedDate,
        });
      },
    }),
    { name: "progress-storage" }
  )
);

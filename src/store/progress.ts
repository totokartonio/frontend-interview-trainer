import { create } from "zustand";
import { persist } from "zustand/middleware";
import course from "../data/course.json";
import dayjs from "dayjs";
import { type ProgressStore } from "../types/store";

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      lastCompletedDate: null,
      currentLesson: 1,
      completedLessons: [],
      quizzes: {},
      streak: 0,
      course,
      freeze: false,

      saveQuizResult(lessonId, score) {
        const existing = get().quizzes[lessonId];
        const bestScore = existing?.bestScore;

        const newBestScore = bestScore >= score ? bestScore : score;

        const newQuizzes = {
          ...get().quizzes,
          [lessonId]: {
            bestScore: newBestScore,
            lastScore: score,
            passed: newBestScore >= 0.6,
          },
        };

        const { completedLessons, currentLesson, lastCompletedDate, streak } =
          get();
        let newStreak = streak;
        let newLastCompletedDate = lastCompletedDate;
        let newCompletedLessons = completedLessons;
        let newCurrentLesson = currentLesson;
        const today = dayjs().startOf("day");
        const lastDate = dayjs(lastCompletedDate).startOf("day");
        const daysDiff = today.diff(lastDate, "day");

        if (score >= 0.6 && !existing?.passed) {
          if (!lastCompletedDate) {
            newStreak = 1;
          } else {
            if (daysDiff <= 2) newStreak += 1;
            else if (daysDiff > 2) newStreak = 1;
          }
          newLastCompletedDate = today.toISOString();
          newCompletedLessons = [...newCompletedLessons, Number(lessonId)];
          newCurrentLesson = currentLesson + 1;
        }

        set({
          quizzes: newQuizzes,
          completedLessons: newCompletedLessons,
          currentLesson: newCurrentLesson,
          streak: newStreak,
          lastCompletedDate: newLastCompletedDate,
        });
      },
      setFreeze() {
        let newFreeze = get().freeze;
        let newLastCompletedDate = get().lastCompletedDate;
        const today = dayjs().startOf("day");
        const lastDate = dayjs(newLastCompletedDate).startOf("day");
        const daysDiff = today.diff(lastDate, "day");
        if (daysDiff === 2) {
          newFreeze = true;
        } else {
          newFreeze = false;
        }

        set({ freeze: newFreeze });
      },
    }),
    { name: "progress-storage" }
  )
);

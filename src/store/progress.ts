import { create } from "zustand";
import { persist } from "zustand/middleware";
import course from "../data/course.json";
import dayjs from "dayjs";
import { type ProgressStore } from "../types/store";

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      course,
      currentLesson: 1,
      completedLessons: [],
      quizzes: {},
      streak: 0,
      lastCompletedDate: null,

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
    }),
    { name: "progress-storage" }
  )
);

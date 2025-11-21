import { useState, useEffect } from "react";
import { type UserProgress } from "../types/course";
import dayjs from "dayjs";

const STORAGE_KEY = "frontend-interview-progress";

export const useStreak = () => {
  const [progress, setProgress] = useState<UserProgress>({
    currentDay: 1,
    streak: 0,
    completedDays: [],
    lastCompletedDate: null,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } catch (error) {
        console.error("Ошибка при парсинге localStorage: ", error);
      }
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(progress);
    localStorage.setItem(STORAGE_KEY, json);
  }, [progress]);

  const isStreakBroken = (): boolean => {
    if (!progress.lastCompletedDate) return false;
    const today = dayjs();
    const lastDate = dayjs(progress.lastCompletedDate);
    const daysDiff = today.diff(lastDate, "day");

    return daysDiff > 1;
  };

  const completeDay = (dayNumber: number, score: number) => {
    const completedDays = progress.completedDays;
    const today = dayjs().toISOString();

    if (score < 60) return;
    if (completedDays.includes(dayNumber)) return;

    const newCompletedDays = [...completedDays, dayNumber];
    const streak = isStreakBroken() ? 1 : progress.streak + 1;

    setProgress({
      currentDay: progress.currentDay + 1,
      streak: streak,
      completedDays: newCompletedDays,
      lastCompletedDate: today,
    });
  };

  return {
    progress,
    completeDay,
    isStreakBroken,
  };
};

import { type Course } from "./course";

type QuizStats = {
  bestScore: number;
  passed: boolean;
};

type ProgressStore = {
  course: Course;
  currentDay: number;
  completedDays: number[];
  quizzes: Record<string, QuizStats>;
  streak: number;
  lastCompletedDate: string | null;

  saveQuizResult: (dayId: string, score: number) => void;
};

export type { ProgressStore };

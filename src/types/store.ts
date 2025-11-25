import { type Course } from "./course";

type QuizStats = {
  bestScore: number;
  lastScore: number;
  passed: boolean;
};

type ProgressStore = {
  course: Course;
  currentLesson: number;
  completedLessons: number[];
  quizzes: Record<string, QuizStats>;
  streak: number;
  lastCompletedDate: string | null;

  saveQuizResult: (dayId: string, score: number) => void;
};

export type { ProgressStore, QuizStats };

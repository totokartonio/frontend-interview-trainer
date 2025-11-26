import { type Course } from "./course";

type QuizStats = {
  bestScore: number;
  lastScore: number;
  passed: boolean;
};

type ProgressStore = {
  lastCompletedDate: string | null;
  currentLesson: number;
  completedLessons: number[];
  quizzes: Record<string, QuizStats>;
  streak: number;
  course: Course;
  freeze: boolean;

  saveQuizResult: (lessonId: string, score: number) => void;
  setFreeze: () => void;
};

export type { ProgressStore, QuizStats };

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Theory {
  topics: string[];
  keyPoints: string[];
}

export interface Day {
  day: number;
  title: string;
  theory: Theory;
  practice: string;
  quiz: QuizQuestion[];
}

export interface Week {
  weekNumber: number;
  title: string;
  days: Day[];
}

export interface Course {
  title: string;
  duration: string;
  daysPerWeek: number;
  totalDays: number;
}

export interface UserProgress {
  currentDay: number;
  streak: number;
  completedDays: number[];
  lastCompletedDate: string | null;
}

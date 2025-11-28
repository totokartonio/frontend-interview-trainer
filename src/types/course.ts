export interface Option {
  id: string;
  opt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

export interface Theory {
  topics: string[];
  keyPoints: string[];
  content: string;
}

export interface LessonType {
  id: number;
  title: string;
  theory: Theory;
  practice: string[];
  quiz: QuizQuestion[];
}

export interface Course {
  title: string;
  lessons: LessonType[];
  duration: string;
  lessonsPerWeek: number;
  totalLessons: number;
}

export interface UserProgress {
  currentLesson: number;
  streak: number;
  completedLessons: number[];
  lastCompletedDate: string | null;
}

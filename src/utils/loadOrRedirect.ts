import { redirect } from "@tanstack/react-router";
import type { LessonType } from "../types/course";
import { MESSAGES } from "../data/constants";
import type { QuizStats } from "../types/store";

type Props = {
  id: number;
  currentLesson: number;
  totalLessons: number;
  lesson: LessonType | undefined;
  completion?: boolean;
  quizStats?: QuizStats | undefined;
};

const loadOrRedirect = ({
  id,
  currentLesson,
  totalLessons,
  lesson,
  completion = false,
  quizStats,
}: Props) => {
  let canAccessLesson: "non-existent" | "unavailable" | "available";
  if (id < 0 || id > totalLessons || (completion && !quizStats)) {
    canAccessLesson = "non-existent";
  } else if (id > currentLesson) {
    canAccessLesson = "unavailable";
  } else {
    canAccessLesson = "available";
  }

  if (!lesson || canAccessLesson === "non-existent") {
    throw redirect({
      to: "/error",
      search: { message: MESSAGES.NON_EXISTENT_LESSON },
    });
  }

  if (canAccessLesson === "unavailable") {
    throw redirect({
      to: "/error",
      search: { message: MESSAGES.LESSON_UNAVAILABLE },
    });
  }

  return lesson;
};

export default loadOrRedirect;

import { createFileRoute } from "@tanstack/react-router";
import { Quiz } from "../components/Quiz";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../store/progress";
import loadOrRedirect from "../utils/loadOrRedirect.ts";

const QuizPage = () => {
  const navigate = useNavigate();
  const { lesson } = Route.useLoaderData();

  const saveQuizResult = useProgressStore((state) => state.saveQuizResult);

  const questions = lesson.quiz;

  const handleComplete = (score: number) => {
    saveQuizResult(String(lesson.id), score);
    navigate({
      to: "/completion/$lessonId",
      params: { lessonId: String(lesson.id) },
    });
  };

  return <Quiz questions={questions} onComplete={handleComplete} />;
};

export const Route = createFileRoute("/quiz/$lessonId")({
  component: QuizPage,
  loader: ({ params }) => {
    const lessonId = Number(params.lessonId);
    const { course, currentLesson } = useProgressStore.getState();
    const lesson = course.lessons.find((lesson) => lesson.id === lessonId);

    const safeLesson = loadOrRedirect({
      id: lessonId,
      currentLesson,
      totalLessons: course.totalLessons,
      lesson,
    });

    return { lesson: safeLesson };
  },
});

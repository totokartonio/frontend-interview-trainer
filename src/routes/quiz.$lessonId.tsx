import { createFileRoute } from "@tanstack/react-router";
import Quiz from "../components/Quiz";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../store/progress";
import canAccessLesson from "../utils/canAccessLesson";
import NotFound from "../components/NotFound.tsx";

const QuizPage = () => {
  const navigate = useNavigate();
  const { lessonId } = Route.useParams();

  const course = useProgressStore((state) => state.course);
  const saveQuizResult = useProgressStore((state) => state.saveQuizResult);
  const currentLesson = useProgressStore((state) => state.currentLesson);

  const lesson = course.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );
  const check = canAccessLesson(Number(lessonId), currentLesson);

  if (!lesson || !check) {
    const errorMessage = "Урок недоступен!";
    return <NotFound message={errorMessage} />;
  }

  const questions = lesson.quiz;

  const handleComplete = (score: number) => {
    saveQuizResult(lessonId, score);
    navigate({
      to: "/completion/$lessonId",
      params: { lessonId: String(lessonId) },
    });
  };

  return <Quiz questions={questions} onComplete={handleComplete} />;
};

export const Route = createFileRoute("/quiz/$lessonId")({
  component: QuizPage,
});

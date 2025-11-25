import { createFileRoute } from "@tanstack/react-router";
import Quiz from "../components/Quiz";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../store/progress";

const QuizPage = () => {
  const navigate = useNavigate();
  const { lessonId } = Route.useParams();

  const course = useProgressStore((state) => state.course);
  const saveQuizResult = useProgressStore((state) => state.saveQuizResult);

  const lesson = course.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );

  if (!lesson) return <div>Квиз не найден!</div>;

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

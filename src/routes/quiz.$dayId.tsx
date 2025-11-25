import { createFileRoute } from "@tanstack/react-router";
import Quiz from "../components/Quiz";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../store/progress";

const QuizPage = () => {
  const navigate = useNavigate();
  const { dayId } = Route.useParams();

  const course = useProgressStore((state) => state.course);
  const saveQuizResult = useProgressStore((state) => state.saveQuizResult);

  const day = course.days.find((day) => day.day === Number(dayId));

  if (!day) return <div>Квиз не найден!</div>;

  const questions = day.quiz;

  const handleComplete = (score: number) => {
    saveQuizResult(dayId, score);
    navigate({ to: "/completion" });
  };

  return <Quiz questions={questions} onComplete={handleComplete} />;
};

export const Route = createFileRoute("/quiz/$dayId")({
  component: QuizPage,
});

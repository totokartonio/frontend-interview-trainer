import { createFileRoute } from "@tanstack/react-router";
import Quiz from "../components/Quiz";
import { useCourseData } from "../hooks/useCourseData";
import { useStreak } from "../hooks/useStreak";
import { useNavigate } from "@tanstack/react-router";

const QuizPage = () => {
  const navigate = useNavigate();
  const { progress, completeDay } = useStreak();
  const { dayId } = Route.useParams();
  const { getDayByNumber } = useCourseData();

  const day = getDayByNumber(Number(dayId));

  if (!day) return <div>Квиз не найден!</div>;

  const questions = day.quiz;

  const handleComplete = (score: number) => {
    completeDay(progress.currentDay, score);
    navigate({ to: "/completion" });
  };

  return <Quiz questions={questions} onComplete={handleComplete} />;
};

export const Route = createFileRoute("/quiz/$dayId")({
  component: QuizPage,
});

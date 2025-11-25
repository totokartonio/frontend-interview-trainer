import { createFileRoute } from "@tanstack/react-router";
import Completion from "../components/Completion";
import { useProgressStore } from "../store/progress";
import guard from "../utils/guard";

const CompletionPage = () => {
  const { lessonId } = Route.useParams();
  const quizzes = useProgressStore((state) => state.quizzes);

  const quizStats = quizzes[lessonId];
  const check = guard(lessonId);

  if (!quizStats) return <div>Урок не найден!</div>;
  if (!check) return <div>Этот урок еще не открыт!</div>;

  return <Completion quizStats={quizStats} />;
};

export const Route = createFileRoute("/completion/$lessonId")({
  component: CompletionPage,
});

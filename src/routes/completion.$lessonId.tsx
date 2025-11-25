import { createFileRoute } from "@tanstack/react-router";
import Completion from "../components/Completion";
import { useProgressStore } from "../store/progress";

const CompletionPage = () => {
  const { lessonId } = Route.useParams();
  const quizzes = useProgressStore((state) => state.quizzes);

  const quizStats = quizzes[lessonId];

  if (!quizStats) return <div>Урок не найден!</div>;

  return <Completion quizStats={quizStats} />;
};

export const Route = createFileRoute("/completion/$lessonId")({
  component: CompletionPage,
});

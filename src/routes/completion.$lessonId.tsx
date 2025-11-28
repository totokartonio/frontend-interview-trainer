import { createFileRoute } from "@tanstack/react-router";
import Completion from "../components/Completion";
import { useProgressStore } from "../store/progress";
import canAccessLesson from "../utils/canAccessLesson";
import NotFound from "../components/NotFound.tsx";

const CompletionPage = () => {
  const { lessonId } = Route.useParams();
  const quizzes = useProgressStore((state) => state.quizzes);
  const currentLesson = useProgressStore((state) => state.currentLesson);

  const quizStats = quizzes[lessonId];
  const check = canAccessLesson(Number(lessonId), currentLesson);

  if (!check || !quizStats) {
    const errorMessage = "Урок недоступен!";
    return <NotFound message={errorMessage} />;
  }

  return <Completion quizStats={quizStats} />;
};

export const Route = createFileRoute("/completion/$lessonId")({
  component: CompletionPage,
});

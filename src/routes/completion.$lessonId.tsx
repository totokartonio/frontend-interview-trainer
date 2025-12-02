import { createFileRoute } from "@tanstack/react-router";
import { Completion } from "../components/Completion/Completion.tsx";
import { useProgressStore } from "../store/progress";
import loadOrRedirect from "../utils/loadOrRedirect.ts";

const CompletionPage = () => {
  const { lesson } = Route.useLoaderData();
  const quizzes = useProgressStore((state) => state.quizzes);

  const quizStats = quizzes[String(lesson.id)];

  return <Completion quizStats={quizStats} />;
};

export const Route = createFileRoute("/completion/$lessonId")({
  component: CompletionPage,
  loader: ({ params }) => {
    const lessonId = Number(params.lessonId);
    const { course, currentLesson, quizzes } = useProgressStore.getState();
    const lesson = course.lessons.find((lesson) => lesson.id === lessonId);

    const safeLesson = loadOrRedirect({
      id: lessonId,
      currentLesson,
      totalLessons: course.totalLessons,
      lesson,
      completion: true,
      quizStats: quizzes[lessonId],
    });

    return { lesson: safeLesson };
  },
});

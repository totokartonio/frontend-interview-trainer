import { createFileRoute } from "@tanstack/react-router";
import { Lesson } from "../components/Lesson";
import { useProgressStore } from "../store/progress";
import loadOrRedirect from "../utils/loadOrRedirect.ts";

const LessonPage = () => {
  const { lesson } = Route.useLoaderData();

  return <Lesson lesson={lesson} />;
};

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
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

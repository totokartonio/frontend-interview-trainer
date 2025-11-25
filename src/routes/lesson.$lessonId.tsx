import { createFileRoute } from "@tanstack/react-router";
import Lesson from "../components/Lesson";
import { useProgressStore } from "../store/progress";

const LessonPage = () => {
  const { lessonId } = Route.useParams();
  const course = useProgressStore((state) => state.course);

  const lesson = course.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );

  if (!lesson) return <div>Урок не найден!</div>;

  return <Lesson lesson={lesson} />;
};

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
});

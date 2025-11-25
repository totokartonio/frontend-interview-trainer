import { createFileRoute } from "@tanstack/react-router";
import Lesson from "../components/Lesson";
import { useProgressStore } from "../store/progress";
import guard from "../utils/guard";

const LessonPage = () => {
  const { lessonId } = Route.useParams();
  const course = useProgressStore((state) => state.course);

  const lesson = course.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );

  const check = guard(lessonId);

  if (!lesson) return <div>Урок не найден!</div>;
  if (!check) return <div>Этот урок еще не открыт!</div>;

  return <Lesson lesson={lesson} />;
};

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
  loader: () => {},
});

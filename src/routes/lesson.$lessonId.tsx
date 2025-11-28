import { createFileRoute } from "@tanstack/react-router";
import Lesson from "../components/Lesson";
import { useProgressStore } from "../store/progress";
import canAccessLesson from "../utils/canAccessLesson";
import NotFound from "../components/NotFound.tsx";

const LessonPage = () => {
  const { lessonId } = Route.useParams();
  const course = useProgressStore((state) => state.course);
  const currentLesson = useProgressStore((state) => state.currentLesson);

  const lesson = course.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );

  const check = canAccessLesson(Number(lessonId), currentLesson);

  if (!lesson || !check) {
    const errorMessage = "Урок недоступен!";
    return <NotFound message={errorMessage} />;
  }

  return <Lesson lesson={lesson} />;
};

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPage,
});

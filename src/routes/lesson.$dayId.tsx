import { createFileRoute } from "@tanstack/react-router";
import Lesson from "../components/Lesson";
import { useProgressStore } from "../store/progress";

const LessonPage = () => {
  const { dayId } = Route.useParams();
  const course = useProgressStore((state) => state.course);

  const day = course.days.find((day) => day.day === Number(dayId));

  if (!day) return <div>День не найден!</div>;

  const handleStartQuiz = () => {
    console.log("Start quiz for day ", dayId);
  };

  return <Lesson day={day} onStartQuiz={handleStartQuiz} />;
};

export const Route = createFileRoute("/lesson/$dayId")({
  component: LessonPage,
});

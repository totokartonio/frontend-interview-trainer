import { createFileRoute } from "@tanstack/react-router";
import Lesson from "../components/Lesson";
import { useCourseData } from "../hooks/useCourseData";

const LessonPage = () => {
  const { dayId } = Route.useParams();
  const { getDayByNumber } = useCourseData();

  const day = getDayByNumber(Number(dayId));

  if (!day) return <div>День не найден!</div>;

  const handleStartQuiz = () => {
    console.log("Start quiz for day ", dayId);
  };

  return <Lesson day={day} onStartQuiz={handleStartQuiz} />;
};

export const Route = createFileRoute("/lesson/$dayId")({
  component: LessonPage,
});

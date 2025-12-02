import { Stack } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../../store/progress";
import { CourseHeader } from "./atoms/CourseHeader";
import { ProgressCard } from "./atoms/ProgressCard";
import { LessonsGrid } from "./atoms/LessonsGrid";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const course = useProgressStore((state) => state.course);
  const completedDays = useProgressStore((state) => state.completedLessons);
  const currentLesson = useProgressStore((state) => state.currentLesson);
  const streak = useProgressStore((state) => state.streak);
  const setFreeze = useProgressStore((state) => state.setFreeze);
  const freeze = useProgressStore((state) => state.freeze);

  useEffect(() => setFreeze(), [setFreeze]);

  const progressPercent = (completedDays.length / 24) * 100;
  const lessons = Array.from({ length: course.totalLessons }, (_, i) => i + 1);

  const handleClick = () => {
    navigate({
      to: "/lesson/$lessonId",
      params: { lessonId: String(currentLesson) },
    });
  };

  return (
    <Stack gap="xl" p="md">
      <CourseHeader title={course.title} streak={streak} freeze={freeze} />
      <ProgressCard
        currentLesson={currentLesson}
        totalLessons={course.totalLessons}
        progressPercent={progressPercent}
        handleClick={handleClick}
      />
      <LessonsGrid lessons={lessons} />
    </Stack>
  );
};

export { Home };

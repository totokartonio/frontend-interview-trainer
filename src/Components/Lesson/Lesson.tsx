import { Card, Button, Stack } from "@mantine/core";
import { type LessonType } from "../../types/course";
import { useNavigate } from "@tanstack/react-router";
import LessonHeader from "./atoms/LessonHeader";
import ContentCard from "./atoms/ContentCard";

interface LessonProps {
  lesson: LessonType;
}

const Lesson = ({ lesson }: LessonProps) => {
  const topics = lesson.theory.topics;
  const keyPoints = lesson.theory.keyPoints;

  const navigate = useNavigate();

  const handleForward = () => {
    navigate({
      to: "/quiz/$lessonId",
      params: { lessonId: String(lesson.id) },
    });
  };

  const handleBack = () => {
    navigate({
      to: "/",
    });
  };

  return (
    <Card>
      <Stack gap="lg" p="md">
        <LessonHeader id={lesson.id} title={lesson.title} />
        <ContentCard data={topics} variant="topics" />
        <ContentCard data={keyPoints} variant="keyPoints" />
        <ContentCard data={lesson.practice} variant="practice" />
        <Button onClick={handleForward} aria-label="Начать квиз">
          Начать квиз
        </Button>
        <Button onClick={handleBack} aria-label="Назад" variant="outline">
          Назад
        </Button>
      </Stack>
    </Card>
  );
};
export default Lesson;

import { Card, Title, Text, List, Button, Stack } from "@mantine/core";
import { type LessonType } from "../../types/course";
import { useNavigate } from "@tanstack/react-router";

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
    <Stack gap="lg" p="md">
      <Title order={1}>{lesson.title}</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <List>
          {topics.map((topic, index) => {
            return <List.Item key={`${topic}-${index}`}>{topic}</List.Item>;
          })}
        </List>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <List>
          {keyPoints.map((keyPoint, index) => {
            return (
              <List.Item key={`${keyPoint}-${index}`}>{keyPoint}</List.Item>
            );
          })}
        </List>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>{lesson.practice}</Text>
      </Card>
      <Button onClick={handleForward} aria-label="Начать квиз">
        Начать квиз
      </Button>
      <Button onClick={handleBack} aria-label="Назад" variant="light">
        Назад
      </Button>
    </Stack>
  );
};
export default Lesson;

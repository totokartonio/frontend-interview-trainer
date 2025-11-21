import { Card, Title, Text, List, Button, Stack } from "@mantine/core";
import { type Day } from "../../types/course";

interface LessonProps {
  day: Day;
  onStartQuiz: () => void;
}

const Lesson = ({ day, onStartQuiz }: LessonProps) => {
  const topics = day.theory.topics;
  const keyPoints = day.theory.keyPoints;

  return (
    <Stack gap="lg" p="md">
      <Title order={1}>{day.title}</Title>
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
        <Text>{day.practice}</Text>
      </Card>
      <Button onClick={onStartQuiz} aria-label="Начать квиз">
        Начать квиз
      </Button>
    </Stack>
  );
};
export default Lesson;

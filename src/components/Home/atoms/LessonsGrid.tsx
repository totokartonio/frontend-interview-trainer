import { Card, SimpleGrid, UnstyledButton, Text } from "@mantine/core";
import styles from "../Home.module.css";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../../../store/progress";

type Props = {
  lessons: number[];
};

export const LessonsGrid = ({ lessons }: Props) => {
  const navigate = useNavigate();
  const completedDays = useProgressStore((state) => state.completedLessons);
  const currentLesson = useProgressStore((state) => state.currentLesson);
  const getLessonClass = (lessonNumber: number) => {
    if (completedDays.includes(lessonNumber)) return "completed";
    if (lessonNumber === currentLesson) return "current";
    return "locked";
  };

  return (
    <Card shadow="sd" padding="lg">
      <SimpleGrid spacing="sm" cols={{ base: 5, sm: 10 }}>
        {lessons.map((lesson) => {
          return (
            <UnstyledButton
              className={`${styles.gridCard} ${styles[getLessonClass(lesson)]}`}
              key={lesson}
              data-testid={`lesson-${lesson}`}
              data-label={getLessonClass(lesson)}
              disabled={getLessonClass(lesson) === "locked"}
              onClick={() => navigate({ to: `/lesson/${lesson}` })}
            >
              <Text size="sm" fw={600}>
                {lesson}
              </Text>
            </UnstyledButton>
          );
        })}
      </SimpleGrid>
    </Card>
  );
};

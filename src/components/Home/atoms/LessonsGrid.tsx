import { Card, SimpleGrid, UnstyledButton, Text } from "@mantine/core";
import styles from "../Home.module.css";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../../../store/progress";

type Props = {
  days: number[];
};

export const LessonsGrid = ({ days }: Props) => {
  const navigate = useNavigate();
  const completedDays = useProgressStore((state) => state.completedLessons);
  const currentLesson = useProgressStore((state) => state.currentLesson);
  const getDayClass = (dayNumber: number) => {
    if (completedDays.includes(dayNumber)) return "completed";
    if (dayNumber === currentLesson) return "current";
    return "locked";
  };

  return (
    <Card shadow="sd" padding="lg">
      <SimpleGrid spacing="sm" cols={{ base: 5, sm: 10 }}>
        {days.map((day) => {
          return (
            <UnstyledButton
              className={`${styles.gridCard} ${styles[getDayClass(day)]}`}
              key={day}
              data-testid={`lesson-${day}`}
              data-label={getDayClass(day)}
              disabled={getDayClass(day) === "locked"}
              onClick={() => navigate({ to: `/lesson/${day}` })}
            >
              <Text size="sm" fw={600}>
                {day}
              </Text>
            </UnstyledButton>
          );
        })}
      </SimpleGrid>
    </Card>
  );
};

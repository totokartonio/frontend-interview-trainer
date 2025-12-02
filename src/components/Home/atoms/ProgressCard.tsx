import { Card, Stack, Text, Progress, Button } from "@mantine/core";

type Props = {
  currentLesson: number;
  totalLessons: number;
  progressPercent: number;
  handleClick: () => void;
};

export const ProgressCard = ({
  currentLesson,
  totalLessons,
  progressPercent,
  handleClick,
}: Props) => {
  return (
    <Card shadow="sd" padding="lg">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text size="12" lh="1.7" c="gray.6">
            Прогресс: {currentLesson}/{totalLessons}
          </Text>
          <Progress value={progressPercent} />
        </Stack>
        <Button onClick={handleClick} aria-label="Начать урок">
          Начать урок
        </Button>
      </Stack>
    </Card>
  );
};

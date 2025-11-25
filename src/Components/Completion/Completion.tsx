import { Card, Title, Text, Button, Stack, Group } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../../store/progress";
import { type QuizStats } from "../../types/store";

const Completion = ({ quizStats }: { quizStats: QuizStats }) => {
  const navigate = useNavigate();
  const streak = useProgressStore((state) => state.streak);
  const { lastScore, passed } = quizStats;
  const handleClick = () => navigate({ to: "/" });
  return (
    <Stack gap="xl" p="md">
      <Title order={1}>
        {" "}
        <Group gap="xs" wrap="nowrap" align="center" justify="center">
          <IconFlame color="orange" size={36} />
          <Text fw={700}>{streak}</Text>
        </Group>
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500} ta="center">
          {passed ? "Отличная работа!" : "Ой!"}
        </Text>
        <Text fw={500} ta="center">
          {lastScore}%
        </Text>
        <Text>
          {passed
            ? "Ты успешно завершил урок дня и приближаешься к своей цели. 🎉"
            : "Что-то пошло не так... Давай повторим урок еще раз?"}
        </Text>

        <Button onClick={handleClick} aria-label="Продолжить">
          Продолжить
        </Button>
      </Card>
    </Stack>
  );
};

export default Completion;

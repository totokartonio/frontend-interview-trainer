import { Card, Text, Button, Stack } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../../store/progress";
import { type QuizStats } from "../../types/store";
import CompletionHeader from "./atoms/CompletionHeader";

const Completion = ({ quizStats }: { quizStats: QuizStats }) => {
  const navigate = useNavigate();
  const streak = useProgressStore((state) => state.streak);
  const { lastScore } = quizStats;
  const passed = lastScore > 60;
  const handleClick = () => navigate({ to: "/" });
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Stack gap="xl" p="xl">
        <CompletionHeader streak={streak} passed={passed} />
        <Text fw={500} fz={32} ta="center" c={passed ? "teal" : "red.8"}>
          {lastScore}%
        </Text>
        <Text ta="center" fz={20} c="dark.4">
          {passed
            ? "Ты успешно завершил урок и приближаешься к своей цели!"
            : "Что-то пошло не так... Давай повторим урок еще раз?"}
        </Text>

        <Button onClick={handleClick} aria-label="Продолжить" size="xl">
          Продолжить
        </Button>
      </Stack>
    </Card>
  );
};

export default Completion;

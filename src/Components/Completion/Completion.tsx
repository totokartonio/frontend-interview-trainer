import { Card, Title, Text, Button, Stack, Group } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useStreak } from "../../hooks/useStreak";
import { useNavigate } from "@tanstack/react-router";

const Completion = () => {
  const navigate = useNavigate();
  const { progress } = useStreak();
  const handleClick = () => navigate({ to: "/" });
  return (
    <Stack gap="xl" p="md">
      <Title order={1}>
        {" "}
        <Group gap="xs" wrap="nowrap" align="center" justify="center">
          <IconFlame color="orange" size={36} />
          <Text fw={700}>{progress.streak}</Text>
        </Group>
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500} ta="center">
          Поздравляем!
        </Text>
        <Text>
          Ты успешно завершил урок дня и приближаешься к своей цели. 🎉
        </Text>

        <Button onClick={handleClick} aria-label="Продолжить">
          Продолжить
        </Button>
      </Card>
    </Stack>
  );
};

export default Completion;

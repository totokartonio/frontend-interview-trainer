import { Card, Stack, Title, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { IconMoodSad } from "@tabler/icons-react";
import styles from "./NotFound.module.css";

const NotFound = ({ message }: { message: string | undefined }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: "/" });
  };

  return (
    <Card shadow="sm" padding="xl">
      <Stack align="center" gap="md">
        <Group gap="5" wrap="nowrap" align="center" justify="center">
          <IconMoodSad className={styles.sadIcon} size={36} />
          <Title order={2}> Упс!</Title>
        </Group>
        <Text c="dimmed">{message || "Что-то пошло не так."}</Text>
        <Button onClick={handleClick} aria-label="На главную">
          На главную
        </Button>
      </Stack>
    </Card>
  );
};

export default NotFound;

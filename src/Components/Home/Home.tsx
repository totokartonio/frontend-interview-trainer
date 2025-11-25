import {
  Title,
  Button,
  Progress,
  Grid,
  Badge,
  Stack,
  Group,
} from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useProgressStore } from "../../store/progress";

const Home = () => {
  const navigate = useNavigate();
  const completedDays = useProgressStore((state) => state.completedDays);
  const currentDay = useProgressStore((state) => state.currentDay);
  const streak = useProgressStore((state) => state.streak);

  const progressPercent = (completedDays.length / 24) * 100;
  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  const getDayColor = (dayNumber: number) => {
    if (completedDays.includes(dayNumber)) return "green";
    if (dayNumber === currentDay) return "blue";
    return "gray";
  };

  const handleClick = () => {
    navigate({
      to: "/lesson/$dayId",
      params: { dayId: String(currentDay) },
    });
  };

  return (
    <Stack gap="xl" p="md">
      <Title order={1}>
        <Group gap="xs" wrap="nowrap" align="center" justify="center">
          <IconFlame color="orange" size={36} />
          <div>{streak}</div>
        </Group>
      </Title>
      <Progress value={progressPercent} />
      <Grid gutter="s" columns={7}>
        {days.map((day) => {
          return (
            <Grid.Col span={1} key={day}>
              <Badge color={getDayColor(day)}>{day}</Badge>
            </Grid.Col>
          );
        })}
      </Grid>
      <Button onClick={handleClick} aria-label="Начать урок">
        Начать урок
      </Button>
    </Stack>
  );
};

export default Home;

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
import { useStreak } from "../../hooks/useStreak";

const Home = () => {
  const { progress } = useStreak();

  const progressPercent = (progress.completedDays.length / 24) * 100;
  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  const getDayColor = (dayNumber: number) => {
    if (progress.completedDays.includes(dayNumber)) return "green";
    if (dayNumber === progress.currentDay) return "blue";
    return "gray";
  };

  const handleClick = () => {
    alert("Урок начат");
  };

  return (
    <Stack gap="xl" p="md">
      <Title order={1}>
        <Group gap="xs" wrap="nowrap" align="center" justify="center">
          <IconFlame color="orange" size={36} />
          <div>{progress.streak}</div>
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
      <Button onClick={handleClick}>Начать урок</Button>
    </Stack>
  );
};

export default Home;

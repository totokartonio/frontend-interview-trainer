import { Title, Stack, Badge, Group, Text } from "@mantine/core";
import { IconFlame, IconSnowflake } from "@tabler/icons-react";
import styles from "../Home.module.css";

type Props = {
  title: string;
  streak: number;
  freeze: boolean;
};

const CourseHeader = ({ title, streak, freeze }: Props) => {
  return (
    <Stack gap="lg" align="center">
      <Title order={1}>{title}</Title>
      <Badge
        className={`${streak > 0 && !freeze ? "streak-animate" : ""} ${styles.dayBadge}`}
        color={freeze ? "blue.1" : "orange.1"}
        autoContrast
      >
        <Group gap="5" wrap="nowrap" align="center" justify="center">
          {freeze ? (
            <IconSnowflake
              className={styles.snowIcon}
              size={36}
              data-testid="freeze"
            />
          ) : (
            <IconFlame
              className={styles.flameIcon}
              size={36}
              data-testid="flame"
            />
          )}
          <Text size="20" fw={700} lh="h1" data-testid="streak">
            {streak}
          </Text>
        </Group>
      </Badge>
    </Stack>
  );
};

export default CourseHeader;

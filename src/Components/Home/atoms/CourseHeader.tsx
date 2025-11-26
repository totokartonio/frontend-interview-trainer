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
        className={`${streak > 0 && !freeze ? styles["streak-animate"] : ""} ${styles.dayBadge}`}
        color="badge-orange"
        autoContrast
      >
        <Group gap="5" wrap="nowrap" align="center" justify="center">
          {freeze ? (
            <IconSnowflake color="LightSkyBlue" size={36} />
          ) : (
            <IconFlame color="orange" size={36} />
          )}
          <Text size="20" fw={700} lh="h1">
            {streak}
          </Text>
        </Group>
      </Badge>
    </Stack>
  );
};

export default CourseHeader;

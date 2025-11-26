import { Stack, Title, Badge, Group, Text } from "@mantine/core";
import { IconFlame, IconMoodSad } from "@tabler/icons-react";
import styles from "../Completion.module.css";

type Props = {
  streak: number;
  passed: boolean;
};

const CompletionHeader = ({ streak, passed }: Props) => {
  return (
    <Stack gap="xl" align="center">
      <Title order={1} ta="center">
        {passed ? "Отличная работа!" : "Ой!"}
      </Title>
      <Badge
        className={`${styles["streak-animate"]} ${styles.dayBadge}`}
        color={passed ? "orange.1" : "pink.1"}
        autoContrast
      >
        <Group gap="xs" wrap="nowrap" align="center" justify="center">
          {passed ? (
            <>
              <IconFlame className={styles.flameIcon} size={36} />
              <Text fw={700} size="20" lh="h1">
                {streak}
              </Text>
            </>
          ) : (
            <IconMoodSad className={styles.sadIcon} size={36} />
          )}
        </Group>
      </Badge>
    </Stack>
  );
};

export default CompletionHeader;

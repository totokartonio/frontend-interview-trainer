import { Alert, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import styles from "../Quiz.module.css";

type Props = {
  text: string;
};

export const Explanation = ({ text }: Props) => {
  return (
    <Alert
      title="Объяснение"
      color="blue"
      mt="md"
      icon={<IconInfoCircle />}
      className={styles.explanation}
    >
      <Text fz="sm">{text}</Text>
    </Alert>
  );
};

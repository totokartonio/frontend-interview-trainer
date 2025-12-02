import { Card, Stack, Group, ThemeIcon, Title, Code } from "@mantine/core";
import Markdown from "react-markdown";
import { IconFileText } from "@tabler/icons-react";
import styles from "../Lesson.module.css";

type Props = {
  data: string;
};

export const MarkdownCard = ({ data }: Props) => {
  return (
    <Card shadow="sd" padding="lg" withBorder className={styles["content"]}>
      <Stack gap="md">
        <Group gap="xs">
          <ThemeIcon variant="light" size="lg" color="grape">
            <IconFileText size={20} />
          </ThemeIcon>
          <Title order={2} fz="h3" m={0}>
            Подробная теория
          </Title>
        </Group>
        <Markdown
          components={{
            p: ({ node, ...props }) => (
              <p style={{ marginBottom: 14 }} {...props} />
            ),
            li: ({ node, ...props }) => (
              <li style={{ marginBottom: 8 }} {...props} />
            ),
            code: ({ children }) => <Code block>{children}</Code>,
          }}
        >
          {data}
        </Markdown>
      </Stack>
    </Card>
  );
};

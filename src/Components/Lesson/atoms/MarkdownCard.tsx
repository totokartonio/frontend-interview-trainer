import { Card, Stack, Group, ThemeIcon, Title } from "@mantine/core";
import Markdown from "react-markdown";
import { IconFileText } from "@tabler/icons-react";
import styles from "../Lesson.module.css";

type Props = {
  data: string;
};

const MarkdownCard = ({ data }: Props) => {
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
            code: ({ node, className, children, ...props }) => (
              <code
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontFamily: "monospace",
                }}
                {...props}
              >
                {children}
              </code>
            ),
          }}
        >
          {data}
        </Markdown>
      </Stack>
    </Card>
  );
};

export default MarkdownCard;

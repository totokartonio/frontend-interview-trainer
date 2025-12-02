import { Stack, Progress, Title, Text, Code } from "@mantine/core";
import Markdown from "react-markdown";
import { isBlock } from "../../../utils/isBlock";

type Props = {
  question: string;
  questionIndex: number;
  questionsLength: number;
};

export const QuestionTitle = ({
  question,
  questionIndex,
  questionsLength,
}: Props) => {
  const progressPercent = ((questionIndex + 1) / questionsLength) * 100;
  return (
    <Stack gap="sm" p="md">
      <Text size="14" lh="1.7" c="gray.6" tt="uppercase">
        Вопрос {questionIndex + 1} из {questionsLength}
      </Text>
      <Progress value={progressPercent} transitionDuration={400} />
      <Title order={1} fz="h3">
        <Markdown
          components={{
            p: ({ node, ...props }) => (
              <p style={{ marginBottom: 14 }} {...props} />
            ),
            code: ({ children }) => (
              <Code block={isBlock(children)} style={{ fontSize: 16 }}>
                {children}
              </Code>
            ),
          }}
        >
          {question}
        </Markdown>
      </Title>
    </Stack>
  );
};

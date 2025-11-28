import { Stack, Progress, Title, Text } from "@mantine/core";

type Props = {
  question: string;
  questionIndex: number;
  questionsLength: number;
};

const QuestionTitle = ({ question, questionIndex, questionsLength }: Props) => {
  const progressPercent = ((questionIndex + 1) / questionsLength) * 100;
  return (
    <Stack gap="sm" p="md">
      <Text size="14" lh="1.7" c="gray.6" tt="uppercase">
        Вопрос {questionIndex + 1} из {questionsLength}
      </Text>
      <Progress value={progressPercent} transitionDuration={400} />
      <Title order={1} fz="h3">
        {question}
      </Title>
    </Stack>
  );
};

export default QuestionTitle;

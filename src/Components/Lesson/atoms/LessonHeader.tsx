import { Stack, Text, Title } from "@mantine/core";

type Props = {
  id: number;
  title: String;
};

const LessonHeader = ({ id, title }: Props) => {
  return (
    <Stack gap="xs">
      <Text size="14" lh="1.7" c="gray.6" tt="uppercase">
        День {id}
      </Text>
      <Title order={1} lh={1.2}>
        {title}
      </Title>
    </Stack>
  );
};

export default LessonHeader;

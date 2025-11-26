import {
  Card,
  Stack,
  Group,
  ThemeIcon,
  Title,
  List,
  Text,
} from "@mantine/core";
import { IconBook, IconBulb, IconTarget } from "@tabler/icons-react";
import styles from "../Lesson.module.css";

type Props = {
  data: string[];
  variant: "topics" | "keyPoints" | "practice";
};

const ContentCard = ({ data, variant }: Props) => {
  let cardTitle;
  let cardColor;
  let iconColor;

  if (variant === "topics") {
    cardTitle = "Темы урока";
    cardColor = "blue";
  } else if (variant === "keyPoints") {
    cardTitle = "Ключевые моменты";
    cardColor = "teal";
  } else {
    cardTitle = "Задание";
    cardColor = "yellow";
    iconColor = `${cardColor}.4`;
  }

  return (
    <Card shadow="sd" padding="lg" withBorder className={styles[variant]}>
      <Stack gap="md">
        <Group gap="xs">
          <ThemeIcon variant="light" size="lg" color={cardColor}>
            {variant === "topics" ? (
              <IconBook size={20} />
            ) : variant === "keyPoints" ? (
              <IconBulb size={20} />
            ) : (
              <IconTarget size={20} />
            )}
          </ThemeIcon>
          <Title order={2} fz="h3" m={0}>
            {cardTitle}
          </Title>
        </Group>
        <List
          spacing="md"
          size="md"
          center
          icon={
            <ThemeIcon
              color={iconColor}
              size={14}
              radius="xl"
              variant="filled"
            />
          }
        >
          {data.map((item, index) => {
            return (
              <List.Item key={`${item}-${index}`}>
                <Text>{item}</Text>
              </List.Item>
            );
          })}
        </List>
      </Stack>
    </Card>
  );
};

export default ContentCard;

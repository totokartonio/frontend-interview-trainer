import {
  Card,
  Title,
  Text,
  Radio,
  Button,
  Alert,
  Progress,
  Stack,
} from "@mantine/core";
import { useQuiz } from "../../hooks/useQuiz";
import { type QuizQuestion } from "../../types/course";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswers,
    showExplanation,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    calculateScore,
  } = useQuiz(questions);

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleChange = (index: number) => {
    selectAnswer(index);
  };

  const handleComplete = () => {
    const score = calculateScore();
    onComplete(score);
    if (!isLastQuestion) {
      nextQuestion();
    }
  };

  return (
    <Stack gap="lg" p="md">
      <Title order={1}>
        Вопрос {currentQuestionIndex + 1} из {questions.length}
      </Title>
      <Progress value={progressPercent} />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>{currentQuestion.question}</Text>
        <Radio.Group
          value={
            selectedAnswers[currentQuestionIndex] !== null
              ? selectedAnswers[currentQuestionIndex]!.toString()
              : ""
          }
          onChange={(val) => handleChange(Number(val))}
        >
          {currentQuestion.options.map((option, index) => (
            <Radio
              key={`${option}-${index}`}
              value={index.toString()}
              label={option}
            />
          ))}
        </Radio.Group>
        {showExplanation && (
          <Alert title="Объяснение" color="blue" mt="md">
            {currentQuestion.explanation}
          </Alert>
        )}
        <Button onClick={handleComplete}>
          {isLastQuestion ? "Завершить" : "Следующий вопрос"}
        </Button>
      </Card>
    </Stack>
  );
};

export default Quiz;

import { useState } from "react";
import { Card, Text, Button, Stack, UnstyledButton } from "@mantine/core";
import { useQuiz } from "../../hooks/useQuiz";
import { type QuizQuestion } from "../../types/course";
import styles from "./Quiz.module.css";
import QuestionTitle from "./QuestionTitle";
import Explanation from "./Explanation";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [value, setValue] = useState<string | null>(null);

  const {
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    calculateScore,
  } = useQuiz(questions);

  const handleChoose = (index: number) => {
    setValue(index.toString());
    selectAnswer(index);
  };

  const handleClick = () => {
    if (!isLastQuestion) {
      nextQuestion();
      setValue(null);
      return;
    }

    const score = calculateScore();
    onComplete(score);
  };

  const checkAnswer = (index: number) => {
    if (!value) return;
    if (index === currentQuestion.correctAnswer) return "correctAnswer";
    if (+value !== index) return "lockedOption";
    return "wrongAnswer";
  };

  return (
    <Card>
      <Stack gap="md" p="md">
        <QuestionTitle
          question={currentQuestion.question}
          questionIndex={currentQuestionIndex}
          questionsLength={questions.length}
        />
        <Stack gap="md" p="md">
          {currentQuestion.options.map((option, index) => (
            <UnstyledButton
              key={`${option}-${index}`}
              className={`${styles.option} ${styles[`${checkAnswer(index)}`]}`}
              onClick={() => handleChoose(index)}
              disabled={!!value}
            >
              <Text fz="md">{option}</Text>
            </UnstyledButton>
          ))}
        </Stack>
        {value && (
          <>
            <Explanation text={currentQuestion.explanation} />
            <Button onClick={handleClick}>
              {isLastQuestion ? "Завершить" : "Следующий вопрос"}
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default Quiz;

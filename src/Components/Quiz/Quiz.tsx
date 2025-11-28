import { useState } from "react";
import { Card, Text, Button, Stack, UnstyledButton } from "@mantine/core";
import { type QuizQuestion } from "../../types/course";
import styles from "./Quiz.module.css";
import QuestionTitle from "./atoms/QuestionTitle";
import Explanation from "./atoms/Explanation";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const handleChoose = (id: string) => {
    console.log(id);
    setValue(id);
  };

  const handleClick = () => {
    let newScore = score;
    if (value === currentQuestion.correctAnswer) {
      newScore += 1;
      setScore(newScore);
    }
    if (!isLastQuestion) {
      const newQuestionIndex = questionIndex;
      setQuestionIndex(newQuestionIndex + 1);
      setValue(null);
      return;
    }

    const scorePercent = Math.round((newScore / questions.length) * 100);
    onComplete(scorePercent);
    setScore(0);
  };

  const checkAnswer = (id: string) => {
    if (!value) return;
    if (id === currentQuestion.correctAnswer) return "correctAnswer";
    if (id !== value) return "lockedOption";
    return "wrongAnswer";
  };

  return (
    <Card>
      <Stack gap="md" p="md">
        <QuestionTitle
          question={currentQuestion.question}
          questionIndex={questionIndex}
          questionsLength={questions.length}
        />
        <Stack
          gap="md"
          p="md"
          key={questionIndex}
          className={styles.questionCard}
        >
          {currentQuestion.options.map(({ id, opt }) => (
            <UnstyledButton
              key={id}
              className={`${styles.option} ${styles[`${checkAnswer(id)}`]}`}
              onClick={() => handleChoose(id)}
              disabled={!!value}
            >
              <Text fz="md">{opt}</Text>
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

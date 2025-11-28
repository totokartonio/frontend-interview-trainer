import { useReducer } from "react";
import { Card, Text, Button, Stack, UnstyledButton } from "@mantine/core";
import { type QuizQuestion } from "../../types/course";
import styles from "./Quiz.module.css";
import QuestionTitle from "./atoms/QuestionTitle";
import Explanation from "./atoms/Explanation";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

type QuizState = {
  score: number;
  questionIndex: number;
  selectedAnswer: string | null;
};

type QuizAction =
  | { type: "SELECT_ANSWER"; tentativeAnswer: string }
  | { type: "NEXT_QUESTION"; isCorrect: boolean }
  | { type: "RESET" };

const reducer = (state: QuizState, action: QuizAction) => {
  switch (action.type) {
    case "SELECT_ANSWER": {
      return { ...state, selectedAnswer: action.tentativeAnswer };
    }
    case "NEXT_QUESTION": {
      let newScore = state.score + (action.isCorrect ? 1 : 0);
      let newQuestionIndex = state.questionIndex + 1;
      return {
        score: newScore,
        questionIndex: newQuestionIndex,
        selectedAnswer: null,
      };
    }
    case "RESET": {
      return { score: 0, questionIndex: 0, selectedAnswer: null };
    }
  }
};

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [state, dispatch] = useReducer(reducer, {
    score: 0,
    questionIndex: 0,
    selectedAnswer: null,
  });

  const currentQuestion = questions[state.questionIndex];
  const isLastQuestion = state.questionIndex === questions.length - 1;

  const handleChoose = (id: string) => {
    dispatch({ type: "SELECT_ANSWER", tentativeAnswer: id });
  };

  const handleClick = () => {
    const isCorrect = state.selectedAnswer === currentQuestion.correctAnswer;
    if (!isLastQuestion) {
      dispatch({ type: "NEXT_QUESTION", isCorrect: isCorrect });
      return;
    }

    const newScore = state.score + (isCorrect ? 1 : 0);
    const scorePercent = Math.round((newScore / questions.length) * 100);
    onComplete(scorePercent);
    dispatch({ type: "RESET" });
  };

  const checkAnswer = (id: string) => {
    if (!state.selectedAnswer) return;
    if (id === currentQuestion.correctAnswer) return "correctAnswer";
    if (id !== state.selectedAnswer) return "lockedOption";
    return "wrongAnswer";
  };

  return (
    <Card>
      <Stack gap="md" p="md">
        <QuestionTitle
          question={currentQuestion.question}
          questionIndex={state.questionIndex}
          questionsLength={questions.length}
        />
        <Stack
          gap="md"
          p="md"
          key={state.questionIndex}
          className={styles.questionCard}
        >
          {currentQuestion.options.map(({ id, opt }) => (
            <UnstyledButton
              key={id}
              className={`${styles.option} ${styles[`${checkAnswer(id)}`]}`}
              onClick={() => handleChoose(id)}
              disabled={!!state.selectedAnswer}
              aria-label={opt}
              aria-checked={state.selectedAnswer === id}
              role="radio"
            >
              <Text fz="md">{opt}</Text>
            </UnstyledButton>
          ))}
        </Stack>
        {state.selectedAnswer && (
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

import { useState } from "react";
import { type QuizQuestion } from "../types/course";

export const useQuiz = (questions: QuizQuestion[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(false);

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== null) {
      return;
    }

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setShowExplanation(true);
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) return;

    const newCurrentQuestionIndex = currentQuestionIndex + 1;
    setShowExplanation(false);
    setCurrentQuestionIndex(newCurrentQuestionIndex);
  };

  // TODO: Task 2.2.3 - Подсчёт результата
  const calculateScore = (): number => {
    let correctAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        correctAnswers++;
      }
    }

    const score = Math.round((correctAnswers / questions.length) * 100);

    return score;
  };

  const isQuizComplete = (): boolean => {
    return !selectedAnswers.includes(null);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswers,
    showExplanation,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    calculateScore,
    isQuizComplete,
  };
};

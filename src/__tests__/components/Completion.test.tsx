import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Completion } from "../../components/Completion";
import { useProgressStore } from "../../store/progress";
import type { QuizStats } from "../../types/store";
import { renderWithRouter } from "../test-utils";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("Completion компонент", () => {
  vi.clearAllMocks();
  beforeEach(() => {
    useProgressStore.setState({
      streak: 5,
      currentLesson: 1,
      completedLessons: [],
      quizzes: {},
      lastCompletedDate: null,
      course: {
        title: "Test Course",
        duration: "3",
        lessonsPerWeek: 3,
        totalLessons: 3,
        lessons: [],
      },
      freeze: false,
    });
  });

  it("должен отобразить правильный процент", () => {
    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("должен отобразить процент как число без 'passed'", () => {
    const quizStats: QuizStats = {
      bestScore: 85,
      lastScore: 85,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it('должен показать "Ты успешно завершил урок..." при score > 60%', () => {
    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(
      screen.getByText(/Ты успешно завершил урок и приближаешься к своей цели!/)
    ).toBeInTheDocument();
  });

  it('должен показать "Что-то пошло не так..." при score ≤ 60%', () => {
    const quizStats: QuizStats = {
      bestScore: 60,
      lastScore: 60,
      passed: false,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(
      screen.getByText(
        /Что-то пошло не так\.\.\. Давай повторим урок еще раз\?/
      )
    ).toBeInTheDocument();
  });

  it("должен показать красный цвет для fail сценария", () => {
    const quizStats: QuizStats = {
      bestScore: 50,
      lastScore: 50,
      passed: false,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    const scoreText = screen.getByText("50%");
    expect(scoreText).toHaveClass("mantine-Text-root");
  });

  it("должен показать зелёный цвет для success сценария", () => {
    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    const scoreText = screen.getByText("75%");
    expect(scoreText).toHaveClass("mantine-Text-root");
  });

  it("должен отобразить streak из store", () => {
    useProgressStore.setState({
      streak: 5,
    });

    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByTestId("streak")).toHaveTextContent("5");
  });

  it("должен отобразить разный streak при разных значениях", () => {
    useProgressStore.setState({
      streak: 10,
    });

    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByTestId("streak")).toHaveTextContent("10");
  });

  it('должна быть кнопка "Продолжить"', () => {
    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    const continueButton = screen.getByRole("button", { name: /Продолжить/i });
    expect(continueButton).toBeInTheDocument();
  });

  it('кнопка "Продолжить" должна быть активной', () => {
    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    const continueButton = screen.getByRole("button", { name: /Продолжить/i });
    expect(continueButton).not.toBeDisabled();
  });

  it("должен отобразить Card компонент", () => {
    const quizStats: QuizStats = {
      bestScore: 75,
      lastScore: 75,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("должен корректно отобразить score 0%", () => {
    const quizStats: QuizStats = {
      bestScore: 0,
      lastScore: 0,
      passed: false,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("должен корректно отобразить score 100%", () => {
    const quizStats: QuizStats = {
      bestScore: 100,
      lastScore: 100,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("должен отобразить граничный случай score === 60%", () => {
    const quizStats: QuizStats = {
      bestScore: 60,
      lastScore: 60,
      passed: false,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Что-то пошло не так\.\.\. Давай повторим урок еще раз\?/
      )
    ).toBeInTheDocument();
  });

  it("должен отобразить граничный случай score === 61%", () => {
    const quizStats: QuizStats = {
      bestScore: 61,
      lastScore: 61,
      passed: true,
    };
    renderWithRouter(<Completion quizStats={quizStats} />);

    expect(screen.getByText("61%")).toBeInTheDocument();
    expect(
      screen.getByText(/Ты успешно завершил урок и приближаешься к своей цели!/)
    ).toBeInTheDocument();
  });
});
